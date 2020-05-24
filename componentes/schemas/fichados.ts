var conexion = require('../conexion');

var schemaFichados = new conexion.mongoose.Schema({
    idTrabajador: Number,
    nombre: String,
    inicio: Number,
    final: Number,
    activo: Boolean,
    fichado: Boolean
});
var Fichados = conexion.mongoose.model('fichados', schemaFichados);

function insertarFichaje(data)
{
    //INDIVIDUAL INSERT
}

function getFichados()
{
    var devolver = new Promise((dev, rej)=>{
        Fichados.find().lean().then(res=>{
            dev(res);
        }).catch(err=>{
            console.log(err);
        });
    });
    return devolver;
}

exports.fichados             = Fichados;
exports.insertarFichaje      = insertarFichaje;
exports.getFichados          = getFichados;