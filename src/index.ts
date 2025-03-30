import { app, BrowserWindow, nativeImage, screen, ipcMain } from "electron";
import MainWindow from "./main_window";
import UserSettings, { CHOICE, GEMINI } from "./user_settings";
import TrayGenerator from "./tray_generator";

const settings = new UserSettings();
const mainWindow = new MainWindow();
const tray = new TrayGenerator();

app.whenReady().then(() => { 
  tray.createTray(settings, mainWindow);
  mainWindow.createWindow(settings);
});

app.on('activate', () => {
  // On macOS, recreate a window in the app when the dock icon is clicked and no other windows are open
  if (BrowserWindow.getAllWindows().length === 0) { 
    mainWindow.createWindow(settings);
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // If not macOS, quit the app when all windows are closed
    app.quit()
  }
})