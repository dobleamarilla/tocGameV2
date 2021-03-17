"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaTeclas = new conexion.mongoose.Schema({
    nomMenu: String,
    idArticle: Number,
    nombreArticulo: String,
    pos: Number,
    color: Number,
    esSumable: Boolean
});
var Teclas = conexion.mongoose.model('teclas', schemaTeclas);
function insertarTeclasMain(data) {
    return Teclas.insertMany(data);
}
exports.insertarTeclasMain = insertarTeclasMain;
function getTecladoMain(nombreMenu) {
    return Teclas.find({ nomMenu: nombreMenu }).lean();
}
function borrarTeclas() {
    return Teclas.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.borrarTeclas = borrarTeclas;
electron_1.ipcMain.on('get-teclas', (ev, data) => {
    getTecladoMain(data).then(respuesta => {
        ev.sender.send('res-get-teclas', respuesta);
    });
});
//# sourceMappingURL=teclas.js.map