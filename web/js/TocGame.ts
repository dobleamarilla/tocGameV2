// import {Cesta} from './Cesta';
// import {conexion} from '@/funciones/conexion';

const TIPO_USB = 'USB';
const TIPO_SERIE = 'SERIE';
const TIPO_CLEARONE = 'CLEARONE';
const TIPO_3G = '3G';

class TocGame {
    private licencia: number;
    private codigoTienda: number;
    private database: string;
    private nombreEmpresa: string;
    private nombreTienda: string;
    private tipoImpresora: string;
    private tipoDatafono: string;
    private ultimoTicket: number;
    private arrayFichados: any;
    private caja: any;
    
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
    iniciar(): void //COMPROBADA
    {
        electron.ipcRenderer.send('buscar-fichados');
    }
}