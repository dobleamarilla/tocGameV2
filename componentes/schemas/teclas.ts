var conexion = require('../conexion');
import {ipcMain} from 'electron';

var schemaTeclas = new conexion.mongoose.Schema({
    nomMenu: String,
    idArticle: Number,
    nombreArticulo: String,
    pos: Number,
    color: Number,
    esSumable: Boolean
});
var Teclas = conexion.mongoose.model('teclas', schemaTeclas);

export function insertarTeclasMain(data: any)
{
    return Teclas.insertMany(data);

}
function getTecladoMain(nombreMenu: string)
{
    return Teclas.find({nomMenu: nombreMenu}).lean();
}

export function borrarTeclas()
{
    return Teclas.deleteMany({}, (err)=>{
        if(err)
        {
            console.log(err);
        }
    });
}

ipcMain.on('get-teclas', (ev, data) => {
    getTecladoMain(data).then(respuesta => {
        ev.sender.send('res-get-teclas', respuesta);
    });
});