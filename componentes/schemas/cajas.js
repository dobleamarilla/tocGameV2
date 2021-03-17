"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaCajas = new conexion.mongoose.Schema({
    _id: String,
    inicioTime: Number,
    totalApertura: Number,
    detalleApertura: [{
            _id: String,
            valor: Number,
            unidades: Number
        }]
});
var Cajas = conexion.mongoose.model('cajas', schemaCajas);
function getInfoCaja() {
    return Cajas.findById("CAJA", function (err, kes) {
        if (err) {
            console.log(err, kes);
        }
    }).lean();
}
function setInfoCaja(data) {
    return Cajas.replaceOne({ _id: "CAJA" }, data, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
electron_1.ipcMain.on('getInfoCaja', (ev, args) => {
    getInfoCaja().then(res => {
        ev.returnValue = res;
    }).catch(err => {
        console.log(err);
    });
});
electron_1.ipcMain.on('actualizar-info-caja', (ev, data) => {
    setInfoCaja(data);
});
//# sourceMappingURL=cajas.js.map