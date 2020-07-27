var conexion = require('../conexion');

var schemaSincro = new conexion.mongoose.Schema({
    _id: Number,
    inicioTime: Number,
    finalTime: Number,
    idDependienta: Number,
    totalApertura: Number,
    totalCierre: Number,
    descuadre: Number,
    recaudado: Number,
    nClientes: Number,
    primerTicket: Number,
    infoExtra: {
        cambioInicial: Number,
        cambioFinal: Number,
        totalSalidas: Number,
        totalEntradas: Number,
        totalEnEfectivo: Number,
        totalTarjeta: Number,
        totalDeuda: Number
    },
    ultimoTicket: Number,
    calaixFetZ: Number,
    detalleApertura: [{
        _id: String,
        valor: Number,
        unidades: Number
    }],
    detalleCierre: [{
        _id: String,
        valor: Number,
        unidades: Number
    }],
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    }
});
var SincroCajas = conexion.mongoose.model('sincro-cajas', schemaSincro);

function nuevoItemSincroCajas(data): void
{
    data._id = Date.now();
    var aux = new SincroCajas(data);
    aux.save();
}

function getCaja()
{
    return SincroCajas.findOneAndUpdate({enviado: false, enTransito: false}, {enTransito: true}, {lean: true, sort: {_id: 1}});
}
function confirmarEnvioCaja(data)
{
    SincroCajas.updateOne({_id: data}, {enviado: true, enTransito: false}, ((err, queHeHecho)=>{
       if(err)
       {
            console.log(queHeHecho);
       }
    }));
}

exports.nuevoItemSincroCajas        = nuevoItemSincroCajas;
exports.getCaja                     = getCaja;
exports.confirmarEnvioCaja          = confirmarEnvioCaja;