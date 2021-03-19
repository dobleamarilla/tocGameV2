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
function resetContador() {
    return CodigoBarras.updateOne({ _id: "CUENTA" }, { ultimo: 0 }, { upsert: true }, ((err, queHeHecho) => {
        //console.log(err, queHeHecho)
    }));
}
exports.actualizarUltimoCodigoBarras = actualizarUltimoCodigoBarras;
exports.getUltimoCodigoBarras = getUltimoCodigoBarras;
exports.resetContador = resetContador;
//# sourceMappingURL=codigoBarras.js.map