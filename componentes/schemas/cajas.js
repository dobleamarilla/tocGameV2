var conexion = require('../conexion');
var schemaCajas = new conexion.mongoose.Schema({
    _id: String,
    inicioTime: Date,
    totalApertura: Number,
    detalleApertura: [{
            valor: {
                type: Number
            },
            unidades: {
                type: Number
            }
        }]
});
var Cajas = conexion.mongoose.model('cajas', schemaCajas);
function getInfoCaja(data) {
    return Cajas.findById("CAJA", function (err, kes) {
        if (err) {
            console.log(err, kes);
        }
    }).lean();
}
function setInfoCaja(data) {
    return Cajas.replaceOne({ _id: "CAJA" }, data, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.cajas = Cajas;
exports.setInfoCaja = setInfoCaja;
exports.getInfoCaja = getInfoCaja;
//# sourceMappingURL=cajas.js.map