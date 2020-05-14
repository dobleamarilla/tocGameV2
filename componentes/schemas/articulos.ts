var conexion = require('../conexion');

var schemaArticulos = new conexion.mongoose.Schema({
    id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    aPeso: Boolean,
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

exports.articulos             = Articulos;
exports.insertarArticulos     = insertarArticulos;