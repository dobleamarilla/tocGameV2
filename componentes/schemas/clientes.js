"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaClientes = new conexion.mongoose.Schema({
    id: String,
    nombre: String,
    tarjetaCliente: String
});
var Clientes = conexion.mongoose.model('clientes', schemaClientes);
function insertarClientes(data) {
    var devolver = new Promise((dev, rej) => {
        Clientes.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarClientes = insertarClientes;
function buscarCliente(busqueda) {
    return Clientes.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, 'i') } }, { "tarjetaCliente": busqueda }] }, null, { lean: true, limit: 20 });
}
function comprobarClienteIdentico(nombre) {
    return Clientes.find({ nombre: nombre }, null, { lean: true, limit: 1 });
}
function comprobarClienteIdenticoTarjeta(nombre) {
    return Clientes.find({ nombre: nombre }, null, { lean: true, limit: 1 });
}
function borrarTodo() {
    return Clientes.deleteMany({}, err => {
        if (err) {
            console.log(err);
        }
    });
}
function cargarNuevosClientes(clientes) {
    var devolver = new Promise((dev, rej) => {
        borrarTodo().then(function () {
            insertarClientes(clientes).then(() => {
                dev(true);
            });
        });
    });
    return devolver;
}
function crearNuevo(datos) {
    var nuevo = new Clientes({ id: 'CliBotiga_' + datos.tienda + Date.now(), nombre: datos.nombre, tarjetaCliente: datos.idTarjeta });
    nuevo.save();
}
electron_1.ipcMain.on('buscar-clientes', (ev, data) => {
    buscarCliente(data).then(respuesta => {
        ev.sender.send('res-buscar-cliente', respuesta);
    });
});
electron_1.ipcMain.on('buscar-nombre-cliente-identico', (ev, data) => {
    comprobarClienteIdentico(data).then(respuesta => {
        if (respuesta.length > 0) {
            ev.returnValue = false;
        }
        else {
            ev.returnValue = true;
        }
    });
});
electron_1.ipcMain.on('buscar-tarjeta-cliente-identico', (ev, data) => {
    comprobarClienteIdenticoTarjeta(data).then(respuesta => {
        if (respuesta.length > 0) {
            ev.returnValue = false;
        }
        else {
            ev.returnValue = true;
        }
    });
});
electron_1.ipcMain.on('cliente-nuevo-crear-confirmado', (ev, data) => {
    crearNuevo(data);
});
electron_1.ipcMain.on('insertar-nuevos-clientes', (event, data) => {
    insertarClientes(data).then(info => {
        event.sender.send('nuevo-toast', { tipo: 'success', mensaje: 'Clientes cargados correctamente' });
    });
});
//# sourceMappingURL=clientes.js.map