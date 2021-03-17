import {atajosTeclado, actualizarTocSanPedro} from './componentes/teclasAtajos';
import path from 'path';

// var pjson = require('./package.json');

const iconPath  = path.join(__dirname, "web", "assets", "imagenes", "favicon.png");

require('source-map-support').install();
import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


app.on('ready', () => {
    var ventanaPrincipal = new BrowserWindow(
        {
            kiosk: true, //cambiar a true
            frame: false, //cambiar a false
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                enableRemoteModule: true,
                contextIsolation: false
            },
            icon: iconPath
        });
    ventanaPrincipal.loadFile('./web/index.html');

    atajosTeclado(globalShortcut, ventanaPrincipal);

    
    /* ACCIONES IPC-MAIN */
    ipcMain.on('update-toc-cerbero', (ev, infoMonedas) => {
        actualizarTocSanPedro();
    });
    ipcMain.on('cerrarToc', (event: any, args: any) => {
        ventanaPrincipal.close();
    });
    ipcMain.on('refreshToc', (event: any, args: any) => {
        ventanaPrincipal.reload();
    });
});