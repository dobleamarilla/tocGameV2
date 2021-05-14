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
    },
    cantidadTkrs: Number
});
var Tickets = conexion.mongoose.model('tickets', schemaTickets);

function insertarTicket(unTicket)
{
    var aux = new Tickets(unTicket);
    aux.save((err)=>{
        if(err !== null)
        {
            console.log(err);
        }
    });

}
function getInfoTicket(idTicket: number)
{
    return Tickets.findById(idTicket).lean();
}
function getTickets()
{
    return Tickets.find({}).sort({_id: -1}).limit(100).lean();
}

function getTicketsIntervalo(unaCaja: Caja)
{
    return Tickets.find({timestamp: {$lte: unaCaja.finalTime, $gte: unaCaja.inicioTime}}, null, {sort: {_id: 1}}, (err, respuesta) => {
        if(err)
        {
            console.log(err);
        }
    }).lean();
}

function getTicketsCajaActual(fechaInicioCaja: number)
{
    return Tickets.find({timestamp: {$gte: fechaInicioCaja}}, null, {lean: true}, (err, respuesta) => {
       if(err)
       {
           console.log(err);
       }
    });
}

function getUltimoTicket()
{
    return Tickets.find({}, null, {lean: true}).sort({_id:-1}).limit(1);
}
function getDedudaDeliveroo(data)
{
    return Tickets.aggregate([{$match: {$and: [
        {cliente: "CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}"},
        {timestamp: {$gte: data.inicio}},
        {timestamp: {$lte: data.final}}
    ]}}, {$group: {_id: null, suma: {$sum: "$total"}}}]);
}
function getDedudaGlovo(data)
{
    return Tickets.aggregate([{$match: {$and: [
        {cliente: "CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}"},
        {timestamp: {$gte: data.inicio}},
        {timestamp: {$lte: data.final}}
    ]}}, {$group: {_id: null, suma: {$sum: "$total"}}}]);
}

function getTotalTicketRestaurant(data)
{
    return Tickets.aggregate([{$match: {$and: [
        {tipoPago: "TICKET_RESTAURANT"},
        {timestamp: {$gte: data.inicio}},
        {timestamp: {$lte: data.final}}
    ]}}, {$group: {_id: null, suma: {$sum: "$total"}}}]);
}

function getParaSincronizar()
{
    var devolver = new Promise((dev, rej)=>{
        Tickets.find({enviado: false, enTransito: false}, null, {lean: true, sort: {_id: 1}}).then(resultado=>{
            Tickets.updateMany({enviado: false, enTransito: false}, {enTransito: true}).then(()=>{
                dev(resultado);
            });
        });
    });
    return devolver;
}

function confirmarEnvio(data)
{
    Tickets.updateOne({_id: data.idTicket}, {enviado: true, enTransito: false}, ((err, queHeHecho)=>{
        //console.log(err, queHeHecho)
    }));
}
function cleanTransit()
{
    Tickets.updateMany({enviado: false, enTransito: true}, {enTransito: false}).then(info=>{
        if(info.n > 0)
        {
            console.log("Tickets pendientes enviados al servidor");
        }
    });
}

exports.tickets               = Tickets;
exports.insertarTicket        = insertarTicket;
exports.getInfoTicket         = getInfoTicket;
exports.getTickets            = getTickets;
exports.getTicketsIntervalo   = getTicketsIntervalo;
exports.getUltimoTicket       = getUltimoTicket;
exports.getParaSincronizar    = getParaSincronizar;
exports.confirmarEnvio        = confirmarEnvio;
exports.cleanTransit          = cleanTransit;
exports.getTicketsCajaActual  = getTicketsCajaActual;
exports.getDedudaDeliveroo    = getDedudaDeliveroo;
exports.getDedudaGlovo        = getDedudaGlovo;
exports.getTotalTicketRestaurant        = getTotalTicketRestaurant;