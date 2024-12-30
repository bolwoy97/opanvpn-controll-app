function App() {
  const handleStartVPN = () => {
    if (!window.api || !window.api.startVPN) {
      console.error("API not available in the renderer process");
      return;
    }

    const filePath = "/home/nuleon/Documents/Programs/OpenVPN/profile-6-leonid.shadrin@tallium.com.ovpn"; // Replace with logic for file selection
    window.api.startVPN(filePath);
  };

  const handleStopVPN = () => {
    if (!window.api || !window.api.stopVPN) {
      console.error("API not available in the renderer process");
      return;
    }

    window.api.stopVPN();
  };

  return (
    <div>
      <h1>VPN Manager</h1>
      <button onClick={handleStartVPN}>Start VPN</button>
      <button onClick={handleStopVPN}>Stop VPN</button>
    </div>
  );
}

export default App;

declare global {
  interface Window {
    api: {
      startVPN: (filePath: string) => void;
      stopVPN: () => void;
    };
  }
}
