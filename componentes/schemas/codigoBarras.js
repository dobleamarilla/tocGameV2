var conexion = require('../conexion');
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
exports.actualizarUltimoCodigoBarras = actualizarUltimoCodigoBarras;
exports.getUltimoCodigoBarras = getUltimoCodigoBarras;
//# sourceMappingURL=codigoBarras.js.map