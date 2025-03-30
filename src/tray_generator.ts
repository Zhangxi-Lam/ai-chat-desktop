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
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Gemini',
                type: 'radio',
                checked: settings.getKey(CHOICE) === GEMINI,
                click: () => {
                    console.log('Gemini selected');
                    settings.setKey(CHOICE, GEMINI);
                },
            },
            {
                label: 'Deepseek',
                type: 'radio',
                checked: settings.getKey(CHOICE) === DEEPSEEK,
                click: () => {
                    console.log('Deepseek selected');
                    settings.setKey(CHOICE, DEEPSEEK);
                }
            },
        ]);
        this.tray.setContextMenu(contextMenu);
    }
}

export default TrayGenerator;