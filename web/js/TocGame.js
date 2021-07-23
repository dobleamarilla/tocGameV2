/* BUENAS EZE QUE TAL */
// import {Cesta} from './Cesta';
// import {conexion} from '@/funciones/conexion';
const TIPO_USB = 'USB';
const TIPO_SERIE = 'SERIE';
const TIPO_CLEARONE = 'CLEARONE';
const TIPO_3G = '3G';
const TIPO_ENTRADA = 'ENTRADA';
const TIPO_SALIDA = 'SALIDA';
const GLOVO = 'CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}';
const DELIVERO = 'CliBoti_000_{3F7EF049-80E2-4935-9366-0DB6DED30B67}';
class TocGame {
    constructor() {
        const info = ipcRenderer.sendSync('getParametros');
        const infoCaja = ipcRenderer.sendSync('getInfoCaja');
        this.clienteSeleccionado = null;
        this.udsAplicar = 1;
        this.esVIP = false;
        this.esDevolucion = false;
        this.esConsumoPersonal = false;
        this.stopNecesario = false;
        this.idClienteVIP = null;
        this.tecladoTarifaEspecial = false;
        this.arrayFichados = [];
        if (info !== null) {
            this.parametros = info;
        }
        else {
            this.parametros = {
                _id: '',
                licencia: 0,
                codigoTienda: 0,
                database: '',
                nombreEmpresa: '',
                nombreTienda: '',
                tipoImpresora: TIPO_USB,
                tipoDatafono: TIPO_CLEARONE,
                impresoraCafeteria: 'NO',
                clearOneCliente: 0,
                clearOneTienda: 0,
                clearOneTpv: 0,
                botonesConPrecios: 'No',
                prohibirBuscarArticulos: 'No',
                token: ''
            };
        }
        if (infoCaja === null) {
            this.caja = {
                _id: "CAJA",
                inicioTime: null,
                finalTime: null,
                idDependienta: null,
                totalApertura: null,
                totalCierre: null,
                calaixFetZ: null,
                descuadre: null,
                infoExtra: {
                    cambioInicial: null,
                    cambioFinal: null,
                    totalSalidas: null,
                    totalEntradas: null,
                    totalEnEfectivo: null,
                    totalTarjeta: null,
                    totalDeuda: null
                },
                primerTicket: null,
                ultimoTicket: null,
                recaudado: null,
                nClientes: null,
                detalleApertura: [],
                detalleCierre: [],
                enviado: false,
                enTransito: false,
                totalDatafono3G: null,
                totalClearOne: null
            };
        }
        else {
            this.caja = infoCaja;
            if (typeof this.caja.infoExtra == "undefined") {
                this.caja.infoExtra = {
                    cambioInicial: null,
                    cambioFinal: null,
                    totalSalidas: null,
                    totalEntradas: null,
                    totalEnEfectivo: null,
                    totalTarjeta: null,
                    totalDeuda: null
                };
            }
        }
    }
    cajaAbierta() {
        if (this.caja.inicioTime === null || this.caja.inicioTime === undefined) {
            if (this.caja.finalTime === null || this.caja.finalTime === undefined) {
                return false;
            }
            else {
                throw 'Error de comportamiento de cajas 1';
                return false;
            }
        }
        else {
            if (this.caja.finalTime === null || this.caja.finalTime === undefined) {
                return true;
            }
            else {
                throw 'Error de comportamiento de cajas 2';
                return true;
            }
        }
    }
    setStopNecesario(x) {
        this.stopNecesario = x;
    }
    getStopNecesario() {
        return this.stopNecesario;
    }
    setUnidades(x) {
        this.udsAplicar = x;
    }
    resetEstados() {
        this.esVIP = false;
        this.esDevolucion = false;
        this.esConsumoPersonal = false;
    }
    getParametros() {
        return this.parametros;
    }
    setCaja(data) {
        this.caja = data;
    }
    todoInstalado() {
        if (this.parametros.licencia !== 0 && this.parametros.codigoTienda !== 0 && this.parametros.database !== '' && this.parametros.nombreEmpresa !== '' && this.parametros.nombreTienda !== '') {
            return true;
        }
        else {
            return false;
        }
    }
    getInicioTimeCaja() {
        return this.caja.inicioTime;
    }
    getTipoImpresora() {
        return this.parametros.tipoImpresora;
    }
    getImpresoraCafeteria() {
        return this.parametros.impresoraCafeteria;
    }
    getTipoDatafono() {
        return this.parametros.tipoDatafono;
    }
    setTipoImpresora(data) {
        this.parametros.tipoImpresora = data;
    }
    setTipoDatafono(data) {
        this.parametros.tipoDatafono = data;
    }
    setImpresoraCafeteria(data) {
        this.parametros.impresoraCafeteria = data;
    }
    setParametros(licencia, codigoTienda, database, nombreEmpresa, nombreTienda, tipoImpresora, impresoraCafeteria, tipoDatafono, botonesConPrecios, prohibirBuscarArticulos, token) {
        this.parametros.licencia = licencia;
        this.parametros.codigoTienda = codigoTienda;
        this.parametros.database = database;
        this.parametros.nombreEmpresa = nombreEmpresa;
        this.parametros.nombreTienda = nombreTienda;
        this.parametros.tipoImpresora = tipoImpresora;
        this.parametros.impresoraCafeteria = impresoraCafeteria;
        this.parametros.tipoDatafono = tipoDatafono;
        this.parametros.botonesConPrecios = botonesConPrecios;
        this.parametros.prohibirBuscarArticulos = prohibirBuscarArticulos;
        this.parametros.token = token;
    }
    setupToc(info) {
        if (info.licencia > 0 && info.codigoTienda > 0 && info.database.length > 0 && info.nombreEmpresa.length > 0 && info.nombreTienda.length > 0 && info.tipoImpresora.length > 0 && info.tipoDatafono.length > 0 && info.token.length > 0) {
            ipcRenderer.send('setParametros', info);
            this.setParametros(info.licencia, info.codigoTienda, info.database, info.nombreEmpresa, info.nombreTienda, info.tipoImpresora, info.impresoraCafeteria, info.tipoDatafono, info.botonesConPrecios, info.prohibirBuscarArticulos, info.token);
            this.descargarDatos();
        }
    }
    descargarDatos() {
        socket.emit('cargar-todo', { licencia: this.parametros.licencia, database: this.parametros.database });
    }
    actualizarTeclado() {
        this.setStopNecesario(true);
        socket.emit('descargar-teclado', { licencia: this.parametros.licencia, database: this.parametros.database, codigoTienda: this.parametros.codigoTienda });
    }
    actualizarTrabajadores() {
        this.setStopNecesario(true);
        socket.emit('descargar-trabajadores', { licencia: this.parametros.licencia, database: this.parametros.database, codigoTienda: this.parametros.codigoTienda });
    }
    hayFichados() {
        if (this.getArrayFichados().length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    activarConsumoPersonal() {
        this.desactivarDevolucion();
        this.limpiarClienteVIP();
        this.esConsumoPersonal = true;
        vueCobrar.activarConsumoPersonal();
    }
    desactivarConsumoPersonal() {
        this.esConsumoPersonal = false;
        vueCobrar.desactivarConsumoPersonal();
    }
    desactivarDevolucion() {
        this.esDevolucion = false;
        vueCobrar.setEsDevolucion(false);
    }
    imprimirTest(texto) {
        ipcRenderer.send('imprimir-test', texto);
    }
    round(value) {
        return Math.trunc(value / 10) * 10;
    }
    nuevaSalidaDinero(cantidad, concepto, tipoExtra, noImprimir = false, idTicket = -100) {
        let codigoBarras = "";
        try {
            if (tipoExtra != 'TARJETA' && tipoExtra != 'TKRS') {
                codigoBarras = this.generarCodigoBarrasSalida();
                codigoBarras = String(ipcRenderer.sendSync("calcular-ean13", codigoBarras));
            }
        }
        catch (err) {
            console.log(err);
        }
        //codigoBarras = this.fixLength12(codigoBarras);
        let objSalida = {
            _id: Date.now(),
            tipo: TIPO_SALIDA,
            valor: cantidad,
            concepto: concepto,
            idTrabajador: this.getCurrentTrabajador()._id,
            codigoBarras: codigoBarras,
            tipoExtra: tipoExtra,
            idTicket: idTicket
        };
        ipcRenderer.send('nuevo-movimiento', objSalida);
        if (!noImprimir) {
            ipcRenderer.send('imprimirSalidaDinero', {
                cantidad: objSalida.valor,
                fecha: objSalida._id,
                nombreTrabajador: this.getCurrentTrabajador().nombre,
                nombreTienda: this.parametros.nombreTienda,
                concepto: objSalida.concepto,
                impresora: this.parametros.tipoImpresora,
                codigoBarras: codigoBarras
            });
        }
    }
    getNumeroTresDigitos(x) {
        let devolver = '';
        if (x < 100 && x >= 10) {
            devolver = '0' + x;
        }
        else {
            if (x < 10 && x >= 0) {
                devolver = '00' + x;
            }
            else {
                devolver = x.toString();
            }
        }
        return devolver;
    }
    fixLength12(numero) {
        numero = numero.split("").reverse().join("");
        let newNum = '';
        for (let i = 0; i < 12; i++) {
            if (numero[i] != undefined)
                newNum += numero[i];
            else
                newNum += '0';
        }
        return newNum.split("").reverse().join("");
    }
    generarCodigoBarrasSalida() {
        let objCodigoBarras = ipcRenderer.sendSync('get-ultimo-codigo-barras');
        if (objCodigoBarras == 999) {
            ipcRenderer.sendSync('resetContadorCodBarras');
        }
        else {
            ipcRenderer.sendSync('actualizar-ultimo-codigo-barras');
        }
        objCodigoBarras = ipcRenderer.sendSync('get-ultimo-codigo-barras');
        let codigoLicenciaStr = this.getNumeroTresDigitos(this.getParametros().licencia);
        let strNumeroCodigosDeBarras = this.getNumeroTresDigitos(objCodigoBarras);
        let codigoFinal = '';
        let digitYear = new Date().getFullYear().toString()[3];
        codigoFinal = `98${codigoLicenciaStr}${digitYear}${this.getNumeroTresDigitos(moment().dayOfYear())}${strNumeroCodigosDeBarras}`;
        return codigoFinal;
    }
    nuevaEntradaDinero(cantidad, concepto) {
        let objEntrada = {
            _id: Date.now(),
            tipo: TIPO_ENTRADA,
            valor: cantidad,
            concepto: concepto,
            idTrabajador: this.getCurrentTrabajador()._id
        };
        ipcRenderer.send('nuevo-movimiento', objEntrada);
        // imprimirSalidaDinero({
        //     cantidad: cantidad,
        //     fecha: fecha,
        //     nombreTrabajador: nombreTrabajador,
        //     nombreTienda: nombreTienda,
        //     concepto: concepto
        // });
        ipcRenderer.send('imprimirEntradaDinero', {
            cantidad: objEntrada.valor,
            fecha: objEntrada._id,
            nombreTrabajador: this.getCurrentTrabajador().nombre,
            nombreTienda: this.parametros.nombreTienda,
            concepto: objEntrada.concepto,
            impresora: this.parametros.tipoImpresora
        });
    }
    addFichado(trabajador) {
        this.setCurrentTrabajador(trabajador._id);
        this.arrayFichados.push(trabajador);
        var auxTime = new Date();
        let objGuardar = {
            _id: Date.now(),
            infoFichaje: {
                idTrabajador: trabajador._id,
                fecha: {
                    year: auxTime.getFullYear(),
                    month: auxTime.getMonth(),
                    day: auxTime.getDate(),
                    hours: auxTime.getHours(),
                    minutes: auxTime.getMinutes(),
                    seconds: auxTime.getSeconds()
                }
            },
            tipo: "ENTRADA"
        };
        ipcRenderer.send('guardar-sincro-fichaje', objGuardar);
        ipcRenderer.send('fichar-trabajador', trabajador._id);
    }
    delFichado(trabajador) {
        this.arrayFichados = this.arrayFichados.filter(item => {
            return item._id != trabajador._id;
        });
        ipcRenderer.send('desfichar-trabajador', trabajador._id);
        var auxTime = new Date();
        let objGuardar = {
            _id: Date.now(),
            infoFichaje: {
                idTrabajador: trabajador._id,
                fecha: {
                    year: auxTime.getFullYear(),
                    month: auxTime.getMonth(),
                    day: auxTime.getDate(),
                    hours: auxTime.getHours(),
                    minutes: auxTime.getMinutes(),
                    seconds: auxTime.getSeconds()
                }
            },
            tipo: "SALIDA"
        };
        ipcRenderer.send('guardar-sincro-fichaje', objGuardar);
    }
    abrirCaja(data) {
        this.setCaja(data);
        ipcRenderer.send('actualizar-info-caja', data);
        vueApertura.cerrarModal();
        vueToast.abrir('success', 'CAJA ABIERTA');
        this.iniciar();
    }
    setArrayFichados(arrayFichados) {
        if (arrayFichados.length > 0) {
            this.arrayFichados = arrayFichados;
        }
        else {
            this.arrayFichados = [];
        }
    }
    getArrayFichados() {
        return this.arrayFichados;
    }
    getCurrentTrabajador() {
        if (this.getArrayFichados().length > 0) {
            return this.getArrayFichados()[(this.getArrayFichados().length) - 1];
        }
        else {
            return false;
        }
    }
    setCurrentTrabajador(idTrabajador) {
        var fichados = this.getArrayFichados();
        if (fichados.length > 0) {
            var aux = this.getCurrentTrabajador();
            for (let i = 0; i < fichados.length; i++) {
                if (fichados[i].idTrabajador === idTrabajador) {
                    fichados[fichados.length - 1] = fichados[i];
                    fichados[i] = aux;
                    this.setArrayFichados(fichados);
                    return true;
                }
            }
        }
        else {
            vueToast.abrir('error', 'NO HAY PERSONAL FICHADO');
            return false;
        }
    }
    clickMenu(nombreMenu) {
        ipcRenderer.send('get-teclas', nombreMenu);
    }
    borrarCesta() {
        ipcRenderer.send('borrar-cesta', this.cesta._id);
        const nuevaCesta = {
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
        this.setCesta(nuevaCesta);
    }
    recalcularIvas(cesta) {
        cesta.tiposIva = {
            base1: 0,
            base2: 0,
            base3: 0,
            valorIva1: 0,
            valorIva2: 0,
            valorIva3: 0,
            importe1: 0,
            importe2: 0,
            importe3: 0
        };
        for (let i = 0; i < cesta.lista.length; i++) {
            if (cesta.lista[i].promocion.esPromo === false) {
                let infoArticulo = this.getInfoArticulo(cesta.lista[i]._id);
                cesta.tiposIva = construirObjetoIvas(infoArticulo, cesta.lista[i].unidades, cesta.tiposIva);
            }
            else {
                if (cesta.lista[i].promocion.esPromo === true) {
                    if (cesta.lista[i].nombre == 'Oferta combo') {
                        let infoArticuloPrincipal = this.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                        infoArticuloPrincipal.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                        cesta.tiposIva = construirObjetoIvas(infoArticuloPrincipal, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
                        let infoArticuloSecundario = this.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idSecundario);
                        infoArticuloSecundario.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealSecundario / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadSecundario);
                        cesta.tiposIva = construirObjetoIvas(infoArticuloSecundario, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadSecundario, cesta.tiposIva);
                    }
                    else {
                        if (cesta.lista[i].nombre == 'Oferta individual') {
                            let infoArticulo = this.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                            infoArticulo.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                            cesta.tiposIva = construirObjetoIvas(infoArticulo, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
                        }
                    }
                }
            }
        }
        return cesta;
    }
    borrarItemCesta(index) {
        this.cesta.lista.splice(index, 1);
        this.cesta = this.recalcularIvas(this.cesta);
        if (this.cesta.lista.length > 0) {
            this.setCesta(this.cesta);
        }
        else {
            this.borrarCesta();
        }
    }
    getCesta() {
        return this.cesta;
    }
    setCesta(data) {
        for (let i = 0; i < data.lista.length; i++) {
            data.lista[i].subtotal = Number(data.lista[i].subtotal.toFixed(2));
        }
        ipcRenderer.send('set-cesta', data);
        this.cesta = data;
        this.enviarCesta();
    }
    cargarCesta() {
        ipcRenderer.send('get-cesta');
    }
    enviarCesta() {
        vueCesta.recibirCesta(this.cesta);
    }
    deshacerOfertas(cesta) {
        return cesta;
    }
    existeArticuloParaOfertaEnCesta(cesta, idArticulo, unidadesNecesarias) {
        for (let i = 0; i < cesta.lista.length; i++) {
            if (cesta.lista[i]._id === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias) {
                return i;
            }
        }
        return -1; //IMPORTANTE QUE SEA ESTE VALOR SINO HAY SECUNDARIO
    }
    calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidadesOferta, precioTotalOferta) {
        let precioSinOfertaPrincipal = 0;
        let precioSinOfertaSecundario = 0;
        let precioTotalSinOferta = 0;
        if (idPrincipal != 0) {
            precioSinOfertaPrincipal = ipcRenderer.sendSync('getPrecioArticulo', idPrincipal);
        }
        if (idSecundario != 0) {
            precioSinOfertaSecundario = ipcRenderer.sendSync('getPrecioArticulo', idSecundario);
        }
        if (tipoPromo === 1) //COMBO
         {
            precioTotalSinOferta = (precioSinOfertaPrincipal * cantidadPrincipal + precioSinOfertaSecundario * cantidadSecundario) * unidadesOferta;
        }
        var dto = (precioTotalSinOferta - precioTotalOferta) / precioTotalSinOferta;
        return {
            precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal * dto)) * unidadesOferta * cantidadPrincipal,
            precioRealSecundario: (precioSinOfertaSecundario - (precioSinOfertaSecundario * dto)) * unidadesOferta * cantidadSecundario
        };
    }
    calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidadesOferta, precioTotalOferta) {
        let precioSinOfertaPrincipal = 0;
        let precioTotalSinOferta = 0;
        if (idPrincipal != 0) {
            precioSinOfertaPrincipal = ipcRenderer.sendSync('getPrecioArticulo', idPrincipal);
        }
        if (tipoPromo === 2) //INDIVIDUAL
         {
            if (idPrincipal != 0) {
                precioTotalSinOferta = precioSinOfertaPrincipal * cantidadPrincipal * unidadesOferta;
            }
        }
        var dto = (precioTotalSinOferta - precioTotalOferta) / precioTotalSinOferta;
        return {
            precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal * dto)) * unidadesOferta * cantidadPrincipal
        };
    }
    insertarLineaPromoCestaCombo(cesta, tipoPromo, unidades, total, idPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario) {
        var dtoAplicado = this.calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidades, total);
        if (tipoPromo === 1) //COMBO
         {
            cesta.lista.push({
                _id: -2,
                nombre: 'Oferta combo',
                unidades: unidades,
                subtotal: total,
                promocion: {
                    _id: idPromo,
                    esPromo: true,
                    infoPromo: {
                        idPrincipal: idPrincipal,
                        cantidadPrincipal: cantidadPrincipal,
                        idSecundario: idSecundario,
                        cantidadSecundario: cantidadSecundario,
                        precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                        precioRealSecundario: dtoAplicado.precioRealSecundario,
                        unidadesOferta: unidades
                    }
                }
            });
        }
        return cesta;
    }
    insertarLineaPromoCestaIndividual(cesta, tipoPromo, unidades, total, idPromo, idPrincipal, cantidadPrincipal) {
        var dtoAplicado = this.calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidades, total);
        if (tipoPromo === 2) //INDIVIDUAL
         {
            cesta.lista.push({
                _id: -2,
                nombre: 'Oferta individual',
                unidades: unidades,
                subtotal: total,
                promocion: {
                    _id: idPromo,
                    esPromo: true,
                    infoPromo: {
                        idPrincipal: idPrincipal,
                        cantidadPrincipal: cantidadPrincipal,
                        idSecundario: 0,
                        cantidadSecundario: 0,
                        precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                        precioRealSecundario: 0,
                        unidadesOferta: unidades
                    }
                }
            });
        }
        return cesta;
    }
    limpiarCesta(unaCesta, posicionPrincipal, posicionSecundario, sobraCantidadPrincipal, sobraCantidadSecundario, pideDelA, pideDelB) {
        if (pideDelA != -1) {
            if (sobraCantidadPrincipal > 0) {
                const datosArticulo = this.getInfoArticulo(unaCesta.lista[posicionPrincipal]._id);
                unaCesta.lista[posicionPrincipal].unidades = sobraCantidadPrincipal;
                unaCesta.lista[posicionPrincipal].subtotal = sobraCantidadPrincipal * datosArticulo.precioConIva;
            }
            else {
                unaCesta.lista.splice(posicionPrincipal, 1);
            }
        }
        if (pideDelB != -1) {
            if (sobraCantidadSecundario > 0) {
                const datosArticulo = this.getInfoArticulo(unaCesta.lista[posicionSecundario]._id);
                unaCesta.lista[posicionSecundario].unidades = sobraCantidadSecundario;
                unaCesta.lista[posicionSecundario].subtotal = sobraCantidadSecundario * datosArticulo.precioConIva;
            }
            else {
                if (posicionSecundario > posicionPrincipal) {
                    unaCesta.lista.splice(posicionSecundario - 1, 1);
                }
                else {
                    unaCesta.lista.splice(posicionSecundario, 1);
                }
            }
        }
        return unaCesta;
    }
    teLoAplicoTodo(necesariasPrincipal, necesariasSecundario, cesta, posicionPrincipal, posicionSecundario, pideDelA, pideDelB, precioPromo, idPromo) {
        let numeroPrincipal = 0;
        let numeroSecundario = 0;
        let sobranPrincipal = 0;
        let sobranSecundario = 0;
        let nVeces = 0;
        var idPrincipal = (typeof cesta.lista[posicionPrincipal] !== "undefined") ? cesta.lista[posicionPrincipal]._id : 0;
        var idSecundario = (typeof cesta.lista[posicionSecundario] !== "undefined") ? cesta.lista[posicionSecundario]._id : 0;
        if (pideDelA !== -1 && pideDelB !== -1) {
            numeroPrincipal = cesta.lista[posicionPrincipal].unidades / necesariasPrincipal;
            numeroSecundario = cesta.lista[posicionSecundario].unidades / necesariasSecundario;
            nVeces = Math.trunc(Math.min(numeroPrincipal, numeroSecundario));
            sobranPrincipal = cesta.lista[posicionPrincipal].unidades - nVeces * necesariasPrincipal;
            sobranSecundario = cesta.lista[posicionSecundario].unidades - nVeces * necesariasSecundario;
            cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
            cesta = this.insertarLineaPromoCestaCombo(cesta, 1, nVeces, precioPromo * nVeces, idPromo, idPrincipal, idSecundario, necesariasPrincipal, necesariasSecundario);
        }
        else {
            if (pideDelA !== -1 && pideDelB === -1) {
                numeroPrincipal = cesta.lista[posicionPrincipal].unidades / necesariasPrincipal;
                nVeces = Math.trunc(numeroPrincipal);
                sobranPrincipal = cesta.lista[posicionPrincipal].unidades - nVeces * necesariasPrincipal;
                cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                cesta = this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo * nVeces * necesariasPrincipal, idPromo, idPrincipal, necesariasPrincipal);
            }
            else {
                if (pideDelA === -1 && pideDelB !== -1) {
                    numeroSecundario = cesta.lista[posicionSecundario].unidades / necesariasSecundario;
                    nVeces = Math.trunc(numeroSecundario);
                    sobranSecundario = cesta.lista[posicionSecundario].unidades - nVeces * necesariasSecundario;
                    cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                    cesta = this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo * nVeces * necesariasSecundario, idPromo, idPrincipal, necesariasPrincipal); //se trata como si fueran principales
                }
            }
        }
        return cesta;
    }
    buscarOfertas(unaCesta, viejoIva) {
        var hayOferta = false;
        unaCesta = this.deshacerOfertas(unaCesta); //ahora no hace nada
        for (let i = 0; i < this.promociones.length; i++) {
            for (let j = 0; j < this.promociones[i].principal.length; j++) {
                let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal);
                if (this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0) {
                    for (let z = 0; z < this.promociones[i].secundario.length; z++) {
                        let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
                        if (this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0) {
                            unaCesta = this.teLoAplicoTodo(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id, this.promociones[i].precioFinal, this.promociones[i]._id);
                            hayOferta = true;
                            break;
                        }
                    }
                }
            }
        }
        if (hayOferta) {
            unaCesta.tiposIva = viejoIva; //No se suma IVA en la promoción para calcularlo en la siguiente línea.
            unaCesta = this.recalcularIvas(unaCesta);
        }
        this.setCesta(unaCesta);
    }
    quitarClienteSeleccionado() {
        vueCesta.limpiarEstiloClienteActivo();
        this.clienteSeleccionado = null;
        vueCesta.puntosClienteActivo = 0;
        if (this.tecladoTarifaEspecial) {
            this.tecladoTarifaEspecial = false;
            this.iniciar();
        }
    }
    insertarArticuloCesta(infoArticulo, unidades, infoAPeso = null) {
        var miCesta = this.getCesta();
        if (miCesta.lista.length > 0) {
            let encontrado = false;
            for (let i = 0; i < miCesta.lista.length; i++) {
                if (miCesta.lista[i]._id === infoArticulo._id) {
                    var viejoIva = miCesta.tiposIva;
                    if (infoAPeso == null) {
                        miCesta.lista[i].unidades += unidades;
                        miCesta.lista[i].subtotal += unidades * infoArticulo.precioConIva;
                        miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, viejoIva);
                    }
                    else {
                        miCesta.lista[i].subtotal += infoAPeso.precioAplicado;
                        miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, viejoIva, infoAPeso);
                    }
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                if (infoAPeso == null) {
                    miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: unidades * infoArticulo.precioConIva });
                    miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
                }
                else {
                    miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: infoAPeso.precioAplicado });
                    miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
                }
            }
        }
        else {
            if (infoAPeso == null) {
                miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: unidades * infoArticulo.precioConIva });
                miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
            }
            else {
                miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: infoAPeso.precioAplicado });
                miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
            }
        }
        if (toc.clienteSeleccionado === null) {
            this.buscarOfertas(miCesta, viejoIva);
        }
        else {
            if (this.clienteSeleccionado.id != GLOVO && this.clienteSeleccionado.id != DELIVERO) {
                this.buscarOfertas(miCesta, viejoIva);
            }
        }
    }
    getInfoArticulo(idArticulo) {
        if (!this.tecladoTarifaEspecial) {
            return ipcRenderer.sendSync('get-info-articulo', idArticulo);
        }
        else {
            return ipcRenderer.sendSync('get-info-articulo-tarifa-especial', idArticulo);
        }
    }
    addItem(idArticulo, idBoton, aPeso, infoAPeso = null) {
        var unidades = this.udsAplicar;
        if (this.cajaAbierta()) {
            try {
                $('#' + idBoton).attr('disabled', true);
                if (!aPeso) //TIPO NORMAL
                 {
                    let infoArticulo = this.getInfoArticulo(idArticulo);
                    if (infoArticulo) //AQUI PENSAR ALGUNA COMPROBACIÓN CUANDO NO EXISTA O FALLE ESTE GET
                     {
                        this.insertarArticuloCesta(infoArticulo, unidades);
                    }
                    else {
                        vueToast.abrir('error', 'Este artículo tiene errores');
                    }
                }
                else //TIPO PESO
                 {
                    this.insertarArticuloCesta(infoAPeso.infoArticulo, 1, infoAPeso);
                }
                $('#' + idBoton).attr('disabled', false);
            }
            catch (err) {
                console.log(err);
                vueToast.abrir('error', 'Error al añadir el articulo');
                $('#' + idBoton).attr('disabled', false);
                this.udsAplicar = 1;
            }
        }
        else {
            vueToast.abrir('danger', 'Se requiere una caja abierta para cobrar');
        }
        this.udsAplicar = 1;
    }
    abrirModalPago() {
        // let total = 0;
        // let cesta = this.getCesta();
        // for(let i = 0; i < cesta.lista.length; i++)
        // {
        //     total += cesta.lista[i].subtotal;
        // }
        vueCobrar.prepararModalVenta(Number(vueCesta.getTotal), this.getArrayFichados());
        vueCobrar.abreModal();
    }
    getUltimoTicket() {
        const ultimo = ipcRenderer.sendSync('getUltimoTicket');
        if (ultimo.length > 0) {
            return ultimo[0]._id;
        }
        else {
            const info = ipcRenderer.sendSync('getParametros');
            if (info !== null || info !== undefined) {
                return info.ultimoTicket;
            }
            else {
                vueToast('error', 'Error. Contactar con un técnico');
                return 0;
            }
        }
    }
    crearTicket(tipo, total, infoTkrs) {
        console.log(tipo);
        switch (tipo) {
            case 'TARJETA 3G':
                this.parametros.tipoDatafono = TIPO_3G;
                break;
            case 'TARJETA':
                this.parametros.tipoDatafono = TIPO_CLEARONE;
                break;
        }
        if (this.cesta.lista.length > 0) {
            const infoTrabajador = this.getCurrentTrabajador();
            const nuevoIdTicket = this.getUltimoTicket() + 1;
            var objTicket = {
                _id: nuevoIdTicket,
                timestamp: Date.now(),
                total: total,
                lista: this.cesta.lista,
                tipoPago: (tipo == 'TARJETA 3G') ? 'TARJETA' : (tipo),
                idTrabajador: infoTrabajador._id,
                tiposIva: this.cesta.tiposIva,
                cliente: this.hayClienteSeleccionado() ? this.clienteSeleccionado.id : null,
                infoClienteVip: {
                    esVip: false,
                    nif: '',
                    nombre: '',
                    cp: '',
                    direccion: '',
                    ciudad: ''
                }
            };
            if (tipo === "TICKET_RESTAURANT" || infoTkrs.tkrs === true) {
                if (infoTkrs.totalTkrs > 0) {
                    objTicket["cantidadTkrs"] = infoTkrs.totalTkrs;
                    const diferencia = total - infoTkrs.totalTkrs;
                    if (diferencia >= 0) { //NO SOBRA NADA
                        this.nuevaSalidaDinero(Number(total.toFixed(2)), `Pagat TkRs (TkRs): ${objTicket._id}`, 'TKRS_SIN_EXCESO', true, objTicket._id);
                    }
                    else { //HAY EXCESO
                        this.nuevaSalidaDinero(Number((diferencia * -1).toFixed(2)), `Pagat TkRs (TkRs): ${objTicket._id}`, 'TKRS_CON_EXCESO', true, objTicket._id);
                        this.nuevaSalidaDinero(Number(total.toFixed(2)), `Pagat TkRs (TkRs): ${objTicket._id}`, 'TKRS_SIN_EXCESO', true, objTicket._id);
                    }
                }
                else {
                    vueToast('error', 'Error. Importe TICKET RESTAURANT incorrecto');
                }
            }
            if (tipo === "DEUDA") {
                objTicket.tipoPago = "DEUDA";
                objTicket.infoClienteVip.nif = this.infoClienteVip.datos.nif;
                objTicket.infoClienteVip.nombre = this.infoClienteVip.datos.nombre;
                objTicket.infoClienteVip.cp = this.infoClienteVip.datos.cp;
                objTicket.infoClienteVip.direccion = this.infoClienteVip.datos.direccion;
                objTicket.infoClienteVip.ciudad = this.infoClienteVip.datos.Ciudad;
                objTicket.infoClienteVip.esVip = true;
            }
            if (tipo === "EFECTIVO") {
                objTicket.tipoPago = "EFECTIVO";
                ipcRenderer.send('abrirCajon', this.parametros.tipoImpresora);
            }
            if (this.esDevolucion) { //REVISAR
                objTicket.tipoPago = "DEVOLUCION";
            }
            if (tipo === "CONSUMO_PERSONAL") {
                objTicket.tipoPago = "CONSUMO_PERSONAL";
            }
            if (tipo === "TARJETA") {
                objTicket.tipoPago = "TARJETA";
            }
            if (tipo === "EFECTIVO" || tipo === 'TICKET_RESTAURANT' || tipo === "DEUDA" || tipo === "DEVOLUCION" || tipo === "CONSUMO_PERSONAL") {
                if (tipo === "DEVOLUCION") {
                    objTicket._id = Date.now();
                    ipcRenderer.send('guardarDevolucion', objTicket);
                    const paramsTicket = ipcRenderer.sendSync('get-params-ticket');
                    const infoClienteVip = { esVip: false };
                    const paraImprimir = {
                        numFactura: 0,
                        arrayCompra: objTicket.lista,
                        total: objTicket.total,
                        visa: objTicket.tipoPago,
                        tiposIva: objTicket.tiposIva,
                        cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato : '',
                        pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato : '',
                        nombreTrabajador: this.getCurrentTrabajador().nombre,
                        impresora: this.parametros.tipoImpresora,
                        infoClienteVip: infoClienteVip
                    };
                    ipcRenderer.send('imprimir', paraImprimir);
                }
                else {
                    if (tipo === "CONSUMO_PERSONAL") {
                        objTicket.total = 0;
                        //this.nuevaSalidaDinero(0, 'Consum personal', 'CONSUMO_PERSONAL', true);
                    }
                    else {
                        if (tipo === "DEUDA") {
                            this.nuevaSalidaDinero(Number((total).toFixed(2)), `Deute client: ${objTicket._id}`, 'DEUDA', true);
                        }
                    }
                    ipcRenderer.send('set-ticket', objTicket); //esto inserta un nuevo ticket, nombre malo
                    ipcRenderer.send('set-ultimo-ticket-parametros', objTicket._id);
                }
                this.borrarCesta();
                vueCobrar.setEsperando(false);
                vueCobrar.cerrarModal();
                vueToast.abrir('success', 'Ticket creado');
                this.quitarClienteSeleccionado();
            }
            else {
                if (tipo === "TARJETA" || tipo === 'TARJETA 3G') {
                    if (this.parametros.tipoDatafono === TIPO_CLEARONE) {
                        vueCobrar.activoEsperaDatafono();
                        ipcRenderer.send('ventaDatafono', {
                            objTicket: objTicket,
                            nombreDependienta: infoTrabajador.nombre,
                            idTicket: nuevoIdTicket,
                            total: Number((total * 100).toFixed(2)).toString(),
                            clearOneCliente: this.parametros.clearOneCliente,
                            clearOneTienda: this.parametros.clearOneTienda,
                            clearOneTpv: this.parametros.clearOneTpv
                        });
                        this.auxTotalDatafono = Number((total).toFixed(2));
                    }
                    else {
                        if (this.parametros.tipoDatafono === TIPO_3G) {
                            ipcRenderer.send('set-ticket', objTicket); //esto inserta un nuevo ticket, nombre malo
                            ipcRenderer.send('set-ultimo-ticket-parametros', objTicket._id);
                            this.nuevaSalidaDinero(Number((total).toFixed(2)), 'Targeta 3G', 'TARJETA', true, objTicket._id);
                            /*let pagadoTarjeta = `Pagat Targeta: ${objTicket._id}`;
                            this.nuevaSalidaDinero(Number((total).toFixed(2)), pagadoTarjeta, pagadoTarjeta, true);*/
                            this.borrarCesta();
                            vueToast.abrir('success', 'Ticket creado');
                            this.quitarClienteSeleccionado();
                            vueCobrar.setEsperando(false);
                            vueCobrar.cerrarModal();
                        }
                    }
                }
            }
            if (this.parametros.licencia == 872)
                toc.imprimirTicket(objTicket._id);
            this.datafonoForzado3G = false;
            this.resetEstados();
            if (tipo != "TARJETA" || this.datafonoForzado3G) {
                vueCobrar.resetEstados();
            }
        }
        else {
            vueToast.abrir('error', 'Error. No se ha podido crear el ticket');
            this.borrarCesta();
            vueCobrar.setEsperando(false);
            vueCobrar.cerrarModal();
            this.quitarClienteSeleccionado();
        }
    }
    limpiarDevolucion() {
        this.esDevolucion = false;
        this.esConsumoPersonal = false;
        vueCobrar.resetEstados();
    }
    getUrlPedidos() {
        var url = '';
        if (this.parametros.database === 'Fac_Tena') {
            url = `http://silema.hiterp.com/TpvWebReposicion.asp?modo=MENU&codiBotiga=${this.parametros.codigoTienda}`;
        }
        return url;
    }
    devolucion() {
        this.desactivarConsumoPersonal();
        this.limpiarClienteVIP();
        this.esDevolucion = true;
        vueCobrar.setEsDevolucion(true);
    }
    controlRespuestaDatafono(respuesta) {
        vueCobrar.desactivoEsperaDatafono();
        let respuestaTexto = "";
        for (let i = 0; i < respuesta.data.length; i++) {
            respuestaTexto += String.fromCharCode(respuesta.data[i]);
        }
        ipcRenderer.send("insertarError", { error: respuestaTexto, numeroTicket: respuesta.objTicket._id, arrayBytes: respuesta.data });
        //Primero STX, segundo estado transacción: correcta = 48, incorrecta != 48
        if (respuestaTexto.includes("DENEGADA") == false && respuestaTexto.includes("denegada") == false && respuestaTexto.includes("ERROR") == false && respuestaTexto.includes("error") == false && respuesta.data[0] == 2 && respuesta.data[1] == 48 && respuesta.data[2] == 59) { //SERÁ ACEPTADA
            this.nuevaSalidaDinero(this.auxTotalDatafono, 'Targeta', 'TARJETA', true, respuesta.objTicket._id);
            ipcRenderer.send('set-ticket', respuesta.objTicket);
            ipcRenderer.send('set-ultimo-ticket-parametros', respuesta.objTicket._id);
            /*var pagadoTarjeta = "Pagat Targeta: " +  respuesta.objTicket._id;
            this.nuevaSalidaDinero(this.auxTotalDatafono, pagadoTarjeta, pagadoTarjeta, true);*/
            this.borrarCesta();
            vueCobrar.cerrarModal();
            vueToast.abrir('success', 'Ticket creado');
        }
        else { //SERÁ DENEGADA
            console.log("Data clearOne: ", respuesta.data);
            vueToast.abrir('error', 'Operación DENEGADA');
            // ipcRenderer.send('change-pinpad');
        }
        this.quitarClienteSeleccionado();
    }
    abreModalSalidaDinero() {
        $('#vueModalSalidaDinero').modal();
    }
    abrirModalCaja() {
        const arrayCompletoTickets = ipcRenderer.sendSync('get-tickets-caja-abierta', this.caja.inicioTime); //TODOS LOS TICKETS (SIN LÍMITE) DE LA CAJA ACTUAL.
        vueCaja.setArrayTotal(arrayCompletoTickets);
        const arrayTickets = ipcRenderer.sendSync('get-tickets');
        vueCaja.cargarListaTickets(arrayTickets);
        vueCaja.abreModal();
    }
    borrarCaja() {
        this.caja = {
            _id: "CAJA",
            inicioTime: null,
            finalTime: null,
            idDependienta: null,
            totalApertura: null,
            totalCierre: null,
            calaixFetZ: null,
            descuadre: null,
            infoExtra: {
                cambioInicial: null,
                cambioFinal: null,
                totalSalidas: null,
                totalEntradas: null,
                totalEnEfectivo: null,
                totalTarjeta: null,
                totalDeuda: null
            },
            primerTicket: null,
            ultimoTicket: null,
            recaudado: null,
            nClientes: null,
            detalleApertura: [],
            detalleCierre: [],
            enviado: false,
            enTransito: false,
            totalDatafono3G: null,
            totalClearOne: null
        };
        ipcRenderer.send('actualizar-info-caja', this.caja);
    }
    cerrarCaja(total, detalleCierre, guardarInfoMonedas, totalDatafono3G, totalClearOne) {
        this.caja.totalCierre = total;
        this.caja.detalleCierre = detalleCierre;
        this.caja.finalTime = Date.now();
        this.caja.idDependienta = this.getCurrentTrabajador()._id;
        this.caja.totalDatafono3G = totalDatafono3G;
        this.caja.totalClearOne = totalClearOne;
        this.caja = this.calcularDatosCaja(this.caja);
        var infoDeliveroo = ipcRenderer.sendSync('getDedudaDeliveroo', { inicio: this.caja.inicioTime, final: this.caja.finalTime });
        var deudaDeliveroo = 0;
        var infoGlovo = ipcRenderer.sendSync('getDedudaGlovo', { inicio: this.caja.inicioTime, final: this.caja.finalTime });
        var deudaGlovo = 0;
        var infoTkrs = ipcRenderer.sendSync('getTotalTkrs', { inicio: this.caja.inicioTime, final: this.caja.finalTime });
        var totalTkrs = 0;
        if (infoDeliveroo.length > 0) {
            deudaDeliveroo = infoDeliveroo[0].suma;
        }
        if (infoGlovo.length > 0) {
            deudaGlovo = infoGlovo[0].suma;
        }
        if (infoTkrs.length > 0) {
            totalTkrs = infoTkrs[0].suma;
        }
        let objEmail = {
            caja: this.caja,
            nombreTienda: this.getParametros().nombreTienda,
            nombreDependienta: this.getCurrentTrabajador().nombre,
            arrayMovimientos: ipcRenderer.sendSync('get-rango-movimientos', { fechaInicio: this.caja.inicioTime, fechaFinal: this.caja.finalTime }),
            deudaGlovo: deudaGlovo,
            deudaDeliveroo: deudaDeliveroo,
            totalTkrs: totalTkrs
        };
        ipcRenderer.send('guardarCajaSincro', this.caja);
        ipcRenderer.send('enviar-email', objEmail);
        ipcRenderer.send('set-monedas', guardarInfoMonedas);
        this.borrarCaja();
        vueCaja.cerrarModal();
        this.iniciar();
    }
    calcularDatosCaja(unaCaja) {
        var arrayTicketsCaja = ipcRenderer.sendSync('getTicketsIntervalo', unaCaja);
        var arrayMovimientos = ipcRenderer.sendSync('get-rango-movimientos', { fechaInicio: unaCaja.inicioTime, fechaFinal: unaCaja.finalTime });
        var totalTickets = 0;
        var nombreTrabajador = this.getCurrentTrabajador().nombre;
        var descuadre = 0;
        var nClientes = 0;
        if (arrayTicketsCaja.length > 0) {
            this.caja.primerTicket = arrayTicketsCaja[0]._id;
            this.caja.ultimoTicket = arrayTicketsCaja[arrayTicketsCaja.length - 1]._id;
        }
        var nombreTienda = this.parametros.nombreTienda;
        var fechaInicio = this.caja.inicioTime;
        var totalTarjeta = 0;
        var totalEnEfectivo = 0;
        var cambioInicial = this.caja.totalApertura;
        var cambioFinal = this.caja.totalCierre;
        var totalSalidas = 0;
        var totalEntradas = 0;
        var recaudado = 0; //this.caja.totalCierre-this.caja.totalApertura + totalSalidas - totalEntradas;
        var totalDeuda = 0;
        for (let i = 0; i < arrayMovimientos.length; i++) {
            if (arrayMovimientos[i].tipo === TIPO_SALIDA) {
                if (arrayMovimientos[i].tipoExtra != 'CONSUMO_PERSONAL') {
                    totalSalidas += arrayMovimientos[i].valor;
                }
            }
            else {
                if (arrayMovimientos[i].tipo === TIPO_ENTRADA) {
                    totalEntradas += arrayMovimientos[i].valor;
                }
            }
        }
        for (let i = 0; i < arrayTicketsCaja.length; i++) {
            nClientes++;
            totalTickets += arrayTicketsCaja[i].total;
            switch (arrayTicketsCaja[i].tipoPago) {
                case "TARJETA":
                    totalTarjeta += arrayTicketsCaja[i].total;
                    break;
                case "EFECTIVO":
                    recaudado += arrayTicketsCaja[i].total;
                    totalEnEfectivo += arrayTicketsCaja[i].total;
                    break;
                case "DEUDA":
                    totalDeuda += arrayTicketsCaja[i].total;
                    break;
                case "TICKET_RESTAURANT":
                    recaudado += arrayTicketsCaja[i].total;
                    totalEnEfectivo += arrayTicketsCaja[i].total;
                    break;
            }
        }
        this.caja.calaixFetZ = totalTickets;
        this.caja.infoExtra.cambioFinal = cambioFinal;
        this.caja.infoExtra.cambioInicial = cambioInicial;
        this.caja.infoExtra.totalSalidas = totalSalidas;
        this.caja.infoExtra.totalEntradas = totalEntradas;
        this.caja.infoExtra.totalEnEfectivo = totalEnEfectivo;
        this.caja.infoExtra.totalTarjeta = totalTarjeta;
        this.caja.infoExtra.totalDeuda = totalDeuda;
        descuadre = cambioFinal - cambioInicial + totalSalidas - totalEntradas - totalTickets;
        recaudado = totalTickets + descuadre - totalTarjeta - totalDeuda;
        const objImpresion = {
            calaixFet: totalTickets,
            nombreTrabajador: nombreTrabajador,
            descuadre: descuadre,
            nClientes: nClientes,
            recaudado: recaudado,
            arrayMovimientos: arrayMovimientos,
            nombreTienda: nombreTienda,
            fechaInicio: fechaInicio,
            fechaFinal: this.caja.finalTime,
            totalSalidas: totalSalidas,
            totalEntradas: totalEntradas,
            cInicioCaja: cambioInicial,
            cFinalCaja: cambioFinal,
            impresora: this.parametros.tipoImpresora,
            totalTarjeta: totalTarjeta
        };
        vuePantallaCierre.setVariables(objImpresion);
        try {
            this.imprimirCierreCaja(objImpresion);
        }
        catch (err) {
            vueToast.abrir('error', 'Impresora no detectada');
            console.log(err);
        }
        unaCaja.descuadre = descuadre;
        unaCaja.nClientes = nClientes;
        unaCaja.recaudado = recaudado;
        return unaCaja;
    }
    imprimirTicket(idTicket) {
        const paramsTicket = ipcRenderer.sendSync('get-params-ticket');
        const infoTicket = ipcRenderer.sendSync('get-info-un-ticket', idTicket);
        const infoTrabajador = ipcRenderer.sendSync('get-infotrabajador-id', infoTicket.idTrabajador);
        var sendObject;
        if (infoTicket.cliente != null && infoTicket.tipoPago != 'DEUDA') {
            let infoCliente = ipcRenderer.sendSync("getClienteByID", infoTicket.cliente);
            var auxNombre = '';
            if (infoCliente.length > 0) {
                auxNombre = infoCliente[0].nombre;
            }
            else {
                auxNombre = '';
            }
            sendObject = {
                numFactura: infoTicket._id,
                arrayCompra: infoTicket.lista,
                total: infoTicket.total,
                visa: infoTicket.tipoPago,
                tiposIva: infoTicket.tiposIva,
                cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato : '',
                pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato : '',
                nombreTrabajador: infoTrabajador.nombreCorto,
                impresora: this.parametros.tipoImpresora,
                infoClienteVip: infoTicket.infoClienteVip,
                infoCliente: {
                    nombre: auxNombre,
                    puntos: 0
                }
            };
            getPuntosCliente(infoTicket.cliente, true, sendObject);
        }
        else {
            sendObject = {
                numFactura: infoTicket._id,
                arrayCompra: infoTicket.lista,
                total: infoTicket.total,
                visa: infoTicket.tipoPago,
                tiposIva: infoTicket.tiposIva,
                cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato : '',
                pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato : '',
                nombreTrabajador: infoTrabajador.nombreCorto,
                impresora: this.parametros.tipoImpresora,
                infoClienteVip: infoTicket.infoClienteVip,
                infoCliente: null
            };
            ipcRenderer.send('imprimir', sendObject);
        }
    }
    imprimirCierreCaja(info) {
        ipcRenderer.send('imprimirCierreCaja', info);
    }
    seleccionarCliente(cliente) {
        vueCesta.activarEstiloClienteActivo();
        this.clienteSeleccionado = cliente;
        getPuntosCliente(cliente.id);
        var objEnviar = {
            parametros: this.getParametros(),
            idCliente: cliente.id
        };
        socket.emit('comprobarClienteVIP', objEnviar);
    }
    seleccionarArticulo(producto) {
        let peso = (producto.esSumable) ? false : true;
        let datosProducto = { idArticle: producto._id, idBoton: 'tecla0' };
        if (!peso) {
            vuePanelVentas.clickTecla(datosProducto, peso);
        }
        else {
            vueTecladoPeso.abrirModal(datosProducto.idArticle, datosProducto.idBoton);
        }
    }
    hayClienteSeleccionado() {
        if (this.clienteSeleccionado !== null) {
            return true;
        }
        else {
            return false;
        }
    }
    vipConfirmado(data) {
        this.desactivarDevolucion();
        this.desactivarConsumoPersonal();
        this.infoClienteVip = data;
        vueCobrar.setMetodoPago('DEUDA');
        this.esVIP = true;
        vueMenuVip.abreModal();
    }
    peticionActivarTarifaEspecial() {
        socket.emit('cargarPreciosVIP', { licencia: this.parametros.licencia, database: this.parametros.database, idCliente: this.idClienteVIP });
    }
    limpiarClienteVIP() {
        vueCesta.limpiarEstiloClienteActivo();
        this.infoClienteVip = null;
        this.esVIP = false;
        vueCobrar.limpiarClienteVip();
        this.idClienteVIP = null;
    }
    convertirPuntosEnDinero(puntos) {
        return Math.trunc(puntos * 0.03 * 0.02);
    }
    esClienteVip() {
        if (this.esVIP) {
            return true;
        }
        else {
            return false;
        }
    }
    nuevoCliente(nombre, idTarjeta) {
        //ACTUALIZAR LOS CLIENTES DESDE EL SERVIDOR
        //COMPROBAR QUE EL NOMBRE Y EL ID DE LA TARJETA NO EXISTAN
        if (ipcRenderer.sendSync('buscar-nombre-cliente-identico', nombre)) {
            if (ipcRenderer.sendSync('buscar-tarjeta-cliente-identico', idTarjeta)) {
                ipcRenderer.send('cliente-nuevo-crear-confirmado', { nombre: nombre, idTarjeta: idTarjeta, tienda: this.getParametros().codigoTienda });
                vueNuevoCliente.cerrarModal();
                socket.emit("guardarNuevoCliente", {
                    parametros: this.getParametros(),
                    idCliente: 'CliBoti_' + this.getParametros().codigoTienda + '_' + idTarjeta,
                    nombreCliente: nombre,
                    idTarjetaCliente: idTarjeta
                });
                vueToast.abrir('success', 'Cliente creado');
            }
            else {
                vueToast.abrir('error', 'Ya existe este código de tarjeta');
            }
        }
        else {
            vueToast.abrir('error', 'Ya existe este nombre de cliente');
        }
    }
    imprimirEntrega() {
        let licencia = this.getNumeroTresDigitos(this.getParametros().licencia);
        axios.get(`http://dsv.hiterp.com/TpvInforma.asp?Llic=00${licencia}&Versio=6001010&Tipus=EntregasPendientes`).then(response => {
            let data = response.data;
            let imprimir = "";
            let valid = false;
            for (let i = 0; i < data.length; i++) {
                if (valid || (data[i - 1] == "]" && data[i - 2] == "a")) {
                    valid = true;
                    if (data[i] == "]")
                        break;
                    imprimir += data[i];
                }
            }
            ipcRenderer.send('imprimirEntregaDiaria', {
                data: imprimir,
                impresora: this.parametros.tipoImpresora,
            });
        });
    }
    todoListo() {
        if (this.todoInstalado()) {
            return true;
        }
        else {
            return false;
        }
        //Tal vez falten comprobaciones extra
    }
    iniciar() {
        if (this.todoInstalado()) {
            ipcRenderer.send('limpiar-enTransito');
            ipcRenderer.send('get-precios');
            // ipcRenderer.send('get-precios-tarifa-especial');
            $('.modal').modal('hide');
            vueInfoFooter.getParametros();
            ipcRenderer.send('buscar-fichados'); //Este comprueba si hay licencia (también)
            const infoPromociones = ipcRenderer.sendSync('get-promociones');
            if (infoPromociones.length > 0) {
                this.promociones = infoPromociones;
            }
            else {
                this.promociones = [];
            }
            ipcRenderer.send('mostrar-visor', { texto: "Bienvenida/o a", precio: "365!", dependienta: "", total: "" });
            ipcRenderer.send('get-menus');
            ipcRenderer.send('get-cesta');
        }
        else {
            abrirInstallWizard();
        }
    }
}
//# sourceMappingURL=TocGame.js.map