"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conexion = require('../conexion');
const electron_1 = require("electron");
var schemaCestas = new conexion.mongoose.Schema({
    _id: Number,
    tiposIva: {
        base1: Number,
        base2: Number,
        base3: Number,
        valorIva1: Number,
        valorIva2: Number,
        valorIva3: Number,
        importe1: Number,
        importe2: Number,
        importe3: Number
    },
    lista: [{
            _id: Number,
            nombre: String,
            promocion: {
                _id: {
                    type: String,
                    default: ''
                },
                esPromo: Boolean,
                infoPromo: {
                    idPrincipal: Number,
                    cantidadPrincipal: Number,
                    idSecundario: Number,
                    cantidadSecundario: Number,
                    precioRealPrincipal: Number,
                    precioRealSecundario: Number,
                    unidadesOferta: Number
                }
            },
            subtotal: Number,
            unidades: Number
        }]
});
var Cestas = conexion.mongoose.model('cestas', schemaCestas);
function setCesta(cesta) {
    if (cesta.lista.length > 0) {
        Cestas.replaceOne({ _id: cesta._id }, cesta, { upsert: true }, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
    }
}
function getUnaCesta(_id = -1) {
    if (_id !== -1) {
        return Cestas.findById(_id, null, { lean: true });
    }
    else {
        return Cestas.findOne({}, null, { lean: true });
    }
}
function getCestaConcreta(idCesta) {
    return Cestas.findById(idCesta, (err, lal) => {
        if (err) {
            console.log(err, lal);
        }
    }).lean();
}
function borrarCesta(id) {
    return Cestas.deleteMany({ _id: id }, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
function getAllCestas() {
    return Cestas.find({}, null, { lean: true });
}
function nuevaCesta(cesta) {
    var nuevo = new Cestas(cesta);
    nuevo.save();
}
function contarCestas() {
    return Cestas.countDocuments({});
}
function crearCestaVacia() {
    const cestaVacia = {
        _id: Date.now(),
        tiposIva: {
            base1: 0,
            base2: 0,
            base3: 0,
            valorIva1: 0,
            valorIva2: 0,
            valorIva3: 0,
            importe1: 0,
            importe2: 0,
            importe3: 0
        },
        lista: []
    };
    return cestaVacia;
}
electron_1.ipcMain.on('get-cesta', (ev, data = -1) => {
    getUnaCesta(data).then(respuesta => {
        if (respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null) {
            ev.sender.send('res-get-cesta', respuesta);
        }
        else {
            ev.sender.send('res-get-cesta', crearCestaVacia());
        }
    });
});
electron_1.ipcMain.on('del-cesta', (ev, id) => {
    borrarCesta(id).then(() => {
        ev.returnValue = true;
    });
});
electron_1.ipcMain.on('borrar-cesta', (ev, idCesta) => {
    borrarCesta(idCesta);
});
electron_1.ipcMain.on('count-cesta', (ev, id) => {
    contarCestas().then((info) => {
        ev.sender.send('res-contar-cestas', info);
    });
});
electron_1.ipcMain.on('new-cesta', (ev, data) => {
    let aux = crearCestaVacia();
    ev.sender.send('res-get-cesta', aux);
    nuevaCesta(aux);
});
electron_1.ipcMain.on('getAllCestas', (event, data) => {
    getAllCestas().then(res => {
        event.returnValue = res;
    });
});
electron_1.ipcMain.on('set-cesta', (ev, data) => {
    setCesta(data);
});
//# sourceMappingURL=cestas.js.map