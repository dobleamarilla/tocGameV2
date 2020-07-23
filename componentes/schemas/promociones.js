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
function insertarPromociones(data) {
    var devolver = new Promise((dev, rej) => {
        Promociones.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
function getPromociones() {
    return Promociones.find().lean();
}
function borrarPromociones() {
    return Promociones.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.promociones = Promociones;
exports.insertarPromociones = insertarPromociones;
exports.getPromociones = getPromociones;
exports.borrarPromociones = borrarPromociones;
//# sourceMappingURL=promociones.js.map