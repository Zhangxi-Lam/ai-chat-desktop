"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var user_settings_1 = __importStar(require("./user_settings"));
var tray_generator_1 = __importDefault(require("./tray_generator"));
var path = require("path");
var settings = new user_settings_1.default();
var appUrl = "file://".concat(path.join(__dirname, "assets/index.html"));
var googleUrl = "https:/gemini.google.com";
var deepseekUrl = "https://chat.deepseek.com/";
var win = null;
function createWindow(settings) {
    var url = settings.getKey(user_settings_1.CHOICE) === user_settings_1.GEMINI ? googleUrl : deepseekUrl;
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
    var tray = new tray_generator_1.default();
    tray.createTray(settings);
    createWindow(settings);
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        console.log("activate");
        createWindow(settings);
    }
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
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
