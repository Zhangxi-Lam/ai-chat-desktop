import { app } from "electron";
const fs = require("fs");
var path = require("path");

export const CHOICE = 'choice';
export const GEMINI = 'gemini';
export const DEEPSEEK = 'deepseek';

class UserSettings {
    dataPath: string;
    data: any;
    
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
        const jsonData = JSON.stringify(defaultSettings, null, 2);
        try {
            fs.writeFileSync(filePath, jsonData);
            console.log('Successfully wrote to %s', filePath);
        } catch (err) {
            console.error('Error writing file:', err);
        }
    }

    readUserSettingsJson(filePath: string) {
        const jsonData = fs.readFileSync(filePath, "utf8");
        this.data = JSON.parse(jsonData);
    }

    getKey(key: string): any {
        return this.data[key];
    }
}

export default UserSettings;
