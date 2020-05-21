var conexion = require('../conexion');
var schemaMenus = new conexion.mongoose.Schema({
    nomMenu: String
});
var Menus = conexion.mongoose.model('menus', schemaMenus);
function insertarMenus(data) {
    return Menus.insertMany(data);
}
function getMenus() {
    return Menus.find().lean();
}
exports.menus = Menus;
exports.insertarMenus = insertarMenus;
exports.getMenus = getMenus;
//# sourceMappingURL=menus.js.map