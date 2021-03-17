"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaMovimientos = new conexion.mongoose.Schema({
    _id: Number,
    tipo: String,
    valor: Number,
    concepto: String,
    idTrabajador: Number,
    codigoBarras: String,
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    },
    tipoExtra: String,
    idTicket: Number
});
var Movimientos = conexion.mongoose.model('movimientos', schemaMovimientos);
function insertarMovimiento(data) {
    var nuevo = new Movimientos(data);
    nuevo.save();
}
function getMovimientosRango(fechaInicio, fechaFinal) {
    return Movimientos.find({ _id: { $lte: fechaFinal, $gte: fechaInicio } }).lean();
}
function getParaSincronizarMovimientos() {
    return Movimientos.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
function confirmarMovimiento(id) {
    Movimientos.updateOne({ _id: id }, { enviado: true, enTransito: false }, ((err, queHeHecho) => {
        //console.log(err, queHeHecho)
    }));
}
function cleanMovimientos() {
    Movimientos.updateMany({ enviado: false, enTransito: true }, { enTransito: false }).then(info => {
        if (info.n > 0) {
            console.log("Movimientos pendientes enviados al servidor");
        }
    });
}
exports.cleanMovimientos = cleanMovimientos;
electron_1.ipcMain.on('nuevo-movimiento', (ev, args) => {
    insertarMovimiento(args);
});
electron_1.ipcMain.on('get-rango-movimientos', (ev, args) => {
    getMovimientosRango(args.fechaInicio, args.fechaFinal).then(res => {
        ev.returnValue = res;
    }).catch(err => {
        console.log(err);
    });
});
electron_1.ipcMain.on('movimiento-confirmado', (ev, data) => {
    confirmarMovimiento(data.idMovimiento);
});
electron_1.ipcMain.on('sincronizar-movimientos', (ev, data) => {
    getParaSincronizarMovimientos().then(res => {
        ev.sender.send('res-sincronizar-movimientos', res);
    });
});
//# sourceMappingURL=movimientos.js.map