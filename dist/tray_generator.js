"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_settings_1 = require("./user_settings");
var _a = require('electron'), Tray = _a.Tray, Menu = _a.Menu;
var path = require('path');
var TrayGenerator = /** @class */ (function () {
    function TrayGenerator() {
        this.tray = new Tray(path.join(__dirname, 'assets', 'icon.png'));
    }
    TrayGenerator.prototype.createTray = function (settings) {
        var contextMenu = Menu.buildFromTemplate([
            {
                label: 'Gemini',
                type: 'radio',
                checked: settings.getKey(user_settings_1.CHOICE) === user_settings_1.GEMINI,
                click: function () {
                    console.log('Gemini selected');
                    settings.setKey(user_settings_1.CHOICE, user_settings_1.GEMINI);
                },
            },
            {
                label: 'Deepseek',
                type: 'radio',
                checked: settings.getKey(user_settings_1.CHOICE) === user_settings_1.DEEPSEEK,
                click: function () {
                    console.log('Deepseek selected');
                    settings.setKey(user_settings_1.CHOICE, user_settings_1.DEEPSEEK);
                }
            },
        ]);
        this.tray.setContextMenu(contextMenu);
    };
    return TrayGenerator;
}());
exports.default = TrayGenerator;
