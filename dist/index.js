"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var user_settings_1 = __importDefault(require("./user_settings"));
var tray_generator_1 = __importDefault(require("./tray_generator"));
var path = require("path");
var appUrl = "file://".concat(path.join(__dirname, "assets/index.html"));
var googleUrl = "https:/gemini.google.com";
var deepseekUrl = "https://chat.deepseek.com/";
var win = null;
function createWindow(url) {
    if (url === void 0) { url = appUrl; }
    var primaryDisplay = electron_1.screen.getPrimaryDisplay();
    var _a = primaryDisplay.bounds, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var icon = electron_1.nativeImage.createFromPath("src/assets/icon.png");
    win = new electron_1.BrowserWindow({
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
electron_1.app.whenReady().then(function () {
    console.log("when ready");
    var settings = new user_settings_1.default();
    var tray = new tray_generator_1.default();
    tray.createTray(settings);
    createWindow();
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        console.log("activate");
        createWindow();
    }
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.ipcMain.on("gemini", function (event) {
    if (win) {
        win.loadURL(googleUrl);
    }
    else {
        createWindow(googleUrl);
    }
});
electron_1.ipcMain.on("deepseek", function (event) {
    if (win) {
        win.loadURL(deepseekUrl);
    }
    else {
        createWindow(deepseekUrl);
    }
});
