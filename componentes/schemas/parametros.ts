var conexion = require('../conexion');

var params = new conexion.mongoose.Schema({
    licencia: Number,
    codigoTienda: Number,
    database: String,
    nombreEmpresa: String,
    nombreTienda: String,
    tipoImpresora: String
});
var Parametros = conexion.mongoose.model('Parametros', params);

function nuevaPersona(name)
{
    let persona1 = new Parametros({nombre: name});
    persona1.save();
}

exports.parametros = Parametros;