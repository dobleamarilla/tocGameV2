var conexion = require('../conexion');

var params = new conexion.mongoose.Schema({
    _id: String,
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
    return Parametros.replaceOne({ _id: "PARAMETROS" }, data, {upsert: true}, (err, result)=>{
        if(err) 
        {
            console.log(err);
        }
    });
}

function setUltimoTicket(ultimoTicket)
{
    Parametros.update({}, {ultimoTicket: ultimoTicket});
}

function getParams()
{
    return Parametros.findById('PARAMETROS', (err, parametros)=>{
        if(err != null)
        {
            console.log(err);
        }
    }).lean();
}

exports.parametros              = Parametros;
exports.insertarParametros      = insertParams;
exports.setUltimoTicket         = setUltimoTicket;
exports.getParams               = getParams;