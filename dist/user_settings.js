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
        this.writeUserSettingsJson(filePath, defaultSettings);
    };
    // Read user settings from JSON file synchronously
    UserSettings.prototype.readUserSettingsJson = function (filePath) {
        var jsonData = fs.readFileSync(filePath, "utf8");
        this.jsonData = JSON.parse(jsonData);
    };
    // Write user settings to JSON file synchronously
    UserSettings.prototype.writeUserSettingsJson = function (filePath, jsonData) {
        var jsonString = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(filePath, jsonString);
    };
    UserSettings.prototype.getKey = function (key) {
        this.readUserSettingsJson(this.dataPath);
        return this.jsonData[key];
    };
    UserSettings.prototype.setKey = function (key, value) {
        this.jsonData[key] = value;
        this.writeUserSettingsJson(this.dataPath, this.jsonData);
    };
    return UserSettings;
}());
exports.default = UserSettings;
