var conexion = require('../conexion');
import {ipcMain} from 'electron';

var params = new conexion.mongoose.Schema({
    _id: String,
    licencia: Number,
    codigoTienda: Number,
    database: String,
    nombreEmpresa: String,
    nombreTienda: String,
    tipoImpresora: String,
    impresoraCafeteria: String,
    tipoDatafono: String,
    ultimoTicket: Number,
    clearOneCliente: Number,
    clearOneTienda: Number,
    clearOneTpv: Number,
    botonesConPrecios: String,
    prohibirBuscarArticulos: String
});
var Parametros = conexion.mongoose.model('Parametros', params);

function insertParams(data)
{
    return Parametros.replaceOne({ _id: "PARAMETROS" }, data, {upsert: true}, (err, result)=>{
        if(err) 
        {
            console.log(err);
        }
    });
}

function setUltimoTicket(ultimoTicket)
{
    Parametros.update({ _id: "PARAMETROS" }, {ultimoTicket: ultimoTicket});
}

function getParams()
{
    return Parametros.findById('PARAMETROS', (err, parametros)=>{
        if(err != null)
        {
            console.log(err);
        }
    }).lean();
}

function setParams(info)
{
    return Parametros.update({_id: "PARAMETROS"}, {
        tipoImpresora: info.impresora, 
        impresoraCafeteria: info.impresoraCafeteria,
        tipoDatafono: info.datafono,
        clearOneCliente: info.clearOneCliente,
        clearOneTienda: info.clearOneTienda,
        clearOneTpv: info.clearOneTpv,
        botonesConPrecios: info.botonesConPrecio,
        prohibirBuscarArticulos: info.prohibirBuscarArticulos
    });
}

ipcMain.on('setParametros', (ev, data) => {
    insertParams(data);
});

ipcMain.on('set-ultimo-ticket-parametros', (ev, args) => {
    setUltimoTicket(args);
});

ipcMain.on('getParametros', (ev, args) => {
    getParams().then(res=>{
        ev.returnValue = res;
    }).catch(err=>{
        console.log(err);
    });
});

ipcMain.on('nueva-configuracion', (event: any, data: any)=>{
    setParams(data).then(function(){
        event.sender.send('res-configuracion-nueva', true);
        acciones.refresh(ventanaPrincipal);
    }).catch(err=>{
        event.sender.send('res-configuracion-nueva', false);
        console.log(err);
    });
});