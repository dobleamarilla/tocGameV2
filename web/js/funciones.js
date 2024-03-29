function abrirInstallWizard() {
    vueInstallWizard.abreModal();
}
function abrirModalFichajes() {
    vueFichajes.abrirModal();
}
// function calcularBasesTicket(cesta) : TiposIva
// {
//     let base1 = 0, base2 = 0, base3 = 0;
//     let valor1 = 0, valor2 = 0, valor3 = 0;
//     let importe1 = 0, importe2 = 0, importe3 = 0;
//     for (let i = 0; i < cesta.length; i++) 
//     {
//         base1 += cesta[i].tipoIva.base1;
//         base2 += cesta[i].tipoIva.base2;
//         base3 += cesta[i].tipoIva.base3;
//         valor1 += cesta[i].tipoIva.valorIva1;
//         valor2 += cesta[i].tipoIva.valorIva2;
//         valor3 += cesta[i].tipoIva.valorIva3;
//         importe1 += cesta[i].tipoIva.importe1;
//         importe2 += cesta[i].tipoIva.importe2;
//         importe3 += cesta[i].tipoIva.importe3;
//     }
//     return {
//         base1: redondearPrecio(base1),
//         base2: redondearPrecio(base2),
//         base3: redondearPrecio(base3),
//         valorIva1: redondearPrecio(valor1),
//         valorIva2: redondearPrecio(valor2),
//         valorIva3: redondearPrecio(valor3),
//         importe1: redondearPrecio(importe1),
//         importe2: redondearPrecio(importe2),
//         importe3: redondearPrecio(importe3)
//     };
// }
function redondearPrecio(precio) {
    return Math.round(precio * 100) / 100;
}
function construirObjetoIvas(infoArticulo, unidades, tipoIvaAnterior, infoAPeso = null) {
    let base1 = 0, base2 = 0, base3 = 0;
    let valor1 = 0, valor2 = 0, valor3 = 0;
    let importe1 = 0, importe2 = 0, importe3 = 0;
    if (infoAPeso == null) {
        switch (infoArticulo.tipoIva) {
            case 1:
                base1 = (infoArticulo.precioConIva / 1.04) * unidades;
                valor1 = (infoArticulo.precioConIva / 1.04) * 0.04 * unidades;
                importe1 = infoArticulo.precioConIva * unidades;
                break;
            case 2:
                base2 = (infoArticulo.precioConIva / 1.10) * unidades;
                valor2 = (infoArticulo.precioConIva / 1.10) * 0.10 * unidades;
                importe2 = infoArticulo.precioConIva * unidades;
                break;
            case 3:
                base3 = (infoArticulo.precioConIva / 1.21) * unidades;
                valor3 = (infoArticulo.precioConIva / 1.21) * 0.21 * unidades;
                importe3 = infoArticulo.precioConIva * unidades;
                break;
            default: break;
        }
    }
    else {
        switch (infoArticulo.tipoIva) {
            case 1:
                base1 = (infoAPeso.precioAplicado / 1.04) * unidades;
                valor1 = (infoAPeso.precioAplicado / 1.04) * 0.04 * unidades;
                importe1 = infoAPeso.precioAplicado * unidades;
                break;
            case 2:
                base2 = (infoAPeso.precioAplicado / 1.10) * unidades;
                valor2 = (infoAPeso.precioAplicado / 1.10) * 0.10 * unidades;
                importe2 = infoAPeso.precioAplicado * unidades;
                break;
            case 3:
                base3 = (infoAPeso.precioAplicado / 1.21) * unidades;
                valor3 = (infoAPeso.precioAplicado / 1.21) * 0.21 * unidades;
                importe3 = infoAPeso.precioAplicado * unidades;
                break;
            default: break;
        }
    }
    const aux = {
        base1: redondearPrecio(base1) + tipoIvaAnterior.base1,
        base2: redondearPrecio(base2) + tipoIvaAnterior.base2,
        base3: redondearPrecio(base3) + tipoIvaAnterior.base3,
        valorIva1: redondearPrecio(valor1) + tipoIvaAnterior.valorIva1,
        valorIva2: redondearPrecio(valor2) + tipoIvaAnterior.valorIva2,
        valorIva3: redondearPrecio(valor3) + tipoIvaAnterior.valorIva3,
        importe1: redondearPrecio(importe1) + tipoIvaAnterior.importe1,
        importe2: redondearPrecio(importe2) + tipoIvaAnterior.importe2,
        importe3: redondearPrecio(importe3) + tipoIvaAnterior.importe3
    };
    return aux;
}
function ultimoVistazoIvas() {
}
function dateToString(fecha) {
    var fechaFinal = null;
    ;
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
function sincronizarToc() {
    if (toc.todoListo()) //Licencia, etc.
     {
        ipcRenderer.send('sincronizar-toc'); //solo tickets
        ipcRenderer.send('sincronizar-fichajes');
        ipcRenderer.send('sincronizar-devoluciones');
        ipcRenderer.send('sincronizar-movimientos');
        ipcRenderer.send('sincronizar-caja');
    }
}
function sincronizarDatosRapidos() {
    ipcRenderer.send('count-cesta');
    ipcRenderer.send('check-internet');
}
function elTesteo() {
    console.log('El testeo guapo guapo es: ', ipcRenderer.sendSync('testeoGuapo'));
}
function getPuntosCliente(idCliente, imprimir = false, infoParaImprimir = null) {
    var objEnviar = {
        parametros: toc.getParametros(),
        idCliente: idCliente,
        imprimir: imprimir,
        infoParaImprimir: infoParaImprimir,
    };
    socket.emit('get-puntos-cliente', objEnviar);
}
//# sourceMappingURL=funciones.js.map