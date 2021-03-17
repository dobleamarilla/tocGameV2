"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaMonedas = new conexion.mongoose.Schema({
    _id: String,
    infoDinero: [{
            valor: Number,
            style: String
        }]
});
var Monedas = conexion.mongoose.model('monedas', schemaMonedas);
function setMonedas(data) {
    if (data != null) {
        var auxInsert = {
            _id: "INFO_MONEDAS",
            infoDinero: data
        };
    }
    return Monedas.replaceOne({ _id: "INFO_MONEDAS" }, auxInsert, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
function getMonedas() {
    return Monedas.findById("INFO_MONEDAS", 'infoDinero -_id', { lean: true });
}
electron_1.ipcMain.on('set-monedas', (ev, infoMonedas) => {
    setMonedas(infoMonedas);
});
electron_1.ipcMain.on('get-monedas', (ev, infoMonedas) => {
    getMonedas().then(res => {
        ev.returnValue = res;
    });
});
//# sourceMappingURL=infoMonedas.js.map