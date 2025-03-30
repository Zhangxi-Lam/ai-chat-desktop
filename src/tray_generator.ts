import { CHOICE, GEMINI, DEEPSEEK } from "./user_settings";
import UserSettings from './user_settings';
import MainWindow from "./main_window";
const {Tray, Menu} = require('electron');
var path = require('path');

class TrayGenerator {
    tray: typeof Tray.prototype;

    createTray(settings: UserSettings, window: MainWindow) {
        this.tray = new Tray(path.join(__dirname, 'assets', 'icon.png'));
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Gemini',
                type: 'radio',
                checked: settings.getKey(CHOICE) === GEMINI,
                click: () => {
                    if (settings.getKey(CHOICE) === GEMINI) {
                        return;
                    }
                    console.log('Gemini selected');
                    settings.setKey(CHOICE, GEMINI);
                    window.reloadWindow(settings);
                },
            },
            {
                label: 'Deepseek',
                type: 'radio',
                checked: settings.getKey(CHOICE) === DEEPSEEK,
                click: () => {
                    if (settings.getKey(CHOICE) === DEEPSEEK) {
                        return;
                    }
                    console.log('Deepseek selected');
                    settings.setKey(CHOICE, DEEPSEEK);
                    window.reloadWindow(settings);
                }
            },
        ]);
        this.tray.setContextMenu(contextMenu);
    }
}

export default TrayGenerator;