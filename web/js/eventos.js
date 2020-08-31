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
ipcRenderer.on('res-cargar-todo', (ev, data) => {
    if (data) {
        vueToast.abrir('success', "TODO CARGADO");
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
ipcRenderer.on('res-buscar-trabajador', (ev, data) => {
    vueFichajes.setTrabajadores(data);
});
ipcRenderer.on('res-buscar-cliente', (ev, data) => {
    vueClientes.setClientes(data);
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
ipcRenderer.on('pregunta-cambio-datafono', (ev, data) => {
    vueCobrar.desactivoEsperaDatafono();
    let options = {
        buttons: ["&SÍ", "&NO"],
        message: "Cambiar a datáfono 3G (manual)?"
    };
    dialog.showMessageBox(remote.getCurrentWindow(), options, (res) => {
        if (res === 0) {
            toc.datafonoForzado3G = true;
        }
    });
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
            tipoDatafono: toc.getTipoDatafono(),
            ultimoTicket: data.ultimoTicket
        };
        vueToast.abrir("success", "OK!");
        toc.setupToc(misParams);
    }
    else {
        vueToast.abrir("error", "Datos incorrectos");
    }
});
socket.on('confirmarEnvioTicket', (data) => {
    // console.log("Ticket confirmado: enviado = true, enTransito = false");
    ipcRenderer.send('confirmar-envio', data);
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
    console.log("LLEGA EL CONFIRMAR :", data);
    ipcRenderer.send('movimiento-confirmado', data);
});
socket.on('confirmarEnvioFichaje', (data) => {
    // console.log("Ticket confirmado: enviado = true, enTransito = false");
    ipcRenderer.send('confirmar-envio-fichaje', data);
});
socket.on('respuestaClienteEsVIP', (data) => {
    console.log("restos: ", data);
    if (data.esVip) {
        //ES VIP
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
socket.on('res-descargar-teclado', (data) => {
    if (!data.error) {
        console.log(data);
        ipcRenderer.send('actualizar-teclado', data);
    }
    else {
        console.log("Error en descargar-teclado-servidor");
    }
    toc.setStopNecesario(false);
});
//# sourceMappingURL=eventos.js.map