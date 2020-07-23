var conexion = require('../conexion');

var schemaArticulos = new conexion.mongoose.Schema({
    _id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    esSumable: Boolean,
    familia: String
});
var Articulos = conexion.mongoose.model('articulos', schemaArticulos);

function insertarArticulos(data)
{
    var devolver = new Promise((dev, rej)=>{
        Articulos.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
    // var devolver = new Promise((dev, rej)=>{
    //     Articulos.updateMany({}, data, {upsert: true}).then(()=>{
    //         dev(true);
    //     });
    // });
    // return devolver;
}
function getInfoArticulo(idArticulo: number)
{
    return Articulos.findById(idArticulo).lean();
}
function getNombreArticulo(id)
{
    var devolver = new Promise((dev, rej)=>{
        Articulos.findById(id).lean().then(info=>{
            dev(info.nombre)
        });
    })
    return devolver;
}

function getPrecio(id)
{
    return Articulos.findById(id).lean();
}

exports.articulos               = Articulos;
exports.insertarArticulos       = insertarArticulos;
exports.getInfoArticulo         = getInfoArticulo;
exports.getNombreArticulo       = getNombreArticulo;
exports.getPrecio               = getPrecio;