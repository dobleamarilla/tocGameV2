// import {Cesta} from './Cesta';
// import {conexion} from '@/funciones/conexion';
const TIPO_USB = 'USB';
const TIPO_SERIE = 'SERIE';
const TIPO_CLEARONE = 'CLEARONE';
const TIPO_3G = '3G';
class TocGame {
    constructor() {
        const info = ipcRenderer.sendSync('getParametros');
        const infoCaja = ipcRenderer.sendSync('getInfoCaja');
        this.ticketColaDatafono = null;
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
                ultimoTicket: -1
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
                descuadre: null,
                recaudado: null,
                nClientes: null,
                detalleApertura: [],
                detalleCierre: [],
                enviado: false,
                enTransito: false
            };
        }
        else {
            this.caja = infoCaja;
        }
    }
    cajaAbierta() {
        if (this.caja.inicioTime === null) {
            return false;
        }
        else {
            return true;
        }
    }
    setCaja(data) {
        this.caja = data;
    }
    todoInstalado() {
        if (this.parametros.licencia !== 0 && this.parametros.codigoTienda !== 0 && this.parametros.database !== '' && this.parametros.nombreEmpresa !== '' && this.parametros.nombreTienda !== '' && this.parametros.ultimoTicket !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
    getTipoImpresora() {
        return this.parametros.tipoImpresora;
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
    setParametros(licencia, codigoTienda, database, nombreEmpresa, nombreTienda, tipoImpresora, tipoDatafono, ultimoTicket) {
        this.parametros.licencia = licencia;
        this.parametros.codigoTienda = codigoTienda;
        this.parametros.database = database;
        this.parametros.nombreEmpresa = nombreEmpresa;
        this.parametros.nombreTienda = nombreTienda;
        this.parametros.tipoImpresora = tipoImpresora;
        this.parametros.tipoDatafono = tipoDatafono;
        this.parametros.ultimoTicket = ultimoTicket;
    }
    setupToc(info) {
        if (info.licencia > 0 && info.codigoTienda > 0 && info.database.length > 0 && info.nombreEmpresa.length > 0 && info.nombreTienda.length > 0 && info.tipoImpresora.length > 0 && info.tipoDatafono.length > 0 && info.ultimoTicket > -1) {
            ipcRenderer.send('setParametros', info);
            this.setParametros(info.licencia, info.codigoTienda, info.database, info.nombreEmpresa, info.nombreTienda, info.tipoImpresora, info.tipoDatafono, info.ultimoTicket);
            this.descargarDatos();
        }
    }
    descargarDatos() {
        socket.emit('cargar-todo', { licencia: this.parametros.licencia, database: this.parametros.database });
    }
    hayFichados() {
        if (this.getArrayFichados().length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    addFichado(trabajador) {
        this.setCurrentTrabajador(trabajador._id);
        this.arrayFichados.push(trabajador);
        ipcRenderer.send('fichar-trabajador', trabajador._id);
    }
    delFichado(trabajador) {
        this.arrayFichados = this.arrayFichados.filter(item => {
            return item._id != trabajador._id;
        });
        ipcRenderer.send('desfichar-trabajador', trabajador._id);
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
                if (fichados[i]._id === idTrabajador) {
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
                let infoArticulo = this.getInfoArticulo(cesta.lista[i].idArticulo);
                cesta.tiposIva = construirObjetoIvas(infoArticulo, cesta.lista[i].unidades, cesta.tiposIva);
            }
            else {
                if (cesta.lista[i].promocion.esPromo === true) {
                    //Con esto corregir bases de IVA de las promociones, con su %dto, etc.
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
            if (cesta.lista[i].idArticulo === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias) {
                return i;
            }
        }
        return -1; //IMPORTANTE QUE SEA ESTE VALOR SINO HAY SECUNDARIO
    }
    insertarLineaPromoCesta(cesta, tipoPromo, unidades, total, idPromo) {
        if (tipoPromo === 1) //COMBO
         {
            cesta.lista.push({
                idArticulo: -2,
                nombre: 'Oferta combo',
                unidades: unidades,
                subtotal: total,
                promocion: {
                    _id: idPromo,
                    esPromo: true
                }
            });
        }
        else {
            if (tipoPromo === 2) //INDIVIDUAL
             {
                cesta.lista.push({
                    idArticulo: -2,
                    nombre: 'Oferta individual',
                    unidades: unidades,
                    subtotal: total,
                    promocion: {
                        _id: idPromo,
                        esPromo: true
                    }
                });
            }
        }
        return cesta;
    }
    limpiarCesta(unaCesta, posicionPrincipal, posicionSecundario, sobraCantidadPrincipal, sobraCantidadSecundario, pideDelA, pideDelB) {
        if (pideDelA != -1) {
            if (sobraCantidadPrincipal > 0) {
                const datosArticulo = this.getInfoArticulo(unaCesta.lista[posicionPrincipal].idArticulo);
                unaCesta.lista[posicionPrincipal].unidades = sobraCantidadPrincipal;
                unaCesta.lista[posicionPrincipal].subtotal = sobraCantidadPrincipal * datosArticulo.precioConIva;
            }
            else {
                unaCesta.lista.splice(posicionPrincipal, 1);
            }
        }
        if (pideDelB != -1) {
            if (sobraCantidadSecundario > 0) {
                const datosArticulo = this.getInfoArticulo(unaCesta.lista[posicionSecundario].idArticulo);
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
        if (pideDelA !== -1 && pideDelB !== -1) {
            numeroPrincipal = cesta.lista[posicionPrincipal].unidades / necesariasPrincipal;
            numeroSecundario = cesta.lista[posicionSecundario].unidades / necesariasSecundario;
            nVeces = Math.trunc(Math.min(numeroPrincipal, numeroSecundario));
            sobranPrincipal = cesta.lista[posicionPrincipal].unidades - nVeces * necesariasPrincipal;
            sobranSecundario = cesta.lista[posicionSecundario].unidades - nVeces * necesariasSecundario;
            cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
            cesta = this.insertarLineaPromoCesta(cesta, 1, nVeces, precioPromo * nVeces, idPromo);
        }
        else {
            if (pideDelA !== -1 && pideDelB === -1) {
                numeroPrincipal = cesta.lista[posicionPrincipal].unidades / necesariasPrincipal;
                nVeces = Math.trunc(numeroPrincipal);
                sobranPrincipal = cesta.lista[posicionPrincipal].unidades - nVeces * necesariasPrincipal;
                cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                cesta = this.insertarLineaPromoCesta(cesta, 2, nVeces, precioPromo * nVeces * necesariasPrincipal, idPromo);
            }
            else {
                if (pideDelA === -1 && pideDelB !== -1) {
                    numeroSecundario = cesta.lista[posicionSecundario].unidades / necesariasSecundario;
                    nVeces = Math.trunc(numeroSecundario);
                    sobranSecundario = cesta.lista[posicionSecundario].unidades - nVeces * necesariasSecundario;
                    cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                    cesta = this.insertarLineaPromoCesta(cesta, 2, nVeces, precioPromo * nVeces * necesariasSecundario, idPromo);
                }
            }
        }
        return cesta;
    }
    buscarOfertas(unaCesta) {
        unaCesta = this.deshacerOfertas(unaCesta); //ahora no hace nada
        for (let i = 0; i < this.promociones.length; i++) {
            for (let j = 0; j < this.promociones[i].principal.length; j++) {
                let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal);
                if (this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0) {
                    for (let z = 0; z < this.promociones[i].secundario.length; z++) {
                        let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
                        if (this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0) {
                            unaCesta = this.teLoAplicoTodo(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id, this.promociones[i].precioFinal, this.promociones[i]._id);
                            break;
                        }
                    }
                }
            }
        }
        this.setCesta(unaCesta);
    }
    insertarArticuloCesta(infoArticulo, unidades) {
        var miCesta = this.getCesta();
        if (miCesta.lista.length > 0) {
            let encontrado = false;
            for (let i = 0; i < miCesta.lista.length; i++) {
                if (miCesta.lista[i].idArticulo === infoArticulo._id) {
                    let viejoIva = miCesta.tiposIva;
                    miCesta.lista[i].unidades += unidades;
                    miCesta.lista[i].subtotal += unidades * infoArticulo.precioConIva;
                    miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, viejoIva);
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                miCesta.lista.push({ idArticulo: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: unidades * infoArticulo.precioConIva });
                miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
            }
        }
        else {
            miCesta.lista.push({ idArticulo: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: unidades * infoArticulo.precioConIva });
            miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
        }
        this.buscarOfertas(miCesta);
    }
    getInfoArticulo(idArticulo) {
        return ipcRenderer.sendSync('get-info-articulo', idArticulo);
    }
    addItem(idArticulo, idBoton, aPeso, peso, subtotal, unidades = 1) {
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
                //caso a peso
            }
            $('#' + idBoton).attr('disabled', false);
        }
        catch (err) {
            console.log(err);
            vueToast.abrir('error', 'Error al añadir el articulo');
            $('#' + idBoton).attr('disabled', false);
        }
    }
    abrirModalPago() {
        let total = 0;
        let cesta = this.getCesta();
        for (let i = 0; i < cesta.lista.length; i++) {
            total += cesta.lista[i].subtotal;
        }
        vueCobrar.prepararModalVenta(total, this.getArrayFichados());
        vueCobrar.abreModal();
    }
    getUltimoTicket() {
        return this.parametros.ultimoTicket;
    }
    crearTicket(efectivo) {
        let total = 0;
        for (let i = 0; i < this.cesta.lista.length; i++) {
            total += this.cesta.lista[i].subtotal;
        }
        const infoTrabajador = this.getCurrentTrabajador();
        const nuevoIdTicket = this.getUltimoTicket() + 1;
        if (efectivo) {
            const objTicket = {
                _id: nuevoIdTicket,
                timestamp: new Date(),
                total: total,
                lista: this.cesta.lista,
                tarjeta: !efectivo,
                idTrabajador: infoTrabajador._id,
                tiposIva: this.cesta.tiposIva
            };
            ipcRenderer.send('set-ticket', objTicket); //esto inserta un nuevo ticket, nombre malo
            this.parametros.ultimoTicket++;
            ipcRenderer.send('setParametros', this.parametros);
            this.borrarCesta();
            vueCobrar.cerrarModal();
            vueToast.abrir('success', 'Ticket creado');
        }
        else {
            const objTicket = {
                _id: nuevoIdTicket,
                timestamp: new Date(),
                total: total,
                lista: this.cesta.lista,
                tarjeta: !efectivo,
                idTrabajador: infoTrabajador._id,
                tiposIva: this.cesta.tiposIva
            };
            this.ticketColaDatafono = objTicket;
            ipcRenderer.send('ventaDatafono', { nombreDependienta: infoTrabajador.nombre, idTicket: nuevoIdTicket, total: Number((total * 100).toFixed(2)).toString() });
        }
    }
    controlRespuestaDatafono(respuesta) {
        //CERRAR ANIMACIÓN PARA DATÁFONO PENDIENTE
        if (respuesta[1] === 48) //Primero STX, segundo estado transacción: correcta = 48, incorrecta != 48
         {
            console.log("Operación APROBADA");
            ipcRenderer.send('set-ticket', this.ticketColaDatafono);
            this.parametros.ultimoTicket++;
            ipcRenderer.send('setParametros', this.parametros);
            this.borrarCesta();
            vueCobrar.cerrarModal();
            vueToast.abrir('success', 'Ticket creado');
        }
        else {
            console.log("Opración DENEGADA");
            vueToast.abrir('error', 'Operación DENEGADA');
            vueCobrar.cerrarModal();
        }
    }
    abreModalSalidaDinero() {
        $('#vueModalSalidaDinero').modal();
    }
    abrirModalCaja() {
        const arrayTickets = ipcRenderer.sendSync('get-tickets');
        vueCaja.cargarListaTickets(arrayTickets);
        vueCaja.abreModal();
    }
    cerrarCaja(total, detalleCierre) {
        this.caja.totalCierre = total;
        this.caja.detalleCierre = detalleCierre;
        this.caja.finalTime = new Date();
        this.caja.idDependienta = this.getCurrentTrabajador()._id;
        this.caja = this.calcularDatosCaja(this.caja);
        ipcRenderer.send('guardarCaja', this.caja);
        this.caja.inicioTime = null;
        vueCaja.cerrarModal();
        this.iniciar();
    }
    calcularDatosCaja(unaCaja) {
        var arrayTicketsCaja = ipcRenderer.sendSync('getTicketsIntervalo', unaCaja);
        var calaixFet = 0;
        var nombreTrabajador = this.getCurrentTrabajador().nombre;
        var descuadre = 0;
        var nClientes = 0;
        var arrayMovimientos = [];
        var nombreTienda = this.parametros.nombreTienda;
        var fechaInicio = this.caja.inicioTime;
        var totalTarjeta = 0;
        var cambioInicial = this.caja.totalApertura;
        var cambioFinal = this.caja.totalCierre;
        var totalSalidas = 0;
        var totalEntradas = 0;
        var recaudado = this.caja.totalCierre - this.caja.totalApertura + totalSalidas - totalEntradas;
        for (let i = 0; i < arrayTicketsCaja.length; i++) {
            nClientes++;
            calaixFet += arrayTicketsCaja[i].total;
            if (arrayTicketsCaja[i].tarjeta) {
                recaudado += arrayTicketsCaja[i].total;
                totalTarjeta += arrayTicketsCaja[i].total;
            }
        }
        descuadre = cambioFinal - cambioInicial + totalSalidas - totalEntradas + totalTarjeta - (cambioFinal + totalTarjeta);
        const objImpresion = {
            calaixFet: calaixFet,
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
            cFinalCaja: cambioFinal
        };
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
        const infoTrabajador = ipcRenderer.sendSync('buscar-trabajador-sincrono');
        const infoTicket = ipcRenderer.sendSync('get-info-un-ticket', idTicket);
        const sendObject = {
            numFactura: infoTicket._id,
            arrayCompra: infoTicket.lista,
            total: infoTicket.total,
            visa: infoTicket.tarjeta,
            tiposIva: infoTicket.tiposIva,
            cabecera: paramsTicket[0].valorDato,
            pie: paramsTicket[1].valorDato,
            nombreTrabajador: infoTrabajador.nombre
        };
        ipcRenderer.send('imprimir', sendObject);
    }
    imprimirCierreCaja(info) {
        ipcRenderer.send('imprimirCierreCaja', info);
    }
    iniciar() {
        ipcRenderer.send('buscar-fichados');
        const infoPromociones = ipcRenderer.sendSync('get-promociones');
        if (infoPromociones.length > 0) {
            this.promociones = infoPromociones;
        }
        ipcRenderer.send('get-menus');
        ipcRenderer.send('get-cesta');
    }
}
//# sourceMappingURL=TocGame.js.map