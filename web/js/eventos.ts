electron.ipcRenderer.on('res-buscar-fichados', (ev, data)=>{
    toc.setArrayFichados(data);
    if(toc.todoInstalado()) 
    {
        if(toc.hayFichados()) 
        {
            console.log("Hay trabajadores fichados");
            if(toc.cajaAbierta())
            {
                //continuar con el panel de ventas :P
                console.log("ABRIR PANEL DE VENTAS");
            }
            else
            {
                vueApertura.abreModal();
            }
        }
        else 
        {
            toc.setArrayFichados([]);
            console.log("No encuentro trabajadores fichados :(");
            abrirModalFichajes();
        }
    }
    else 
    {
        abrirInstallWizard();
    }
});

socket.on('cargar-todo', (data) => 
{
    electron.ipcRenderer.send('cargar-todo', data);
});

electron.ipcRenderer.on('res-cargar-todo', (ev, data) => 
{
    if (data) 
    {
        vueToast.abrir('success', "TODO CARGADO");
        vueInstallWizard.cerrarModal();
        toc.iniciar();
    }
    else 
    {
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