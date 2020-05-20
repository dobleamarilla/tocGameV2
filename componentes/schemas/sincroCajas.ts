var conexion = require('../conexion');

var schemaSincro = new conexion.mongoose.Schema({
    _id: String,
    inicioTime: Date,
    finalTime: Date,
    idDependienta: Number,
    totalApertura: Number,
    totalCierre: Number,
    descuadre: Number,
    recaudado: Number,
    nClientes: Number,
    detalleApertura: {
        valor: Number,
        unidades: Number
    },
    detalleCierre: {
        valor: Number,
        unidades: Number
    },
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    }
});
var Sincro = conexion.mongoose.model('sincro', schemaSincro);

function nuevoItemSincroCajas(data): void
{
    var aux = new Sincro(data);
    aux.save();
}

function getMovimientosCaja()
{
    return Sincro.find({enviado: false, enTransito: false}).lean();
}


exports.sincro                      = Sincro;
exports.nuevoItemSincroCajas        = nuevoItemSincroCajas;
exports.getMovimientosCaja          = getMovimientosCaja;