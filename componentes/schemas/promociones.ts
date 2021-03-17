var conexion = require('../conexion');
import {ipcMain} from 'electron';

var schemaPromociones = new conexion.mongoose.Schema({
    _id: String,
    fechaInicio: String,
    fechaFinal: String,
    principal: [{
        _id: Number
    }],
    cantidadPrincipal: Number,
    secundario: [{
        _id: Number
    }],
    cantidadSecundario: Number,
    precioFinal: Number
});
var Promociones = conexion.mongoose.model('promociones', schemaPromociones);

export function insertarPromociones(data)
{
    var devolver = new Promise((dev, rej)=>{
        Promociones.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}

function getPromociones()
{
    return Promociones.find().lean();
}

export function borrarPromociones()
{
    return Promociones.deleteMany({}, (err)=>{
        if(err)
        {
            console.log(err);
        }
    });
}

ipcMain.on('get-promociones', (ev, data)=>{
    getPromociones().then(arrayPromociones=>{
        ev.returnValue = arrayPromociones;
    });
});