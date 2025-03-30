import { CHOICE, GEMINI, DEEPSEEK } from "./user_settings";
import UserSettings from './user_settings';
const {Tray, Menu} = require('electron');
var path = require('path');

class TrayGenerator {
    tray: typeof Tray.prototype;

    constructor() {
        this.tray = new Tray(path.join(__dirname, 'assets', 'icon.png'));
    }

    createTray(settings: UserSettings) {
        console.log("Creating tray");
        console.log(path.join(__dirname, 'assets', 'icon.png'));
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Gemini',
                type: 'radio',
                checked: settings.getKey(CHOICE) === GEMINI,
            },
            {
                label: 'Deepseek',
                type: 'radio',
                checked: settings.getKey(CHOICE) === DEEPSEEK,
            },
        ]);
        this.tray.setContextMenu(contextMenu);
    }
}

export default TrayGenerator;