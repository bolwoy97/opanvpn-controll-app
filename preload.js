const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  startVPN: (filePath) => ipcRenderer.send('start-vpn', filePath),
  stopVPN: () => ipcRenderer.send('stop-vpn'),
});

console.log("Preload script loaded!");
