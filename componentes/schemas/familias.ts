var conexion = require('../conexion');
import {ipcMain} from 'electron';

var schemaFamilias = new conexion.mongoose.Schema({
    nombre: String,
    padre: String
});
var Familias = conexion.mongoose.model('familias', schemaFamilias);

export function insertarFamilias(data)
{
    var devolver = new Promise((dev, rej)=>{
        Familias.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}
export function borrarFamilias()
{
    return Familias.deleteMany({}, (err)=>{
        if(err)
        {
            console.log(err);
        }
    });
}

