var conexion = require('../conexion');
import {ipcMain} from 'electron';

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
    },
    totalDatafono3G: Number,
    totalClearOne: Number
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
export function cleanCajas()
{
    SincroCajas.updateMany({enviado: false, enTransito: true}, {enTransito: false}).then(info=>{
        if(info.n > 0)
        {
            console.log("Cajas pendientes enviados al servidor");
        }
    });
}

ipcMain.on('guardarCajaSincro', (ev, data) => {
    nuevoItemSincroCajas(data);
});

ipcMain.on('sincronizar-caja', (ev, data) => {
    getCaja().then(respuesta => {
        ev.sender.send('res-sincronizar-caja', respuesta);
    });
});

ipcMain.on('confirmar-envio-caja', (ev, data)=>{
    confirmarEnvioCaja(data.idCaja);
});