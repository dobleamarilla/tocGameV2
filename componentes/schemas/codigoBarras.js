"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaCodigoBarras = new conexion.mongoose.Schema({
    _id: String,
    ultimo: Number
});
var CodigoBarras = conexion.mongoose.model('codigo-barras', schemaCodigoBarras);
function actualizarUltimoCodigoBarras() {
    return CodigoBarras.updateOne({ _id: "CUENTA" }, { $inc: { ultimo: 1 } }, { upsert: true });
}
function getUltimoCodigoBarras() {
    return CodigoBarras.findById("CUENTA", null, { lean: true });
}
electron_1.ipcMain.on('actualizar-ultimo-codigo-barras', (event, data) => {
    actualizarUltimoCodigoBarras().then(res => {
        event.returnValue = true;
    });
});
electron_1.ipcMain.on('get-ultimo-codigo-barras', (event, data) => {
    getUltimoCodigoBarras().then(res => {
        if (res == null) {
            event.returnValue = 0;
        }
        else {
            event.returnValue = res.ultimo;
        }
    });
});
//# sourceMappingURL=codigoBarras.js.map