var conexion = require('../conexion');

var schemaArticulosTarifaEspecial = new conexion.mongoose.Schema({
    _id: Number,
    nombre: String,
    precioConIva: Number,
    precioBase: Number,
    tipoIva: Number,
    esSumable: Boolean,
    familia: String
});
var ArticulosTarifaEspecial = conexion.mongoose.model('ArticulosTarifaEspecial', schemaArticulosTarifaEspecial);

function insertarArticulosTarifaEspecial(data)
{
    var devolver = new Promise((dev, rej)=>{
        ArticulosTarifaEspecial.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}
function buscarArticuloTarifaEspecial(busqueda: string) {
    return ArticulosTarifaEspecial.find({$or:[{"nombre": { '$regex': new RegExp(busqueda, 'i')}}]}, null, {lean: true, limit: 20});
}
function getInfoArticuloTarifaEspecial(idArticulo: number)
{
    return ArticulosTarifaEspecial.findById(idArticulo).lean();
}
function getNombreArticuloTarifaEspecial(id)
{
    var devolver = new Promise((dev, rej)=>{
        ArticulosTarifaEspecial.findById(id).lean().then(info=>{
            dev(info.nombre)
        });
    })
    return devolver;
}

function getPrecioTarifaEspecial(id)
{
    return ArticulosTarifaEspecial.findById(id).lean();
}
function getPreciosTarifaEspecial() {
    return ArticulosTarifaEspecial.find({}, {_id: 0, nombre: 1, precioConIva: 1}).lean();
}
function borrarArticulosTarifaEspecial()
{
    return ArticulosTarifaEspecial.deleteMany({}, (err)=>{
        if(err)
        {
            console.log(err);
        }
    });
}
exports.ArticulosTarifaEspecial                             = ArticulosTarifaEspecial;
exports.insertarArticulosTarifaEspecial                     = insertarArticulosTarifaEspecial;
exports.buscarArticuloTarifaEspecial                        = buscarArticuloTarifaEspecial;
exports.getInfoArticuloTarifaEspecial                       = getInfoArticuloTarifaEspecial;
exports.getNombreArticuloTarifaEspecial                     = getNombreArticuloTarifaEspecial;
exports.getPrecioTarifaEspecial                             = getPrecioTarifaEspecial;
exports.getPreciosTarifaEspecial                            = getPreciosTarifaEspecial;
exports.borrarArticulosTarifaEspecial                       = borrarArticulosTarifaEspecial;