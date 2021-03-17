import {ipcRenderer, contextBridge} from 'electron';

contextBridge.exposeInMainWorld(
    'electron',
    {
      hazAlgo: () => ipcRenderer.send('dialogo')
    }
  )