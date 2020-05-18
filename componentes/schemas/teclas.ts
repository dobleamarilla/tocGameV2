var conexion = require('../conexion');

var schemaTeclas = new conexion.mongoose.Schema({
    nomMenu: String,
    idArticle: Number,
    nombreArticulo: String,
    pos: Number,
    color: Number,
    esSumable: Boolean
});
var Teclas = conexion.mongoose.model('teclas', schemaTeclas);

function insertarTeclasMain(data: any)
{
    return Teclas.insertMany(data);

}
function getTecladoMain(nombreMenu: string)
{
    return Teclas.find({nomMenu: nombreMenu}).lean();
}

exports.teclas                  = Teclas;
exports.insertarTeclasMain      = insertarTeclasMain;
exports.getTecladoMain              = getTecladoMain;