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
}
function getInfoArticulo(idArticulo: number)
{
    return Articulos.findById(idArticulo).lean();
}
exports.articulos               = Articulos;
exports.insertarArticulos       = insertarArticulos;
exports.getInfoArticulo         = getInfoArticulo;