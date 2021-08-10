ipcRenderer.on('res-buscar-fichados', (ev, data) => {
    toc.setArrayFichados(data);
    if (toc.todoInstalado()) //parametros licencia
     {
        if (!toc.hayFichados()) //trabajadores fichados
         {
            toc.setArrayFichados([]);
            abrirModalFichajes();
        }
    }
    else {
        abrirInstallWizard();
    }
});
socket.on('cargar-todo', (data) => {
    ipcRenderer.send('cargar-todo', data);
});
ipcRenderer.on('productoTablet', (ev, data) => {
    console.log("Producto tablet");
    //pp.emit('producto', data);
});
ipcRenderer.on('res-cargar-todo', (ev, data) => {
    if (data) {
        vueToast.abrir('success', "TODO CARGADO");
        vueInstallWizard.esperando = false;
        vueInstallWizard.cerrarModal();
        toc.iniciar();
    }
    else {
        vueToast.abrir('error', 'Error en cargar-todo');
    }
});
ipcRenderer.on('res-cargar-teclado', (ev, data) => {
    if (data) {
        vueToast.abrir('success', "TECLADO CARGADO");
        toc.iniciar();
    }
    else {
        vueToast.abrir('error', 'Error en cargar-TECLADO');
    }
});
ipcRenderer.on('res-cargar-tarifa-especial', (ev, data) => {
    if (data) {
        vueToast.abrir('success', "TARIFA ESPECIAL CARGADA");
        toc.tecladoTarifaEspecial = true;
        toc.iniciar();
    }
    else {
        vueToast.abrir('error', 'Error en cargar-TARIFA ESPECIAL');
    }
});
ipcRenderer.on('res-buscar-trabajador', (ev, data) => {
    vueFichajes.setTrabajadores(data);
});
ipcRenderer.on('res-buscar-cliente', (ev, data) => {
    vueClientes.setClientes(data);
});
ipcRenderer.on('res-buscar-articulo', (ev, data) => {
    vueBuscarProducto.setProductos(data);
});
ipcRenderer.on('res-fichar-trabajador', (ev, data) => {
    vueToast.abrir('success', 'FICHAJE OK');
});
ipcRenderer.on('res-desfichar-trabajador', (ev, data) => {
    vueToast.abrir('success', 'SALIDA OK');
});
ipcRenderer.on('res-get-teclas', (ev, data) => {
    vuePanelVentas.cargarTeclado(data);
});
ipcRenderer.on('res-get-menus', (ev, data) => {
    vuePanelVentas.cargarMenus(data);
});
ipcRenderer.on('res-get-precios', (ev, data) => {
    vuePanelVentas.cargarPrecios(data);
});
ipcRenderer.on('res-get-cesta', (ev, data) => {
    toc.setCesta(data);
});
ipcRenderer.on('resVentaDatafono', (ev, data) => {
    toc.controlRespuestaDatafono(data);
});
ipcRenderer.on('res-contar-cestas', (ev, data) => {
    vueInfoFooter.setNumeroCestas(data);
});
ipcRenderer.on('res-check-internet', (ev, data) => {
    vueInfoFooter.hayInternet(data);
});
ipcRenderer.on('res-sincronizar-toc', (ev, data) => {
    const objEnviar = {
        parametros: toc.getParametros(),
        arrayTickets: data
    };
    if (objEnviar.arrayTickets.length > 0) {
        socket.emit('sincronizar-tickets-tocgame', objEnviar);
    }
});
ipcRenderer.on('res-sincronizar-fichajes', (ev, data) => {
    const objEnviar = {
        parametros: toc.getParametros(),
        info: data
    };
    if (objEnviar.info !== null) {
        socket.emit('guardarFichajes-tocGame-nueva', objEnviar);
    }
});
ipcRenderer.on('res-sincronizar-devoluciones', (ev, data) => {
    const objEnviar = {
        parametros: toc.getParametros(),
        info: data
    };
    if (objEnviar.info !== null) {
        socket.emit('guardarDevoluciones', objEnviar);
    }
});
ipcRenderer.on('res-configuracion-nueva', (ev, data) => {
    if (data) {
        vueToast.abrir("success", "Configuración guardada");
    }
    else {
        vueToast.abrir("error", "Error al guardar la configuración");
    }
});
ipcRenderer.on('nuevo-toast', (ev, data) => {
    vueToast.abrir(data.tipo, data.mensaje);
});
ipcRenderer.on('desactivar-espera-datafono', (ev, data) => {
    vueCobrar.desactivoEsperaDatafono();
});
ipcRenderer.on('borrar-database', (ev, data) => {
    toc.iniciar();
});
ipcRenderer.on('res-sincronizar-movimientos', (ev, data) => {
    const objEnviar = {
        parametros: toc.getParametros(),
        info: data
    };
    if (objEnviar.info !== null) {
        socket.emit('guardarMovimiento', objEnviar);
    }
});
ipcRenderer.on('res-sincronizar-caja', (ev, data) => {
    const objEnviar = {
        parametros: toc.getParametros(),
        info: data
    };
    if (objEnviar.info !== null) {
        socket.emit('guardar-caja', objEnviar);
    }
});
socket.on('install-licencia', (data) => {
    if (!data.error) {
        console.log(data);
        const misParams = {
            _id: 'PARAMETROS',
            licencia: data.licencia,
            codigoTienda: data.codigoTienda,
            database: data.database,
            nombreEmpresa: data.nombreEmpresa,
            nombreTienda: data.nombreTienda,
            tipoImpresora: toc.getTipoImpresora(),
            impresoraCafeteria: toc.getImpresoraCafeteria(),
            tipoDatafono: toc.getTipoDatafono(),
            botonesConPrecios: data.botonesConPrecios,
            prohibirBuscarArticulos: data.prohibirBuscarArticulos,
            ultimoTicket: data.ultimoTicket,
            token: data.token
        };
        vueToast.abrir("success", "OK!");
        toc.setupToc(misParams);
    }
    else {
        vueInstallWizard.esperando = false;
        vueToast.abrir("error", "Datos incorrectos");
    }
});
socket.on('confirmarEnvioTicket', (data) => {
    // console.log("Ticket confirmado: enviado = true, enTransito = false");
    ipcRenderer.send('confirmar-envio', data);
});
socket.on('confirmarEnvioDevolucion', (data) => {
    ipcRenderer.send('confirmar-envio-devolucion', data);
});
socket.on('actualizarTocGame', (licencia) => {
    ipcRenderer.send('update-toc-cerbero');
});
socket.on('res-descargar-clientes-finales', (data) => {
    vueToast.abrir('warning', 'Insertando clientes nuevos');
    ipcRenderer.send('insertar-nuevos-clientes', data);
});
socket.on('orden-descargar-clientes-finales', (data) => {
    socket.emit('descargar-clientes-finales', toc.getParametros());
});
socket.on('confirmarEnvioCaja', (data) => {
    // console.log("Ticket confirmado: enviado = true, enTransito = false");
    ipcRenderer.send('confirmar-envio-caja', data);
});
socket.on('confirmarEnvioMovimiento', (data) => {
    ipcRenderer.send('movimiento-confirmado', data);
});
socket.on('confirmarEnvioFichaje', (data) => {
    // console.log("Ticket confirmado: enviado = true, enTransito = false");
    ipcRenderer.send('confirmar-envio-fichaje', data);
});
socket.on('respuestaClienteEsVIP', (data) => {
    if (data.esVip) {
        //ES VIP
        toc.idClienteVIP = data.idCliente;
        toc.vipConfirmado(data);
    }
    else {
        //ES NORMAL
    }
});
socket.on('ordenSincronizarTeclado', (data) => {
    if (toc.todoListo()) {
        toc.actualizarTeclado();
    }
});
socket.on('resCargarPreciosVIP', (data) => {
    if (toc.todoListo()) {
        ipcRenderer.send('insertar-tarifa-especial', data);
    }
});
socket.on('res-descargar-teclado', (data) => {
    if (!data.error) {
        ipcRenderer.send('actualizar-teclado', data);
    }
    else {
        console.log("Error en descargar-teclado-servidor");
    }
    toc.setStopNecesario(false);
});
socket.on('get-puntos-cliente', (puntos) => {
    if (puntos >= 0 && puntos <= 100000) {
        vueCesta.puntosClienteActivo = puntos;
    }
    vueToast.abrir("success", "El cliente tiene " + puntos + " pts.");
});
socket.on('imprimir-ticket-cliente', (data) => {
    if (data.puntos >= 0 && data.puntos <= 100000) {
        var sendObject = data.infoTicket;
        sendObject.infoCliente.nombre = data.infoTicket.infoCliente.nombre;
        sendObject.infoCliente.puntos = data.puntos;
        ipcRenderer.send('imprimir', sendObject);
    }
});
socket.on('ordenSincronizarTrabajadores', (data) => {
    if (toc.todoListo()) {
        toc.actualizarTrabajadores();
    }
});
socket.on('descargar-trabajadores', (data) => {
    if (data.length > 0) {
        ipcRenderer.send('insertar-trabajadores', data);
    }
    toc.setStopNecesario(false);
    vueToast.abrir('success', 'Trabajadores actualizados');
});
//# sourceMappingURL=eventos.js.map