// import {Cesta} from './Cesta';
// import {conexion} from '@/funciones/conexion';

const TIPO_USB       = 'USB';
const TIPO_SERIE     = 'SERIE';
const TIPO_CLEARONE  = 'CLEARONE';
const TIPO_3G        = '3G';

class TocGame 
{
    private licencia: number;
    private codigoTienda: number;
    private database: string;
    private nombreEmpresa: string;
    private nombreTienda: string;
    private tipoImpresora: string;
    private tipoDatafono: string;
    private ultimoTicket: number;

    constructor()
    {
        const info = electron.ipcRenderer.sendSync('getParametros');
        if(info.length === 1)
        {
            this.licencia       = info[0].licencia;
            this.codigoTienda   = info[0].codigoTienda;
            this.database       = info[0].database;
            this.nombreEmpresa  = info[0].nombreEmpresa;
            this.nombreTienda   = info[0].nombreTienda;
            this.tipoImpresora  = info[0].tipoImpresora; //USB y SERIE
            this.tipoDatafono   = info[0].tipoDatafono; //CLEARONE y 3G
            this.ultimoTicket   = info[0].ultimoTicket;
        }
        else
        {
            this.licencia       = 0
            this.codigoTienda   = 0
            this.database       = '';
            this.nombreEmpresa  = '';
            this.nombreTienda   = '';
            this.tipoImpresora  = TIPO_USB; //USB y SERIE
            this.tipoDatafono   = TIPO_CLEARONE; //CLEARONE y 3G
            this.ultimoTicket   = -1;
        }
    }
    todoInstalado(): boolean
    {
        if(this.licencia !== 0 && this.codigoTienda !== 0 && this.database !== '' && this.nombreEmpresa !== '' && this.nombreTienda !== '' && this.ultimoTicket !== -1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    setParametros(licencia: number, codigoTienda: number, database: string, nombreEmpresa: string, nombreTienda: string, tipoImpresora: string, tipoDatafono: string, ultimoTicket: number): void
    {
        this.licencia       = licencia;
        this.codigoTienda   = codigoTienda;
        this.database       = database;
        this.nombreEmpresa  = nombreEmpresa;
        this.nombreTienda   = nombreTienda;
        this.tipoImpresora  = tipoImpresora;
        this.tipoDatafono   = tipoDatafono;
    }
    setupToc(info): void
    {
        if(info.licencia > 0 && info.codigoTienda > 0 && info.database.length > 0 && info.nombreEmpresa.length > 0 && info.nombreTienda.length > 0 && info.tipoImpresora.length > 0 && info.tipoDatafono.length > 0 && info.ultimoTicket > -1)
        {
            electron.ipcRenderer.send('setParametros', info);
            this.setParametros(info.licencia, info.codigoTienda, info.database, info.nombreEmpresa, info.nombreTienda, info.tipoImpresora, info.tipoDatafono, info.ultimoTicket);
            this.descargarDatos();
        }
    }
    descargarDatos(): void
    {
        socket.emit('cargar-todo', {licencia: this.licencia, database: this.database});
        socket.on('cargar-todo', (data)=>{
            electron.ipcRenderer.sendSync('cargar-todo', data);
        });
    }
    iniciar(): void
    {
        if(this.todoInstalado())
        {
            console.log("Licencia OK");
            //comprobar trabajador fichado
        }
        else
        {
            abrirInstallWizard();
        }
    }
}