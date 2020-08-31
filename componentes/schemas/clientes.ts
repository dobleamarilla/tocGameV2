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
    return Clientes.find({$or:[{"nombre": { '$regex': new RegExp(busqueda, 'i')}}, {"tarjetaCliente": busqueda}]}, null, {lean: true, limit: 20});
}

function borrarTodo()
{
    return Clientes.deleteMany({}, err=>{
        if(err)
        {
            console.log(err);
        }
    });
}
function cargarNuevosClientes(clientes)
{
    var devolver = new Promise((dev, rej)=>{
        borrarTodo().then(function(){
            insertarClientes(clientes).then(()=>{
                dev(true)
            });
        });
    });
    return devolver;
}

exports.clientes             = Clientes;
exports.insertarClientes     = insertarClientes;
exports.buscarCliente        = buscarCliente;