var conexion = require('../conexion');
var schemaDevoluciones = new conexion.mongoose.Schema({
    _id: Number,
    timestamp: Number,
    total: Number,
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
        }],
    tipoPago: String,
    idTrabajador: Number,
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
    cliente: {
        type: String,
        default: null,
        required: false
    },
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    },
    infoClienteVip: {
        esVip: Boolean,
        nif: String,
        nombre: String,
        cp: String,
        direccion: String,
        ciudad: String
    }
});
var Devoluciones = conexion.mongoose.model('devoluciones', schemaDevoluciones);
function insertarDevolucion(devo) {
    var aux = new Devoluciones(devo);
    aux.save((err) => {
        console.log(err);
    });
}
function getDevoluciones() {
    return Devoluciones.find({}).sort({ _id: -1 }).limit(100).lean();
}
function getParaSincronizarDevo() {
    return Devoluciones.findOneAndUpdate({ enviado: false, enTransito: false }, { enTransito: true }, { lean: true, sort: { _id: 1 } });
}
function confirmarEnvioDevo(data) {
    Devoluciones.updateOne({ _id: data.idDevolucion }, { enviado: true, enTransito: false }, ((err, queHeHecho) => {
        //console.log(err, queHeHecho)
    }));
}
exports.insertarDevolucion = insertarDevolucion;
exports.getDevoluciones = getDevoluciones;
exports.getParaSincronizarDevo = getParaSincronizarDevo;
exports.confirmarEnvioDevo = confirmarEnvioDevo;
//# sourceMappingURL=devoluciones.js.map