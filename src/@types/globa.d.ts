declare global {
  interface Window {
    api: API
  }
}

export type API = {
  openWebSite: (tag: string) => void
  infoDialog: (title: string, content: string) => Promise<boolean>
  errorDialog: (title: string, content: string) => void
}
