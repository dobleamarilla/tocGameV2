"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var email = require('./componentes/email');
var eventos = require('events');
var exec = require('child_process').exec;
var Ean13Utils = require('ean13-lib').Ean13Utils;
var artiTarifaEspecial = require('./componentes/schemas/articulosTarifaEspecial');
// var pjson = require('./package.json');
const iconPath = path.join(__dirname, "web", "assets", "imagenes", "favicon.png");
const isOnline = require('is-online');
var sincroEnCurso = false;
require('source-map-support').install();
const electron_1 = require("electron");
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
electron_1.app.on('ready', () => {
    var ventanaPrincipal = new electron_1.BrowserWindow({
        kiosk: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            enableRemoteModule: true,
            contextIsolation: false
        },
        icon: iconPath
    });
    ventanaPrincipal.loadFile('./web/index.html');
    atajos.atajos(electron_1.globalShortcut, ventanaPrincipal);
    /* ACCIONES IPC-MAIN */
    electron_1.ipcMain.on('ventaDatafono', (event, info) => {
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
            client.destroy();
        });
    });
    //GET PARAMETROS
    electron_1.ipcMain.on('getParametros', (ev, args) => {
        params.getParams().then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL GET PARAMETROS
    //GET ENTORNO DSV/PRODUCCION
    electron_1.ipcMain.on('getEntorno', (ev, args) => {
        if (process.argv[2] == 'test') {
            ev.returnValue = 'http://localhost:8080';
        }
        else {
            ev.returnValue = 'http://54.74.52.150:8080';
        }
    });
    //FINAL GET ENTORNO DSV/PRODUCCION
    //PREGUNTAR CAMBIO DATAFONO
    electron_1.ipcMain.on('change-pinpad', (ev, args) => {
        ev.sender.send('pregunta-cambio-datafono');
        ev.sender.send('nuevo-toast', { tipo: 'error', mensaje: 'Datáfono no configurado' });
    });
    //FINAL PREGUNTAR CAMBIO DATAFONO
    //GUARDAR SINCRO FICHAJES
    electron_1.ipcMain.on('guardar-sincro-fichaje', (ev, data) => {
        sincroFicha.nuevoItem(data);
    });
    //FINAL GUARDAR SINCRO FICHAJES
    //SET ULTIMO TICKET EN PARAMETROS
    electron_1.ipcMain.on('set-ultimo-ticket-parametros', (ev, args) => {
        params.setUltimoTicket(args);
    });
    //FINAL SET ULTIMO TICKET EN PARAMETROS
    //GET INFO CAJA
    electron_1.ipcMain.on('getInfoCaja', (ev, args) => {
        caj.getInfoCaja().then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL INFO CAJA
    //SET INFO MONEDAS
    electron_1.ipcMain.on('set-monedas', (ev, infoMonedas) => {
        moned.setMonedas(infoMonedas);
    });
    //FINAL SET INFO MONEDAS
    //ACTUALIZAR TOC DESDE CERBERO
    electron_1.ipcMain.on('update-toc-cerbero', (ev, infoMonedas) => {
        atajos.actualizarTocSanPedro();
    });
    //FINAL ACTUALIZAR TOC DESDE CERBERO
    //GET INFO MONEDAS
    electron_1.ipcMain.on('get-monedas', (ev, infoMonedas) => {
        moned.getMonedas().then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO MONEDAS
    //INSERTAR MOVIMIENTO
    electron_1.ipcMain.on('nuevo-movimiento', (ev, args) => {
        movi.insertarMovimiento(args);
    });
    //FINAL INSERTAR MOVIMIENTO
    //GET VERSION
    electron_1.ipcMain.on('get-version', (ev, args) => {
        ev.returnValue = '2.x'; //pjson.version;
    });
    //FINAL GET VERSION
    //GET RANGO MOVIMIENTOS
    electron_1.ipcMain.on('get-rango-movimientos', (ev, args) => {
        movi.getMovimientosRango(args.fechaInicio, args.fechaFinal).then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL GET RANGO MOVIMIENTOS
    //BORRAR DATABASE ENTERA
    electron_1.ipcMain.on("borrar-database", (ev, args) => {
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/borrarDatabase.sh');
        ev.sender.send('borrar-database');
    });
    //FINAL BORRAR DATABASE ENTERA
    //GET TICKETS INTERVALO
    electron_1.ipcMain.on('getTicketsIntervalo', (ev, args) => {
        tick.getTicketsIntervalo(args).then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL TICKETS INTERVALO
    //GET TICKETS INTERVALO SIMPLE
    electron_1.ipcMain.on('getTicketsIntervaloSimple', (ev, args) => {
        tick.getTicketsIntervaloSimple(args).then(res => {
            ev.returnValue = res;
        }).catch(err => {
            console.log(err);
        });
    });
    //FINAL TICKETS INTERVALO SIMPLE
    //ENVIAR EMAIL
    electron_1.ipcMain.on('enviar-email', (ev, data) => {
        email.enviarEmail(data);
    });
    //FINAL ENVIAR EMAIL
    //ACTUALIZAR INFO CAJA
    electron_1.ipcMain.on('actualizar-info-caja', (ev, data) => {
        caj.setInfoCaja(data);
    });
    //FINAL ACTUALIZAR INFO CAJA
    //SET PARAMETROS
    electron_1.ipcMain.on('setParametros', (ev, data) => {
        params.insertarParametros(data);
    });
    //FINAL SET PARAMETROS
    //VISOR 
    electron_1.ipcMain.on('mostrar-visor', (ev, data) => {
        console.log("En el ipcOn", data);
        //ev.sender.send('productoTablet', data)
        impresora.mostrarVisorEvent(data);
    });
    //FIN VISOR
    //CARGAR TODO
    electron_1.ipcMain.on('cargar-todo', (ev, data) => __awaiter(this, void 0, void 0, function* () {
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
    //INSERTAR TRABAJADORES SINCRO
    electron_1.ipcMain.on('insertar-trabajadores', (ev, data) => {
        trabaj.insertarTrabajadores(data);
    });
    //FINAL INSERTAR TRABAJADORES SINCRO
    //ACTUALIZAR TECLADO
    electron_1.ipcMain.on('actualizar-teclado', (ev, data) => __awaiter(this, void 0, void 0, function* () {
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
    //CAMBIAR A TARIFA ESPECIAL CLIENTE VIP
    electron_1.ipcMain.on('insertar-tarifa-especial', (ev, data) => __awaiter(this, void 0, void 0, function* () {
        yield artiTarifaEspecial.borrarArticulosTarifaEspecial();
        yield artiTarifaEspecial.insertarArticulosTarifaEspecial(data);
        ev.sender.send('res-cargar-tarifa-especial', true);
    }));
    //FINAL CAMBIAR A TARIFA ESPECIAL CLIENTE VIP
    //GET TECLAS
    electron_1.ipcMain.on('get-teclas', (ev, data) => {
        tec.getTecladoMain(data).then(respuesta => {
            ev.sender.send('res-get-teclas', respuesta);
        });
    });
    //FINAL GET TECLAS
    //GET MENUS
    electron_1.ipcMain.on('get-menus', (ev, data) => {
        men.getMenus(data).then(respuesta => {
            ev.sender.send('res-get-menus', respuesta);
        });
    });
    //FINAL MENUS
    // GET PRECIOS
    electron_1.ipcMain.on('get-precios', (ev, data) => {
        arti.getPrecios().then(respuesta => {
            ev.sender.send('res-get-precios', respuesta);
        });
    });
    // FINAL PRECIOS
    //GUARDAR CAJA SINCRO
    electron_1.ipcMain.on('guardarCajaSincro', (ev, data) => {
        sincro.nuevoItemSincroCajas(data);
    });
    //FINAL GUARDAR CAJA SINCRO
    //BUSCAR TRABAJADOR
    electron_1.ipcMain.on('buscar-trabajador', (ev, data) => {
        trabaj.buscarTrabajador(data).then(respuesta => {
            ev.sender.send('res-buscar-trabajador', respuesta);
        });
    });
    //FINAL BUSCAR TRABAJADOR
    //SINCRO CAJAS
    electron_1.ipcMain.on('sincronizar-caja', (ev, data) => {
        sincro.getCaja().then(respuesta => {
            ev.sender.send('res-sincronizar-caja', respuesta);
        });
    });
    //FINAL SINCRO CAJAS
    //BUSCAR CLIENTE
    electron_1.ipcMain.on('buscar-clientes', (ev, data) => {
        cliente.buscarCliente(data).then(respuesta => {
            ev.sender.send('res-buscar-cliente', respuesta);
        });
    });
    //FINAL BUSCAR CLIENTE
    //BUSCAR ARTÍCULO
    electron_1.ipcMain.on('buscar-articulo', (ev, data) => {
        arti.buscarArticulo(data).then(respuesta => {
            ev.sender.send('res-buscar-articulo', respuesta);
        });
    });
    //FINAL BUSCAR ARTÍCULO
    //BUSCAR TRABAJADOR
    electron_1.ipcMain.on('buscar-trabajador-sincrono', (ev, data) => {
        trabaj.buscarTrabajador(data).then(respuesta => {
            ev.returnValue = respuesta;
        });
    });
    //FINAL BUSCAR TRABAJADOR
    //CHECK EQUAL CLIENT
    electron_1.ipcMain.on('buscar-nombre-cliente-identico', (ev, data) => {
        cliente.comprobarClienteIdentico(data).then(respuesta => {
            if (respuesta.length > 0) {
                ev.returnValue = false;
            }
            else {
                ev.returnValue = true;
            }
        });
    });
    //FINAL CHECK EQUAL CLIENT
    //CHECK EQUAL CLIENT TARJETA
    electron_1.ipcMain.on('buscar-tarjeta-cliente-identico', (ev, data) => {
        cliente.comprobarClienteIdenticoTarjeta(data).then(respuesta => {
            if (respuesta.length > 0) {
                ev.returnValue = false;
            }
            else {
                ev.returnValue = true;
            }
        });
    });
    //FINAL CHECK EQUAL CLIENT TARJETA
    //GET INFO UN TICKET
    electron_1.ipcMain.on('get-info-un-ticket', (ev, data) => {
        tick.getInfoTicket(data).then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO UN TICKET
    //CREAR NUEVO CLIENTE CONFIRMADO
    electron_1.ipcMain.on('cliente-nuevo-crear-confirmado', (ev, data) => {
        cliente.crearNuevo(data);
    });
    //FINAL CREAR NUEVO CLIENTE CONFIRMADO
    //GET INFO PARAMS TICKET
    electron_1.ipcMain.on('get-params-ticket', (ev, data) => {
        paramtick.getParamsTicket().then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO PARAMS TICKET
    //GET INFO trabajador por ID
    electron_1.ipcMain.on('get-infotrabajador-id', (ev, data) => {
        trabaj.getTrabajadorPorId(data).then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET INFO trabajador por ID
    //CONFIRMAR ENVIO CAJA
    electron_1.ipcMain.on('confirmar-envio-caja', (ev, data) => {
        sincro.confirmarEnvioCaja(data.idCaja);
    });
    //FINAL CONFIRMAR ENVIO CAJA
    //GET CESTA
    electron_1.ipcMain.on('get-cesta', (ev, data = -1) => {
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
    electron_1.ipcMain.on('new-cesta', (ev, data) => {
        let aux = crearCestaVacia();
        ev.sender.send('res-get-cesta', aux);
        cest.nuevaCesta(aux);
    });
    //FINAL NUEVA CESTA
    //FICHAR TRABAJADOR
    electron_1.ipcMain.on('fichar-trabajador', (ev, data) => {
        trabaj.ficharTrabajador(data).then(() => {
            ev.sender.send('res-fichar-trabajador', '');
        });
    });
    //FINAL FICHAR TRABAJADOR
    //BORRAR CESTA
    electron_1.ipcMain.on('del-cesta', (ev, id) => {
        cest.borrarCesta(id).then(() => {
            ev.returnValue = true;
        });
    });
    //FINAL BORRAR CESTA
    //CONTAR CESTAS
    electron_1.ipcMain.on('count-cesta', (ev, id) => {
        cest.contarCestas().then((info) => {
            ev.sender.send('res-contar-cestas', info);
        });
    });
    //FINAL CONTAR CESTAS
    //BORRAR CESTA
    electron_1.ipcMain.on('borrar-cesta', (ev, idCesta) => {
        cest.borrarCesta(idCesta);
    });
    //FINAL BORRAR CESTA
    //GET INFO ARTICULO
    electron_1.ipcMain.on('get-info-articulo', (ev, data) => {
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
    //GET INFO ARTICULO CON TARIFA ESPECIAL
    electron_1.ipcMain.on('get-info-articulo-tarifa-especial', (ev, data) => {
        artiTarifaEspecial.getInfoArticuloTarifaEspecial(data).then(infoArticulo => {
            if (infoArticulo) {
                ev.returnValue = infoArticulo;
            }
            else {
                console.log("Algo pasa con infoArticulo: ", infoArticulo);
                ev.returnValue = false;
            }
        });
    });
    //FIN GET INFO ARTICULO CON TARIFA ESPECIAL
    //DESFICHAR TRABAJADOR
    electron_1.ipcMain.on('desfichar-trabajador', (ev, data) => {
        trabaj.desficharTrabajador(data).then(() => {
            ev.sender.send('res-desfichar-trabajador', '');
        });
    });
    //FINAL DESFICHAR TRABAJADOR
    //SET CESTA
    electron_1.ipcMain.on('set-cesta', (ev, data) => {
        cest.setCesta(data);
    });
    //FINAL SET CESTA
    //GET PRECIO ARTICULO
    electron_1.ipcMain.on('getPrecioArticulo', (ev, id) => {
        arti.getPrecio(id).then(infoArticulo => {
            ev.returnValue = infoArticulo.precioConIva;
        });
    });
    //FINAL GET PRECIO ARTICULO
    //GET PRECIO ARTICULOS
    electron_1.ipcMain.on('getPrecios', (ev, nombre) => {
        arti.getPrecios(nombre).then(infoArticulo => {
            ev.returnValue = { precio: infoArticulo.precioConIva, nombre: infoArticulo.nomre };
        });
    });
    //FINAL GET PRECIO ARTICULOS
    //BUSCAR FICHADOS
    electron_1.ipcMain.on('buscar-fichados', (ev, data) => {
        trabaj.buscarFichados().then(arrayFichados => {
            ev.sender.send('res-buscar-fichados', arrayFichados);
        });
    });
    //FINAL BUSCAR FICHADOS
    //CHECK INTERNET
    electron_1.ipcMain.on('check-internet', (ev, data) => __awaiter(this, void 0, void 0, function* () {
        try {
            ev.sender.send('res-check-internet', yield isOnline());
        }
        catch (error) {
            console.log("Error en check-internet");
        }
    }));
    //FINAL CHECK INTERNET
    //GET PROMOCIONES
    electron_1.ipcMain.on('get-promociones', (ev, data) => {
        promo.getPromociones().then(arrayPromociones => {
            ev.returnValue = arrayPromociones;
        });
    });
    //FINAL GET PROMOCIONES
    //INSERTAR TICKET
    electron_1.ipcMain.on('set-ticket', (ev, data) => {
        tick.insertarTicket(data);
    });
    //FINAL INSERTAR TICKET
    //GET TICKETS
    electron_1.ipcMain.on('get-tickets', (ev, data) => {
        tick.getTickets().then((arrayTickets) => {
            ev.returnValue = arrayTickets;
        });
    });
    //FINAL GET TICKETS
    //GET TICKETS CAJA ACTUAL (SIN CERRAR)
    electron_1.ipcMain.on('get-tickets-caja-abierta', (ev, fechaInicioCaja) => {
        tick.getTicketsCajaActual(fechaInicioCaja).then((arrayTickets) => {
            ev.returnValue = arrayTickets;
        });
    });
    //FINAL GET TICKETS CAJA ACTUAL (SIN CERRAR)
    //NUEVO MOVIMIENTO A SINCRO
    electron_1.ipcMain.on('sincronizar-movimientos', (ev, data) => {
        movi.getParaSincronizarMovimientos().then(res => {
            ev.sender.send('res-sincronizar-movimientos', res);
        });
    });
    //FINAL NUEVO MOVIMIENTO A SINCRO
    //CONFIRMAR MOVIMIENTO
    electron_1.ipcMain.on('movimiento-confirmado', (ev, data) => {
        movi.confirmarMovimiento(data.idMovimiento);
    });
    //FINAL CONFIRMAR MOVIMIENTO
    //GET ULTIMO TICKET
    electron_1.ipcMain.on('getUltimoTicket', (ev, data) => {
        tick.getUltimoTicket().then(res => {
            ev.returnValue = res;
        });
    });
    //FINAL GET ULTIMO TICKET
    //SINCRONIZAR CON SAN PEDRO
    electron_1.ipcMain.on('sincronizar-toc', (event, args) => {
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
    electron_1.ipcMain.on('sincronizar-fichajes', (event, args) => {
        sincroFicha.getFichajes().then(res => {
            event.sender.send('res-sincronizar-fichajes', res);
        }).catch(err => {
            console.log("Error en main, getFichajes", err);
        });
    });
    //FINAL SINCRONIZAR CON SAN PEDRO FICHAJES SOLO
    //SINCRONIZAR CON SAN PEDRO DEVOLUCIONES SOLO
    electron_1.ipcMain.on('sincronizar-devoluciones', (event, args) => {
        devolu.getParaSincronizarDevo().then(res => {
            event.sender.send('res-sincronizar-devoluciones', res);
        }).catch(err => {
            console.log("Error en main, getDevoluciones", err);
        });
    });
    //FINAL SINCRONIZAR CON SAN PEDRO DEVOLUCIONES SOLO
    //GUARDAR DEVOLUCION
    electron_1.ipcMain.on('guardarDevolucion', (event, data) => {
        devolu.insertarDevolucion(data);
    });
    //FIN GUARDAR DEVOLUCION
    //GET ALL CESTAS
    electron_1.ipcMain.on('getAllCestas', (event, data) => {
        cest.getAllCestas().then(res => {
            event.returnValue = res;
        });
    });
    //FIN GET ALL CESTAS
    //LIMPIAR ESTADO EN TRANSITO
    electron_1.ipcMain.on('limpiar-enTransito', (event, data) => {
        tick.cleanTransit();
        sincroFicha.cleanFichajes();
        devolu.cleanDevoluciones();
        movi.cleanMovimientos();
        sincro.cleanCajas();
    });
    //FIN LIMPIAR ESTADO EN TRANSITO
    //ACTUALIZAR ULTIMO CODIGO DE BARRAS
    electron_1.ipcMain.on('actualizar-ultimo-codigo-barras', (event, data) => {
        codiBarra.actualizarUltimoCodigoBarras().then(res => {
            event.returnValue = true;
        });
    });
    //FIN ACTUALIZAR ULTIMO CODIGO DE BARRAS
    //SET CONFIGURACION NUEVA PARAMETROS
    electron_1.ipcMain.on('nueva-configuracion', (event, data) => {
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
    electron_1.ipcMain.on('get-ultimo-codigo-barras', (event, data) => {
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
    //INICIO CALCULAR EAN13
    electron_1.ipcMain.on("calcular-ean13", (event, data) => {
        event.returnValue = Ean13Utils.generate(data);
    });
    //FINAL CALCULAR EAN13
    // //Guardar primer codigo barras
    // ipcMain.on('guardar-primer-codigo-barras', (event: any, data: any)=>{
    //     codiBarra.guardarPrimero();
    // });
    // //FIN guardar primer codigo barras
    electron_1.ipcMain.on('insertar-nuevos-clientes', (event, data) => {
        cliente.insertarClientes(data).then(info => {
            event.sender.send('nuevo-toast', { tipo: 'success', mensaje: 'Clientes cargados correctamente' });
        });
    });
    electron_1.ipcMain.on('testeoGuapo', (event, args) => {
        // tick.test2(args).then(res=>{
        //     event.returnValue = res;
        // })
    });
    electron_1.ipcMain.on('confirmar-envio', (event, args) => {
        tick.confirmarEnvio(args);
    });
    electron_1.ipcMain.on('confirmar-envio-devolucion', (event, args) => {
        devolu.confirmarEnvioDevo(args);
    });
    electron_1.ipcMain.on('confirmar-envio-fichaje', (event, data) => {
        sincroFicha.confirmarEnvioFichajes(data);
    });
    electron_1.ipcMain.on('devolucion', (event, args) => {
    });
    electron_1.ipcMain.on('anulacion', (event, args) => {
    });
    electron_1.ipcMain.on('consulta', (event, args) => {
    });
    electron_1.ipcMain.on('imprimir', (event, args) => {
        impresora.imprimirTicket(args, event);
    });
    electron_1.ipcMain.on('imprimir-test', (event, args) => {
        impresora.testEze(args, event);
    });
    electron_1.ipcMain.on('imprimirSalidaDinero', (event, args) => {
        impresora.imprimirTicketSalida(args, event);
    });
    electron_1.ipcMain.on('imprimirEntregaDiaria', (event, args) => {
        impresora.entregaDiariaEvent(args, event);
    });
    electron_1.ipcMain.on('abrirCajon', (event, tipoImpresora) => {
        impresora.abrirCajon(tipoImpresora, event);
    });
    electron_1.ipcMain.on('imprimirEntradaDinero', (event, args) => {
        impresora.imprimirTicketEntrada(args, event);
    });
    electron_1.ipcMain.on('imprimirCierreCaja', (event, args) => {
        impresora.imprimirTicketCierreCaja(args, event);
    });
    electron_1.ipcMain.on('cerrarToc', (event, args) => {
        acciones.cerrar(ventanaPrincipal);
    });
    electron_1.ipcMain.on('refreshToc', (event, args) => {
        acciones.refresh(ventanaPrincipal);
    });
});
//# sourceMappingURL=main.js.map