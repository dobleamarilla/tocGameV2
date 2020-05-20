var conexion = require('../conexion');

var schemaTickets = new conexion.mongoose.Schema({
    _id: Number,
    timestamp: Date,
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

function insertarTicket(unTicket)
{
    console.log("el ijuepute: ", unTicket);
    var aux = new Tickets(unTicket);
    aux.save((err)=>{
        console.log(err);
    });

}
function getInfoTicket(idTicket: number)
{
    return Tickets.findById(idTicket).lean();
}
function getTickets()
{
    return Tickets.find({}).lean();
}
exports.tickets               = Tickets;
exports.insertarTicket        = insertarTicket;
exports.getInfoTicket         = getInfoTicket;
exports.getTickets            = getTickets;