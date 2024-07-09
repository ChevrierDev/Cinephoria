require("dotenv").config();
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const isDev = process.env.NODE_ENV === "development";
const isMac = process.platform === "darwin";

let mainWindow; // Déclarez la variable mainWindow
let loggedIn = false;

// Creates the main window
function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Cinéphoria",
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon', 'logo-blanc.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Loads HTML file into the window
  if (loggedIn) {
    mainWindow.loadFile(path.join(__dirname, 'views/employeeDashboard.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, 'views/login.html'));
  } 
}

// Écoute les événements de connexion et de déconnexion
ipcMain.on('login-success', () => {
  loggedIn = true;
  mainWindow.loadFile(path.join(__dirname, 'views/employeeDashboard.html'));
});

ipcMain.on('logout', () => {
  loggedIn = false;
  mainWindow.loadFile(path.join(__dirname, 'views/login.html'));
});

// Calls createWindow() when the app is ready
app.whenReady().then(createWindow);

// Quits the app when all windows are closed (Windows & Linux)
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

// Opens a window if none are open (macOS)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
