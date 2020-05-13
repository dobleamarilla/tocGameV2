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
        }
    }
    todoInstalado(): boolean
    {
        if(this.licencia !== 0 && this.codigoTienda !== 0 && this.database !== '' && this.nombreEmpresa !== '' && this.nombreTienda !== '')
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    setParametros(licencia: number, codigoTienda: number, database: string, nombreEmpresa: string, nombreTienda: string, tipoImpresora: string, tipoDatafono: string): void
    {
        this.licencia       = licencia;
        this.codigoTienda   = codigoTienda;
        this.database       = database;
        this.nombreEmpresa  = nombreEmpresa;
        this.nombreTienda   = nombreTienda;
        this.tipoImpresora  = tipoImpresora;
        this.tipoDatafono   = tipoDatafono;
    }
    setupToc(data)
    {
        if(data.length === 1)
        {
            const info = data[0];
            this.setParametros(info.licencia, info.codigoTienda, info.database, info.nombreEmpresa, info.nombreTienda, info.tipoImpresora, info.tipoDatafono);
        }
    }
    imprimo()
    {
        console.log(this.licencia, this.codigoTienda, this.database, this.nombreEmpresa, this.nombreTienda);
    }
}