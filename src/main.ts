import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from 'electron'
import path from 'path'

const size = {
  width: 550,
  height: 160
}

let win: BrowserWindow

const createWindow = (): void => {
  win = new BrowserWindow({
    title: '匿名Player++',
    ...size,
    minWidth: size.width,
    minHeight: size.height,
    maxWidth: size.width,
    maxHeight: size.height,
    resizable: true, // electron issue : #30788
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./build/index.html')
  win.webContents.openDevTools()

  // 表示可能になったら表示する
  win.once('ready-to-show', () => win.show())

  // メニューを無効化
  Menu.setApplicationMenu(null)

  // 多重起動を防止
  const doubleboot = app.requestSingleInstanceLock()
  if (!doubleboot) {
    app.quit()
  }
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

// ウィンドウを閉じる
ipcMain.on('win-close', () => win.close())

// ウィンドウを最小化
ipcMain.on('win-minimize', () => win.minimize())

// サイトを開く
ipcMain.on('open-website', (_event: Electron.IpcMainEvent, keyword: string) => {
  shell.openExternal(`https://omocoro.jp/?s=${encodeURIComponent(keyword)}`)
})

// 確認ダイアログ
ipcMain.handle(
  'info-dialog',
  async (
    _event: Electron.IpcMainInvokeEvent,
    title: string,
    content: string
  ): Promise<Electron.MessageBoxReturnValue> =>
    await dialog.showMessageBox(win, {
      type: 'question',
      buttons: ['はい', 'いいえ'],
      defaultId: 1,
      title: '確認',
      message: title,
      detail: content
    })
)

// エラーダイアログ
ipcMain.on(
  'error-dialog',
  (_event: Electron.IpcMainEvent, title: string, content: string) => {
    dialog.showErrorBox(title, content)
  }
)
