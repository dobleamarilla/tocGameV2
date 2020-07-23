var conexion = require('../conexion');
var schemaMonedas = new conexion.mongoose.Schema({
    _id: String,
    infoDinero: [{
            valor: Number,
            style: String
        }]
});
var Monedas = conexion.mongoose.model('monedas', schemaMonedas);
function setMonedas(data) {
    if (data != null) {
        var auxInsert = {
            _id: "INFO_MONEDAS",
            infoDinero: data
        };
    }
    return Monedas.replaceOne({ _id: "INFO_MONEDAS" }, auxInsert, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
function getMonedas() {
    return Monedas.findById("INFO_MONEDAS", 'infoDinero -_id', { lean: true });
}
exports.setMonedas = setMonedas;
exports.getMonedas = getMonedas;
//# sourceMappingURL=infoMonedas.js.map