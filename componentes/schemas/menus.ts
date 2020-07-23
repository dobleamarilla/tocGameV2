var conexion = require('../conexion');

var schemaMenus = new conexion.mongoose.Schema({
    nomMenu: String
});
var Menus = conexion.mongoose.model('menus', schemaMenus);

function insertarMenus(data: any)
{
    return Menus.insertMany(data);

}
function getMenus()
{
    return Menus.find().lean();
}

function borrarMenus()
{
    return Menus.deleteMany({}, (err)=>{
        if(err)
        {
            console.log(err);
        }
    });
}

exports.menus          = Menus;
exports.insertarMenus  = insertarMenus;
exports.getMenus       = getMenus;
exports.borrarMenus    = borrarMenus;