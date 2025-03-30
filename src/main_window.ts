import { BrowserWindow, nativeImage, screen } from "electron";
import UserSettings, { CHOICE, GEMINI } from "./user_settings";
const path = require("path");


const ICON_PATH = "src/assets/icon.png";
const GOOGLE_URL = "https:/gemini.google.com";
const DEEPSEEK_URL = "https://chat.deepseek.com/";

class MainWindow {
    window: BrowserWindow | undefined;
    settings: UserSettings | undefined;

    createWindow(settings: UserSettings) {
        const url = this.getURL(settings);
        const primaryDisplay = screen.getPrimaryDisplay();
        const { x, y, width, height } = primaryDisplay.bounds;
      
        const icon = nativeImage.createFromPath(ICON_PATH);
      
        this.window = new BrowserWindow({
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
    }

    reloadWindow(settings: UserSettings) {
        if (this.window && !this.window.isDestroyed()) {
            const url = this.getURL(settings);
            this.window.loadURL(url);
        } else {
            this.createWindow(settings);
        }
    }

    getURL(settings: UserSettings): string {
        return settings.getKey(CHOICE) === GEMINI ? GOOGLE_URL : DEEPSEEK_URL;
    }
}

export default MainWindow;