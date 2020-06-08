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
ipcRenderer.on('res-sincronizar-toc', (ev, data) => {
    const objEnviar = {
        parametros: toc.getParametros(),
        arrayTickets: data
    };
    if (objEnviar.arrayTickets.length > 0) {
        socket.emit('sincronizar-tickets-tocgame', objEnviar);
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
//# sourceMappingURL=eventos.js.map