var conexion = require('../conexion');
var schemaMovimientos = new conexion.mongoose.Schema({
    _id: Number,
    tipo: String,
    valor: Number,
    concepto: String,
    idTrabajador: Number,
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    }
});
var Movimientos = conexion.mongoose.model('movimientos', schemaMovimientos);
function insertarMovimiento(data) {
    console.log(data);
    var nuevo = new Movimientos(data);
    nuevo.save();
}
function getMovimientosRango(fechaInicio, fechaFinal) {
    return Movimientos.find({ _id: { $lte: fechaFinal, $gte: fechaInicio } }).lean();
}
function getParaSincronizarMovimientos() {
    return Movimientos.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
exports.insertarMovimiento = insertarMovimiento;
exports.getMovimientosRango = getMovimientosRango;
exports.getParaSincronizarMovimientos = getParaSincronizarMovimientos;
//# sourceMappingURL=movimientos.js.map