var conexion = require('../conexion');
import {ipcMain} from 'electron';

var schemaParametrosTicket = new conexion.mongoose.Schema({
    nombreDato: String,
    valorDato: String
});
var ParametrosTicket = conexion.mongoose.model('parametros-ticket', schemaParametrosTicket);

function insertarParametrosTicket(data)
{
    var devolver = new Promise((dev, rej)=>{
        ParametrosTicket.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}
function getParamsTicket()
{
    return ParametrosTicket.find({}, ((err, resultado)=>{
        if(err)
        {
            console.log(err);
        }
    })).lean();
}

ipcMain.on('get-params-ticket', (ev, data)=>{
    getParamsTicket().then(res=>{
        ev.returnValue = res;
    });
});