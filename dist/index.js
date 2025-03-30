"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var main_window_1 = __importDefault(require("./main_window"));
var user_settings_1 = __importDefault(require("./user_settings"));
var tray_generator_1 = __importDefault(require("./tray_generator"));
var settings = new user_settings_1.default();
var mainWindow = new main_window_1.default();
var tray = new tray_generator_1.default();
electron_1.app.whenReady().then(function () {
    tray.createTray(settings, mainWindow);
    mainWindow.createWindow(settings);
});
electron_1.app.on('activate', function () {
    // On macOS, recreate a window in the app when the dock icon is clicked and no other windows are open
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        mainWindow.createWindow(settings);
    }
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        // If not macOS, quit the app when all windows are closed
        electron_1.app.quit();
    }
});
