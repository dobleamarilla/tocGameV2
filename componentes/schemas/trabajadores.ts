var conexion = require('../conexion');

var schemaTrabajadores = new conexion.mongoose.Schema({
    _id: Number,
    idTrabajador: Number,
    nombre: String,
    nombreCorto: String,
    fichado: {
        type: Boolean,
        default: false
    }
});
var Trabajadores = conexion.mongoose.model('trabajadores', schemaTrabajadores);

function insertarTrabajadores(data)
{
    var devolver = new Promise((dev, rej)=>{
        Trabajadores.insertMany(data).then((error, docs)=>{
            console.log(error);
            dev(true);
        });
    });
    return devolver;
}
function buscarTrabajador(busqueda: string)
{
    return Trabajadores.find({$or:[{"nombre": {'$regex': new RegExp(busqueda, "i")}}, {"nombreCorto": {'$regex': new RegExp(busqueda, "i")}}]}).lean();
}

exports.trabajadores             = Trabajadores;
exports.insertarTrabajadores     = insertarTrabajadores;
exports.buscarTrabajador         = buscarTrabajador;