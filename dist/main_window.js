"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var user_settings_1 = require("./user_settings");
var path = require("path");
var ICON_PATH = "src/assets/icon.png";
var GOOGLE_URL = "https:/gemini.google.com";
var DEEPSEEK_URL = "https://chat.deepseek.com/";
var MainWindow = /** @class */ (function () {
    function MainWindow() {
    }
    MainWindow.prototype.createWindow = function (settings) {
        var url = this.getURL(settings);
        var primaryDisplay = electron_1.screen.getPrimaryDisplay();
        var _a = primaryDisplay.bounds, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var icon = electron_1.nativeImage.createFromPath(ICON_PATH);
        this.window = new electron_1.BrowserWindow({
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
        this.window.loadURL(url);
    };
    MainWindow.prototype.reloadWindow = function (settings) {
        if (this.window && !this.window.isDestroyed()) {
            var url = this.getURL(settings);
            this.window.loadURL(url);
        }
        else {
            this.createWindow(settings);
        }
    };
    MainWindow.prototype.getURL = function (settings) {
        return settings.getKey(user_settings_1.CHOICE) === user_settings_1.GEMINI ? GOOGLE_URL : DEEPSEEK_URL;
    };
    return MainWindow;
}());
exports.default = MainWindow;
