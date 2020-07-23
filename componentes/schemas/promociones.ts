var conexion = require('../conexion');

var schemaPromociones = new conexion.mongoose.Schema({
    _id: String,
    fechaInicio: String,
    fechaFinal: String,
    principal: [{
        _id: Number
    }],
    cantidadPrincipal: Number,
    secundario: [{
        _id: Number
    }],
    cantidadSecundario: Number,
    precioFinal: Number
});
var Promociones = conexion.mongoose.model('promociones', schemaPromociones);

function insertarPromociones(data)
{
    // var devolver = new Promise((dev, rej)=>{
    //     Promociones.insertMany(data).then(()=>{
    //         dev(true);
    //     });
    // });
    // return devolver;
    var devolver = new Promise((dev, rej)=>{
        Promociones.updateMany({}, data, {upsert: true}).then(()=>{
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