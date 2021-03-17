var conexion = require('../conexion');
import {ipcMain} from 'electron';

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

ipcMain.on('get-menus', (ev, data) => {
    getMenus().then(respuesta => {
        ev.sender.send('res-get-menus', respuesta);
    });
});