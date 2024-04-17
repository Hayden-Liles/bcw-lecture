import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const combinedAPI = {
  ...electronAPI,
  saveAppState: (appState) => ipcRenderer.send('saveAppState', appState),
  loadAppState: () => ipcRenderer.send('loadAppState'),
  onAppStateLoaded: (callback) => ipcRenderer.on('app-state-loaded', (event, appState) => callback(appState)),
  getSystemInfo: () => ipcRenderer.send('get-system-info')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', combinedAPI)
  } catch (error) {
    console.error(error)
  }
}
