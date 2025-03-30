"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEEPSEEK = exports.GEMINI = exports.CHOICE = void 0;
var electron_1 = require("electron");
var fs = require("fs");
var path = require("path");
exports.CHOICE = 'choice';
exports.GEMINI = 'gemini';
exports.DEEPSEEK = 'deepseek';
var UserSettings = /** @class */ (function () {
    function UserSettings() {
        this.dataPath = path.join(electron_1.app.getPath("userData"), "user_settings.json");
        if (fs.existsSync(this.dataPath)) {
            console.log("User settings file exists: %s", this.dataPath);
        }
        else {
            console.log("User settings file does not exist, creating it: %s", this.dataPath);
            this.createUserSettingsJson(this.dataPath);
        }
        this.readUserSettingsJson(this.dataPath);
    }
    UserSettings.prototype.createUserSettingsJson = function (filePath) {
        var _a;
        var defaultSettings = (_a = {},
            _a[exports.CHOICE] = exports.DEEPSEEK,
            _a);
        var jsonData = JSON.stringify(defaultSettings, null, 2);
        try {
            fs.writeFileSync(filePath, jsonData);
            console.log('Successfully wrote to %s', filePath);
        }
        catch (err) {
            console.error('Error writing file:', err);
        }
    };
    UserSettings.prototype.readUserSettingsJson = function (filePath) {
        var jsonData = fs.readFileSync(filePath, "utf8");
        this.data = JSON.parse(jsonData);
    };
    UserSettings.prototype.getKey = function (key) {
        return this.data[key];
    };
    return UserSettings;
}());
exports.default = UserSettings;
