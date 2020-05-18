var conexion = require('../conexion');

var schemaCestas = new conexion.mongoose.Schema({
    _id: Date,
    lista: [{
        nombre: String,
        unidades: Number,
        subtotal: Number
    }]
});
var Cestas = conexion.mongoose.model('cestas', schemaCestas);

function setCesta(cesta)
{
    return Cestas.replaceOne({ _id: cesta._id }, cesta.lista, {upsert: true}, (err, result)=>{
        if(err) 
        {
            console.log(err);
        }
    });
}
function getUnaCesta()
{
    return Cestas.findOne().lean();
}
function getCestaConcreta()
{

}

exports.cestas                  = Cestas;
exports.setCesta                = setCesta;
exports.getUnaCesta             = getUnaCesta;