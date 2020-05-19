interface Cesta
{
    _id: number;
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