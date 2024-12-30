const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use the preload script
      contextIsolation: true, // Important for security
      enableRemoteModule: false,
    },
  });

  console.log("Preload script path:", path.join(__dirname, 'preload.js'));

  mainWindow.loadFile('dist/index.html'); // Adjust the path to your React build

  ipcMain.on('start-vpn', (event, filePath) => {
    const command = `openvpn3 session-start --config ${filePath}`;
    const process = exec(command);

    process.stdout.on('data', (data) => console.log(data.toString()));
    process.stderr.on('data', (data) => console.error(data.toString()));
  });

  ipcMain.on('stop-vpn', () => {
    const listCommand = `openvpn3 sessions-list`;
    const manageCommand = `openvpn3 session-manage --session-path`;

    exec(listCommand, (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }

      const sessionIdMatch = stdout.match(/\/net\/openvpn\/v3\/sessions\/(\S+)/);
      if (sessionIdMatch) {
        const sessionPath = sessionIdMatch[0];
        exec(`${manageCommand} ${sessionPath}`, (err, stdout) => {
          if (err) console.error(err);
          else console.log(stdout);
        });
      }
    });
  });
});
