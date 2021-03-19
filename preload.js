"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('tocgame', {
    getParametros: () => electron_1.ipcRenderer.invoke('getParametros'),
    getInfoCaja: () => electron_1.ipcRenderer.invoke('getInfoCaja'),
    setLimpiarTransito: () => electron_1.ipcRenderer.send('limpiar-enTransito'),
    setParametros: (data) => electron_1.ipcRenderer.send('setParametros', data),
    test: (data) => electron_1.ipcRenderer.sendSync('TEST', data)
});
//# sourceMappingURL=preload.js.map