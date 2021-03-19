import {ipcRenderer, contextBridge} from 'electron';

contextBridge.exposeInMainWorld(
    'tocgame',
    {
      getParametros: () => ipcRenderer.invoke('getParametros'),
      getInfoCaja: () => ipcRenderer.invoke('getInfoCaja'),
      setLimpiarTransito: () => ipcRenderer.send('limpiar-enTransito'),
      setParametros: (data) => ipcRenderer.send('setParametros', data),
      getCalcularEAN13: (data) => ipcRenderer.sendSync('calcular-ean13', data),
      setNuevoMovimiento: (data) => ipcRenderer.send('nuevo-movimiento', data),
      setUltimoCodigoBarras: (data) => ipcRenderer.sendSync('actualizar-ultimo-codigo-barras', data),
      setImprimirSalida: (data) => ipcRenderer.send('imprimirSalidaDinero', data),
      setImprimirEntrada: (data) => ipcRenderer.send('imprimirEntradaDinero', data),
      getUltimoCodigoBarras: () => ipcRenderer.sendSync('get-ultimo-codigo-barras'),
      setSincroFichaje: (data) => ipcRenderer.send('guardar-sincro-fichaje', data),
      setFicharTrabajador: (data) => ipcRenderer.invoke('fichar-trabajador', data),
      setDesficharTrabajador: (data) => ipcRenderer.invoke('desfichar-trabajador', data),
      setActualizarInfoCaja: (data) => ipcRenderer.send('actualizar-info-caja', data),
      getTeclas: (data) => ipcRenderer.invoke('get-teclas', data),
      setBorrarCesta: (data) => ipcRenderer.send('borrar-cesta', data),
      setCesta: (data) => ipcRenderer.send('set-cesta', data),
      getCesta: (data) => ipcRenderer.invoke('get-cesta', data),
      getMenus: () => ipcRenderer.invoke('get-menus')
    }
  )