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

function borrarTeclas()
{
    return Teclas.deleteMany({}, (err)=>{
        if(err)
        {
            console.log(err);
        }
    });
}

exports.teclas                  = Teclas;
exports.insertarTeclasMain      = insertarTeclasMain;
exports.getTecladoMain          = getTecladoMain;
exports.borrarTeclas            = borrarTeclas;