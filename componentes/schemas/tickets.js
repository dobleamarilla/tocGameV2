var conexion = require('../conexion');
var schemaTickets = new conexion.mongoose.Schema({
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
var Tickets = conexion.mongoose.model('tickets', schemaTickets);
function insertarTicket(unTicket) {
    var aux = new Tickets(unTicket);
    aux.save((err) => {
        if (err !== null) {
            console.log(err);
        }
    });
}
function getInfoTicket(idTicket) {
    return Tickets.findById(idTicket).lean();
}
function getTickets() {
    return Tickets.find({}).sort({ _id: -1 }).limit(100).lean();
}
function getTicketsIntervalo(unaCaja) {
    return Tickets.find({ timestamp: { $lte: unaCaja.finalTime, $gte: unaCaja.inicioTime } }, null, { sort: { _id: 1 } }, (err, respuesta) => {
        console.log(err);
        console.log("Lo que me ha encontrado del invervalo es: ", respuesta);
    }).lean();
}
function getUltimoTicket() {
    return Tickets.find({}, null, { lean: true }).sort({ _id: -1 }).limit(1);
}
function getParaSincronizar() {
    var devolver = new Promise((dev, rej) => {
        Tickets.find({ enviado: false, enTransito: false }, null, { lean: true, sort: { _id: 1 } }).then(resultado => {
            Tickets.updateMany({ enviado: false, enTransito: false }, { enTransito: true }).then(() => {
                dev(resultado);
            });
        });
    });
    return devolver;
}
function confirmarEnvio(data) {
    Tickets.updateOne({ _id: data.idTicket }, { enviado: true, enTransito: false }, ((err, queHeHecho) => {
        //console.log(err, queHeHecho)
    }));
}
exports.tickets = Tickets;
exports.insertarTicket = insertarTicket;
exports.getInfoTicket = getInfoTicket;
exports.getTickets = getTickets;
exports.getTicketsIntervalo = getTicketsIntervalo;
exports.getUltimoTicket = getUltimoTicket;
exports.getParaSincronizar = getParaSincronizar;
exports.confirmarEnvio = confirmarEnvio;
//# sourceMappingURL=tickets.js.map