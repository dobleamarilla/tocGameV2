var conexion = require('../conexion');
import {ipcMain} from 'electron';

var schemaArticulos = new conexion.mongoose.Schema({
    _id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    esSumable: Boolean,
    familia: String
});
var Articulos = conexion.mongoose.model('articulos', schemaArticulos);

export function insertarArticulos(data)
{
    var devolver = new Promise((dev, rej)=>{
        Articulos.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
    // var devolver = new Promise((dev, rej)=>{
    //     Articulos.updateMany({}, data, {upsert: true}).then(()=>{
    //         dev(true);
    //     });
    // });
    // return devolver;
}
function buscarArticulo(busqueda: string) {
    return Articulos.find({$or:[{"nombre": { '$regex': new RegExp(busqueda, 'i')}}]}, null, {lean: true, limit: 20});
}
function getInfoArticulo(idArticulo: number)
{
    return Articulos.findById(idArticulo).lean();
}
function getNombreArticulo(id)
{
    var devolver = new Promise((dev, rej)=>{
        Articulos.findById(id).lean().then(info=>{
            dev(info.nombre)
        });
    })
    return devolver;
}

function getPrecio(id)
{
    return Articulos.findById(id).lean();
}
function getPrecios() {
    return Articulos.find({}, {_id: 0, nombre: 1, precioConIva: 1}).lean();
}
export function borrarArticulos()
{
    return Articulos.deleteMany({}, (err)=>{
        if(err)
        {
            console.log(err);
        }
    });
}

ipcMain.on('buscar-articulo', (ev, data) => {
    buscarArticulo(data).then(respuesta => {
        ev.sender.send('res-buscar-articulo', respuesta);
    });
});

ipcMain.on('get-info-articulo', (ev, data) => {
    getInfoArticulo(data).then(infoArticulo=>{
        if(infoArticulo)
        {
            ev.returnValue = infoArticulo;
        }
        else
        {
            console.log("Algo pasa con infoArticulo: ", infoArticulo);
            ev.returnValue = false;
        }
    });

});

ipcMain.on('getPrecioArticulo', (ev, id) => {
    getPrecio(id).then(infoArticulo=>{
        ev.returnValue = infoArticulo.precioConIva;
    });
});

ipcMain.on('get-precios', (ev, data) => {
    getPrecios().then(respuesta => {
        ev.sender.send('res-get-precios', respuesta);
    });
});