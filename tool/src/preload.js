const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // ファイルの保存
  saveFile: async (filePath, content) => {
    return await ipcRenderer.invoke('save-file', { filePath, content });
  },

  // ファイルの読み込み
  readFile: async filePath => {
    return await ipcRenderer.invoke('read-file', filePath);
  },

  // ファイル選択ダイアログ
  selectFile: async () => {
    return await ipcRenderer.invoke('select-file');
  },

  // 保存ダイアログ
  saveDialog: async () => {
    return await ipcRenderer.invoke('save-dialog');
  },
});
