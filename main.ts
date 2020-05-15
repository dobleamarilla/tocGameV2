var net = require('net');
var impresora = require('./componentes/impresora');
var atajos = require('./componentes/teclasAtajos');
var acciones = require('./componentes/acciones');
var socket = require('socket.io-client');
var path = require('path');
var params = require('./componentes/schemas/parametros');
var trabaj = require('./componentes/schemas/trabajadores');
var arti = require('./componentes/schemas/articulos');
var cliente = require('./componentes/schemas/clientes');
var fami = require('./componentes/schemas/familias');
var promo = require('./componentes/schemas/promociones');
var paramtick = require('./componentes/schemas/parametrosTicket');
var ficha = require('./componentes/schemas/fichados');

const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

app.on('ready', () => {
    var ventanaPrincipal = new BrowserWindow(
        {
            kiosk: true, //cambiar a true
            frame: false, //cambiar a false
            webPreferences: {
                nodeIntegration: true
            }
        });
    ventanaPrincipal.loadFile('./web/index.html');

    atajos.atajos(globalShortcut, ventanaPrincipal);

    /* ACCIONES IPC-MAIN */
    ipcMain.on('ventaDatafono', (event: any, info: any) => {
        var client = new net.Socket();
        client.connect(8890, '127.0.0.1', function () {
            console.log('Conectado al CoLinux | Venta');
            var ventaCliente = 489;
            var nombreDependienta = info.nombreDependienta;
            var numeroTicket = info.idTicket;
            var tienda = 1;
            var tpv = 1;
            var tipoOperacion = 1; //1=> VENTA
            var importe = info.total; //EN CENTIMOS DE EURO
            var venta_t = `\x02${ventaCliente};${tienda};${tpv};${nombreDependienta};${numeroTicket};${tipoOperacion};${importe};;;;;;;\x03`;
            console.log('cliente: ', ventaCliente, ' tienda: ', tienda, ' tpv: ', tpv, ' tipoOperacion: ', tipoOperacion, ' numeroTicket: ', numeroTicket, ' nombreDependienta: ', nombreDependienta, ' importe: ', importe);
            client.write(venta_t);
        });

        client.on('data', function (data: any) {
            console.log('Recibido: ' + data);
            event.sender.send('ventaDatafono', data);
            client.write('\x02ACK\x03');
            client.destroy();
        });
        client.on('close', function () {
            console.log('Conexión cerrada');
        });
        //event.sender.send('canal1', 'EJEMPLO DE EVENT SENDER SEND');
    });

    //GET PARAMETROS
    ipcMain.on('getParametros', (ev, args) => {
        params.parametros.find().lean().then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL GET PARAMETROS

    //SET PARAMETROS
    ipcMain.on('setParametros', (ev, data) => {
        params.insertarParametros(data);
    });
    //FINAL SET PARAMETROS

    //CARGAR TODO
    ipcMain.on('cargar-todo', async (ev, data) => {
        await trabaj.insertarTrabajadores(data.dependentes);
        await arti.insertarArticulos(data.articulos);
        await cliente.insertarClientes(data.clientes);
        await fami.insertarFamilias(data.familias);
        await promo.insertarPromociones(data.promociones);
        await paramtick.insertarParametrosTicket(data.parametrosTicket);
        ev.sender.send('res-cargar-todo', true);
    });
    //FINAL CARGAR TODO

    //GET FICHADOS
    ipcMain.on('getFichados', async (ev, data) => {
        ev.returnValue = await ficha.getFichados();
    });
    //FINAL GET FICHADOS

    //BUSCAR TRABAJADOR
    ipcMain.on('buscar-trabajador', (ev, data) => {
        trabaj.buscarTrabajador(data).then(respuesta => {
            ev.sender.send('res-buscar-trabajador', respuesta);
        });
    });
    //FINAL BUSCAR TRABAJADOR

    //FICHAR TRABAJADOR
    ipcMain.on('fichar-trabajador', (ev, data) => {
        trabaj.ficharTrabajador(data).then(() => {
            ev.sender.send('res-fichar-trabajador', '');
        });
    });
    //FINAL FICHAR TRABAJADOR

    ipcMain.on('devolucion', (event: any, args: any) => {

    });
    ipcMain.on('anulacion', (event: any, args: any) => {

    });
    ipcMain.on('consulta', (event: any, args: any) => {

    });
    ipcMain.on('imprimir', (event: any, args: any) => {

        console.log(event);
        impresora.imprimirTicket(args, event);
    });
    ipcMain.on('imprimirSalidaDinero', (event: any, args: any) => {

        impresora.imprimirTicketSalida(args, event);
    });
    ipcMain.on('abrirCajon', (event: any, args: any) => {

        impresora.abrirCajon(event);
    });
    ipcMain.on('imprimirEntradaDinero', (event: any, args: any) => {

        impresora.imprimirTicketEntrada(args, event);
    });
    ipcMain.on('imprimirCierreCaja', (event: any, args: any) => {

        //console.log(args);
        impresora.imprimirTicketCierreCaja(args, event);
    });

    ipcMain.on('cerrarToc', (event: any, args: any) => {
        acciones.cerrar(ventanaPrincipal);
    });
    ipcMain.on('refreshToc', (event: any, args: any) => {
        acciones.refresh(ventanaPrincipal);
    });
});