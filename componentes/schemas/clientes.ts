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

function buscarCliente(busqueda: string)
{
    return Clientes.find({"nombre": { '$regex': new RegExp(busqueda, 'i')}}, null, {lean: true, limit: 20});
}

exports.clientes             = Clientes;
exports.insertarClientes     = insertarClientes;
exports.buscarCliente        = buscarCliente;