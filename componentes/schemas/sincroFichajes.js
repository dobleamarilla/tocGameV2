"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaSincroFichajes = new conexion.mongoose.Schema({
    _id: Number,
    infoFichaje: {
        idTrabajador: Number,
        fecha: {
            year: Number,
            month: Number,
            day: Number,
            hours: Number,
            minutes: Number,
            seconds: Number
        }
    },
    tipo: String,
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    }
});
var SincroFichajes = conexion.mongoose.model('sincro-fichajes', schemaSincroFichajes);
function nuevoItem(data) {
    var aux = new SincroFichajes(data);
    aux.save();
}
function getFichajes() {
    //return SincroFichajes.find({enviado: false, enTransito: false}, null, {lean: true});
    return SincroFichajes.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
function confirmarEnvioFichajes(data) {
    SincroFichajes.updateOne({ _id: data }, { enviado: true, enTransito: false }, ((err, queHeHecho) => {
        //console.log(err, queHeHecho)
    }));
}
function testeoGuapo() {
    return SincroFichajes.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
function cleanFichajes() {
    SincroFichajes.updateMany({ enviado: false, enTransito: true }, { enTransito: false }).then(info => {
        if (info.n > 0) {
            console.log("SincroFichajes pendientes enviados al servidor");
        }
    });
}
exports.cleanFichajes = cleanFichajes;
electron_1.ipcMain.on('guardar-sincro-fichaje', (ev, data) => {
    nuevoItem(data);
});
electron_1.ipcMain.on('sincronizar-fichajes', (event, args) => {
    getFichajes().then(res => {
        event.sender.send('res-sincronizar-fichajes', res);
    }).catch(err => {
        console.log("Error en main, getFichajes", err);
    });
});
electron_1.ipcMain.on('confirmar-envio-fichaje', (event, data) => {
    confirmarEnvioFichajes(data);
});
//# sourceMappingURL=sincroFichajes.js.map