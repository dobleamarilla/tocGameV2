var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var caj = require('./componentes/schemas/cajas');
var tec = require('./componentes/schemas/teclas');
var men = require('./componentes/schemas/menus');
var cest = require('./componentes/schemas/cestas');
var tick = require('./componentes/schemas/tickets');
var sincro = require('./componentes/schemas/sincroCajas');
var movi = require('./componentes/schemas/movimientos');
var sincroFicha = require('./componentes/schemas/sincroFichajes');
var devolu = require('./componentes/schemas/devoluciones');
var moned = require('./componentes/schemas/infoMonedas');
var codiBarra = require('./componentes/schemas/codigoBarras');
var eventos = require('events');
const iconPath = path.join(__dirname, "web", "assets", "imagenes", "favicon.png");
const isOnline = require('is-online');
var sincroEnCurso = false;
require('source-map-support').install();
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
function crearCestaVacia() {
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
    };
    return cestaVacia;
}
app.on('ready', () => {
    var ventanaPrincipal = new BrowserWindow({
        kiosk: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
        icon: iconPath
    });
    ventanaPrincipal.loadFile('./web/index.html');
    atajos.atajos(globalShortcut, ventanaPrincipal);
    /* ACCIONES IPC-MAIN */
    ipcMain.on('ventaDatafono', (event, info) => {
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
        client.on('error', function (err) {
            console.log(err);
            event.sender.send('pregunta-cambio-datafono');
            event.sender.send('nuevo-toast', { tipo: 'error', mensaje: 'Datáfono no configurado' });
        });
        client.on('data', function (data) {
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
        params.getParams().then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL GET PARAMETROS
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
    //GET INFO MONEDAS
    ipcMain.on('get-monedas', (ev, infoMonedas) => {
        moned.getMonedas().then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO MONEDAS
    //INSERTAR MOVIMIENTO
    ipcMain.on('nuevo-movimiento', (ev, args) => {
        movi.insertarMovimiento(args);
    });
    //FINAL INSERTAR MOVIMIENTO
    //GET RANGO MOVIMIENTOS
    ipcMain.on('get-rango-movimientos', (ev, args) => {
        movi.getMovimientosRango(args.fechaInicio, args.fechaFinal).then(res => {
            ev.returnValue = res;
        }).catch(err => {
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
    ipcMain.on('cargar-todo', (ev, data) => __awaiter(this, void 0, void 0, function* () {
        yield trabaj.insertarTrabajadores(data.dependentes);
        yield arti.insertarArticulos(data.articulos);
        yield cliente.insertarClientes(data.clientes);
        yield fami.insertarFamilias(data.familias);
        yield promo.insertarPromociones(data.promociones);
        yield paramtick.insertarParametrosTicket(data.parametrosTicket);
        yield men.insertarMenus(data.menus);
        yield tec.insertarTeclasMain(data.teclas);
        ev.sender.send('res-cargar-todo', true);
    }));
    //FINAL CARGAR TODO
    //ACTUALIZAR TECLADO
    ipcMain.on('actualizar-teclado', (ev, data) => __awaiter(this, void 0, void 0, function* () {
        yield arti.borrarArticulos();
        yield arti.insertarArticulos(data.articulos);
        yield fami.borrarFamilias();
        yield fami.insertarFamilias(data.familias);
        yield promo.borrarPromociones();
        yield promo.insertarPromociones(data.promociones);
        yield men.borrarMenus();
        yield men.insertarMenus(data.menus);
        yield tec.borrarTeclas();
        yield tec.insertarTeclasMain(data.teclas);
        ev.sender.send('res-cargar-teclado', true);
    }));
    //FINAL ACTUALIZAR TECLADO
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
    //BUSCAR TRABAJADOR
    ipcMain.on('buscar-trabajador-sincrono', (ev, data) => {
        trabaj.buscarTrabajador(data).then(respuesta => {
            ev.returnValue = respuesta;
        });
    });
    //FINAL BUSCAR TRABAJADOR
    //GET INFO UN TICKET
    ipcMain.on('get-info-un-ticket', (ev, data) => {
        tick.getInfoTicket(data).then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO UN TICKET
    //GET INFO PARAMS TICKET
    ipcMain.on('get-params-ticket', (ev, data) => {
        paramtick.getParamsTicket().then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO PARAMS TICKET
    //GET INFO trabajador por ID
    ipcMain.on('get-infotrabajador-id', (ev, data) => {
        trabaj.getTrabajadorPorId(data).then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO trabajador por ID
    //CONFIRMAR ENVIO CAJA
    ipcMain.on('confirmar-envio-caja', (ev, data) => {
        sincro.confirmarEnvioCaja(data.idCaja);
    });
    //FINAL CONFIRMAR ENVIO CAJA
    //GET CESTA
    ipcMain.on('get-cesta', (ev, data = -1) => {
        cest.getUnaCesta(data).then(respuesta => {
            if (respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null) {
                ev.sender.send('res-get-cesta', respuesta);
            }
            else {
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
    ipcMain.on('borrar-cesta', (ev, idCesta) => {
        cest.borrarCesta(idCesta);
    });
    //FINAL BORRAR CESTA
    //GET INFO ARTICULO
    ipcMain.on('get-info-articulo', (ev, data) => {
        arti.getInfoArticulo(data).then(infoArticulo => {
            if (infoArticulo) {
                ev.returnValue = infoArticulo;
            }
            else {
                console.log("Algo pasa con infoArticulo: ", infoArticulo);
                ev.returnValue = false;
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
    //GET PRECIO ARTICULO
    ipcMain.on('getPrecioArticulo', (ev, id) => {
        arti.getPrecio(id).then(infoArticulo => {
            ev.returnValue = infoArticulo.precioConIva;
        });
    });
    //FINAL GET PRECIO ARTICULO
    //BUSCAR FICHADOS
    ipcMain.on('buscar-fichados', (ev, data) => {
        trabaj.buscarFichados().then(arrayFichados => {
            ev.sender.send('res-buscar-fichados', arrayFichados);
        });
    });
    //FINAL BUSCAR FICHADOS
    //CHECK INTERNET
    ipcMain.on('check-internet', (ev, data) => __awaiter(this, void 0, void 0, function* () {
        try {
            ev.sender.send('res-check-internet', yield isOnline());
        }
        catch (error) {
            console.log("Error en check-internet");
        }
    }));
    //FINAL CHECK INTERNET
    //GET PROMOCIONES
    ipcMain.on('get-promociones', (ev, data) => {
        promo.getPromociones().then(arrayPromociones => {
            ev.returnValue = arrayPromociones;
        });
    });
    //FINAL GET PROMOCIONES
    //INSERTAR TICKET
    ipcMain.on('set-ticket', (ev, data) => {
        tick.insertarTicket(data);
    });
    //FINAL INSERTAR TICKET
    //GET TICKETS
    ipcMain.on('get-tickets', (ev, data) => {
        tick.getTickets().then((arrayTickets) => {
            ev.returnValue = arrayTickets;
        });
    });
    //FINAL GET TICKETS
    //NUEVO MOVIMIENTO A SINCRO
    ipcMain.on('sincronizar-movimientos', (ev, data) => {
        movi.getParaSincronizarMovimientos().then(res => {
            ev.sender.send('res-sincronizar-movimientos', res);
        });
    });
    //FINAL NUEVO MOVIMIENTO A SINCRO
    //CONFIRMAR MOVIMIENTO
    ipcMain.on('movimiento-confirmado', (ev, data) => {
        movi.confirmarMovimiento(data.idMovimiento);
    });
    //FINAL CONFIRMAR MOVIMIENTO
    //GET ULTIMO TICKET
    ipcMain.on('getUltimoTicket', (ev, data) => {
        tick.getUltimoTicket().then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET ULTIMO TICKET
    //SINCRONIZAR CON SAN PEDRO
    ipcMain.on('sincronizar-toc', (event, args) => {
        if (!sincroEnCurso) {
            sincroEnCurso = true;
            tick.getParaSincronizar().then(res => {
                sincroEnCurso = false;
                event.sender.send('res-sincronizar-toc', res);
            }).catch(err => {
                console.log("Error en main, getParaSincronizar", err);
            });
        }
    });
    //FINAL SINCRONIZAR CON SAN PEDRO
    //SINCRONIZAR CON SAN PEDRO FICHAJES SOLO
    ipcMain.on('sincronizar-fichajes', (event, args) => {
        sincroFicha.getFichajes().then(res => {
            event.sender.send('res-sincronizar-fichajes', res);
        }).catch(err => {
            console.log("Error en main, getFichajes", err);
        });
    });
    //FINAL SINCRONIZAR CON SAN PEDRO FICHAJES SOLO
    //SINCRONIZAR CON SAN PEDRO DEVOLUCIONES SOLO
    ipcMain.on('sincronizar-devoluciones', (event, args) => {
        devolu.getParaSincronizarDevo().then(res => {
            event.sender.send('res-sincronizar-devoluciones', res);
        }).catch(err => {
            console.log("Error en main, getDevoluciones", err);
        });
    });
    //FINAL SINCRONIZAR CON SAN PEDRO DEVOLUCIONES SOLO
    //GUARDAR DEVOLUCION
    ipcMain.on('guardarDevolucion', (event, data) => {
        devolu.insertarDevolucion(data);
    });
    //FIN GUARDAR DEVOLUCION
    //GET ALL CESTAS
    ipcMain.on('getAllCestas', (event, data) => {
        cest.getAllCestas().then(res => {
            event.returnValue = res;
        });
    });
    //FIN GET ALL CESTAS
    //LIMPIAR ESTADO EN TRANSITO
    ipcMain.on('limpiar-enTransito', (event, data) => {
        tick.cleanTransit();
        sincroFicha.cleanFichajes();
        devolu.cleanDevoluciones();
        movi.cleanMovimientos();
        sincro.cleanCajas();
    });
    //FIN LIMPIAR ESTADO EN TRANSITO
    //ACTUALIZAR ULTIMO CODIGO DE BARRAS
    ipcMain.on('actualizar-ultimo-codigo-barras', (event, data) => {
        codiBarra.actualizarUltimoCodigoBarras().then(res => {
            event.returnValue = true;
        });
    });
    //FIN ACTUALIZAR ULTIMO CODIGO DE BARRAS
    //SET CONFIGURACION NUEVA PARAMETROS
    ipcMain.on('nueva-configuracion', (event, data) => {
        params.setParams(data).then(function () {
            event.sender.send('res-configuracion-nueva', true);
            acciones.refresh(ventanaPrincipal);
        }).catch(err => {
            event.sender.send('res-configuracion-nueva', false);
            console.log(err);
        });
    });
    //FIN SET CONFIGURACION NUEVA PARAMETROS
    //GET ULTIMO CODIGO BARRAS
    ipcMain.on('get-ultimo-codigo-barras', (event, data) => {
        codiBarra.getUltimoCodigoBarras().then(res => {
            if (res == null) {
                event.returnValue = 0;
            }
            else {
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
    ipcMain.on('insertar-nuevos-clientes', (event, data) => {
        cliente.insertarClientes(data).then(info => {
            event.sender.send('nuevo-toast', { tipo: 'success', mensaje: 'Clientes cargados correctamente' });
        });
    });
    ipcMain.on('testeoGuapo', (event, args) => {
    });
    ipcMain.on('confirmar-envio', (event, args) => {
        tick.confirmarEnvio(args);
    });
    ipcMain.on('confirmar-envio-fichaje', (event, data) => {
        sincroFicha.confirmarEnvioFichajes(data);
    });
    ipcMain.on('devolucion', (event, args) => {
    });
    ipcMain.on('anulacion', (event, args) => {
    });
    ipcMain.on('consulta', (event, args) => {
    });
    ipcMain.on('imprimir', (event, args) => {
        console.log("OYE SIRVE ESTO: ", args);
        impresora.imprimirTicket(args, event);
    });
    ipcMain.on('imprimir-test', (event, args) => {
        impresora.testEze(args, event);
    });
    ipcMain.on('imprimirSalidaDinero', (event, args) => {
        impresora.imprimirTicketSalida(args, event);
    });
    ipcMain.on('abrirCajon', (event, args) => {
        impresora.abrirCajon(event);
    });
    ipcMain.on('imprimirEntradaDinero', (event, args) => {
        impresora.imprimirTicketEntrada(args, event);
    });
    ipcMain.on('imprimirCierreCaja', (event, args) => {
        impresora.imprimirTicketCierreCaja(args, event);
    });
    ipcMain.on('cerrarToc', (event, args) => {
        acciones.cerrar(ventanaPrincipal);
    });
    ipcMain.on('refreshToc', (event, args) => {
        acciones.refresh(ventanaPrincipal);
    });
});
//# sourceMappingURL=main.js.map