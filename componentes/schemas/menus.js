"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaMenus = new conexion.mongoose.Schema({
    nomMenu: String
});
var Menus = conexion.mongoose.model('menus', schemaMenus);
function insertarMenus(data) {
    return Menus.insertMany(data);
}
exports.insertarMenus = insertarMenus;
function getMenus() {
    return Menus.find().lean();
}
function borrarMenus() {
    return Menus.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.borrarMenus = borrarMenus;
electron_1.ipcMain.on('get-menus', (ev, data) => {
    getMenus().then(respuesta => {
        ev.sender.send('res-get-menus', respuesta);
    });
});
//# sourceMappingURL=menus.js.map