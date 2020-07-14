var conexion = require('../conexion');
var schemaCestas = new conexion.mongoose.Schema({
    _id: Number,
    tiposIva: {
        base1: Number,
        base2: Number,
        base3: Number,
        valorIva1: Number,
        valorIva2: Number,
        valorIva3: Number,
        importe1: Number,
        importe2: Number,
        importe3: Number
    },
    lista: [{
            _id: Number,
            nombre: String,
            promocion: {
                _id: {
                    type: String,
                    default: ''
                },
                esPromo: Boolean,
                infoPromo: {
                    idPrincipal: Number,
                    cantidadPrincipal: Number,
                    idSecundario: Number,
                    cantidadSecundario: Number,
                    precioRealPrincipal: Number,
                    precioRealSecundario: Number,
                    unidadesOferta: Number
                }
            },
            subtotal: Number,
            unidades: Number
        }]
});
var Cestas = conexion.mongoose.model('cestas', schemaCestas);
function setCesta(cesta) {
    if (cesta.lista.length > 0) {
        Cestas.replaceOne({ _id: cesta._id }, cesta, { upsert: true }, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
    }
}
function getUnaCesta() {
    return Cestas.findOne({}, null, { lean: true });
}
function getCestaConcreta(idCesta) {
    return Cestas.findById(idCesta, (err, lal) => {
        if (err) {
            console.log(err, lal);
        }
    }).lean();
}
function borrarCesta(id) {
    Cestas.deleteMany({ _id: id }, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
function getAllCestas() {
    return Cestas.find({}, null, { lean: true });
}
exports.cestas = Cestas;
exports.setCesta = setCesta;
exports.getUnaCesta = getUnaCesta;
exports.borrarCesta = borrarCesta;
exports.getAllCestas = getAllCestas;
//# sourceMappingURL=cestas.js.map