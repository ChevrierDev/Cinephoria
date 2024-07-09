const { contextBridge, ipcRenderer } = require('electron');
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast()
});

contextBridge.exposeInMainWorld('api', {
  loginSuccess: () => ipcRenderer.send('login-success'),
  logout: async function () {
    try {
      const response = await fetch("http://localhost:3030/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        ipcRenderer.send('logout');
        return true;
      } else {
        console.error("Erreur lors de la tentative de déconnexion", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de déconnexion", error);
      throw error;
    }
  }
});
