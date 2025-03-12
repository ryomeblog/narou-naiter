const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs').promises;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // 開発時はローカルサーバー、本番時はビルドされたファイルを読み込む
  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  win.loadURL(startUrl);

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ファイル操作のIPC通信設定
ipcMain.handle('save-file', async (event, { filePath, content }) => {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });

  if (!result.canceled) {
    return { success: true, filePath: result.filePaths[0] };
  }
  return { success: false };
});

ipcMain.handle('save-dialog', async () => {
  const result = await dialog.showSaveDialog({
    filters: [{ name: 'JSON', extensions: ['json'] }],
  });

  if (!result.canceled) {
    return { success: true, filePath: result.filePath };
  }
  return { success: false };
});
