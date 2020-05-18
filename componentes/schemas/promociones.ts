var conexion = require('../conexion');

var schemaPromociones = new conexion.mongoose.Schema({
    _id: String,
    fechaInicio: String,
    fechaFinal: String,
    principal: String,
    cantidadPrincipal: Number,
    secundario: String,
    cantidadSecundario: Number,
    precioFinal: Number
});
var Promociones = conexion.mongoose.model('promociones', schemaPromociones);

function insertarPromociones(data)
{
    var devolver = new Promise((dev, rej)=>{
        Promociones.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}

function getPromociones()
{
    return Promociones.find().lean();
}

exports.promociones             = Promociones;
exports.insertarPromociones     = insertarPromociones;
exports.getPromociones          = getPromociones;