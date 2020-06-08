var conexion = require('../conexion');
var schemaSincroFichajes = new conexion.mongoose.Schema({
    _id: Number,
    tipo: String,
    nombreTienda: String,
    idTienda: Number,
    infoFichaje: {
        idTrabajador: Number,
        fecha: {
            year: Number,
            month: Number,
            day: Number,
            hours: Number,
            minutes: Number,
            seconds: Number
        }
    },
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    }
});
var SincroFichajes = conexion.mongoose.model('sincro-fichajes', schemaSincroFichajes);
function nuevoItem(data) {
    data._id = Date.now();
    console.log("pero q mierda es bson: ", data);
    var aux = new Sincro(data);
    aux.save();
}
function getFichajes() {
    return SincroFichajes.find({ enviado: false, enTransito: false }, null, { lean: true });
}
exports.SincroFichajes = SincroFichajes;
exports.nuevoItem = nuevoItem;
exports.getFichajes = getFichajes;
//# sourceMappingURL=sincroFichajes.js.map