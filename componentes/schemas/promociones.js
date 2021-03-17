"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaPromociones = new conexion.mongoose.Schema({
    _id: String,
    fechaInicio: String,
    fechaFinal: String,
    principal: [{
            _id: Number
        }],
    cantidadPrincipal: Number,
    secundario: [{
            _id: Number
        }],
    cantidadSecundario: Number,
    precioFinal: Number
});
var Promociones = conexion.mongoose.model('promociones', schemaPromociones);
function insertarPromociones(data) {
    var devolver = new Promise((dev, rej) => {
        Promociones.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarPromociones = insertarPromociones;
function getPromociones() {
    return Promociones.find().lean();
}
function borrarPromociones() {
    return Promociones.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.borrarPromociones = borrarPromociones;
electron_1.ipcMain.on('get-promociones', (ev, data) => {
    getPromociones().then(arrayPromociones => {
        ev.returnValue = arrayPromociones;
    });
});
//# sourceMappingURL=promociones.js.map