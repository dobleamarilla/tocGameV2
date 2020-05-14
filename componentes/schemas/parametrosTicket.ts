var conexion = require('../conexion');

var schemaParametrosTicket = new conexion.mongoose.Schema({
    nombreDato: String,
    valorDato: String
});
var ParametrosTicket = conexion.mongoose.model('parametros-ticket', schemaParametrosTicket);

function insertarParametrosTicket(data)
{
    var devolver = new Promise((dev, rej)=>{
        ParametrosTicket.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}

exports.parametrosTicket            = ParametrosTicket;
exports.insertarParametrosTicket    = insertarParametrosTicket;