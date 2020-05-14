var conexion = require('../conexion');

var schemaTrabajadores = new conexion.mongoose.Schema({
    idTrabajador: Number,
    nombre: String,
    nombreCorto: String
});
var Trabajadores = conexion.mongoose.model('trabajadores', schemaTrabajadores);

function insertarTrabajadores(data)
{
    Trabajadores.insertMany(data);
}

exports.trabajadores             = Trabajadores;
exports.insertarTrabajadores     = insertarTrabajadores;