import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  windowClose: () => {
    ipcRenderer.send('win-close')
  },
  windowMinimize: () => {
    ipcRenderer.send('win-minimize')
  },
  openWebSite: (keyword: string) => {
    ipcRenderer.send('open-website', keyword)
  },
  infoDialog: async (title: string, content: string): Promise<boolean> => {
    const selected = await ipcRenderer.invoke('info-dialog', title, content)
    return selected.response === 0
  },
  errorDialog: (title: string, content: string) => {
    ipcRenderer.send('error-dialog', title, content)
  }
})
