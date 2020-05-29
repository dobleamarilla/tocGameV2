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
        idArticulo: number,
        nombre: string,
        unidades: number,
        subtotal: number,
        promocion: {
            _id: string,
            esPromo: boolean
        }
    }[];
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
    enTransito: boolean
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
    tipoImpresora: string
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
        idArticulo: number,
        nombre: string,
        promocion: {
            _id: string,
            esPromo: boolean
        },
        subtotal: number,
        unidades: number
    }[],
    tarjeta: boolean,
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
    enTransito?: boolean
}

interface Movimientos
{
    _id: number,
    tipo: string,
    valor: number,
    concepto: string,
    idTrabajador: number,
    enviado: boolean,
    enTransito: boolean
};

interface Cliente
{
    id: string,
    nombre: string,
    tarjetaCliente: string
}