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
var sincroFicha = require('./componentes/schemas/sincroFichajes');
var devolu      = require('./componentes/schemas/devoluciones');
var moned       = require('./componentes/schemas/infoMonedas');
var codiBarra   = require('./componentes/schemas/codigoBarras');
var email       = require('./componentes/email');
var eventos     = require('events');
var artiTarifaEspecial = require('./componentes/schemas/articulosTarifaEspecial');
// var pjson = require('./package.json');

const iconPath  = path.join(__dirname, "web", "assets", "imagenes", "favicon.png");
const isOnline = require('is-online');
var sincroEnCurso   = false;
require('source-map-support').install();
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
function crearCestaVacia()
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
    return cestaVacia;
}

app.on('ready', () => {
    var ventanaPrincipal = new BrowserWindow(
        {
            kiosk: true, //cambiar a true
            frame: false, //cambiar a false
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                enableRemoteModule: true
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

    //GET PARAMETROS
    ipcMain.on('getParametros', (ev, args) => {
        params.getParams().then(res=>{
            ev.returnValue = res;
        }).catch(err=>{
            console.log(err);
        });
    });
    //FINAL GET PARAMETROS
    //PREGUNTAR CAMBIO DATAFONO
    ipcMain.on('change-pinpad', (ev, args) => {
        ev.sender.send('pregunta-cambio-datafono');
        ev.sender.send('nuevo-toast', {tipo: 'error', mensaje: 'Datáfono no configurado'});
    });
    //FINAL PREGUNTAR CAMBIO DATAFONO

    //GUARDAR SINCRO FICHAJES
    ipcMain.on('guardar-sincro-fichaje', (ev, data) => {
        sincroFicha.nuevoItem(data);
    });
    //FINAL GUARDAR SINCRO FICHAJES

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
    //SET INFO MONEDAS
    ipcMain.on('set-monedas', (ev, infoMonedas) => {
        moned.setMonedas(infoMonedas);
    });
    //FINAL SET INFO MONEDAS
    //ACTUALIZAR TOC DESDE CERBERO
    ipcMain.on('update-toc-cerbero', (ev, infoMonedas) => {
        atajos.actualizarTocSanPedro();
    });
    //FINAL ACTUALIZAR TOC DESDE CERBERO
    //GET INFO MONEDAS
    ipcMain.on('get-monedas', (ev, infoMonedas) => {
        moned.getMonedas().then(res=>{
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO MONEDAS

    //INSERTAR MOVIMIENTO
    ipcMain.on('nuevo-movimiento', (ev, args) => {
        movi.insertarMovimiento(args);
    });
    //FINAL INSERTAR MOVIMIENTO
    //GET VERSION
    ipcMain.on('get-version', (ev, args) => {
        ev.returnValue = '2.x';//pjson.version;
    });
    //FINAL GET VERSION

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
    //GET TICKETS INTERVALO SIMPLE
    ipcMain.on('getTicketsIntervaloSimple', (ev, args) => {
        tick.getTicketsIntervaloSimple(args).then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL TICKETS INTERVALO SIMPLE
    //ENVIAR EMAIL
    ipcMain.on('enviar-email', (ev, data) => {
        email.enviarEmail(data);
    });
    //FINAL ENVIAR EMAIL

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

    //INSERTAR TRABAJADORES SINCRO
    ipcMain.on('insertar-trabajadores', (ev, data) => {
        trabaj.insertarTrabajadores(data);

    });
    //FINAL INSERTAR TRABAJADORES SINCRO
    //ACTUALIZAR TECLADO
    ipcMain.on('actualizar-teclado', async (ev, data) => {
        await arti.borrarArticulos();
        await arti.insertarArticulos(data.articulos);

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
    // GET PRECIOS
    ipcMain.on('get-precios', (ev, data) => {
        arti.getPrecios().then(respuesta => {
            ev.sender.send('res-get-precios', respuesta);
        });
    });
    // FINAL PRECIOS
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

    //SINCRO CAJAS
    ipcMain.on('sincronizar-caja', (ev, data) => {
        sincro.getCaja().then(respuesta => {
            ev.sender.send('res-sincronizar-caja', respuesta);
        });
    });
    //FINAL SINCRO CAJAS

    //BUSCAR CLIENTE
    ipcMain.on('buscar-clientes', (ev, data) => {
        cliente.buscarCliente(data).then(respuesta => {
            ev.sender.send('res-buscar-cliente', respuesta);
        });
    });
    //FINAL BUSCAR CLIENTE

    //BUSCAR ARTÍCULO
    ipcMain.on('buscar-articulo', (ev, data) => {
        arti.buscarArticulo(data).then(respuesta => {
            ev.sender.send('res-buscar-articulo', respuesta);
        });
    });
    //FINAL BUSCAR ARTÍCULO

    //BUSCAR TRABAJADOR
    ipcMain.on('buscar-trabajador-sincrono', (ev, data) => {
        trabaj.buscarTrabajador(data).then(respuesta => {
            ev.returnValue = respuesta;
        });
    });
    //FINAL BUSCAR TRABAJADOR

    //CHECK EQUAL CLIENT
    ipcMain.on('buscar-nombre-cliente-identico', (ev, data) => { //SE PUEDE CREAR? SÍ = TRUE, NO = FALSE
        cliente.comprobarClienteIdentico(data).then(respuesta => {
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
    //FINAL CHECK EQUAL CLIENT
    //CHECK EQUAL CLIENT TARJETA
    ipcMain.on('buscar-tarjeta-cliente-identico', (ev, data) => { //SE PUEDE CREAR? SÍ = TRUE, NO = FALSE
        cliente.comprobarClienteIdenticoTarjeta(data).then(respuesta => {
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
    //FINAL CHECK EQUAL CLIENT TARJETA

    //GET INFO UN TICKET
    ipcMain.on('get-info-un-ticket', (ev, data)=>{
        tick.getInfoTicket(data).then(res=>{
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO UN TICKET

    //CREAR NUEVO CLIENTE CONFIRMADO
    ipcMain.on('cliente-nuevo-crear-confirmado', (ev, data)=>{
        cliente.crearNuevo(data);
    });
    //FINAL CREAR NUEVO CLIENTE CONFIRMADO

    //GET INFO PARAMS TICKET
    ipcMain.on('get-params-ticket', (ev, data)=>{
        paramtick.getParamsTicket().then(res=>{
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO PARAMS TICKET

    //GET INFO trabajador por ID
    ipcMain.on('get-infotrabajador-id', (ev, data)=>{
        trabaj.getTrabajadorPorId(data).then(res=>{
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO trabajador por ID

    //CONFIRMAR ENVIO CAJA
    ipcMain.on('confirmar-envio-caja', (ev, data)=>{
        sincro.confirmarEnvioCaja(data.idCaja);
    });
    //FINAL CONFIRMAR ENVIO CAJA

    //GET CESTA
    ipcMain.on('get-cesta', (ev, data = -1) => {
        cest.getUnaCesta(data).then(respuesta => 
        {
            if(respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null)
            {
                ev.sender.send('res-get-cesta', respuesta);
            }
            else
            {
                ev.sender.send('res-get-cesta', crearCestaVacia());
            }
        });
    });
    //FINAL GET CESTA

    //NUEVA CESTA
    ipcMain.on('new-cesta', (ev, data) => {
        let aux = crearCestaVacia();
        ev.sender.send('res-get-cesta', aux);
        cest.nuevaCesta(aux);
    });
    //FINAL NUEVA CESTA

    //FICHAR TRABAJADOR
    ipcMain.on('fichar-trabajador', (ev, data) => {
        trabaj.ficharTrabajador(data).then(() => {
            ev.sender.send('res-fichar-trabajador', '');
        });
    });
    //FINAL FICHAR TRABAJADOR

    //BORRAR CESTA
    ipcMain.on('del-cesta', (ev, id) => {
        cest.borrarCesta(id).then(() => {
            ev.returnValue = true;
        });
    });
    //FINAL BORRAR CESTA

    //CONTAR CESTAS
    ipcMain.on('count-cesta', (ev, id) => {
        cest.contarCestas().then((info) => {
            ev.sender.send('res-contar-cestas', info);
        });
    });
    //FINAL CONTAR CESTAS

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
                ev.returnValue = false;
            }
        });

    });
    //FIN GET INFO ARTICULO


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

    //GET PRECIO ARTICULO
    ipcMain.on('getPrecioArticulo', (ev, id) => {
        arti.getPrecio(id).then(infoArticulo=>{
            ev.returnValue = infoArticulo.precioConIva;
        });
    });
    //FINAL GET PRECIO ARTICULO

    //GET PRECIO ARTICULOS
    ipcMain.on('getPrecios', (ev, nombre) => {
        arti.getPrecios(nombre).then(infoArticulo=>{
            ev.returnValue = {precio: infoArticulo.precioConIva, nombre: infoArticulo.nomre};
        });
    });
    //FINAL GET PRECIO ARTICULOS

    //BUSCAR FICHADOS
    ipcMain.on('buscar-fichados', (ev, data)=>{
        trabaj.buscarFichados().then(arrayFichados=>{
            ev.sender.send('res-buscar-fichados', arrayFichados);
        })
    });
    //FINAL BUSCAR FICHADOS
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
    //GET TICKETS CAJA ACTUAL (SIN CERRAR)
    ipcMain.on('get-tickets-caja-abierta', (ev, fechaInicioCaja)=>{
        tick.getTicketsCajaActual(fechaInicioCaja).then((arrayTickets)=>{
            ev.returnValue = arrayTickets;
        })
    });
    //FINAL GET TICKETS CAJA ACTUAL (SIN CERRAR)

    //NUEVO MOVIMIENTO A SINCRO
    ipcMain.on('sincronizar-movimientos', (ev, data)=>{
        movi.getParaSincronizarMovimientos().then(res=>{
            ev.sender.send('res-sincronizar-movimientos', res);
        });
    });
    //FINAL NUEVO MOVIMIENTO A SINCRO
    //CONFIRMAR MOVIMIENTO
    ipcMain.on('movimiento-confirmado', (ev, data)=>{
        movi.confirmarMovimiento(data.idMovimiento);
    });
    //FINAL CONFIRMAR MOVIMIENTO

    //GET ULTIMO TICKET
    ipcMain.on('getUltimoTicket', (ev, data)=>{
        tick.getUltimoTicket().then(res=>{
            ev.returnValue = res;
        });
    });
    //FINAL GET ULTIMO TICKET

    //SINCRONIZAR CON SAN PEDRO
    ipcMain.on('sincronizar-toc', (event: any, args: any) => {
        if(!sincroEnCurso)
        {
            sincroEnCurso = true;
            tick.getParaSincronizar().then(res=>{
                sincroEnCurso = false;
                event.sender.send('res-sincronizar-toc', res);
            }).catch(err=>{
                console.log("Error en main, getParaSincronizar", err);
            });
        }
    });
    //FINAL SINCRONIZAR CON SAN PEDRO
    //SINCRONIZAR CON SAN PEDRO FICHAJES SOLO
    ipcMain.on('sincronizar-fichajes', (event: any, args: any) => {
            sincroFicha.getFichajes().then(res=>{
                event.sender.send('res-sincronizar-fichajes', res);
            }).catch(err=>{
                console.log("Error en main, getFichajes", err);
            });
    });
    //FINAL SINCRONIZAR CON SAN PEDRO FICHAJES SOLO

    //SINCRONIZAR CON SAN PEDRO DEVOLUCIONES SOLO
    ipcMain.on('sincronizar-devoluciones', (event: any, args: any) => {
            devolu.getParaSincronizarDevo().then(res=>{
                event.sender.send('res-sincronizar-devoluciones', res);
            }).catch(err=>{
                console.log("Error en main, getDevoluciones", err);
            });
    });
    //FINAL SINCRONIZAR CON SAN PEDRO DEVOLUCIONES SOLO

    //GUARDAR DEVOLUCION
    ipcMain.on('guardarDevolucion', (event: any, data: any)=>{
        devolu.insertarDevolucion(data);
    });
    //FIN GUARDAR DEVOLUCION
    //GET ALL CESTAS
    ipcMain.on('getAllCestas', (event: any, data: any)=>{
        cest.getAllCestas().then(res=>{
            event.returnValue = res;
        });
    });
    //FIN GET ALL CESTAS

    //LIMPIAR ESTADO EN TRANSITO
    ipcMain.on('limpiar-enTransito', (event: any, data: any)=>{
        tick.cleanTransit();
        sincroFicha.cleanFichajes();
        devolu.cleanDevoluciones();
        movi.cleanMovimientos();
        sincro.cleanCajas();
    });
    //FIN LIMPIAR ESTADO EN TRANSITO

    //ACTUALIZAR ULTIMO CODIGO DE BARRAS
    ipcMain.on('actualizar-ultimo-codigo-barras', (event: any, data: any)=>{
        codiBarra.actualizarUltimoCodigoBarras().then(res=>{
            event.returnValue = true;
        });
    });
    //FIN ACTUALIZAR ULTIMO CODIGO DE BARRAS
    //SET CONFIGURACION NUEVA PARAMETROS
    ipcMain.on('nueva-configuracion', (event: any, data: any)=>{
        params.setParams(data).then(function(){
            event.sender.send('res-configuracion-nueva', true);
            acciones.refresh(ventanaPrincipal);
        }).catch(err=>{
            event.sender.send('res-configuracion-nueva', false);
            console.log(err);
        });
    });
    //FIN SET CONFIGURACION NUEVA PARAMETROS
    //GET ULTIMO CODIGO BARRAS
    ipcMain.on('get-ultimo-codigo-barras', (event: any, data: any)=>{
        codiBarra.getUltimoCodigoBarras().then(res=>{
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
    //FIN GET ULTIMO CODIGO BARRAS
    // //Guardar primer codigo barras
    // ipcMain.on('guardar-primer-codigo-barras', (event: any, data: any)=>{
    //     codiBarra.guardarPrimero();
    // });
    // //FIN guardar primer codigo barras
    ipcMain.on('insertar-nuevos-clientes', (event: any, data: any)=>{
        cliente.insertarClientes(data).then(info=>{
            event.sender.send('nuevo-toast', {tipo: 'success', mensaje:'Clientes cargados correctamente'});
        });
    });
    ipcMain.on('testeoGuapo', (event: any, args: any)=>{
        // tick.test2(args).then(res=>{
        //     event.returnValue = res;
        // })
    });

    
    ipcMain.on('confirmar-envio', (event: any, args: any) => {
        tick.confirmarEnvio(args);
    });
    ipcMain.on('confirmar-envio-fichaje', (event: any, data: any) => {
        sincroFicha.confirmarEnvioFichajes(data);
    });
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

        impresora.entregaDiaria(args, event);
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