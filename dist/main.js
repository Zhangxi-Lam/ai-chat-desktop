"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var appUrl = "https:/gemini.google.com";
function createWindow() {
    var primaryDisplay = electron_1.screen.getPrimaryDisplay();
    var _a = primaryDisplay.bounds, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var icon = electron_1.nativeImage.createFromPath("src/assets/icon.png");
    var win = new electron_1.BrowserWindow({
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
electron_1.app.whenReady().then(function () { createWindow(); });
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
