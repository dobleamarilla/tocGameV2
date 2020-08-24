var conexion = require('../conexion');
var schemaSincroFichajes = new conexion.mongoose.Schema({
    _id: Number,
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
    tipo: String,
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
    var aux = new SincroFichajes(data);
    aux.save();
}
function getFichajes() {
    //return SincroFichajes.find({enviado: false, enTransito: false}, null, {lean: true});
    return SincroFichajes.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
function confirmarEnvioFichajes(data) {
    SincroFichajes.updateOne({ _id: data }, { enviado: true, enTransito: false }, ((err, queHeHecho) => {
        //console.log(err, queHeHecho)
    }));
}
function testeoGuapo() {
    return SincroFichajes.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
function cleanFichajes() {
    SincroFichajes.updateMany({ enviado: false, enTransito: true }, { enTransito: false });
}
exports.SincroFichajes = SincroFichajes;
exports.nuevoItem = nuevoItem;
exports.getFichajes = getFichajes;
exports.confirmarEnvioFichajes = confirmarEnvioFichajes;
exports.cleanFichajes = cleanFichajes;
//# sourceMappingURL=sincroFichajes.js.map