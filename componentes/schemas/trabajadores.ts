var conexion = require('../conexion');
import {ipcMain} from 'electron';

var schemaTrabajadores = new conexion.mongoose.Schema({
    _id: Number,
    idTrabajador: Number,
    nombre: String,
    nombreCorto: String,
    fichado: {
        type: Boolean,
        default: false
    }
});
var Trabajadores = conexion.mongoose.model('trabajadores', schemaTrabajadores);

export function insertarTrabajadores(data) 
{
    return Trabajadores.insertMany(data, {ordered: false}, function (error, docs) 
    {
        if(error)
        {
            console.log(error);
        }
    });
}
function buscarTrabajador(busqueda: string) 
{
    return Trabajadores.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, "i") } }, { "nombreCorto": { '$regex': new RegExp(busqueda, "i") } }] }, null, {lean: true, limit: 20});
}

function getTrabajadorPorId(id)
{
    return Trabajadores.findById(id).lean();
}

function ficharTrabajador(idTrabajador: number) 
{
    return Trabajadores.findByIdAndUpdate(idTrabajador, { fichado: true }, (err, result) => 
    {
        if (err) 
        {
            console.log(err);
        }
    });
}
function desficharTrabajador(idTrabajador: number) 
{
    return Trabajadores.findByIdAndUpdate(idTrabajador, { fichado: false }, (err, result) => 
    {
        if (err) 
        {
            console.log(err);
        }
    });
}
function buscarFichados()
{
    return Trabajadores.find({fichado: true}).lean();
}

ipcMain.on('insertar-trabajadores', (ev, data) => {
    insertarTrabajadores(data);
});

ipcMain.on('buscar-trabajador', (ev, data) => {
    buscarTrabajador(data).then(respuesta => {
        ev.sender.send('res-buscar-trabajador', respuesta);
    });
});

ipcMain.on('buscar-trabajador-sincrono', (ev, data) => {
    buscarTrabajador(data).then(respuesta => {
        ev.returnValue = respuesta;
    });
});

ipcMain.on('get-infotrabajador-id', (ev, data)=>{
    getTrabajadorPorId(data).then(res=>{
        ev.returnValue = res;
    });
});

ipcMain.on('fichar-trabajador', (ev, data) => {
    ficharTrabajador(data).then(() => {
        ev.sender.send('res-fichar-trabajador', '');
    });
});

ipcMain.on('desfichar-trabajador', (ev, data) => {
    desficharTrabajador(data).then(() => {
        ev.sender.send('res-desfichar-trabajador', '');
    });
});

ipcMain.on('buscar-fichados', (ev, data)=>{
    buscarFichados().then(arrayFichados=>{
        ev.sender.send('res-buscar-fichados', arrayFichados);
    })
});