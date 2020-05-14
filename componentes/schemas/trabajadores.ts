var conexion = require('../conexion');

var schemaTrabajadores = new conexion.mongoose.Schema({
    idTrabajador: Number,
    nombre: String,
    nombreCorto: String
});
var Trabajadores = conexion.mongoose.model('trabajadores', schemaTrabajadores);

function insertarTrabajadores(data)
{
    var devolver = new Promise((dev, rej)=>{
        Trabajadores.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}

exports.trabajadores             = Trabajadores;
exports.insertarTrabajadores     = insertarTrabajadores;