"use strict";
var _a = require("electron"), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
contextBridge.exposeInMainWorld("electron", {
    send: function (channel, data) {
        ipcRenderer.send(channel, data);
    },
    on: function (channel, callback) {
        ipcRenderer.on(channel, function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            callback.apply(void 0, args);
        });
    },
});
