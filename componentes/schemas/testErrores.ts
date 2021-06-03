var conexion = require('../conexion');

var schemaTestErrores = new conexion.mongoose.Schema({
    error: String,
    numeroTicket: Number
});
var TestErrores = conexion.mongoose.model('testerrores', schemaTestErrores);

function insertarError(data)
{
    var aux = new TestErrores(data);
    aux.save();
}

exports.insertarError = insertarError;