var conexion = require('../conexion');
var params = new conexion.mongoose.Schema({
    _id: String,
    licencia: Number,
    codigoTienda: Number,
    database: String,
    nombreEmpresa: String,
    nombreTienda: String,
    tipoImpresora: String,
    impresoraCafeteria: String,
    tipoDatafono: String,
    ultimoTicket: Number,
    clearOneCliente: Number,
    clearOneTienda: Number,
    clearOneTpv: Number
});
var Parametros = conexion.mongoose.model('Parametros', params);
function insertParams(data) {
    return Parametros.replaceOne({ _id: "PARAMETROS" }, data, { upsert: true }, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
function setUltimoTicket(ultimoTicket) {
    Parametros.update({ _id: "PARAMETROS" }, { ultimoTicket: ultimoTicket });
}
function getParams() {
    return Parametros.findById('PARAMETROS', (err, parametros) => {
        if (err != null) {
            console.log(err);
        }
    }).lean();
}
function setParams(info) {
    return Parametros.update({ _id: "PARAMETROS" }, {
        tipoImpresora: info.impresora,
        impresoraCafeteria: info.impresoraCafeteria,
        tipoDatafono: info.datafono,
        clearOneCliente: info.clearOneCliente,
        clearOneTienda: info.clearOneTienda,
        clearOneTpv: info.clearOneTpv
    });
}
exports.parametros = Parametros;
exports.insertarParametros = insertParams;
exports.setUltimoTicket = setUltimoTicket;
exports.getParams = getParams;
exports.setParams = setParams;
//# sourceMappingURL=parametros.js.map