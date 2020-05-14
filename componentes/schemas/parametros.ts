var conexion = require('../conexion');

var params = new conexion.mongoose.Schema({
    licencia: Number,
    codigoTienda: Number,
    database: String,
    nombreEmpresa: String,
    nombreTienda: String,
    tipoImpresora: String,
    tipoDatafono: String,
    ultimoTicket: Number
});
var Parametros = conexion.mongoose.model('Parametros', params);

function insertParams(data)
{
    let aux = new Parametros(data);
    aux.save();
}

exports.parametros             = Parametros;
exports.insertarParametros     = insertParams;