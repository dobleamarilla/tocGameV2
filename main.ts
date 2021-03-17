var net         = require('net');
var impresora   = require('./componentes/impresora');
var atajos      = require('./componentes/teclasAtajos');
var acciones    = require('./componentes/acciones');
var socket      = require('socket.io-client');
var path        = require('path');

var eventos     = require('events');
var exec        = require('child_process').exec;
var Ean13Utils  = require('ean13-lib').Ean13Utils;
var artiTarifaEspecial = require('./componentes/schemas/articulosTarifaEspecial');
// var pjson = require('./package.json');

const iconPath  = path.join(__dirname, "web", "assets", "imagenes", "favicon.png");
const isOnline = require('is-online');

require('source-map-support').install();
import { app, BrowserWindow, globalShortcut } from 'electron';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


app.on('ready', () => {
    var ventanaPrincipal = new BrowserWindow(
        {
            kiosk: true, //cambiar a true
            frame: false, //cambiar a false
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                enableRemoteModule: true,
                contextIsolation: false
            },
            icon: iconPath
        });
    ventanaPrincipal.loadFile('./web/index.html');

    atajos.atajos(globalShortcut, ventanaPrincipal);

    
    /* ACCIONES IPC-MAIN */
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


    //GET ENTORNO DSV/PRODUCCION
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
    //FINAL GET ENTORNO DSV/PRODUCCION
    //PREGUNTAR CAMBIO DATAFONO
    ipcMain.on('change-pinpad', (ev, args) => {
        ev.sender.send('pregunta-cambio-datafono');
        ev.sender.send('nuevo-toast', {tipo: 'error', mensaje: 'Datáfono no configurado'});
    });
    //FINAL PREGUNTAR CAMBIO DATAFONO


    //ACTUALIZAR TOC DESDE CERBERO
    ipcMain.on('update-toc-cerbero', (ev, infoMonedas) => {
        atajos.actualizarTocSanPedro();
    });
    //FINAL ACTUALIZAR TOC DESDE CERBERO

    //GET VERSION
    ipcMain.on('get-version', (ev, args) => {
        ev.returnValue = '2.x';//pjson.version;
    });
    //FINAL GET VERSION

    //BORRAR DATABASE ENTERA
    ipcMain.on("borrar-database", (ev, args)=>{
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/borrarDatabase.sh');
        ev.sender.send('borrar-database');
    })
    //FINAL BORRAR DATABASE ENTERA

    //VISOR 
    ipcMain.on('mostrar-visor', (ev, data) => {
        console.log("En el ipcOn", data);
        //ev.sender.send('productoTablet', data)
        impresora.mostrarVisorEvent(data);
    })
    //FIN VISOR
                                                    //CARGAR TODO
                                                    ipcMain.on('cargar-todo', async (ev, data) => {
                                                        await trabaj.insertarTrabajadores(data.dependentes);
                                                        await insertarArticulos(data.articulos);
                                                        await cliente.insertarClientes(data.clientes);
                                                        await fami.insertarFamilias(data.familias);
                                                        await promo.insertarPromociones(data.promociones);
                                                        await paramtick.insertarParametrosTicket(data.parametrosTicket);
                                                        await men.insertarMenus(data.menus);
                                                        await tec.insertarTeclasMain(data.teclas);
                                                        ev.sender.send('res-cargar-todo', true);
                                                    });
                                                    //FINAL CARGAR TODO


                                                    //ACTUALIZAR TECLADO
                                                    ipcMain.on('actualizar-teclado', async (ev, data) => {
                                                        await borrarArticulos();
                                                        await insertarArticulos(data.articulos);

                                                        await fami.borrarFamilias();
                                                        await fami.insertarFamilias(data.familias);

                                                        await promo.borrarPromociones();
                                                        await promo.insertarPromociones(data.promociones);

                                                        await men.borrarMenus();
                                                        await men.insertarMenus(data.menus);

                                                        await tec.borrarTeclas();
                                                        await tec.insertarTeclasMain(data.teclas);

                                                        ev.sender.send('res-cargar-teclado', true);
                                                    });
                                                    //FINAL ACTUALIZAR TECLADO

    //CAMBIAR A TARIFA ESPECIAL CLIENTE VIP
    ipcMain.on('insertar-tarifa-especial', async (ev, data) => {
        await artiTarifaEspecial.borrarArticulosTarifaEspecial();
        await artiTarifaEspecial.insertarArticulosTarifaEspecial(data);
        ev.sender.send('res-cargar-tarifa-especial', true);
    });
    //FINAL CAMBIAR A TARIFA ESPECIAL CLIENTE VIP






    //NUEVA CESTA

    //FINAL NUEVA CESTA







    //GET INFO ARTICULO CON TARIFA ESPECIAL
    ipcMain.on('get-info-articulo-tarifa-especial', (ev, data) => {
        artiTarifaEspecial.getInfoArticuloTarifaEspecial(data).then(infoArticulo=>{
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
    //FIN GET INFO ARTICULO CON TARIFA ESPECIAL

    //DESFICHAR TRABAJADOR

    //FINAL DESFICHAR TRABAJADOR



    //CHECK INTERNET
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
    //FINAL CHECK INTERNET



                                                                        //LIMPIAR ESTADO EN TRANSITO
                                                                        ipcMain.on('limpiar-enTransito', (event: any, data: any)=>{
                                                                            tick.cleanTransit();
                                                                            sincroFicha.cleanFichajes();
                                                                            devolu.cleanDevoluciones();
                                                                            movi.cleanMovimientos();
                                                                            sincro.cleanCajas();
                                                                        });
                                                                        //FIN LIMPIAR ESTADO EN TRANSITO




    //INICIO CALCULAR EAN13
    ipcMain.on("calcular-ean13", (event:any, data:any)=>{
        event.returnValue = Ean13Utils.generate(data);
    });
    //FINAL CALCULAR EAN13


    ipcMain.on('devolucion', (event: any, args: any) => {

    });
    ipcMain.on('anulacion', (event: any, args: any) => {

    });
    ipcMain.on('consulta', (event: any, args: any) => {

    });
    ipcMain.on('imprimir', (event: any, args: any) => {
        impresora.imprimirTicket(args, event);
    });
    ipcMain.on('imprimir-test', (event: any, args: any) => {
        impresora.testEze(args, event);
    });
    ipcMain.on('imprimirSalidaDinero', (event: any, args: any) => {

        impresora.imprimirTicketSalida(args, event);
    });
    ipcMain.on('imprimirEntregaDiaria', (event: any, args: any) => {

        impresora.entregaDiariaEvent(args, event);
    });
    ipcMain.on('abrirCajon', (event: any, tipoImpresora: string) => {

        impresora.abrirCajon(tipoImpresora, event);
    });
    ipcMain.on('imprimirEntradaDinero', (event: any, args: any) => {

        impresora.imprimirTicketEntrada(args, event);
    });
    ipcMain.on('imprimirCierreCaja', (event: any, args: any) => {
        impresora.imprimirTicketCierreCaja(args, event);
    });

    ipcMain.on('cerrarToc', (event: any, args: any) => {
        acciones.cerrar(ventanaPrincipal);
    });
    ipcMain.on('refreshToc', (event: any, args: any) => {
        acciones.refresh(ventanaPrincipal);
    });
});