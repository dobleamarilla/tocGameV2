interface Cesta
{
    _id: number,
    tiposIva: {
        base1: number,
        base2: number,
        base3: number,
        valorIva1: number,
        valorIva2: number,
        valorIva3: number,
        importe1: number,
        importe2: number,
        importe3: number
    },
    lista: {
        _id: number,
        nombre: string,
        unidades: number,
        subtotal: number,
        promocion: {
            _id: string,
            esPromo: boolean,
            infoPromo?: {
                idPrincipal?: number,
                cantidadPrincipal?: number,
                idSecundario?: number,
                cantidadSecundario?: number,
                precioRealPrincipal?: number,
                precioRealSecundario?: number,
                unidadesOferta?: number
            }
        }
    }[];
}

interface Articulo 
{
    _id: number,
    tipoIva: number,
    precioConIva: number,
    precioBase: number,
    nombre: string,
    familia: string,
    esSumable: boolean
}

interface Promociones 
{
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
};

interface TiposIva 
{
    base1: number,
    base2: number,
    base3: number,
    valorIva1: number,
    valorIva2: number,
    valorIva3: number,
    importe1: number,
    importe2: number,
    importe3: number
}
interface ObjTicket {
    calaixFet: number, 
    nombreTrabajador: string, 
    descuadre: number, 
    nClientes: number, 
    recaudado: number, 
    arrayMovimientos: any,
    nombreTienda: string, 
    fechaInicio: number, 
    fechaFinal: number, 
    cInicioCaja: number, 
    cFinalCaja: number, 
    tipoImpresora: string,
    totalTarjeta: number
}
interface Caja 
{
    _id: string, //siempre es 'CAJA'
    inicioTime: number,
    finalTime: number,
    idDependienta: number,
    totalApertura: number,
    totalCierre: number,
    descuadre: number,
    recaudado: number,
    nClientes: number,
    ultimoTicket: number,
    calaixFetZ: number,
    infoExtra: {
        cambioInicial: number,
        cambioFinal: number,
        totalSalidas: number,
        totalEntradas: number,
        totalEnEfectivo: number,
        totalTarjeta: number,
        totalDeuda: number
    },
    primerTicket: number,
    detalleApertura: {
        _id: string,
        valor: number,
        unidades: number
    }[],
    detalleCierre: {
        _id: string,
        valor: number,
        unidades: number
    }[],
    enviado: boolean,
    enTransito: boolean,
    totalDatafono3G: number,
    totalClearOne: number
}

interface Parametros
{
    _id: string,
    codigoTienda: number,
    database: string,
    licencia: number,
    nombreEmpresa: string,
    nombreTienda: string,
    tipoDatafono: string,
    tipoImpresora: string,
    impresoraCafeteria: string,
    clearOneCliente?: number,
    clearOneTienda?: number,
    clearOneTpv?: number,
    botonesConPrecios: string,
    prohibirBuscarArticulos: string,
    token: string
}

interface Trabajador
{
    _id: number,
    idTrabajador: number,
    nombre: string,
    nombreCorto: string,
    fichado: boolean
}

interface Ticket
{
    _id: number,
    timestamp: number,
    total: number,
    lista: {
        _id: number,
        nombre: string,
        promocion: {
            _id: string,
            esPromo: boolean
        },
        subtotal: number,
        unidades: number
    }[],
    tipoPago: string,
    idTrabajador: number,
    tiposIva: {
        base1: number,
        base2: number,
        base3: number,
        valorIva1: number,
        valorIva2: number,
        valorIva3: number,
        importe1: number,
        importe2: number,
        importe3: number
    },
    enviado?: boolean,
    enTransito?: boolean,
    cliente?: string,
    infoClienteVip?: {
        esVip: boolean,
        nif: string,
        nombre: string,
        cp: string,
        direccion: string,
        ciudad: string
    },
    cantidadTkrs?: number
}

interface Movimientos
{
    _id: number,
    tipo: string,
    valor: number,
    concepto: string,
    idTrabajador: number,
    tipoExtra: string,
    codigoBarras: string,
    idTicket: number
};

interface Cliente
{
    id: string,
    nombre: string,
    tarjetaCliente: string
}

interface resClienteVIP
{
    esVip: boolean,
    info: any,
    idCliente: number
}