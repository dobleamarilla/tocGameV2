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

interface Promociones {
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

interface TiposIva {
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