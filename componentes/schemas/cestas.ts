var conexion = require('../conexion');

var schemaCestas = new conexion.mongoose.Schema({
    _id: Number,
    lista: [{
        idArticulo: Number,
        nombre: String,
        promocion: Boolean,
        subtotal: Number,
        unidades: Number
    }]
});
var Cestas = conexion.mongoose.model('cestas', schemaCestas);

function setCesta(cesta)
{
    if(cesta.lista.length > 0)
    {
        Cestas.replaceOne({ _id: cesta._id }, cesta, {upsert: true}, (err, result)=>{
            if(err) 
            {
                console.log(err);
            }
        });
    }
}
function getUnaCesta()
{
    return Cestas.findOne().lean();
}
function getCestaConcreta(idCesta: number)
{
    return Cestas.findById(idCesta, (err, lal)=>{
        if(err)
        {
            console.log(err, lal);
        }
    }).lean();
}

exports.cestas                  = Cestas;
exports.setCesta                = setCesta;
exports.getUnaCesta             = getUnaCesta;