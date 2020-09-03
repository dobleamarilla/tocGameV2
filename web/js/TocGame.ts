// import {Cesta} from './Cesta';
// import {conexion} from '@/funciones/conexion';

const TIPO_USB = 'USB';
const TIPO_SERIE = 'SERIE';
const TIPO_CLEARONE = 'CLEARONE';
const TIPO_3G = '3G';
const TIPO_ENTRADA = 'ENTRADA';
const TIPO_SALIDA = 'SALIDA';
class TocGame 
{
    private arrayFichados: Trabajador[];
    private caja: Caja;
    private cesta: Cesta;
    private promociones: Promociones[];
    private parametros: Parametros;
    private clienteSeleccionado: Cliente;
    private udsAplicar: number;
    private esVIP: boolean;
    private infoClienteVip: any;
    private esDevolucion: boolean;
    private esConsumoPersonal: boolean;
    private stopNecesario: boolean;
    private auxTotalDatafono: number;
    public datafonoForzado3G: boolean;
    constructor() 
    {
        const info = ipcRenderer.sendSync('getParametros');
        const infoCaja = ipcRenderer.sendSync('getInfoCaja');
        ipcRenderer.send('limpiar-enTransito');
        this.clienteSeleccionado = null;
        this.udsAplicar = 1;
        this.esVIP = false;
        this.esDevolucion = false;
        this.esConsumoPersonal = false;
        this.stopNecesario = false;
        if (info !== null) 
        {
            this.parametros = info;
        }
        else 
        {
            this.parametros = {
                _id: '',
                licencia: 0,
                codigoTienda: 0,
                database: '',
                nombreEmpresa: '',
                nombreTienda: '',
                tipoImpresora: TIPO_USB,
                tipoDatafono: TIPO_CLEARONE
            }
        }
        
        if(infoCaja === null)
        {
            this.caja  = {
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
                totalDatafono3G: null
            };
        }
        else
        {
            this.caja = infoCaja;
            if(typeof this.caja.infoExtra == "undefined")
            {
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
    cajaAbierta()
    {
        if(this.caja.inicioTime === null || this.caja.inicioTime === undefined)
        {
            if(this.caja.finalTime === null || this.caja.finalTime === undefined)
            {
                return false;
            }
            else
            {
                throw 'Error de comportamiento de cajas 1';
                return false;
            }
        }
        else
        {
            if(this.caja.finalTime === null || this.caja.finalTime === undefined)
            {
                return true;
            }
            else
            {
                throw 'Error de comportamiento de cajas 2';
                return true;
            }
        }
    }

    setStopNecesario(x: boolean)
    {
        this.stopNecesario = x;
    }
    getStopNecesario()
    {
        return this.stopNecesario;
    }
    setUnidades(x: number)
    {
        this.udsAplicar = x;
    }

    resetEstados()
    {
        this.esVIP = false;
        this.esDevolucion = false;
        this.esConsumoPersonal = false;
    }

    getParametros(): Parametros
    {
        return this.parametros;
    }

    setCaja(data: Caja)
    {
        this.caja  = data;
    }
    todoInstalado(): boolean //COMPROBADA
    {
        if (this.parametros.licencia !== 0 && this.parametros.codigoTienda !== 0 && this.parametros.database !== '' && this.parametros.nombreEmpresa !== '' && this.parametros.nombreTienda !== '') 
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    getTipoImpresora()
    {
        return this.parametros.tipoImpresora;
    }
    getTipoDatafono()
    {
        return this.parametros.tipoDatafono;
    }
    setTipoImpresora(data)
    {
        this.parametros.tipoImpresora = data;
    }
    setTipoDatafono(data)
    {
        this.parametros.tipoDatafono = data;
    }
    setParametros(licencia: number, codigoTienda: number, database: string, nombreEmpresa: string, nombreTienda: string, tipoImpresora: string, tipoDatafono: string): void //COMPROBADA
    {
        this.parametros.licencia        = licencia;
        this.parametros.codigoTienda    = codigoTienda;
        this.parametros.database        = database;
        this.parametros.nombreEmpresa   = nombreEmpresa;
        this.parametros.nombreTienda    = nombreTienda;
        this.parametros.tipoImpresora   = tipoImpresora;
        this.parametros.tipoDatafono    = tipoDatafono;
    }
    setupToc(info): void //COMPROBADA
    {
        if (info.licencia > 0 && info.codigoTienda > 0 && info.database.length > 0 && info.nombreEmpresa.length > 0 && info.nombreTienda.length > 0 && info.tipoImpresora.length > 0 && info.tipoDatafono.length > 0) 
        {
            ipcRenderer.send('setParametros', info);
            this.setParametros(info.licencia, info.codigoTienda, info.database, info.nombreEmpresa, info.nombreTienda, info.tipoImpresora, info.tipoDatafono);
            this.descargarDatos();
        }
    }
    descargarDatos(): void 
    {
        socket.emit('cargar-todo', { licencia: this.parametros.licencia, database: this.parametros.database });
    }
    actualizarTeclado()
    {
        this.setStopNecesario(true);
        socket.emit('descargar-teclado', { licencia: this.parametros.licencia, database: this.parametros.database, codigoTienda: this.parametros.codigoTienda});
    }
    hayFichados()
    {
        if(this.getArrayFichados().length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    activarConsumoPersonal()
    {
        this.desactivarDevolucion();
        this.limpiarClienteVIP();
        this.esConsumoPersonal = true;
        vueCobrar.activarConsumoPersonal();
    }
    desactivarConsumoPersonal()
    {
        this.esConsumoPersonal = false;
        vueCobrar.desactivarConsumoPersonal();
    }
    desactivarDevolucion()
    {
        this.esDevolucion = false;
        vueCobrar.setEsDevolucion(false);
    }

    imprimirTest(texto)
    {
        ipcRenderer.send('imprimir-test', texto);
    }
    nuevaSalidaDinero(cantidad: number, concepto: string, noImprimir: boolean = false)
    {
        let codigoBarras = this.generarCodigoBarrasSalida();
        let objSalida = {
            _id: Date.now(),
            tipo: TIPO_SALIDA,
            valor: cantidad,
            concepto: concepto,
            idTrabajador: this.getCurrentTrabajador()._id,
            codigoBarras: codigoBarras
        }

        ipcRenderer.send('nuevo-movimiento', objSalida);
        if(!noImprimir)
        {
            ipcRenderer.sendSync('actualizar-ultimo-codigo-barras');
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
    getNumeroTresDigitos(x: number)
    {
        let devolver = '';
        if(x< 100 && x >=10)
        {
            devolver = '0' + x;
        }
        else
        {
            if(x < 10 && x >= 0)
            {
                devolver = '00' + x;
            }
            else
            {
                devolver = x.toString();
            }
        }
        return devolver;
    }
    generarCodigoBarrasSalida()
    {
        let objCodigoBarras = ipcRenderer.sendSync('get-ultimo-codigo-barras');
        let codigoLicenciaStr: string = this.getNumeroTresDigitos(this.getParametros().licencia);
        let strNumeroCodigosDeBarras: string = this.getNumeroTresDigitos(objCodigoBarras);
        let codigoFinal: string =  '';
        let digitYear = new Date().getFullYear().toString()[3];


        codigoFinal = `98${codigoLicenciaStr}${digitYear}${moment().dayOfYear()}${strNumeroCodigosDeBarras}`;
        return codigoFinal;
    }

    nuevaEntradaDinero(cantidad: number, concepto: string)
    {
        let objEntrada = {
            _id: Date.now(),
            tipo: TIPO_ENTRADA,
            valor: cantidad,
            concepto: concepto,
            idTrabajador: this.getCurrentTrabajador()._id
        }
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
    addFichado(trabajador: any): void //COMPROBADA
    {
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
    delFichado(trabajador: any): void //COMPROBADA
    {
        this.arrayFichados = this.arrayFichados.filter(item=>{
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
    abrirCaja(data: Caja) //Guarda los datos de la caja nueva en memoria y en la bbdd. Cierra el modal de apertura e inicia otra vez el programa. Solo se llama desde el modal.
    {
        this.setCaja(data);
        ipcRenderer.send('actualizar-info-caja', data);
        vueApertura.cerrarModal();
        vueToast.abrir('success', 'CAJA ABIERTA');
        this.iniciar();
    }
    setArrayFichados(arrayFichados: any): void //COMPROBADA
    {
        if(arrayFichados.length > 0)
        {
            this.arrayFichados = arrayFichados;
        }
        else
        {
            this.arrayFichados = [];
        }
    }
    getArrayFichados() //COMPROBADA
    {
        return this.arrayFichados;
    }
    getCurrentTrabajador(): any
    {
        if(this.getArrayFichados().length > 0)
        {
            return this.getArrayFichados()[(this.getArrayFichados().length)-1];
        }
        else
        {
            return false;
        }
    }
    setCurrentTrabajador(idTrabajador: number): boolean
    {
        var fichados = this.getArrayFichados();
        if(fichados.length > 0)
        {
            var aux = this.getCurrentTrabajador();
            for(let i = 0; i < fichados.length; i++)
            {
                if(fichados[i].idTrabajador === idTrabajador)
                {
                    fichados[fichados.length-1] = fichados[i];
                    fichados[i] = aux;
                    this.setArrayFichados(fichados);
                    return true;
                }
            }
            
        }
        else
        {
            vueToast.abrir('error', 'NO HAY PERSONAL FICHADO');
            return false
        }
    }
    clickMenu(nombreMenu: string)
    {
        ipcRenderer.send('get-teclas', nombreMenu);
    }
    borrarCesta()
    {
        ipcRenderer.send('borrar-cesta', this.cesta._id);
        const nuevaCesta: Cesta = {
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
        this.setCesta(nuevaCesta);
    }
    recalcularIvas(cesta: Cesta)
    {
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
        }
        for(let i = 0; i < cesta.lista.length; i++)
        {
            if(cesta.lista[i].promocion.esPromo === false)
            {
                let infoArticulo = this.getInfoArticulo(cesta.lista[i]._id);
                cesta.tiposIva = construirObjetoIvas(infoArticulo, cesta.lista[i].unidades, cesta.tiposIva);
            }
            else
            {
                if(cesta.lista[i].promocion.esPromo === true)
                {
                    //Con esto corregir bases de IVA de las promociones, con su %dto, etc.
                }
            }
        }
        return cesta;
    }
    borrarItemCesta(index: number)
    {
        this.cesta.lista.splice(index, 1);
        this.cesta = this.recalcularIvas(this.cesta);
        if(this.cesta.lista.length > 0)
        {
            this.setCesta(this.cesta);
        }
        else
        {
            this.borrarCesta();
        }
    }
    getCesta()
    {
        return this.cesta;
    }
    setCesta(data: Cesta)
    {
        for(let i = 0; i < data.lista.length; i++)
        {
            data.lista[i].subtotal = Number(data.lista[i].subtotal.toFixed(2));
        }
        ipcRenderer.send('set-cesta', data);
        this.cesta = data;
        this.enviarCesta();
    }
    cargarCesta() //En memoria de la clase
    {
        ipcRenderer.send('get-cesta');
    }
    enviarCesta()
    {
        vueCesta.recibirCesta(this.cesta);
    }
    deshacerOfertas(cesta: Cesta)
    {
        return cesta;
    }
    existeArticuloParaOfertaEnCesta(cesta: Cesta, idArticulo: number, unidadesNecesarias: number)
    {
        for(let i = 0; i < cesta.lista.length; i++)
        {
            if(cesta.lista[i]._id === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias)
            {
                return i;
            }
        }
        return -1; //IMPORTANTE QUE SEA ESTE VALOR SINO HAY SECUNDARIO
    }
    calcularPrecioRealCombo(tipoPromo: number, idPrincipal: number, idSecundario: number, cantidadPrincipal: number, cantidadSecundario: number, unidadesOferta: number, precioTotalOferta: number)
    {
        let precioSinOfertaPrincipal    = 0;
        let precioSinOfertaSecundario   = 0;
        let precioTotalSinOferta        = 0;
        if(idPrincipal != 0)
        {
            precioSinOfertaPrincipal = ipcRenderer.sendSync('getPrecioArticulo', idPrincipal);
        }

        if(idSecundario != 0)
        {
            precioSinOfertaSecundario = ipcRenderer.sendSync('getPrecioArticulo', idSecundario);
        }

        if(tipoPromo === 1) //COMBO
        {
            precioTotalSinOferta = (precioSinOfertaPrincipal*cantidadPrincipal + precioSinOfertaSecundario*cantidadSecundario)*unidadesOferta;
        }

        var dto = (precioTotalSinOferta-precioTotalOferta)/precioTotalSinOferta;
        
        return {
            precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal*dto))*unidadesOferta,
            precioRealSecundario: (precioSinOfertaSecundario - (precioSinOfertaSecundario*dto))*unidadesOferta
        };
    }
    calcularPrecioRealIndividual(tipoPromo: number, idPrincipal: number, cantidadPrincipal: number, unidadesOferta: number, precioTotalOferta: number)
    {
        let precioSinOfertaPrincipal    = 0;
        let precioTotalSinOferta        = 0;
        if(idPrincipal != 0)
        {
            precioSinOfertaPrincipal = ipcRenderer.sendSync('getPrecioArticulo', idPrincipal);
        }

        if(tipoPromo === 2) //INDIVIDUAL
        {
            if(idPrincipal != 0)
            {
                precioTotalSinOferta = precioSinOfertaPrincipal*cantidadPrincipal*unidadesOferta;
            }
        }
        
        var dto = (precioTotalSinOferta-precioTotalOferta)/precioTotalSinOferta;
        
        return {
            precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal*dto))*unidadesOferta*cantidadPrincipal
        };
    }
    insertarLineaPromoCestaCombo(cesta: Cesta, tipoPromo: number, unidades: number, total: number, idPromo: string, idPrincipal: number, idSecundario: number, cantidadPrincipal: number, cantidadSecundario: number): Cesta
    {
        var dtoAplicado = this.calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidades, total);

        if(tipoPromo === 1) //COMBO
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
        return cesta
    }
    insertarLineaPromoCestaIndividual(cesta: Cesta, tipoPromo: number, unidades: number, total: number, idPromo: string, idPrincipal: number, cantidadPrincipal: number): Cesta
    {
        var dtoAplicado = this.calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidades, total);

        if(tipoPromo === 2) //INDIVIDUAL
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
                        cantidadSecundario: 0, //si es 0 no existe
                        precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                        precioRealSecundario: 0,
                        unidadesOferta: unidades
                    }
                }
            });
        }
        
        return cesta
    }
    limpiarCesta(unaCesta: Cesta, posicionPrincipal: number, posicionSecundario: number, sobraCantidadPrincipal: number, sobraCantidadSecundario: number, pideDelA: number, pideDelB: number): Cesta
    {
        if(pideDelA != -1)
        {
            if(sobraCantidadPrincipal > 0)
            {
                const datosArticulo = this.getInfoArticulo(unaCesta.lista[posicionPrincipal]._id);
                unaCesta.lista[posicionPrincipal].unidades = sobraCantidadPrincipal;
                unaCesta.lista[posicionPrincipal].subtotal = sobraCantidadPrincipal*datosArticulo.precioConIva;
            }
            else
            {
                unaCesta.lista.splice(posicionPrincipal, 1);
            }
        }

        if(pideDelB != -1)
        {
            if(sobraCantidadSecundario > 0)
            {
                const datosArticulo = this.getInfoArticulo(unaCesta.lista[posicionSecundario]._id);
                unaCesta.lista[posicionSecundario].unidades = sobraCantidadSecundario;
                unaCesta.lista[posicionSecundario].subtotal = sobraCantidadSecundario*datosArticulo.precioConIva;
            }
            else
            {
                if(posicionSecundario > posicionPrincipal)
                {
                    unaCesta.lista.splice(posicionSecundario-1, 1);
                }
                else
                {
                    unaCesta.lista.splice(posicionSecundario, 1);
                }
            }
        }
        return unaCesta;
    }
    teLoAplicoTodo(necesariasPrincipal: number, necesariasSecundario: number, cesta: Cesta, posicionPrincipal: number, posicionSecundario: number, pideDelA: number, pideDelB: number, precioPromo: number, idPromo: string)
    {
        let numeroPrincipal     = 0;
        let numeroSecundario    = 0;
        let sobranPrincipal     = 0;
        let sobranSecundario    = 0;
        let nVeces              = 0;

        var idPrincipal         = (typeof cesta.lista[posicionPrincipal] !== "undefined") ? cesta.lista[posicionPrincipal]._id: 0;
        var idSecundario        = (typeof cesta.lista[posicionSecundario] !== "undefined") ? cesta.lista[posicionSecundario]._id: 0;

        if(pideDelA !== -1 && pideDelB !== -1)
        {
            numeroPrincipal          = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
            numeroSecundario         = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
            nVeces                   = Math.trunc(Math.min(numeroPrincipal, numeroSecundario));
            sobranPrincipal          = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;
            sobranSecundario         = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;

            cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
            cesta = this.insertarLineaPromoCestaCombo(cesta, 1, nVeces, precioPromo*nVeces, idPromo, idPrincipal, idSecundario, necesariasPrincipal, necesariasSecundario);
        }
        else
        {
            if(pideDelA !== -1 && pideDelB === -1)
            {
                numeroPrincipal = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
                nVeces          = Math.trunc(numeroPrincipal);
                sobranPrincipal = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;

                cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                cesta = this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo*nVeces*necesariasPrincipal, idPromo, idPrincipal, necesariasPrincipal);
            }
            else
            {
                if(pideDelA === -1 && pideDelB !== -1)
                {
                    numeroSecundario = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
                    nVeces          = Math.trunc(numeroSecundario);
                    sobranSecundario = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;

                    cesta = this.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                    cesta = this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo*nVeces*necesariasSecundario, idPromo, idPrincipal, necesariasPrincipal); //se trata como si fueran principales
                }
            }
        }
        return cesta;
    }
    buscarOfertas(unaCesta: Cesta)
    {
        unaCesta = this.deshacerOfertas(unaCesta); //ahora no hace nada
        for(let i = 0; i < this.promociones.length; i++)
        {
            for(let j = 0; j < this.promociones[i].principal.length; j++)
            {
                let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal)
                if(this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0)
                {
                    for(let z = 0; z < this.promociones[i].secundario.length; z++)
                    {
                        let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
                        if(this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0)
                        {
                            unaCesta = this.teLoAplicoTodo(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id, this.promociones[i].precioFinal, this.promociones[i]._id);
                            break;
                        }
                    }
                }
               
            }
        }
        this.setCesta(unaCesta);
    }
    quitarClienteSeleccionado()
    {
        vueCesta.limpiarEstiloClienteActivo();
        this.clienteSeleccionado = null;

    }
    insertarArticuloCesta(infoArticulo, unidades: number, infoAPeso = null)
    {
        var miCesta = this.getCesta();
        
        if(miCesta.lista.length > 0)
        {
            let encontrado = false;
            for(let i = 0; i < miCesta.lista.length; i++)
            {
                if(miCesta.lista[i]._id === infoArticulo._id)
                {
                    let viejoIva = miCesta.tiposIva;
                    
                    if(infoAPeso == null)
                    {
                        miCesta.lista[i].unidades += unidades;
                        miCesta.lista[i].subtotal += unidades*infoArticulo.precioConIva;
                        miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, viejoIva);
                    }
                    else
                    {
                        miCesta.lista[i].subtotal += infoAPeso.precioAplicado;
                        miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, viejoIva, infoAPeso);
                    }  
                   
                    encontrado = true;
                    break;
                }
            }
            if(!encontrado)
            {
                if(infoAPeso == null)
                {
                    miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: unidades*infoArticulo.precioConIva});
                    miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
                }
                else
                {
                    miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: infoAPeso.precioAplicado});
                    miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
                }                
            }
        }
        else
        {
            if(infoAPeso == null)
            {
                miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: unidades*infoArticulo.precioConIva});
                miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva);
            }
            else
            {
                miCesta.lista.push({_id:infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: {esPromo: false, _id: null}, subtotal: infoAPeso.precioAplicado});
                miCesta.tiposIva = construirObjetoIvas(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
            }            
        }
        this.buscarOfertas(miCesta);
    }
    getInfoArticulo(idArticulo: number)
    {
        return ipcRenderer.sendSync('get-info-articulo', idArticulo);
    }
    addItem(idArticulo: number, idBoton: String, aPeso: Boolean, infoAPeso = null)
    {
        var unidades = this.udsAplicar;
        if(this.cajaAbierta())
        {
            try
            {
                $('#'+idBoton).attr('disabled', true);
                if(!aPeso) //TIPO NORMAL
                {
                    let infoArticulo = this.getInfoArticulo(idArticulo);
                    if(infoArticulo) //AQUI PENSAR ALGUNA COMPROBACIÓN CUANDO NO EXISTA O FALLE ESTE GET
                    {
                        this.insertarArticuloCesta(infoArticulo, unidades);
                    }
                    else
                    {
                        vueToast.abrir('error', 'Este artículo tiene errores');
                    }
                }
                else //TIPO PESO
                {
                    this.insertarArticuloCesta(infoAPeso.infoArticulo, 1, infoAPeso);
                }
                $('#'+idBoton).attr('disabled', false);
            }
            catch(err)
            {
                console.log(err);
                vueToast.abrir('error', 'Error al añadir el articulo');
                $('#'+idBoton).attr('disabled', false);
                this.udsAplicar = 1;
            }
        }
        else
        {
            vueToast.abrir('danger', 'Se requiere una caja abierta para cobrar');
        }
        this.udsAplicar = 1;
    }
    abrirModalPago()
    {
        let total = 0;
        let cesta = this.getCesta();
        for(let i = 0; i < cesta.lista.length; i++)
        {
            total += cesta.lista[i].subtotal;
        }
        vueCobrar.prepararModalVenta(total, this.getArrayFichados());
        vueCobrar.abreModal();
    }

    getUltimoTicket(): number
    {
        const ultimo = ipcRenderer.sendSync('getUltimoTicket');
        if(ultimo.length > 0)
        {
            return ultimo[0]._id;
        }
        else
        {
            const info = ipcRenderer.sendSync('getParametros');
            if(info !== null || info !== undefined)
            {
                return info.ultimoTicket;
            }
            else
            {
                vueToast('error', 'Error. Contactar con un técnico');
                return 0;
            }
        }
    }
    
    crearTicket(tipo: string)
    {
        let total = 0;
        for(let i = 0; i < this.cesta.lista.length; i++)
        {
            total += this.cesta.lista[i].subtotal;
        }
        const infoTrabajador: Trabajador = this.getCurrentTrabajador();
        const nuevoIdTicket = this.getUltimoTicket()+1;

        var objTicket: Ticket = {
            _id: nuevoIdTicket,
            timestamp: Date.now(),
            total: total,
            lista: this.cesta.lista,
            tipoPago: tipo,
            idTrabajador: infoTrabajador._id,
            tiposIva: this.cesta.tiposIva,
            cliente: this.hayClienteSeleccionado() ? this.clienteSeleccionado.id: null,
            infoClienteVip: {
                esVip : false,
                nif: '',
                nombre: '',
                cp: '',
                direccion: '',
                ciudad: ''
            }
        }   

        if(tipo === "DEUDA")
        {
            objTicket.tipoPago                  = "DEUDA";
            objTicket.infoClienteVip.nif        = this.infoClienteVip.datos.nif;       
            objTicket.infoClienteVip.nombre     = this.infoClienteVip.datos.nombre;
            objTicket.infoClienteVip.cp         = this.infoClienteVip.datos.cp;
            objTicket.infoClienteVip.direccion  = this.infoClienteVip.datos.direccion;
            objTicket.infoClienteVip.ciudad     = this.infoClienteVip.datos.Ciudad;
            objTicket.infoClienteVip.esVip      = true;
        }
        else
        {
            if(tipo === "EFECTIVO")
            {
                objTicket.tipoPago = "EFECTIVO";
            }
            else
            {
                if(this.esDevolucion)
                {
                    objTicket.tipoPago = "DEVOLUCION";
                }
                else
                {
                    if(tipo === "CONSUMO_PERSONAL")
                    {
                        objTicket.tipoPago = "CONSUMO_PERSONAL";
                    }
                    else
                    {
                        objTicket.tipoPago = "TARJETA";
                    }                    
                }
            }
        }

        if(tipo === "EFECTIVO" || tipo === "DEUDA" || tipo === "DEVOLUCION" || tipo === "CONSUMO_PERSONAL")
        {
            if(tipo === "DEVOLUCION")
            {
                objTicket._id = Date.now();
                ipcRenderer.send('guardarDevolucion', objTicket);
                const paramsTicket = ipcRenderer.sendSync('get-params-ticket');
                const infoClienteVip = {esVip: false};
                const paraImprimir = {
                    numFactura: 0,
                    arrayCompra: objTicket.lista,
                    total: objTicket.total,
                    visa: objTicket.tipoPago,
                    tiposIva: objTicket.tiposIva,
                    cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato: '',
                    pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato: '',
                    nombreTrabajador: this.getCurrentTrabajador().nombre,
                    impresora: this.parametros.tipoImpresora,
                    infoClienteVip: infoClienteVip
                };
                ipcRenderer.send('imprimir', paraImprimir);
            }
            else
            {
                if(tipo === "CONSUMO_PERSONAL")
                {
                    objTicket.total = 0;
                    this.nuevaSalidaDinero(Number((total).toFixed(2)), 'Consum personal', true);
                }
                else
                {
                    if(tipo === "DEUDA")
                    {
                        this.nuevaSalidaDinero(Number((total).toFixed(2)), 'Deute', true);
                    }
                }
                ipcRenderer.send('set-ticket', objTicket); //esto inserta un nuevo ticket, nombre malo
                ipcRenderer.send('set-ultimo-ticket-parametros', objTicket._id);
            }
            this.borrarCesta();
            vueCobrar.cerrarModal();
            vueToast.abrir('success', 'Ticket creado');
            this.quitarClienteSeleccionado();
        }
        else
        {
            if(tipo === "TARJETA")
            {
                if(this.parametros.tipoDatafono === TIPO_CLEARONE && !this.datafonoForzado3G)
                {
                    vueCobrar.activoEsperaDatafono();
                    //this.ticketColaDatafono = objTicket;

                    ipcRenderer.send('ventaDatafono', {objTicket: objTicket, nombreDependienta: infoTrabajador.nombre, idTicket: nuevoIdTicket, total: Number((total * 100).toFixed(2)).toString()});
                    this.auxTotalDatafono = Number((total).toFixed(2));
                    // this.nuevaSalidaDinero(Number((total).toFixed(2)), 'Targeta', true);
                }
                else
                {
                    if(this.parametros.tipoDatafono === TIPO_3G || this.datafonoForzado3G)
                    {
                        ipcRenderer.send('set-ticket', objTicket); //esto inserta un nuevo ticket, nombre malo
                        ipcRenderer.send('set-ultimo-ticket-parametros', objTicket._id);
                        this.nuevaSalidaDinero(Number((total).toFixed(2)), 'Targeta 3G', true);
                        this.borrarCesta();
                        vueCobrar.cerrarModal();
                        vueToast.abrir('success', 'Ticket creado');
                        this.quitarClienteSeleccionado();
                    }
                }
            }
        }
        this.datafonoForzado3G = false;
        this.resetEstados();
        vueCobrar.resetEstados();
    }
    limpiarDevolucion()
    {
        this.esDevolucion = false;
        this.esConsumoPersonal = false;
        vueCobrar.resetEstados();
    }
    getUrlPedidos()
    {
        var url = '';
        if(this.parametros.database === 'Fac_Tena')
        {
            url = `http://silema.hiterp.com/TpvWebReposicion.asp?modo=MENU&codiBotiga=${this.parametros.codigoTienda}`;
        }
        return url;
    }
    devolucion()
    {
        this.desactivarConsumoPersonal();
        this.limpiarClienteVIP();
        this.esDevolucion = true;
        vueCobrar.setEsDevolucion(true);
    }
    controlRespuestaDatafono(respuesta)
    {
        vueCobrar.desactivoEsperaDatafono();
        if(respuesta.data[1] === 48) //Primero STX, segundo estado transacción: correcta = 48, incorrecta != 48
        {
            console.log("Operación APROBADA");
            this.nuevaSalidaDinero(this.auxTotalDatafono, 'Targeta', true);
            ipcRenderer.send('set-ticket', respuesta.objTicket);
            
            ipcRenderer.send('set-ultimo-ticket-parametros', respuesta.objTicket._id);
            this.borrarCesta();
            vueCobrar.cerrarModal();
            vueToast.abrir('success', 'Ticket creado');
        }
        else
        {
            console.log("Operación DENEGADA");
            vueToast.abrir('error', 'Operación DENEGADA');
            ipcRenderer.send('change-pinpad');
        }
        this.quitarClienteSeleccionado();
    }

    abreModalSalidaDinero()
    {
        $('#vueModalSalidaDinero').modal();
    }
    abrirModalCaja()
    {
        const arrayTickets = ipcRenderer.sendSync('get-tickets');
        vueCaja.cargarListaTickets(arrayTickets);
        vueCaja.abreModal();
    }
    borrarCaja() //Configura la caja como cerrada y limpia los datos en memoria y en la bbdd
    {
        this.caja  = {
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
            totalDatafono3G: null
        };
        ipcRenderer.send('actualizar-info-caja', this.caja);
    }
    cerrarCaja(total: number, detalleCierre, guardarInfoMonedas, totalDatafono3G: number)
    {
        this.caja.totalCierre       = total;
        this.caja.detalleCierre     = detalleCierre;
        this.caja.finalTime         = Date.now();
        this.caja.idDependienta     = this.getCurrentTrabajador()._id;
        this.caja.totalDatafono3G   = totalDatafono3G;
        
        this.caja = this.calcularDatosCaja(this.caja);
        ipcRenderer.send('guardarCajaSincro', this.caja);
        ipcRenderer.send('set-monedas', guardarInfoMonedas);
        this.borrarCaja()
        vueCaja.cerrarModal();
        this.iniciar();
    }
    calcularDatosCaja(unaCaja: Caja)
    {
        var arrayTicketsCaja: Ticket[] = ipcRenderer.sendSync('getTicketsIntervalo', unaCaja);
        var arrayMovimientos: Movimientos[] = ipcRenderer.sendSync('get-rango-movimientos', {fechaInicio: unaCaja.inicioTime, fechaFinal: unaCaja.finalTime});
        var totalTickets = 0;
        var nombreTrabajador = this.getCurrentTrabajador().nombre;
        var descuadre = 0;
        var nClientes = 0;

        if(arrayTicketsCaja.length > 0)
        {
            this.caja.primerTicket = arrayTicketsCaja[0]._id;
            this.caja.ultimoTicket = arrayTicketsCaja[arrayTicketsCaja.length-1]._id;
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
        for(let i = 0; i < arrayMovimientos.length; i++)
        {
            if(arrayMovimientos[i].tipo === TIPO_SALIDA)
            {
                totalSalidas += arrayMovimientos[i].valor;
            }
            else
            {
                if(arrayMovimientos[i].tipo === TIPO_ENTRADA)
                {
                    totalEntradas += arrayMovimientos[i].valor;
                }
            }
        }
        for(let i = 0; i < arrayTicketsCaja.length; i++)
        {
            nClientes++;
            totalTickets += arrayTicketsCaja[i].total;
            
            if(arrayTicketsCaja[i].tipoPago == "TARJETA")
            {
                totalTarjeta += arrayTicketsCaja[i].total;
            }
            else
            {
                if(arrayTicketsCaja[i].tipoPago == "EFECTIVO")
                {
                    recaudado += arrayTicketsCaja[i].total;
                    totalEnEfectivo += arrayTicketsCaja[i].total;
                }
                else
                {
                    if(arrayTicketsCaja[i].tipoPago == "DEUDA")
                    {
                        totalDeuda += arrayTicketsCaja[i].total;
                    }
                }                
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

        descuadre = cambioFinal-cambioInicial+totalSalidas-totalEntradas-totalTickets;
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
            impresora: this.parametros.tipoImpresora
        };

        try
        {
            this.imprimirCierreCaja(objImpresion);
        }
        catch(err)
        {
            vueToast.abrir('error', 'Impresora no detectada');
            console.log(err);
        }
        
        unaCaja.descuadre = descuadre;
        unaCaja.nClientes = nClientes;
        unaCaja.recaudado = recaudado;

        return unaCaja;
    }

    imprimirTicket(idTicket: number)
    {
        const paramsTicket = ipcRenderer.sendSync('get-params-ticket');
        const infoTicket: Ticket = ipcRenderer.sendSync('get-info-un-ticket', idTicket);
        const infoTrabajador: Trabajador = ipcRenderer.sendSync('get-infotrabajador-id', infoTicket.idTrabajador);

        const sendObject = {
            numFactura: infoTicket._id,
            arrayCompra: infoTicket.lista,
            total: infoTicket.total,
            visa: infoTicket.tipoPago,
            tiposIva: infoTicket.tiposIva,
            cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato: '',
            pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato: '',
            nombreTrabajador: infoTrabajador.nombre,
            impresora: this.parametros.tipoImpresora,
            infoClienteVip: infoTicket.infoClienteVip
        };
        
        ipcRenderer.send('imprimir', sendObject);
    }
    imprimirCierreCaja(info)
    {
        ipcRenderer.send('imprimirCierreCaja', info);
    }
    seleccionarCliente(cliente)
    {
        vueCesta.activarEstiloClienteActivo();
        this.clienteSeleccionado = cliente;
        var objEnviar = {
            parametros: this.getParametros(),
            idCliente: cliente.id
        };

        socket.emit('comprobarClienteVIP', objEnviar);
    }
    hayClienteSeleccionado()
    {
        if(this.clienteSeleccionado !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    vipConfirmado(data)
    {
        this.desactivarDevolucion();
        this.desactivarConsumoPersonal();
        this.infoClienteVip = data;
        this.esVIP = true;
        vueMenuVip.abreModal();
    }
    limpiarClienteVIP()
    {
        vueCesta.limpiarEstiloClienteActivo();
        this.infoClienteVip = null;
        this.esVIP = false;
        vueCobrar.limpiarClienteVip();
    }
    esClienteVip()
    {
        if(this.esVIP)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    todoListo()
    {
        if(this.todoInstalado())
        {
            return true;
        }
        else
        {
            return false;
        }
        //Tal vez falten comprobaciones extra
    }
    iniciar(): void //COMPROBADA
    {
        $('.modal').modal('hide');
        vueInfoFooter.getParametros();
        ipcRenderer.send('buscar-fichados');
        const infoPromociones = ipcRenderer.sendSync('get-promociones');
        if(infoPromociones.length > 0)
        {
            this.promociones = infoPromociones;
        }
        else
        {
            this.promociones = [];
        }

        ipcRenderer.send('get-menus');
        ipcRenderer.send('get-cesta');
    }
}