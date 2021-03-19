"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const child_process_1 = require("child_process");
const is_online_1 = __importDefault(require("is-online"));
const net_1 = __importDefault(require("net"));
const tickets_1 = require("./schemas/tickets");
const sincroFichajes_1 = require("./schemas/sincroFichajes");
const devoluciones_1 = require("./schemas/devoluciones");
const movimientos_1 = require("./schemas/movimientos");
const sincroCajas_1 = require("./schemas/sincroCajas");
const articulos_1 = require("./schemas/articulos");
const familias_1 = require("./schemas/familias");
const promociones_1 = require("./schemas/promociones");
const menus_1 = require("./schemas/menus");
const teclas_1 = require("./schemas/teclas");
const trabajadores_1 = require("./schemas/trabajadores");
const clientes_1 = require("./schemas/clientes");
const parametrosTicket_1 = require("./schemas/parametrosTicket");
const ean13_lib_1 = require("ean13-lib");
electron_1.ipcMain.on("borrar-database", (ev, args) => {
    child_process_1.exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/borrarDatabase.sh');
    ev.sender.send('borrar-database');
});
electron_1.ipcMain.on('check-internet', (ev, data) => __awaiter(this, void 0, void 0, function* () {
    try {
        ev.sender.send('res-check-internet', yield is_online_1.default());
    }
    catch (error) {
        console.log("Error en check-internet");
    }
}));
electron_1.ipcMain.on('ventaDatafono', (event, info) => {
    var client = new net_1.default.Socket();
    client.connect(8890, '127.0.0.1', function () {
        var ventaCliente = info.clearOneCliente;
        var nombreDependienta = info.nombreDependienta;
        var numeroTicket = info.idTicket;
        var tienda = info.clearOneTienda;
        var tpv = info.clearOneTpv;
        var tipoOperacion = 1; //1=> VENTA
        var importe = info.total; //EN CENTIMOS DE EURO
        var venta_t = `\x02${ventaCliente};${tienda};${tpv};ezequiel;${numeroTicket};${tipoOperacion};${importe};;;;;;;\x03`;
        console.log('cliente: ', ventaCliente, ' tienda: ', tienda, ' tpv: ', tpv, ' tipoOperacion: ', tipoOperacion, ' numeroTicket: ', numeroTicket, ' nombreDependienta: ', nombreDependienta, ' importe: ', importe);
        client.write(venta_t);
    });
    client.on('error', function (err) {
        console.log(err);
        event.sender.send('pregunta-cambio-datafono');
        event.sender.send('nuevo-toast', { tipo: 'error', mensaje: 'Datáfono no configurado' });
    });
    client.on('data', function (data) {
        var objEnviar = {
            data: data,
            objTicket: info.objTicket
        };
        console.log('Recibido: ' + data);
        event.sender.send('resVentaDatafono', objEnviar);
        client.write('\x02ACK\x03');
        client.destroy();
    });
    client.on('close', function () {
        console.log('Conexión cerrada');
        client.destroy();
    });
});
electron_1.ipcMain.on('getEntorno', (ev, args) => {
    if (process.argv[2] == 'test') {
        ev.returnValue = 'http://localhost:8080';
    }
    else {
        ev.returnValue = 'http://54.74.52.150:8080';
    }
});
electron_1.ipcMain.on('change-pinpad', (ev, args) => {
    ev.sender.send('pregunta-cambio-datafono');
    ev.sender.send('nuevo-toast', { tipo: 'error', mensaje: 'Datáfono no configurado' });
});
electron_1.ipcMain.on('get-version', (ev, args) => {
    ev.returnValue = '2.x'; //pjson.version;
});
electron_1.ipcMain.on('limpiar-enTransito', (event, data) => {
    tickets_1.cleanTransit();
    sincroFichajes_1.cleanFichajes();
    devoluciones_1.cleanDevoluciones();
    movimientos_1.cleanMovimientos();
    sincroCajas_1.cleanCajas();
});
electron_1.ipcMain.on('actualizar-teclado', (ev, data) => __awaiter(this, void 0, void 0, function* () {
    yield articulos_1.borrarArticulos();
    yield articulos_1.insertarArticulos(data.articulos);
    yield familias_1.borrarFamilias();
    yield familias_1.insertarFamilias(data.familias);
    yield promociones_1.borrarPromociones();
    yield promociones_1.insertarPromociones(data.promociones);
    yield menus_1.borrarMenus();
    yield menus_1.insertarMenus(data.menus);
    yield teclas_1.borrarTeclas();
    yield teclas_1.insertarTeclasMain(data.teclas);
    ev.sender.send('res-cargar-teclado', true);
}));
electron_1.ipcMain.on('cargar-todo', (ev, data) => __awaiter(this, void 0, void 0, function* () {
    yield trabajadores_1.insertarTrabajadores(data.dependentes);
    yield articulos_1.insertarArticulos(data.articulos);
    yield clientes_1.insertarClientes(data.clientes);
    yield familias_1.insertarFamilias(data.familias);
    yield promociones_1.insertarPromociones(data.promociones);
    yield parametrosTicket_1.insertarParametrosTicket(data.parametrosTicket);
    yield menus_1.insertarMenus(data.menus);
    yield teclas_1.insertarTeclasMain(data.teclas);
    ev.sender.send('res-cargar-todo', true);
}));
electron_1.ipcMain.on("calcular-ean13", (event, data) => {
    event.returnValue = ean13_lib_1.Ean13Utils.generate(data);
});
electron_1.ipcMain.on("TEST", (event, data) => {
    event.returnValue = "osoooooo";
});
electron_1.ipcMain.on("dialogo", (event, data) => {
    electron_1.dialog.showMessageBox({
        buttons: ["&SÍ", "&NO"],
        message: "Cambiar a datáfono 3G (manual)?"
    });
});
//# sourceMappingURL=general.js.map