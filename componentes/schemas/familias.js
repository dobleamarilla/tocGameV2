"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
var schemaFamilias = new conexion.mongoose.Schema({
    nombre: String,
    padre: String
});
var Familias = conexion.mongoose.model('familias', schemaFamilias);
function insertarFamilias(data) {
    var devolver = new Promise((dev, rej) => {
        Familias.insertMany(data).then(() => {
            dev(true);
        });
    });
    return devolver;
}
exports.insertarFamilias = insertarFamilias;
function borrarFamilias() {
    return Familias.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.borrarFamilias = borrarFamilias;
//# sourceMappingURL=familias.js.map