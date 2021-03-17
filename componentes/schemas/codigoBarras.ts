var conexion = require('../conexion');
import {ipcMain} from 'electron';

var schemaCodigoBarras = new conexion.mongoose.Schema({
    _id: String,
    ultimo: Number
});
var CodigoBarras = conexion.mongoose.model('codigo-barras', schemaCodigoBarras);

function actualizarUltimoCodigoBarras()
{
    return CodigoBarras.updateOne({ _id: "CUENTA" }, {$inc: {ultimo: 1}}, {upsert: true});
}

function getUltimoCodigoBarras()
{
    return CodigoBarras.findById("CUENTA", null, {lean: true});
}

ipcMain.on('actualizar-ultimo-codigo-barras', (event: any, data: any)=>{
    actualizarUltimoCodigoBarras().then(res=>{
        event.returnValue = true;
    });
});

ipcMain.on('get-ultimo-codigo-barras', (event: any, data: any)=>{
    getUltimoCodigoBarras().then(res=>{
        if(res == null) 
        {
            event.returnValue = 0;
        }
        else
        {
            event.returnValue = res.ultimo;
        }
    });
});