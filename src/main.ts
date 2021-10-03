import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'path'

let win: BrowserWindow

const createWindow = (): void => {
  win = new BrowserWindow({
    width: 550,
    height: 160,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./build/index.html')
  win.webContents.openDevTools()

  // メニューを無効化
  Menu.setApplicationMenu(null)
}

// 多重起動を防止
const doubleboot = app.requestSingleInstanceLock()
if (!doubleboot) {
  app.quit()
}

// 初期化できたらウィンドウを作成
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//---------------------------------------------------

// アプリケーションを終了
ipcMain.on('ipc-app-exit', () => app.quit())

// ウィンドウを最小化
ipcMain.on('ipc-win-minimize', () => win.minimize())
