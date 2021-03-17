import {ipcMain} from 'electron';
import {exec} from 'child_process';
import isOnline from 'is-online';
import net from  'net';
import {cleanTransit} from './schemas/tickets';
import {cleanFichajes} from './schemas/sincroFichajes';
import {cleanDevoluciones} from './schemas/devoluciones';
import {cleanMovimientos} from './schemas/movimientos';
import {cleanCajas} from './schemas/sincroCajas';
import {borrarArticulos, insertarArticulos} from './schemas/articulos';
import {borrarFamilias, insertarFamilias} from './schemas/familias';
import {insertarPromociones, borrarPromociones} from './schemas/promociones';
import {borrarMenus, insertarMenus} from './schemas/menus';
import {insertarTeclasMain, borrarTeclas} from './schemas/teclas';
import {insertarTrabajadores} from './schemas/trabajadores';
import {insertarClientes} from './schemas/clientes';
import {insertarParametrosTicket} from './schemas/parametrosTicket';
import {Ean13Utils} from 'ean13-lib';

ipcMain.on("borrar-database", (ev, args)=>{
    exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/borrarDatabase.sh');
    ev.sender.send('borrar-database');
})

ipcMain.on('check-internet', async (ev, data)=>{
    try 
    {
        ev.sender.send('res-check-internet', await isOnline());
    }
    catch(error)
    {
        console.log("Error en check-internet");
    }
    
});

ipcMain.on('ventaDatafono', (event: any, info: any) => {
    var client = new net.Socket();
    client.connect(8890, '127.0.0.1', function () {
        var ventaCliente = info.clearOneCliente;
        var nombreDependienta = info.nombreDependienta;
        var numeroTicket = info.idTicket;
        var tienda = info.clearOneTienda;
        var tpv = info.clearOneTpv;
        var tipoOperacion = 1; //1=> VENTA
        var importe = info.total; //EN CENTIMOS DE EURO
        var venta_t = `\x02${ventaCliente};${tienda};${tpv};ezequiel;${numeroTicket};${tipoOperacion};${importe};;;;;;;\x03`;
        console.log('cliente: ', ventaCliente, ' tienda: ', tienda, ' tpv: ', tpv, ' tipoOperacion: ', tipoOperacion, ' numeroTicket: ', numeroTicket, ' nombreDependienta: ', nombreDependienta, ' importe: ', importe);
        client.write(venta_t);
    });

    client.on('error', function(err){
        console.log(err);
        event.sender.send('pregunta-cambio-datafono');
        event.sender.send('nuevo-toast', {tipo: 'error', mensaje: 'Datáfono no configurado'});
    })
    client.on('data', function (data: any) {
        var objEnviar = {
            data: data,
            objTicket: info.objTicket
        };
        console.log('Recibido: ' + data);
        event.sender.send('resVentaDatafono', objEnviar);
        client.write('\x02ACK\x03');
        client.destroy();
    });
    client.on('close', function () {
        console.log('Conexión cerrada');
        client.destroy();
    });
});

ipcMain.on('getEntorno', (ev, args) => {
    if(process.argv[2] == 'test')
    {
        ev.returnValue = 'http://localhost:8080'
    }
    else
    {
        ev.returnValue = 'http://54.74.52.150:8080';
    }
});

ipcMain.on('change-pinpad', (ev, args) => {
    ev.sender.send('pregunta-cambio-datafono');
    ev.sender.send('nuevo-toast', {tipo: 'error', mensaje: 'Datáfono no configurado'});
});

ipcMain.on('get-version', (ev, args) => {
    ev.returnValue = '2.x';//pjson.version;
});

ipcMain.on('limpiar-enTransito', (event: any, data: any)=>{
    cleanTransit();
    cleanFichajes();
    cleanDevoluciones();
    cleanMovimientos();
    cleanCajas();
});

ipcMain.on('actualizar-teclado', async (ev, data) => {
    await borrarArticulos();
    await insertarArticulos(data.articulos);

    await borrarFamilias();
    await insertarFamilias(data.familias);

    await borrarPromociones();
    await insertarPromociones(data.promociones);

    await borrarMenus();
    await insertarMenus(data.menus);

    await borrarTeclas();
    await insertarTeclasMain(data.teclas);

    ev.sender.send('res-cargar-teclado', true);
});

ipcMain.on('cargar-todo', async (ev, data) => {
    await insertarTrabajadores(data.dependentes);
    await insertarArticulos(data.articulos);
    await insertarClientes(data.clientes);
    await insertarFamilias(data.familias);
    await insertarPromociones(data.promociones);
    await insertarParametrosTicket(data.parametrosTicket);
    await insertarMenus(data.menus);
    await insertarTeclasMain(data.teclas);
    ev.sender.send('res-cargar-todo', true);
});

ipcMain.on("calcular-ean13", (event:any, data:any)=>{
    event.returnValue = Ean13Utils.generate(data);
});