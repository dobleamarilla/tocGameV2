// import {Cesta} from './Cesta';
// import {conexion} from '@/funciones/conexion';

const TIPO_USB = 'USB';
const TIPO_SERIE = 'SERIE';
const TIPO_CLEARONE = 'CLEARONE';
const TIPO_3G = '3G';

class TocGame {
    private licencia: number;
    private codigoTienda: number;
    private database: String;
    private nombreEmpresa: String;
    private nombreTienda: String;
    private tipoImpresora: String;
    private tipoDatafono: String;
    private ultimoTicket: number;
    private arrayFichados: any;
    private caja: any;
    private cesta: {
        _id: number;
        lista: {
            idArticulo: number,
            nombre: string,
            unidades: number,
            subtotal: number,
            promocion: boolean
        }[];
    };
    private promociones: {
        _id: string,
        cantidadPrincipal: number,
        cantidadSecundario: number,
        fechaFinal: string,
        fechaInicio: string,
        precioFinal: number,
        principal: {
            _id: number
        }[],
        secundario: {
            _id: number
        }[]
    }[];
    constructor() 
    {
        const info = electron.ipcRenderer.sendSync('getParametros');
        const infoCaja = electron.ipcRenderer.sendSync('getInfoCaja');

        if (info.length === 1) 
        {
            this.licencia = info[0].licencia;
            this.codigoTienda = info[0].codigoTienda;
            this.database = info[0].database;
            this.nombreEmpresa = info[0].nombreEmpresa;
            this.nombreTienda = info[0].nombreTienda;
            this.tipoImpresora = info[0].tipoImpresora; //USB y SERIE
            this.tipoDatafono = info[0].tipoDatafono; //CLEARONE y 3G
            this.ultimoTicket = info[0].ultimoTicket;
        }
        else 
        {
            this.licencia = 0
            this.codigoTienda = 0
            this.database = '';
            this.nombreEmpresa = '';
            this.nombreTienda = '';
            this.tipoImpresora = TIPO_USB; //USB y SERIE
            this.tipoDatafono = TIPO_CLEARONE; //CLEARONE y 3G
            this.ultimoTicket = -1;
            this.arrayFichados = [];
        }

        this.promociones = [];
        
        if(infoCaja === null)
        {
            this.caja  = {
                _id: "CAJA",
                inicioTime: null,
                totalApertura: null,
                detalleApertura: null
            };
        }
        else
        {
            this.caja = infoCaja;
        }
    }
    cajaAbierta()
    {
        if(this.caja.inicioTime === null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    setCaja(data)
    {
        this.caja  = {
            _id: "CAJA",
            inicioTime: data.inicioTime,
            totalApertura: Number(data.totalApertura),
            detalleApertura: data.detalleApertura
        };
    }
    todoInstalado(): boolean //COMPROBADA
    {
        if (this.licencia !== 0 && this.codigoTienda !== 0 && this.database !== '' && this.nombreEmpresa !== '' && this.nombreTienda !== '' && this.ultimoTicket !== -1) 
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    setParametros(licencia: number, codigoTienda: number, database: string, nombreEmpresa: string, nombreTienda: string, tipoImpresora: string, tipoDatafono: string, ultimoTicket: number): void //COMPROBADA
    {
        this.licencia = licencia;
        this.codigoTienda = codigoTienda;
        this.database = database;
        this.nombreEmpresa = nombreEmpresa;
        this.nombreTienda = nombreTienda;
        this.tipoImpresora = tipoImpresora;
        this.tipoDatafono = tipoDatafono;
        this.ultimoTicket = ultimoTicket;
    }
    setupToc(info): void //COMPROBADA
    {
        if (info.licencia > 0 && info.codigoTienda > 0 && info.database.length > 0 && info.nombreEmpresa.length > 0 && info.nombreTienda.length > 0 && info.tipoImpresora.length > 0 && info.tipoDatafono.length > 0 && info.ultimoTicket > -1) 
        {
            electron.ipcRenderer.send('setParametros', info);
            this.setParametros(info.licencia, info.codigoTienda, info.database, info.nombreEmpresa, info.nombreTienda, info.tipoImpresora, info.tipoDatafono, info.ultimoTicket);
            this.descargarDatos();
        }
    }
    descargarDatos(): void 
    {
        socket.emit('cargar-todo', { licencia: this.licencia, database: this.database });
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
    addFichado(trabajador: any): void //COMPROBADA
    {
        this.setCurrentTrabajador(trabajador._id);
        this.arrayFichados.push(trabajador);
        electron.ipcRenderer.send('fichar-trabajador', trabajador._id);

    }
    delFichado(trabajador: any): void //COMPROBADA
    {
        this.arrayFichados = this.arrayFichados.filter(item=>{
            return item._id != trabajador._id;
        });

        electron.ipcRenderer.send('desfichar-trabajador', trabajador._id);
    }
    abrirCaja(data: any)
    {
        this.setCaja(data);
        electron.ipcRenderer.send('actualizar-info-caja', data);
        vueApertura.cerrarModal();
        vueToast.abrir('success', 'CAJA ABIERTA');
        this.iniciar();
    }
    setArrayFichados(arrayFichados: any): void //COMPROBADA
    {
        this.arrayFichados = arrayFichados;
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
                if(fichados[i]._id === idTrabajador)
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
        electron.ipcRenderer.send('get-teclas', nombreMenu);
    }
    getCesta()
    {
        return this.cesta;
    }
    setCesta(data)
    {
        electron.ipcRenderer.send('set-cesta', data);
        this.cesta = data;
        this.enviarCesta();
    }
    cargarCesta() //En memoria de la clase
    {
        electron.ipcRenderer.send('get-cesta');
    }
    enviarCesta()
    {
        vueCesta.recibirCesta(this.cesta);
    }
    deshacerOfertas(cesta)
    {
        return cesta;
    }
    existeArticuloParaOfertaEnCesta(cesta, idArticulo, unidadesNecesarias)
    {
        for(let i = 0; i < cesta.lista.length; i++)
        {
            if(cesta.lista[i].idArticulo === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias)
            {
                return i;
            }
        }
        return -1;
    }
    cuantasPuedoAplicar(necesariasPrincipal, necesariasSecundario, cesta, posicionPrincipal, posicionSecundario, pideDelA, pideDelB)
    {
        let numeroPrincipal     = 0;
        let numeroSecundario    = 0;
        let sobranPrincipal     = 0;
        let sobranSecundario    = 0;
        let nVeces              = 0;

        if(pideDelA !== -1 && pideDelB !== -1)
        {
            numeroPrincipal          = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
            numeroSecundario         = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
            nVeces                   = Math.min(numeroPrincipal, numeroSecundario);
            sobranPrincipal          = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;
            sobranSecundario         = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;
        }
        else
        {
            if(pideDelA !== -1 && pideDelB === -1)
            {
                numeroPrincipal = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
                nVeces          = numeroPrincipal;
                sobranPrincipal = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;
            }
            else
            {
                if(pideDelA === -1 && pideDelB !== -1)
                {
                    numeroSecundario = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
                    nVeces          = numeroSecundario;
                    sobranSecundario = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;
                }
            }
        }
        return {
            sobranPrincipal: sobranPrincipal,
            sobranSecundario: sobranSecundario,
            nVeces: nVeces
        }
    }
    buscarOfertas(unaCesta)
    {
        unaCesta = this.deshacerOfertas(unaCesta);
        for(let i = 0; i < this.promociones.length; i++)
        {
            for(let j = 0; j < this.promociones[i].principal.length ; i++)
            {
                let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal)
                if(this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0)
                {
                    for(let z = 0; z < this.promociones[i].secundario.length; z++)
                    {
                        let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
                        if(this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0)
                        {
                            let infoAplicado = this.cuantasPuedoAplicar(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id);
                            this.insertarPromocionesYCorregirCesta();
                            break;
                        }
                    }
                }
               
            }
        }
        this.setCesta(unaCesta);
    }
    insertarArticuloCesta(infoArticulo, unidades: number)
    {
        var miCesta = this.getCesta();

        if(miCesta.lista.length > 0)
        {
            let encontrado = false;
            for(let i = 0; i < miCesta.lista.length; i++)
            {
                if(miCesta.lista[i].idArticulo === infoArticulo._id)
                {
                    miCesta.lista[i].unidades += unidades;
                    miCesta.lista[i].subtotal += Number((unidades*infoArticulo.precioConIva).toFixed(2));
                    encontrado = true;
                    break;
                }
            }
            if(!encontrado)
            {
                miCesta.lista.push({idArticulo:infoArticulo._id, nombre: infoArticulo.nombre, unidades: 1, promocion: false, subtotal: Number((unidades*infoArticulo.precioConIva).toFixed(2))});
            }
        }
        else
        {
            miCesta.lista.push({idArticulo:infoArticulo._id, nombre: infoArticulo.nombre, unidades: 1, promocion: false, subtotal: Number((unidades*infoArticulo.precioConIva).toFixed(2))});
        }
        this.buscarOfertas(miCesta);
    }
    addItem(idArticulo: number, idBoton: String, aPeso: Boolean, peso: number, subtotal: number, unidades: number = 1)
    {
        try
        {
            $('#'+idBoton).attr('disabled', true);
            if(!aPeso) //TIPO NORMAL
            {
                let infoArticulo = electron.ipcRenderer.sendSync('get-info-articulo', idArticulo);
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
                //caso a peso
            }
            $('#'+idBoton).attr('disabled', false);
        }
        catch(err)
        {
            console.log(err);
            vueToast.abrir('error', 'Error al añadir el articulo');
            $('#'+idBoton).attr('disabled', false);
        }
    }
    iniciar(): void //COMPROBADA
    {
        electron.ipcRenderer.send('buscar-fichados');
        const infoPromociones = electron.ipcRenderer.sendSync('get-promociones');
        if(infoPromociones.length > 0)
        {
            this.promociones = infoPromociones;
        }

        electron.ipcRenderer.send('get-menus');
        electron.ipcRenderer.send('get-cesta');
    }
}