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
      setSincroFichaje: (data) => ipcRenderer.send('guardar-sincro-fichaje', data)
    }
  )