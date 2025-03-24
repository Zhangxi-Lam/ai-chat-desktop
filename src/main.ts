import { app, BrowserWindow, nativeImage, screen } from "electron";

const appUrl = "https:/gemini.google.com";

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { x, y, width, height } = primaryDisplay.bounds;

  const icon = nativeImage.createFromPath("src/assets/icon.png");

  var win = new BrowserWindow({
    width: width * 0.8,
    height: height * 0.9,
    x: x + (width - width * 0.8) / 2,
    y: y + (height - height * 0.9) / 2,
    // Only works on Windows, Linux
    icon: icon,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  win.loadURL(appUrl);
}

app.whenReady().then(() => { createWindow() });

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) { createWindow() }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})