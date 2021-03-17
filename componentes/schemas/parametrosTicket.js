"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaParametrosTicket = new conexion.mongoose.Schema({
    nombreDato: String,
    valorDato: String
});
var ParametrosTicket = conexion.mongoose.model('parametros-ticket', schemaParametrosTicket);
function insertarParametrosTicket(data) {
    var devolver = new Promise((dev, rej) => {
        ParametrosTicket.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarParametrosTicket = insertarParametrosTicket;
function getParamsTicket() {
    return ParametrosTicket.find({}, ((err, resultado) => {
        if (err) {
            console.log(err);
        }
    })).lean();
}
electron_1.ipcMain.on('get-params-ticket', (ev, data) => {
    getParamsTicket().then(res => {
        ev.returnValue = res;
    });
});
//# sourceMappingURL=parametrosTicket.js.map