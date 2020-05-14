var conexion = require('../conexion');

var schemaClientes = new conexion.mongoose.Schema({
    id: String,
    nombre: String,
    tarjetaCliente: String
});
var Clientes = conexion.mongoose.model('clientes', schemaClientes);

function insertarClientes(data)
{
    var devolver = new Promise((dev, rej)=>{
        Clientes.insertMany(data).then(()=>{
            dev(true);
        });
    });
    return devolver;
}

exports.clientes             = Clientes;
exports.insertarClientes     = insertarClientes;