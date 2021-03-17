"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaArticulosTarifaEspecial = new conexion.mongoose.Schema({
    _id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    esSumable: Boolean,
    familia: String
});
var ArticulosTarifaEspecial = conexion.mongoose.model('ArticulosTarifaEspecial', schemaArticulosTarifaEspecial);
function insertarArticulosTarifaEspecial(data) {
    var devolver = new Promise((dev, rej) => {
        ArticulosTarifaEspecial.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
function buscarArticuloTarifaEspecial(busqueda) {
    return ArticulosTarifaEspecial.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, 'i') } }] }, null, { lean: true, limit: 20 });
}
function getInfoArticuloTarifaEspecial(idArticulo) {
    return ArticulosTarifaEspecial.findById(idArticulo).lean();
}
function getNombreArticuloTarifaEspecial(id) {
    var devolver = new Promise((dev, rej) => {
        ArticulosTarifaEspecial.findById(id).lean().then(info => {
            dev(info.nombre);
        });
    });
    return devolver;
}
function getPrecioTarifaEspecial(id) {
    return ArticulosTarifaEspecial.findById(id).lean();
}
function getPreciosTarifaEspecial() {
    return ArticulosTarifaEspecial.find({}, { _id: 0, nombre: 1, precioConIva: 1 }).lean();
}
function borrarArticulosTarifaEspecial() {
    return ArticulosTarifaEspecial.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
electron_1.ipcMain.on('insertar-tarifa-especial', (ev, data) => __awaiter(this, void 0, void 0, function* () {
    yield borrarArticulosTarifaEspecial();
    yield insertarArticulosTarifaEspecial(data);
    ev.sender.send('res-cargar-tarifa-especial', true);
}));
electron_1.ipcMain.on('get-info-articulo-tarifa-especial', (ev, data) => {
    getInfoArticuloTarifaEspecial(data).then(infoArticulo => {
        if (infoArticulo) {
            ev.returnValue = infoArticulo;
        }
        else {
            console.log("Algo pasa con infoArticulo: ", infoArticulo);
            ev.returnValue = false;
        }
    });
});
//# sourceMappingURL=articulosTarifaEspecial.js.map