var conexion = require('../conexion');

var schemaEncargos = new conexion.mongoose.Schema({
    _id: Number,
    nombreCliente: String,
    precioEncargo: Number,
    dejaACuenta: Number,
    fechaEncargo: Number,
    comentario: String,
    articulos: [{
        idProducto: Number,
        nombre: String,
        precioConIva: Number,
        precioBase: Number,
        tipoIva: Number,
        esSumable: Boolean,
        familia: String
    }]
});
var Encargos = conexion.mongoose.model('encargos', schemaEncargos);

function insertarEncargo(data)
{
    var devolver = new Promise((dev, rej)=>{
        Encargos.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
    // var devolver = new Promise((dev, rej)=>{
    //     Articulos.updateMany({}, data, {upsert: true}).then(()=>{
    //         dev(true);
    //     });
    // });
    // return devolver;
}
function buscarEncargo(busqueda: string) {
    return Encargos.find({$or:[{"nombreCliente": { '$regex': new RegExp(busqueda, 'i')}}]}, null, {lean: true, limit: 20});
}
function getInfoEncargo(idArticulo: number)
{
    return Encargos.findById(idArticulo).lean();
}
function getNombreEncargo(id)
{
    var devolver = new Promise((dev, rej)=>{
        Encargos.findById(id).lean().then(info=>{
            dev(info.nombre)
        });
    })
    return devolver;
}

function borrarEncargo()
{
    return Encargos.deleteMany({}, (err)=>{
        if(err)
        {
            console.log(err);
        }
    });
}
exports.encargos            = Encargos;
exports.insertarEncargo     = insertarEncargo;
exports.buscarEncargo       = buscarEncargo;
exports.getInfoEncargo      = getInfoEncargo;
exports.getNombreEncargo    = getNombreEncargo;
exports.borrarEncargo       = borrarEncargo;