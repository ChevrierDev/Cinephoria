require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const isDev = process.env.NODE_ENV === "development";
const isMac = process.platform === "darwin";

// Creates the main window
function createWindow() {
  const win = new BrowserWindow({
    title: "Cinéphoria",
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    win.webContents.openDevTools();
  }

  // Loads HTML file into the window
  win.loadFile('views/login.html');
}

// Calls createWindow() when the app is ready
app.whenReady().then(createWindow);

// Quits the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

// Opens a window if none are open (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
