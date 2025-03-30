import { app } from "electron";
const fs = require("fs");
var path = require("path");

export const CHOICE = 'choice';
export const GEMINI = 'gemini';
export const DEEPSEEK = 'deepseek';

class UserSettings {
    dataPath: string;
    jsonData: any;
    
    constructor() {
        this.dataPath = path.join(app.getPath("userData"), "user_settings.json");
        if (fs.existsSync(this.dataPath)) {
            console.log("User settings file exists: %s", this.dataPath);
        } else {
            console.log("User settings file does not exist, creating it: %s", this.dataPath);
            this.createUserSettingsJson(this.dataPath);
        }
        this.readUserSettingsJson(this.dataPath);
    }

    createUserSettingsJson(filePath: string) {
        const defaultSettings = {
            [CHOICE]: DEEPSEEK,
        }
        this.writeUserSettingsJson(filePath, defaultSettings);
    }

    // Read user settings from JSON file synchronously
    readUserSettingsJson(filePath: string) {
        const jsonData = fs.readFileSync(filePath, "utf8");
        this.jsonData = JSON.parse(jsonData);
    }

    // Write user settings to JSON file synchronously
    writeUserSettingsJson(filePath: string, jsonData: any) {
        const jsonString = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(filePath, jsonString);
    }

    getKey(key: string): any {
        this.readUserSettingsJson(this.dataPath);
        return this.jsonData[key];
    }

    setKey(key: string, value: any) {
        this.jsonData[key] = value;
        this.writeUserSettingsJson(this.dataPath, this.jsonData);
    }
}

export default UserSettings;
