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
function getParamsTicket()
{
    return ParametrosTicket.find({}, ((err, resultado)=>{
        if(err)
        {
            console.log(err);
        }
    })).lean();
}
exports.parametrosTicket            = ParametrosTicket;
exports.insertarParametrosTicket    = insertarParametrosTicket;
exports.getParamsTicket             = getParamsTicket;