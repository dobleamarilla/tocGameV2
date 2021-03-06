var conexion = require('../conexion');

var schemaMovimientos = new conexion.mongoose.Schema({
    _id: Number,
    tipo: String,
    valor: Number,
    concepto: String,
    idTrabajador: Number,
    codigoBarras: String,
    enviado: {
        type: Boolean,
        default: false
    },
    enTransito: {
        type: Boolean,
        default: false
    },
    tipoExtra: String,
    idTicket: Number
});
var Movimientos = conexion.mongoose.model('movimientos', schemaMovimientos);

function insertarMovimiento(data)
{
    var nuevo = new Movimientos(data);
    nuevo.save();
}
function getMovimientosRango(fechaInicio: number, fechaFinal: number)
{
    return Movimientos.find({_id: {$lte: fechaFinal, $gte: fechaInicio}}).lean();
}
function getParaSincronizarMovimientos()
{
    return Movimientos.findOneAndUpdate({enviado: false, enTransito: false}, {enTransito: true}, {lean: true, sort: {_id: 1}});
}
function confirmarMovimiento(id)
{
    Movimientos.updateOne({_id: id}, {enviado: true, enTransito: false}, ((err, queHeHecho)=>{
        //console.log(err, queHeHecho)
    }));
}

function cleanMovimientos()
{
    Movimientos.updateMany({enviado: false, enTransito: true}, {enTransito: false}).then(info=>{
        if(info.n > 0)
        {
            console.log("Movimientos pendientes enviados al servidor");
        }
    });
}

exports.insertarMovimiento              = insertarMovimiento;
exports.getMovimientosRango             = getMovimientosRango;
exports.getParaSincronizarMovimientos   = getParaSincronizarMovimientos;
exports.confirmarMovimiento             = confirmarMovimiento;
exports.cleanMovimientos                = cleanMovimientos;