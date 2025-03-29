const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    send: (channel: any, data: any) => {
        ipcRenderer.send(channel, data);
    },
    on: (channel: any, callback: any) => {
        ipcRenderer.on(channel, (event: any, ...args: any) => {
            callback(...args);
        });
    },
});