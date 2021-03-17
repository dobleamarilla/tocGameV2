var conexion = require('../conexion');
import {ipcMain} from 'electron';

var schemaClientes = new conexion.mongoose.Schema({
    id: String,
    nombre: String,
    tarjetaCliente: String
});
var Clientes = conexion.mongoose.model('clientes', schemaClientes);

export function insertarClientes(data)
{
    var devolver = new Promise((dev, rej)=>{
        Clientes.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}

function buscarCliente(busqueda: string)
{
    return Clientes.find({$or:[{"nombre": { '$regex': new RegExp(busqueda, 'i')}}, {"tarjetaCliente": busqueda}]}, null, {lean: true, limit: 20});
}
function comprobarClienteIdentico(nombre: string)
{
    return Clientes.find({nombre: nombre}, null, {lean: true, limit: 1});
}
function comprobarClienteIdenticoTarjeta(nombre: string)
{
    return Clientes.find({nombre: nombre}, null, {lean: true, limit: 1});
}
function borrarTodo()
{
    return Clientes.deleteMany({}, err=>{
        if(err)
        {
            console.log(err);
        }
    });
}
function cargarNuevosClientes(clientes)
{
    var devolver = new Promise((dev, rej)=>{
        borrarTodo().then(function(){
            insertarClientes(clientes).then(()=>{
                dev(true)
            });
        });
    });
    return devolver;
}
function crearNuevo(datos)
{
    var nuevo = new Clientes({id: 'CliBotiga_'+datos.tienda+Date.now(), nombre: datos.nombre, tarjetaCliente: datos.idTarjeta});
    nuevo.save();
}

ipcMain.on('buscar-clientes', (ev, data) => {
    buscarCliente(data).then(respuesta => {
        ev.sender.send('res-buscar-cliente', respuesta);
    });
});

ipcMain.on('buscar-nombre-cliente-identico', (ev, data) => { //SE PUEDE CREAR? SÍ = TRUE, NO = FALSE
    comprobarClienteIdentico(data).then(respuesta => {
        if(respuesta.length > 0)
        {
            ev.returnValue = false;
        }
        else
        {
            ev.returnValue = true;
        }
    });
});

ipcMain.on('buscar-tarjeta-cliente-identico', (ev, data) => { //SE PUEDE CREAR? SÍ = TRUE, NO = FALSE
    comprobarClienteIdenticoTarjeta(data).then(respuesta => {
        if(respuesta.length > 0)
        {
            ev.returnValue = false;
        }
        else
        {
            ev.returnValue = true;
        }
    });
});

ipcMain.on('cliente-nuevo-crear-confirmado', (ev, data)=>{
    crearNuevo(data);
});

ipcMain.on('insertar-nuevos-clientes', (event: any, data: any)=>{
    insertarClientes(data).then(info=>{
        event.sender.send('nuevo-toast', {tipo: 'success', mensaje:'Clientes cargados correctamente'});
    });
});