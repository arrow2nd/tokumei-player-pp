import {
  BrowserWindow,
  Menu,
  app,
  dialog,
  ipcMain,
  session,
  shell
} from 'electron'
import path from 'path'

import { checkUpdate } from './libs/checkUpdate'

import { OMOKORO_SITE_BASE_URL } from './data/constants'

let win: BrowserWindow

const createWindow = (): void => {
  win = new BrowserWindow({
    title: '匿名Player++',
    width: 550,
    height: 160,
    frame: false,
    show: false,
    resizable: false,
    maximizable: false,
    // titleBarStyle: 'hidden',
    // titleBarOverlay: {
    //   color: '#fff'
    // },

    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./build/index.html')
  // win.webContents.openDevTools()

  // 表示可能になったら表示する
  win.once('ready-to-show', () => win.show())

  // 終了時にキャッシュを削除する
  win.on('closed', () => {
    session.defaultSession.clearCache()
    session.defaultSession.clearHostResolverCache()
  })

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
  // 更新を確認
  checkUpdate().then((url) => openDownloadPage(url))
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//---------------------------------------------------

const openDownloadPage = (url: string | undefined) => {
  if (!url || !/^https:\/\/github\.com/.test(url)) return

  const result = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: ['はい', 'いいえ'],
    defaultId: 0,
    title: '更新通知',
    message: '新しいバージョンが利用可能です',
    detail: 'ブラウザを開いてファイルをダウンロードしますか？'
  })

  if (result === 0) {
    shell.openExternal(url)
    app.quit()
  }
}

//---------------------------------------------------

// ウィンドウを閉じる
ipcMain.on('win-close', () => win.close())

// ウィンドウを最小化
ipcMain.on('win-minimize', () => win.minimize())

// サイトを開く
ipcMain.on('open-website', (_event: Electron.IpcMainEvent, keyword: string) => {
  shell.openExternal(
    OMOKORO_SITE_BASE_URL + `?s=${encodeURIComponent(keyword)}`
  )
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
      defaultId: 0,
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
