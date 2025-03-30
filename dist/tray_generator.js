"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_settings_1 = require("./user_settings");
var _a = require('electron'), Tray = _a.Tray, Menu = _a.Menu;
var path = require('path');
var TrayGenerator = /** @class */ (function () {
    function TrayGenerator() {
    }
    TrayGenerator.prototype.createTray = function (settings, window) {
        this.tray = new Tray(path.join(__dirname, 'assets', 'icon.png'));
        var contextMenu = Menu.buildFromTemplate([
            {
                label: 'Gemini',
                type: 'radio',
                checked: settings.getKey(user_settings_1.CHOICE) === user_settings_1.GEMINI,
                click: function () {
                    if (settings.getKey(user_settings_1.CHOICE) === user_settings_1.GEMINI) {
                        return;
                    }
                    console.log('Gemini selected');
                    settings.setKey(user_settings_1.CHOICE, user_settings_1.GEMINI);
                    window.reloadWindow(settings);
                },
            },
            {
                label: 'Deepseek',
                type: 'radio',
                checked: settings.getKey(user_settings_1.CHOICE) === user_settings_1.DEEPSEEK,
                click: function () {
                    if (settings.getKey(user_settings_1.CHOICE) === user_settings_1.DEEPSEEK) {
                        return;
                    }
                    console.log('Deepseek selected');
                    settings.setKey(user_settings_1.CHOICE, user_settings_1.DEEPSEEK);
                    window.reloadWindow(settings);
                }
            },
        ]);
        this.tray.setContextMenu(contextMenu);
    };
    return TrayGenerator;
}());
exports.default = TrayGenerator;
