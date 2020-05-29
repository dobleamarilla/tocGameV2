var net         = require('net');
var impresora   = require('./componentes/impresora');
var atajos      = require('./componentes/teclasAtajos');
var acciones    = require('./componentes/acciones');
var socket      = require('socket.io-client');
var path        = require('path');
var params      = require('./componentes/schemas/parametros');
var trabaj      = require('./componentes/schemas/trabajadores');
var arti        = require('./componentes/schemas/articulos');
var cliente     = require('./componentes/schemas/clientes');
var fami        = require('./componentes/schemas/familias');
var promo       = require('./componentes/schemas/promociones');
var paramtick   = require('./componentes/schemas/parametrosTicket');
var ficha       = require('./componentes/schemas/fichados');
var caj         = require('./componentes/schemas/cajas');
var tec         = require('./componentes/schemas/teclas');
var men         = require('./componentes/schemas/menus');
var cest        = require('./componentes/schemas/cestas');
var tick        = require('./componentes/schemas/tickets');
var sincro      = require('./componentes/schemas/sincroCajas');
var movi        = require('./componentes/schemas/movimientos');
var eventos     = require('events');

require('source-map-support').install();
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
            var venta_t = `\x02${ventaCliente};${tienda};${tpv};ezequiel;${numeroTicket};${tipoOperacion};${importe};;;;;;;\x03`;
            console.log('cliente: ', ventaCliente, ' tienda: ', tienda, ' tpv: ', tpv, ' tipoOperacion: ', tipoOperacion, ' numeroTicket: ', numeroTicket, ' nombreDependienta: ', nombreDependienta, ' importe: ', importe);
            client.write(venta_t);
        });

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
        });
        //event.sender.send('canal1', 'EJEMPLO DE EVENT SENDER SEND');
    });

    //GET PARAMETROS
    ipcMain.on('getParametros', (ev, args) => {
        params.getParams().then(res=>{
            ev.returnValue = res;
        }).catch(err=>{
            console.log(err);
        });
    });
    //FINAL GET PARAMETROS

        //SET ULTIMO TICKET EN PARAMETROS
        ipcMain.on('set-ultimo-ticket-parametros', (ev, args) => {
            params.setUltimoTicket(args);
        });
        //FINAL SET ULTIMO TICKET EN PARAMETROS

    //GET INFO CAJA
    ipcMain.on('getInfoCaja', (ev, args) => {
        caj.getInfoCaja().then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL INFO CAJA

    //INSERTAR MOVIMIENTO
    ipcMain.on('nuevo-movimiento', (ev, args) => {
        movi.insertarMovimiento(args);
    });
    //FINAL INSERTAR MOVIMIENTO

    //GET RANGO MOVIMIENTOS
    ipcMain.on('get-rango-movimientos', (ev, args) => {
        movi.getMovimientosRango(args.fechaInicio, args.fechaFinal).then(res=>{
            ev.returnValue = res;
        }).catch(err=>{
            console.log(err);
        });
    });
    //FINAL GET RANGO MOVIMIENTOS

    //GET TICKETS INTERVALO
    ipcMain.on('getTicketsIntervalo', (ev, args) => {
        tick.getTicketsIntervalo(args).then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL TICKETS INTERVALO

    //ACTUALIZAR INFO CAJA
    ipcMain.on('actualizar-info-caja', (ev, data) => {
        caj.setInfoCaja(data);
    });
    //FINAL ACTUALIZAR INFO CAJA

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
        await men.insertarMenus(data.menus);
        await tec.insertarTeclasMain(data.teclas);
        ev.sender.send('res-cargar-todo', true);
    });
    //FINAL CARGAR TODO

    //GET TECLAS
    ipcMain.on('get-teclas', (ev, data) => {
        tec.getTecladoMain(data).then(respuesta => {
            ev.sender.send('res-get-teclas', respuesta);
        });
    });
    //FINAL GET TECLAS

    //GET MENUS
    ipcMain.on('get-menus', (ev, data) => {
        men.getMenus(data).then(respuesta => {
            ev.sender.send('res-get-menus', respuesta);
        });
    });
    //FINAL MENUS

    //GUARDAR CAJA SINCRO
    ipcMain.on('guardarCajaSincro', (ev, data) => {
        sincro.nuevoItemSincroCajas(data);
    });
    //FINAL GUARDAR CAJA SINCRO

    //BUSCAR TRABAJADOR
    ipcMain.on('buscar-trabajador', (ev, data) => {
        trabaj.buscarTrabajador(data).then(respuesta => {
            ev.sender.send('res-buscar-trabajador', respuesta);
        });
    });
    //FINAL BUSCAR TRABAJADOR

    //BUSCAR CLIENTE
    ipcMain.on('buscar-clientes', (ev, data) => {
        cliente.buscarCliente(data).then(respuesta => {
            ev.sender.send('res-buscar-cliente', respuesta);
        });
    });
    //FINAL BUSCAR CLIENTE

    //BUSCAR TRABAJADOR
    ipcMain.on('buscar-trabajador-sincrono', (ev, data) => {
        trabaj.buscarTrabajador(data).then(respuesta => {
            ev.returnValue = respuesta;
        });
    });
    //FINAL BUSCAR TRABAJADOR

    //GET INFO UN TICKET
    ipcMain.on('get-info-un-ticket', (ev, data)=>{
        tick.getInfoTicket(data).then(res=>{
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO UN TICKET

    //GET INFO PARAMS TICKET
    ipcMain.on('get-params-ticket', (ev, data)=>{
        paramtick.getParamsTicket().then(res=>{
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO PARAMS TICKET

    //GET CESTA
    ipcMain.on('get-cesta', (ev, data) => {
        cest.getUnaCesta(data).then(respuesta => 
        {
            if(respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null)
            {
                ev.sender.send('res-get-cesta', respuesta);
            }
            else
            {
                const cestaVacia = {
                    _id: Date.now(),
                    tiposIva: {
                        base1: 0,
                        base2: 0,
                        base3: 0,
                        valorIva1: 0,
                        valorIva2: 0,
                        valorIva3: 0,
                        importe1: 0,
                        importe2: 0,
                        importe3: 0
                    },
                    lista: []
                }
                ev.sender.send('res-get-cesta', cestaVacia);
            }
        });
    });
    //FINAL GET CESTA

    //FICHAR TRABAJADOR
    ipcMain.on('fichar-trabajador', (ev, data) => {
        trabaj.ficharTrabajador(data).then(() => {
            ev.sender.send('res-fichar-trabajador', '');
        });
    });
    //FINAL FICHAR TRABAJADOR

    //BORRAR CESTA
    ipcMain.on('borrar-cesta', (ev, idCesta: number) => {
        cest.borrarCesta(idCesta);
    });
    //FINAL BORRAR CESTA

    //GET INFO ARTICULO
    ipcMain.on('get-info-articulo', (ev, data) => {
        arti.getInfoArticulo(data).then(infoArticulo=>{
            if(infoArticulo)
            {
                ev.returnValue = infoArticulo;
            }
            else
            {
                console.log("Algo pasa con infoArticulo: ", infoArticulo);
            }
        });

    });
    //FIN GET INFO ARTICULO

    //DESFICHAR TRABAJADOR
    ipcMain.on('desfichar-trabajador', (ev, data) => {
        trabaj.desficharTrabajador(data).then(() => {
            ev.sender.send('res-desfichar-trabajador', '');
        });
    });
    //FINAL DESFICHAR TRABAJADOR

    //SET CESTA
    ipcMain.on('set-cesta', (ev, data) => {
        cest.setCesta(data);
    });
    //FINAL SET CESTA

    //BUSCAR FICHADOS
    ipcMain.on('buscar-fichados', (ev, data)=>{
        trabaj.buscarFichados().then(arrayFichados=>{
            ev.sender.send('res-buscar-fichados', arrayFichados);
        })
    });
    //FINAL BUSCAR FICHADOS

    //GET PROMOCIONES
    ipcMain.on('get-promociones', (ev, data)=>{
        promo.getPromociones().then(arrayPromociones=>{
            ev.returnValue = arrayPromociones;
        });
    });
    //FINAL GET PROMOCIONES

    //INSERTAR TICKET
    ipcMain.on('set-ticket', (ev, data)=>{
        tick.insertarTicket(data);
    });
    //FINAL INSERTAR TICKET

    //GET TICKETS
    ipcMain.on('get-tickets', (ev, data)=>{
        tick.getTickets().then((arrayTickets)=>{
            ev.returnValue = arrayTickets;
        })
    });
    //FINAL GET TICKETS

    //NUEVO MOVIMIENTO A SINCRO
    ipcMain.on('nuevo-sincro', (ev, data)=>{
        
    });
    //FINAL NUEVO MOVIMIENTO A SINCRO

    //GET ULTIMO TICKET
    ipcMain.on('getUltimoTicket', (ev, data)=>{
        tick.getUltimoTicket().then(res=>{
            ev.returnValue = res;
        });
    });
    //FINAL GET ULTIMO TICKET

    //SINCRONIZAR CON SAN PEDRO
    ipcMain.on('sincronizar-toc', (event: any, args: any) => {
        tick.getParaSincronizar().then(res=>{
            event.sender.send('res-sincronizar-toc', res);
        }).catch(err=>{
            console.log("Error en main, getParaSincronizar", err);
        });
    });
    //FINAL SINCRONIZAR CON SAN PEDRO



    
    ipcMain.on('confirmar-envio', (event: any, args: any) => {
        tick.confirmarEnvio(args);
    });
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
    ipcMain.on('imprimir-test', (event: any, args: any) => {
        impresora.testEze(args, event);
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