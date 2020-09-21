var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var escpos = require('escpos');
var exec = require('child_process').exec;
var os = require('os');
escpos.USB = require('escpos-usb');
escpos.Serial = require('escpos-serialport');
var articulos = require('./schemas/articulos');
const TIPO_ENTRADA_DINERO = 'ENTRADA';
const TIPO_SALIDA_DINERO = 'SALIDA';
function dateToString2(fecha) {
    var fechaFinal = null;
    if (typeof fecha === 'string' || typeof fecha === 'number') {
        fechaFinal = new Date(fecha);
    }
    let finalYear = `${fechaFinal.getFullYear()}`;
    let finalMonth = `${fechaFinal.getMonth() + 1}`;
    let finalDay = `${fechaFinal.getDate()}`;
    let finalHours = `${fechaFinal.getHours()}`;
    let finalMinutes = `${fechaFinal.getMinutes()}`;
    let finalSeconds = `${fechaFinal.getSeconds()}`;
    if (finalMonth.length === 1) {
        finalMonth = '0' + finalMonth;
    }
    if (finalDay.length === 1) {
        finalDay = '0' + finalDay;
    }
    if (finalHours.length === 1) {
        finalHours = '0' + finalHours;
    }
    if (finalMinutes.length === 1) {
        finalMinutes = '0' + finalMinutes;
    }
    if (finalSeconds.length === 1) {
        finalSeconds = '0' + finalSeconds;
    }
    return `${finalYear}-${finalMonth}-${finalDay} ${finalHours}:${finalMinutes}:${finalSeconds}`;
}
var imprimirTicketVenta = function (event, numFactura, arrayCompra, total, tipoPago, tiposIva, cabecera, pie, nombreDependienta, tipoImpresora, infoClienteVip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
            if (tipoImpresora === 'USB') {
                console.log('VA POR USB');
                var device = new escpos.USB('0x4B8', '0x202'); //USB
            }
            else {
                if (tipoImpresora === 'SERIE') {
                    console.log('VA POR SERIE');
                    var device = new escpos.Serial('/dev/ttyS0', {
                        baudRate: 115000,
                        stopBit: 2
                    });
                }
            }
            var printer = new escpos.Printer(device);
            var detalles = '';
            var pagoTarjeta = '';
            var detalleClienteVip = '';
            if (infoClienteVip.esVip) {
                detalleClienteVip = `Nom: ${infoClienteVip.nombre}\nNIF: ${infoClienteVip.nif}\nCP: ${infoClienteVip.cp}\nCiutat: ${infoClienteVip.ciudad}\nAdr: ${infoClienteVip.direccion}\n`;
            }
            for (let i = 0; i < arrayCompra.length; i++) {
                if (arrayCompra[i].promocion.esPromo) {
                    let nombrePrincipal = yield articulos.getNombreArticulo(arrayCompra[i].promocion.infoPromo.idPrincipal);
                    nombrePrincipal = "Oferta " + nombrePrincipal;
                    while (nombrePrincipal.length < 20) {
                        nombrePrincipal += ' ';
                    }
                    detalles += `${arrayCompra[i].unidades * arrayCompra[i].promocion.infoPromo.cantidadPrincipal}     ${nombrePrincipal.slice(0, 20)}       ${arrayCompra[i].promocion.infoPromo.precioRealPrincipal.toFixed(2)}\n`;
                    if (arrayCompra[i].promocion.infoPromo.cantidadSecundario > 0) {
                        let nombreSecundario = yield articulos.getNombreArticulo(arrayCompra[i].promocion.infoPromo.idSecundario);
                        nombreSecundario = "Oferta " + nombreSecundario;
                        while (nombreSecundario.length < 20) {
                            nombreSecundario += ' ';
                        }
                        detalles += `${arrayCompra[i].unidades * arrayCompra[i].promocion.infoPromo.cantidadSecundario}     ${nombreSecundario.slice(0, 20)}       ${arrayCompra[i].promocion.infoPromo.precioRealSecundario.toFixed(2)}\n`;
                    }
                }
                else {
                    if (arrayCompra[i].nombre.length < 20) {
                        while (arrayCompra[i].nombre.length < 20) {
                            arrayCompra[i].nombre += ' ';
                        }
                    }
                    detalles += `${arrayCompra[i].unidades}     ${arrayCompra[i].nombre.slice(0, 20)}       ${arrayCompra[i].subtotal.toFixed(2)}\n`;
                }
            }
            var fecha = new Date();
            if (tipoPago == "TARJETA") {
                pagoTarjeta = '----------- PAGADO CON TARJETA ---------\n';
            }
            var pagoDevolucion = '';
            if (tipoPago == "DEVOLUCION") {
                pagoDevolucion = '-- ES DEVOLUCION --\n';
            }
            var detalleIva4 = '';
            var detalleIva10 = '';
            var detalleIva21 = '';
            var detalleIva = '';
            if (tiposIva.importe1 > 0) {
                detalleIva4 = `${tiposIva.base1.toFixed(2)}        4%: ${tiposIva.valorIva1.toFixed(2)}      ${tiposIva.importe1.toFixed(2)}\n`;
            }
            if (tiposIva.importe2 > 0) {
                detalleIva10 = `${tiposIva.base2.toFixed(2)}        10%: ${tiposIva.valorIva2.toFixed(2)}      ${tiposIva.importe2.toFixed(2)}\n`;
            }
            if (tiposIva.importe3 > 0) {
                detalleIva21 = `${tiposIva.base3.toFixed(2)}       21%: ${tiposIva.valorIva3.toFixed(2)}      ${tiposIva.importe3.toFixed(2)}\n`;
            }
            detalleIva = detalleIva4 + detalleIva10 + detalleIva21;
            var infoConsumoPersonal = '';
            if (tipoPago == "CONSUMO_PERSONAL") {
                infoConsumoPersonal = '---------------- Dte. 100% --------------';
                detalleIva = '';
            }
            device.open(function () {
                printer
                    .encode('latin1')
                    .size(1, 1)
                    .text(cabecera)
                    .text(`Data: ${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}  ${fecha.getHours()}:${fecha.getMinutes()}`)
                    .text('Factura simplificada N: ' + numFactura)
                    .text('Ates per: ' + nombreDependienta)
                    .text(detalleClienteVip)
                    .control('LF')
                    .control('LF')
                    .control('LF')
                    .control('LF')
                    .text('Quantitat      Article        Import (EUR)')
                    .text('-----------------------------------------')
                    .align('LT')
                    .text(detalles)
                    .text(pagoTarjeta)
                    .text(infoConsumoPersonal)
                    .size(2, 2)
                    .text(pagoDevolucion)
                    .text('TOTAL: ' + total.toFixed(2) + ' EUR \n')
                    .size(1, 1)
                    .align('CT')
                    .text('Base IVA         IVA         IMPORT')
                    .text(detalleIva)
                    .text('-- ES COPIA --')
                    .text(pie)
                    .control('LF')
                    .control('LF')
                    .control('LF')
                    .cut('PAPER_FULL_CUT')
                    .close();
            });
        }
        catch (err) {
            errorImpresora(err, event);
        }
    });
};
var salidaDinero = function (event, totalRetirado, cajaActual, fecha, nombreDependienta, nombreTienda, concepto, tipoImpresora, codigoBarras) {
    try {
        fecha = dateToString2(fecha);
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        if (tipoImpresora === 'USB') {
            var device = new escpos.USB('0x4B8', '0x202'); //USB
        }
        else {
            if (tipoImpresora === 'SERIE') {
                var device = new escpos.Serial('/dev/ttyS0', {
                    baudRate: 115000,
                    stopBit: 2
                });
            }
        }
        var options = { encoding: "GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () {
            printer
                .align('CT')
                .size(1, 1)
                .text(nombreTienda)
                .text(fecha)
                .text("Dependienta: " + nombreDependienta)
                .text("Retirada efectivo: " + totalRetirado)
                .size(2, 2)
                .text(totalRetirado)
                .size(1, 1)
                .text("Concepto")
                .size(2, 2)
                .text(concepto)
                .text('')
                .barcode(codigoBarras, "EAN13", 4)
                .text('')
                .text('')
                .text('')
                .cut()
                .close();
        });
    }
    catch (err) {
        errorImpresora(err, event);
    }
};
var testEze = function (event, texto) {
    console.log(texto);
    try {
        var device = new escpos.Serial('COM4', {
            baudRate: 9600,
            stopBit: 2
        });
        var options = { encoding: "GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () {
            printer
                .text('Bartomeu HDP')
                .close();
        });
    }
    catch (err) {
        errorImpresora(err, event);
    }
};
var entradaDinero = function (event, totalIngresado, cajaActual, fecha, nombreDependienta, nombreTienda) {
    try {
        fecha = dateToString2(fecha);
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        var device = new escpos.USB('0x4B8', '0x202'); //USB
        //  var device = new escpos.Serial('/dev/ttyS0', {
        //      baudRate: 115000,
        //      stopBit: 2
        //  }) //SERIE
        var options = { encoding: "GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () {
            printer
                .align('CT')
                .size(1, 1)
                .text(nombreTienda)
                .text(fecha)
                .text("Dependienta: " + nombreDependienta)
                .text("Ingreso efectivo: " + totalIngresado)
                .size(2, 2)
                .text(totalIngresado)
                .size(1, 1)
                .text('')
                .size(2, 2)
                .barcode('993350032967', "EAN13", 4)
                .text('')
                .text('')
                .text('')
                .cut()
                .close();
        });
    }
    catch (err) {
        errorImpresora(err, event);
    }
};
var abrirCajon = function (event) {
    try {
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        var device = new escpos.USB('0x4B8', '0x202'); //USB
        //  var device = new escpos.Serial('/dev/ttyS0', {
        //      baudRate: 115000,
        //      stopBit: 2
        //  }) //SERIE
        var options = { encoding: "GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () {
            printer
                .cashdraw(2)
                .close();
        });
    }
    catch (err) {
        errorCajon(err, event);
    }
};
var cierreCaja = function (event, calaixFet, nombreTrabajador, descuadre, nClientes, recaudado, arrayMovimientos, nombreTienda, fI, fF, cInicioCaja, cFinalCaja, tipoImpresora) {
    try {
        var fechaInicio = new Date(fI);
        var fechaFinal = new Date(fF);
        var sumaTarjetas = 0;
        var textoMovimientos = '';
        for (let i = 0; i < arrayMovimientos.length; i++) {
            var auxFecha = new Date(arrayMovimientos[i]._id);
            if (arrayMovimientos[i].tipo === TIPO_SALIDA_DINERO) {
                if (arrayMovimientos[i].concepto == 'Targeta' || arrayMovimientos[i].concepto == 'Targeta 3G') {
                    sumaTarjetas += arrayMovimientos[i].valor;
                }
                else {
                    textoMovimientos += `${i + 1}: Salida:\n           Cantidad: -${arrayMovimientos[i].valor.toFixed(2)}\n           Fecha: ${auxFecha.getDate()}/${auxFecha.getMonth()}/${auxFecha.getFullYear()}  ${auxFecha.getHours()}:${auxFecha.getMinutes()}\n           Concepto: ${arrayMovimientos[i].concepto}\n`;
                }
            }
            if (arrayMovimientos[i].tipo === TIPO_ENTRADA_DINERO) {
                textoMovimientos += `${i + 1}: Entrada:\n            Cantidad: +${arrayMovimientos[i].valor.toFixed(2)}\n            Fecha: ${auxFecha.getDate()}/${auxFecha.getMonth()}/${auxFecha.getFullYear()}  ${auxFecha.getHours()}:${auxFecha.getMinutes()}\n            Concepto: ${arrayMovimientos[i].concepto}\n`;
            }
        }
        textoMovimientos = `\nTotal targeta:      ${sumaTarjetas.toFixed(2)}\n` + textoMovimientos;
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        if (tipoImpresora === 'USB') {
            var device = new escpos.USB('0x4B8', '0x202'); //USB
        }
        else {
            if (tipoImpresora === 'SERIE') {
                var device = new escpos.Serial('/dev/ttyS0', {
                    baudRate: 115000,
                    stopBit: 2
                });
            }
        }
        var options = { encoding: "ISO-8859-15" }; //"GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () {
            printer
                .align('CT')
                .size(2, 2)
                .text('BOTIGA : ' + nombreTienda)
                .size(1, 1)
                .text('Resum caixa')
                .text('')
                .align('LT')
                .text('Resp.   : ' + nombreTrabajador)
                .text('Inici: ' + fechaInicio.getDate() + '-' + fechaInicio.getMonth() + '-' + fechaInicio.getFullYear() + ' ' + fechaInicio.getHours() + ':' + fechaInicio.getMinutes())
                .text('Final: ' + fechaFinal.getDate() + '-' + fechaFinal.getMonth() + '-' + fechaFinal.getFullYear() + ' ' + fechaFinal.getHours() + ':' + fechaFinal.getMinutes())
                .text('')
                .size(1, 2)
                .text('Calaix fet       :      ' + calaixFet.toFixed(2))
                .text('Descuadre        :      ' + descuadre.toFixed(2))
                .text('Clients atesos   :      ' + nClientes)
                .text('Recaudat         :      ' + recaudado.toFixed(2))
                .text('Canvi inicial    :      ' + cInicioCaja.toFixed(2))
                .text('Canvi final      :      ' + cFinalCaja.toFixed(2))
                .text('')
                .size(1, 1)
                .text('Moviments de caixa')
                .text('')
                .text('')
                .text(textoMovimientos)
                .text('')
                .cut()
                .close();
        });
    }
    catch (err) {
        errorImpresora(err, event);
    }
};
function errorImpresora(err, event) {
    console.log("No se encuentra la impresora");
    console.log(err);
    event.sender.send('falloImpresora', 'La impresora no está configurada');
    if (os.platform() === 'win32') {
    }
    else {
        if (os.platform() === 'linux') {
            exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        }
    }
}
function errorCajon(err, event) {
    console.log("No al abrir cajón");
    console.log(err);
    event.sender.send('falloImpresora', 'Error al abrir cajón');
    if (os.platform() === 'win32') {
    }
    else {
        if (os.platform() === 'linux') {
            exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        }
    }
}
exports.imprimirTicket = function (req, event) {
    imprimirTicketVenta(event, req.numFactura, req.arrayCompra, req.total, req.visa, req.tiposIva, req.cabecera, req.pie, req.nombreTrabajador, req.impresora, req.infoClienteVip);
};
exports.imprimirTicketSalida = function (req, event) {
    salidaDinero(event, req.cantidad, req.cajaActual, req.fecha, req.nombreTrabajador, req.nombreTienda, req.concepto, req.impresora, req.codigoBarras);
};
exports.imprimirTicketEntrada = function (req, event) {
    entradaDinero(event, req.cantidad, req.cajaActual, req.fecha, req.nombreTrabajador, req.nombreTienda);
};
exports.imprimirTicketCierreCaja = function (req, event) {
    cierreCaja(event, req.calaixFet, req.nombreTrabajador, req.descuadre, req.nClientes, req.recaudado, req.arrayMovimientos, req.nombreTienda, req.fechaInicio, req.fechaFinal, req.cInicioCaja, req.cFinalCaja, req.impresora);
};
exports.abrirCajon = function (event) {
    abrirCajon(event);
};
exports.testEze = function (texto, event) {
    testEze(event, texto);
};
//# sourceMappingURL=impresora.js.map