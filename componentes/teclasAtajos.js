"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require('child_process').exec;
var os = require('os');
function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
}
;
function atajosTeclado(globalShortcut, ventana) {
    /* REFRESH TOC */
    globalShortcut.register('F5', function () {
        ventana.reload();
    });
    /* CLOSE TOC */
    globalShortcut.register('F4', function () {
        ventana.close();
    });
    /* ACTUALIZAR TOCGAME */
    globalShortcut.register('F2', function () {
        actualizarTocSanPedro();
    });
    /* INSTALAR VPN Y SSH */
    globalShortcut.register('F7', function () {
        installVpn();
    });
}
exports.atajosTeclado = atajosTeclado;
function actualizarTocSanPedro() {
    if (os.platform() === 'win32') {
        console.log("SOY WINDOWS! DE MOMENTO NO HAGO NADA, PERO LO HE INTENTADO");
    }
    else {
        if (os.platform() === 'linux') {
            console.log("SOY LINUX");
            execute('gnome-terminal -- bash -c "~/updater/./tocGameUpdater.sh; exec bash"', (output) => {
                console.log(output);
            });
        }
    }
}
exports.actualizarTocSanPedro = actualizarTocSanPedro;
function installVpn() {
    if (os.platform() === 'win32') {
        console.log("INSTALAR VPN EN WINDOWS");
    }
    else {
        if (os.platform() === 'linux') {
            execute('gnome-terminal -- bash -c "~/tocGame/scripts/./minivpn.sh; exec bash"', (output) => {
                console.log(output);
            });
        }
    }
}
//# sourceMappingURL=teclasAtajos.js.map