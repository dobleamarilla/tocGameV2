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
    return Trabajadores.insertMany(data, function (error, docs) 
    {
        if(error)
        {
            console.log(error);
        }
    });
}
function buscarTrabajador(busqueda: string) 
{
    return Trabajadores.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, "i") } }, { "nombreCorto": { '$regex': new RegExp(busqueda, "i") } }] }).lean();
}

function ficharTrabajador(idTrabajador: number) 
{
    return Trabajadores.findByIdAndUpdate(idTrabajador, { fichado: true }, (err, result) => 
    {
        if (err) 
        {
            console.log(err);
        }
    });
}
function desficharTrabajador(idTrabajador: number) 
{
    return Trabajadores.findByIdAndUpdate(idTrabajador, { fichado: false }, (err, result) => 
    {
        if (err) 
        {
            console.log(err);
        }
    });
}
function buscarFichados()
{
    return Trabajadores.find({fichado: true}).lean();
}
exports.trabajadores = Trabajadores;
exports.insertarTrabajadores = insertarTrabajadores;
exports.buscarTrabajador = buscarTrabajador;
exports.ficharTrabajador = ficharTrabajador;
exports.desficharTrabajador = desficharTrabajador;
exports.buscarFichados  = buscarFichados;