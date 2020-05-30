var escpos = require('escpos');
var exec = require('child_process').exec;
var os = require('os');
escpos.USB = require('escpos-usb');
escpos.Serial = require('escpos-serialport');

const TIPO_ENTRADA_DINERO = 'ENTRADA';
const TIPO_SALIDA_DINERO = 'SALIDA';
function dateToString2(fecha)
{
    var fechaFinal = null;;
    if(typeof fecha === 'string' || typeof fecha === 'number')
    {
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

var imprimirTicketVenta = function (event, numFactura, arrayCompra, total, visa, tiposIva, cabecera, pie, nombreDependienta, tipoImpresora) 
{
    console.log('TIPO IMPRESORA: ', tipoImpresora);
    try 
    {
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        if(tipoImpresora === 'USB')
        {
            console.log('VA POR USB');
            var device = new escpos.USB('0x4B8', '0x202'); //USB
        }
        else
        {
            if(tipoImpresora === 'SERIE')
            {
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
        for (let i = 0; i < arrayCompra.length; i++) 
        {
            if (arrayCompra[i].nombre.length < 20) 
            {
                while (arrayCompra[i].nombre.length < 20) 
                {
                    arrayCompra[i].nombre += ' ';
                }
            }
            detalles += `${arrayCompra[i].unidades}     ${arrayCompra[i].nombre.slice(0, 20)}       ${arrayCompra[i].subtotal}\n`;
        }
        var fecha = new Date();
        if (visa) 
        {
            pagoTarjeta = '----------- PAGADO CON TARJETA ---------\n';
        }

        var detalleIva4 = '';
        var detalleIva10 = '';
        var detalleIva21 = '';
        var detalleIva = '';
        if (tiposIva.importe1 > 0) 
        {
            detalleIva4 = `${tiposIva.base1.toFixed(2)}        4%: ${tiposIva.valor1.toFixed(2)}      ${tiposIva.importe1.toFixed(2)}\n`;
        }
        if (tiposIva.importe2 > 0) 
        {
            detalleIva10 = `${tiposIva.base2.toFixed(2)}        10%: ${tiposIva.valor2.toFixed(2)}      ${tiposIva.importe2.toFixed(2)}\n`;
        }
        if (tiposIva.importe3 > 0) 
        {
            detalleIva21 = `${tiposIva.base3.toFixed(2)}       21%: ${tiposIva.valor3.toFixed(2)}      ${tiposIva.importe3.toFixed(2)}\n`;
        }
        detalleIva = detalleIva4 + detalleIva10 + detalleIva21;

        device.open(function () 
        {
            printer
                .encode('latin1')
                .size(1, 1)
                .text(cabecera)
                .text(`Data: ${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}  ${fecha.getHours()}:${fecha.getMinutes()}`)
                .text('Factura simplificada N: ' + numFactura)
                .text('Ates per: ' + nombreDependienta)
                .control('LF')
                .control('LF')
                .control('LF')
                .control('LF')
                .text('Quantitat      Article        Import (EUR)')
                .text('-----------------------------------------')
                .align('LT')
                .text(detalles)
                .text(pagoTarjeta)
                .size(2, 2)
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
                .close()
        });
    }
    catch (err) 
    {
        errorImpresora(err, event);
    }
}

var salidaDinero = function (event, totalRetirado, cajaActual, fecha, nombreDependienta, nombreTienda, concepto, tipoImpresora) 
{
    try 
    {
        fecha = dateToString2(fecha);
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        if(tipoImpresora === 'USB')
        {
            var device = new escpos.USB('0x4B8', '0x202'); //USB
        }
        else
        {
            if(tipoImpresora === 'SERIE')
            {
                var device = new escpos.Serial('/dev/ttyS0', {
                    baudRate: 115000,
                    stopBit: 2
                  })
            }
        }

        var options = { encoding: "GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () 
        {
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
                .text('')
                .text('')
                .text('')
                .cut()
                .close()
        });
    }
    catch (err) 
    {
        errorImpresora(err, event);
    }
}

var testEze = function (event, texto) 
{
    console.log(texto);
    try 
    {
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');

        var device = new escpos.Serial('/dev/ttyS0', {
            baudRate: 115000,
            stopBit: 2
            })
            


        var options = { encoding: "GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () 
        {
            printer
                .align('CT')
                .size(3, 3)
                .text(texto)
                .text('')
                .text('')
                .cut()
                .close()
        });
    }
    catch (err) 
    {
        errorImpresora(err, event);
    }
}

var entradaDinero = function (event, totalIngresado, cajaActual, fecha, nombreDependienta, nombreTienda) 
{
    try 
    {
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        var device = new escpos.USB('0x4B8', '0x202'); //USB
        //  var device = new escpos.Serial('/dev/ttyS0', {
        //      baudRate: 115000,
        //      stopBit: 2
        //  }) //SERIE
        var options = { encoding: "GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () 
        {
            printer
                .align('CT')
                .size(1, 1)
                .text(nombreTienda)
                .text(fecha)
                .text("Dependienta: " + nombreDependienta)
                .text("Retirada efectivo: " + totalIngresado)
                .size(2, 2)
                .text(totalIngresado)
                .size(1, 1)
                .text("Efectivo actual")
                .size(2, 2)
                .text(cajaActual)
                .text('')
                .barcode('9933500329672', "CODE39")
                .text('')
                .text('')
                .text('')
                .cut()
                .close()
        });
    }
    catch (err) 
    {
        errorImpresora(err, event);
    }
}
var abrirCajon = function (event) 
{
    try 
    {
        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        var device = new escpos.USB('0x4B8', '0x202'); //USB
        //  var device = new escpos.Serial('/dev/ttyS0', {
        //      baudRate: 115000,
        //      stopBit: 2
        //  }) //SERIE
        var options = { encoding: "GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () 
        {
            printer
                .cashdraw(2)
                .close()
        });
    }
    catch (err) 
    {
        errorCajon(err, event);
    }
}

var cierreCaja = function (event, calaixFet, nombreTrabajador, descuadre, nClientes, recaudado, arrayMovimientos: Movimientos[], nombreTienda, fI, fF, cInicioCaja, cFinalCaja, tipoImpresora) 
{
    try 
    {
        var fechaInicio = new Date(fI);
        var fechaFinal = new Date(fF);

        var textoMovimientos = '';
        for (let i = 0; i < arrayMovimientos.length; i++) 
        {
            var auxFecha = new Date(arrayMovimientos[i]._id);
            if (arrayMovimientos[i].tipo === TIPO_SALIDA_DINERO) 
            {
                textoMovimientos += `${i + 1}: Salida:\n           Cantidad: -${arrayMovimientos[i].valor.toFixed(2)}\n           Fecha: ${auxFecha.getDate()}/${auxFecha.getMonth()}/${auxFecha.getFullYear()}  ${auxFecha.getHours()}:${auxFecha.getMinutes()}\n           Concepto: ${arrayMovimientos[i].concepto}\n`;
            }
            if (arrayMovimientos[i].tipo === TIPO_ENTRADA_DINERO) 
            {
                textoMovimientos += `${i + 1}: Entrada:\n            Cantidad: +${arrayMovimientos[i].valor.toFixed(2)}\n            Fecha: ${auxFecha.getDate()}/${auxFecha.getMonth()}/${auxFecha.getFullYear()}  ${auxFecha.getHours()}:${auxFecha.getMinutes()}\n            Concepto: ${arrayMovimientos[i].concepto}\n`;
            }
        }

        exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        if(tipoImpresora === 'USB')
        {
            var device = new escpos.USB('0x4B8', '0x202'); //USB
        }
        else
        {
            if(tipoImpresora === 'SERIE')
            {
                var device = new escpos.Serial('/dev/ttyS0', {
                    baudRate: 115000,
                    stopBit: 2
                  })
            }
        }
        
        var options = { encoding: "ISO-8859-15" }; //"GB18030" };
        var printer = new escpos.Printer(device, options);
        device.open(function () 
        {
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
                .text('Calaix fet      :      ' + calaixFet)
                .text('Descuadre       :      ' + descuadre)
                .text('Clients atesos  :      ' + nClientes)
                .text('Recaudat        :      ' + recaudado)
                .text('Canvi inicial        :      ' + cInicioCaja)
                .text('Canvi final        :      ' + cFinalCaja)
                .text('')
                .size(1, 1)
                .text('Moviments de caixa')
                .text('')
                .text('')
                .text(textoMovimientos)
                .text('')
                .cut()
                .close()

        });
    }
    catch (err) 
    {
        errorImpresora(err, event);
    }
}

function errorImpresora(err, event) 
{
    console.log("No se encuentra la impresora");
    console.log(err);
    event.sender.send('falloImpresora', 'La impresora no está configurada');
    if (os.platform() === 'win32') 
    {

    }
    else {
        if (os.platform() === 'linux') 
        {
            exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        }
    }
}
function errorCajon(err, event) 
{
    console.log("No al abrir cajón");
    console.log(err);
    event.sender.send('falloImpresora', 'Error al abrir cajón');
    if (os.platform() === 'win32') 
    {

    }
    else 
    {
        if (os.platform() === 'linux') 
        {
            exec('echo sa | sudo -S sh /home/hit/tocGame/scripts/permisos.sh');
        }
    }
}

exports.imprimirTicket = function (req, event) 
{
    imprimirTicketVenta(event, req.numFactura, req.arrayCompra, req.total, req.visa, req.tiposIva, req.cabecera, req.pie, req.nombreTrabajador, req.impresora);
}

exports.imprimirTicketSalida = function (req, event) 
{
    salidaDinero(event, req.cantidad, req.cajaActual, req.fecha, req.nombreTrabajador, req.nombreTienda, req.concepto, req.impresora);
}

exports.imprimirTicketEntrada = function (req, event) 
{

    entradaDinero(event, req.cantidad, req.cajaActual, req.fecha, req.nombreTrabajador, req.nombreTienda);
}

exports.imprimirTicketCierreCaja = function (req, event) 
{
    cierreCaja(event, req.calaixFet, req.nombreTrabajador, req.descuadre, req.nClientes, req.recaudado, req.arrayMovimientos, req.nombreTienda, req.fechaInicio, req.fechaFinal, req.cInicioCaja, req.cFinalCaja, req.impresora);
}

exports.abrirCajon = function (event) 
{
    abrirCajon(event);
}

exports.testEze = function (texto, event)
{
    testEze(event, texto);
}