"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teclasAtajos_1 = require("./componentes/teclasAtajos");
const parametros_1 = require("./componentes/schemas/parametros");
const path_1 = __importDefault(require("path"));
require('./componentes/general');
require('@electron/remote/main').initialize();
// var pjson = require('./package.json');
const iconPath = path_1.default.join(__dirname, "web", "assets", "imagenes", "favicon.png");
require('source-map-support').install();
const electron_1 = require("electron");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
electron_1.app.on('ready', () => {
    // var ventanaPrincipal = new BrowserWindow(
    //     {
    //         kiosk: true, //cambiar a true
    //         frame: false, //cambiar a false
    //         webPreferences: {
    //             nodeIntegration: true,
    //             webSecurity: false,
    //             enableRemoteModule: true,
    //             contextIsolation: false
    //         },
    //         icon: iconPath
    //     });
    var ventanaPrincipal = new electron_1.BrowserWindow({
        kiosk: true,
        frame: false,
        webPreferences: {
            preload: path_1.default.join(electron_1.app.getAppPath(), 'preload.js')
        },
        icon: iconPath
    });
    ventanaPrincipal.loadFile('./web/index.html');
    teclasAtajos_1.atajosTeclado(electron_1.globalShortcut, ventanaPrincipal);
    /* ACCIONES IPC-MAIN */
    electron_1.ipcMain.on('update-toc-cerbero', (ev, infoMonedas) => {
        teclasAtajos_1.actualizarTocSanPedro();
    });
    electron_1.ipcMain.on('cerrarToc', (event, args) => {
        ventanaPrincipal.close();
    });
    electron_1.ipcMain.on('refreshToc', (event, args) => {
        ventanaPrincipal.reload();
    });
    electron_1.ipcMain.on('nueva-configuracion', (event, data) => {
        parametros_1.setParams(data).then(function () {
            event.sender.send('res-configuracion-nueva', true);
            ventanaPrincipal.reload();
        }).catch(err => {
            event.sender.send('res-configuracion-nueva', false);
            console.log(err);
        });
    });
});
//# sourceMappingURL=main.js.map