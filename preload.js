"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('tocgame', {
    getParametros: () => electron_1.ipcRenderer.invoke('getParametros'),
    getInfoCaja: () => electron_1.ipcRenderer.invoke('getInfoCaja'),
    setLimpiarTransito: () => electron_1.ipcRenderer.send('limpiar-enTransito'),
    setParametros: (data) => electron_1.ipcRenderer.send('setParametros', data),
    getCalcularEAN13: (data) => electron_1.ipcRenderer.sendSync('calcular-ean13', data),
    setNuevoMovimiento: (data) => electron_1.ipcRenderer.send('nuevo-movimiento', data),
    setUltimoCodigoBarras: (data) => electron_1.ipcRenderer.sendSync('actualizar-ultimo-codigo-barras', data),
    setImprimirSalida: (data) => electron_1.ipcRenderer.send('imprimirSalidaDinero', data),
    setImprimirEntrada: (data) => electron_1.ipcRenderer.send('imprimirEntradaDinero', data),
    getUltimoCodigoBarras: () => electron_1.ipcRenderer.sendSync('get-ultimo-codigo-barras'),
    setSincroFichaje: (data) => electron_1.ipcRenderer.send('guardar-sincro-fichaje', data)
});
//# sourceMappingURL=preload.js.map