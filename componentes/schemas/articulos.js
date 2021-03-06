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
function insertarArticulos(data) {
    var devolver = new Promise((dev, rej) => {
        Articulos.insertMany(data).then(() => {
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
function buscarArticulo(busqueda) {
    return Articulos.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, 'i') } }] }, null, { lean: true, limit: 20 });
}
function getInfoArticulo(idArticulo) {
    return Articulos.findById(idArticulo).lean();
}
function getNombreArticulo(id) {
    var devolver = new Promise((dev, rej) => {
        Articulos.findById(id).lean().then(info => {
            dev(info.nombre);
        });
    });
    return devolver;
}
function getPrecio(id) {
    return Articulos.findById(id).lean();
}
function getPrecios() {
    return Articulos.find({}, { _id: 0, nombre: 1, precioConIva: 1 }).lean();
}
function borrarArticulos() {
    return Articulos.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.articulos = Articulos;
exports.insertarArticulos = insertarArticulos;
exports.buscarArticulo = buscarArticulo;
exports.getInfoArticulo = getInfoArticulo;
exports.getNombreArticulo = getNombreArticulo;
exports.getPrecio = getPrecio;
exports.getPrecios = getPrecios;
exports.borrarArticulos = borrarArticulos;
//# sourceMappingURL=articulos.js.map