var conexion = require('../conexion');
var schemaClientes = new conexion.mongoose.Schema({
    id: String,
    nombre: String,
    tarjetaCliente: String
});
var Clientes = conexion.mongoose.model('clientes', schemaClientes);
function insertarClientes(data) {
    var devolver = new Promise((dev, rej) => {
        borrarTodo().then(() => {
            Clientes.insertMany(data).then(() => {
                dev(true);
            });
        });
    });
    return devolver;
}
function buscarCliente(busqueda) {
    return Clientes.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, 'i') } }, { "tarjetaCliente": busqueda }] }, null, { lean: true, limit: 20 });
}
function getClientById(idCliente) {
    return Clientes.find({ id: idCliente }, null, { lean: true, limit: 1 });
}
function comprobarClienteIdentico(nombre) {
    return Clientes.find({ nombre: nombre }, null, { lean: true, limit: 1 });
}
function comprobarClienteIdenticoTarjeta(nombre) {
    return Clientes.find({ nombre: nombre }, null, { lean: true, limit: 1 });
}
function borrarTodo() {
    return Clientes.deleteMany({}, err => {
        if (err) {
            console.log(err);
        }
    });
}
function cargarNuevosClientes(clientes) {
    var devolver = new Promise((dev, rej) => {
        borrarTodo().then(function () {
            insertarClientes(clientes).then(() => {
                dev(true);
            });
        });
    });
    return devolver;
}
function crearNuevo(datos) {
    var nuevo = new Clientes({ id: 'CliBotiga_' + datos.tienda + Date.now(), nombre: datos.nombre, tarjetaCliente: datos.idTarjeta });
    nuevo.save();
}
exports.clientes = Clientes;
exports.insertarClientes = insertarClientes;
exports.buscarCliente = buscarCliente;
exports.comprobarClienteIdentico = comprobarClienteIdentico;
exports.comprobarClienteIdenticoTarjeta = comprobarClienteIdenticoTarjeta;
exports.crearNuevo = crearNuevo;
exports.getClientById = getClientById;
//# sourceMappingURL=clientes.js.map