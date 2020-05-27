var conexion = require('../conexion');
var schemaTickets = new conexion.mongoose.Schema({
    _id: Number,
    timestamp: Number,
    total: Number,
    lista: [{
            idArticulo: Number,
            nombre: String,
            promocion: {
                _id: {
                    type: String,
                    default: ''
                },
                esPromo: Boolean
            },
            subtotal: Number,
            unidades: Number
        }],
    tarjeta: Boolean,
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
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    }
});
var Tickets = conexion.mongoose.model('tickets', schemaTickets);
function insertarTicket(unTicket) {
    console.log("el ijuepute: ", unTicket);
    var aux = new Tickets(unTicket);
    aux.save((err) => {
        console.log(err);
    });
}
function getInfoTicket(idTicket) {
    return Tickets.findById(idTicket).lean();
}
function getTickets() {
    return Tickets.find({}).sort({ _id: -1 }).lean();
}
function getTicketsIntervalo(unaCaja) {
    return Tickets.find({ timestamp: { $lte: unaCaja.finalTime, $gte: unaCaja.inicioTime } }, (err, respuesta) => {
        console.log(err);
        console.log("Lo que me ha encontrado del invervalo es: ", respuesta);
    }).lean();
}
function getUltimoTicket() {
    return Tickets.find({}, null, { lean: true }).sort({ _id: -1 }).limit(1);
}
function getParaSincronizar() {
    let aux = Tickets.find({ enviado: false, enTransito: false }, null, { lean: true }).sort({ _id: 1 });
    Tickets.update({ enviado: false, enTransito: false }, { enTransito: true });
    return aux;
}
function confirmarEnvio(data) {
    Tickets.update({ _id: data.idTicket }, { enTransito: false, enviado: true }, ((err, queHeHecho) => {
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