electron.ipcRenderer.on('res-buscar-fichados', (ev, data) => {
    toc.setArrayFichados(data);
    if (toc.todoInstalado()) {
        if (toc.hayFichados()) {
            if (!toc.cajaAbierta()) {
                vueApertura.abreModal();
            }
        }
        else {
            toc.setArrayFichados([]);
            abrirModalFichajes();
        }
    }
    else {
        abrirInstallWizard();
    }
});
socket.on('cargar-todo', (data) => {
    console.log("mis promos: ", data.promociones);
    electron.ipcRenderer.send('cargar-todo', data);
});
electron.ipcRenderer.on('res-cargar-todo', (ev, data) => {
    if (data) {
        vueToast.abrir('success', "TODO CARGADO");
        vueInstallWizard.cerrarModal();
        toc.iniciar();
    }
    else {
        vueToast.abrir('error', 'Error en cargar-todo');
    }
});
electron.ipcRenderer.on('res-buscar-trabajador', (ev, data) => {
    vueFichajes.setTrabajadores(data);
});
electron.ipcRenderer.on('res-fichar-trabajador', (ev, data) => {
    vueToast.abrir('success', 'FICHAJE OK');
});
electron.ipcRenderer.on('res-desfichar-trabajador', (ev, data) => {
    vueToast.abrir('success', 'SALIDA OK');
});
electron.ipcRenderer.on('res-get-teclas', (ev, data) => {
    vuePanelVentas.cargarTeclado(data);
});
electron.ipcRenderer.on('res-get-menus', (ev, data) => {
    vuePanelVentas.cargarMenus(data);
});
electron.ipcRenderer.on('res-get-cesta', (ev, data) => {
    toc.setCesta(data);
});
electron.ipcRenderer.on('resVentaDatafono', (ev, data) => {
    toc.controlRespuestaDatafono(data);
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
//# sourceMappingURL=eventos.js.map