import { app, BrowserWindow, nativeImage, screen, ipcMain } from "electron";
import UserSettings, { CHOICE, GEMINI } from "./user_settings";
import TrayGenerator from "./tray_generator";
const path = require("path");

const settings = new UserSettings();

const appUrl = `file://${path.join(__dirname, "assets/index.html")}`;
const googleUrl = "https:/gemini.google.com";
const deepseekUrl = "https://chat.deepseek.com/";

let win: BrowserWindow | null = null;

function createWindow(settings: UserSettings) {
  const url = settings.getKey(CHOICE) === GEMINI ? googleUrl : deepseekUrl;
  const primaryDisplay = screen.getPrimaryDisplay();
  const { x, y, width, height } = primaryDisplay.bounds;

  const icon = nativeImage.createFromPath("src/assets/icon.png");

  win = new BrowserWindow({
    width: width * 0.8,
    height: height * 0.9,
    x: x + (width - width * 0.8) / 2,
    y: y + (height - height * 0.9) / 2,
    // Only works on Windows, Linux
    icon: icon,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    }
  });

  win.loadURL(url);
}

app.whenReady().then(() => { 
  console.log("when ready");
  const tray = new TrayGenerator();
  tray.createTray(settings);
  createWindow(settings) 
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) { 
    console.log("activate");
    createWindow(settings) 
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// ipcMain.on("gemini", (event) => {
//   if (win) {
//     win.loadURL(googleUrl);
//   } else {
//     createWindow(googleUrl);
//   }
// });

// ipcMain.on("deepseek", (event) => {
//   if (win) {
//     win.loadURL(deepseekUrl);
//   } else {
//     createWindow(deepseekUrl);
//   }
// });