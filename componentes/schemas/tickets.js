"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var sincroEnCurso = false;
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
        if (err) {
            console.log(err);
        }
    }).lean();
}
function getTicketsCajaActual(fechaInicioCaja) {
    return Tickets.find({ timestamp: { $gte: fechaInicioCaja } }, null, { lean: true }, (err, respuesta) => {
        if (err) {
            console.log(err);
        }
    });
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
function cleanTransit() {
    Tickets.updateMany({ enviado: false, enTransito: true }, { enTransito: false }).then(info => {
        if (info.n > 0) {
            console.log("Tickets pendientes enviados al servidor");
        }
    });
}
exports.cleanTransit = cleanTransit;
electron_1.ipcMain.on('getTicketsIntervalo', (ev, args) => {
    getTicketsIntervalo(args).then(res => {
        ev.returnValue = res;
    }).catch(err => {
        console.log(err);
    });
});
// ipcMain.on('getTicketsIntervaloSimple', (ev, args) => {
//     getTicketsIntervaloSimple(args).then(res => {
//         ev.returnValue = res;
//     }).catch(err => {
//         console.log(err);
//     });
// });
electron_1.ipcMain.on('get-info-un-ticket', (ev, data) => {
    getInfoTicket(data).then(res => {
        ev.returnValue = res;
    });
});
electron_1.ipcMain.on('set-ticket', (ev, data) => {
    insertarTicket(data);
});
electron_1.ipcMain.on('get-tickets', (ev, data) => {
    getTickets().then((arrayTickets) => {
        ev.returnValue = arrayTickets;
    });
});
electron_1.ipcMain.on('get-tickets-caja-abierta', (ev, fechaInicioCaja) => {
    getTicketsCajaActual(fechaInicioCaja).then((arrayTickets) => {
        ev.returnValue = arrayTickets;
    });
});
electron_1.ipcMain.on('getUltimoTicket', (ev, data) => {
    getUltimoTicket().then(res => {
        ev.returnValue = res;
    });
});
electron_1.ipcMain.on('sincronizar-toc', (event, args) => {
    if (!sincroEnCurso) {
        sincroEnCurso = true;
        getParaSincronizar().then(res => {
            sincroEnCurso = false;
            event.sender.send('res-sincronizar-toc', res);
        }).catch(err => {
            console.log("Error en main, getParaSincronizar", err);
        });
    }
});
electron_1.ipcMain.on('confirmar-envio', (event, args) => {
    confirmarEnvio(args);
});
//# sourceMappingURL=tickets.js.map