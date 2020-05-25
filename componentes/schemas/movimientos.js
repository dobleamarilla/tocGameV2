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
    var nuevo = new Movimientos(data, { enTransito: true });
    nuevo.save();
}
function getMovimientosRango(fechaInicio, fechaFinal) {
    return Movimientos.find({ _id: { $lte: fechaFinal, $gte: fechaInicio } }).lean();
}
exports.insertarMovimiento = insertarMovimiento;
exports.getMovimientosRango = getMovimientosRango;
//# sourceMappingURL=movimientos.js.map