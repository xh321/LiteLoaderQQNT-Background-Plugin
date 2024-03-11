const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("background_plugin", {
  repatchFrostedGlassStyleListener: (callback) =>
    ipcRenderer.on(
      "LiteLoader.background_plugin.mainWindow.repatchFrostedGlassStyle",
      callback
    ),
  reloadBgListener: (callback) =>
    ipcRenderer.on(
      "LiteLoader.background_plugin.mainWindow.reloadBg",
      callback
    ),
  reloadBgTransparentListener: (callback) =>
    ipcRenderer.on(
      "LiteLoader.background_plugin.mainWindow.reloadGlobalTransparentOffset",
      callback
    ),
  getNowBg: () => ipcRenderer.invoke("LiteLoader.background_plugin.getNowBg"),
  saveNowBg: () => ipcRenderer.invoke("LiteLoader.background_plugin.saveNowBg"),
  resetTimer: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.resetTimer"),
  reloadBg: () => ipcRenderer.invoke("LiteLoader.background_plugin.reloadBg"),
  resetAll: () => ipcRenderer.invoke("LiteLoader.background_plugin.resetAll"),
  setFrostedGlassStyle: (isEnable) =>
    ipcRenderer.invoke(
      "LiteLoader.background_plugin.setFrostedGlassStyle",
      isEnable
    ),
  setBGTransparent: (value) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.setBGTransparent", value),
  clearTmpDir: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.clearTmpDir"),
  getTmpDirSize: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.getTmpDirSize"),
  showApiPathHelp: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.showApiPathHelp"),
  fetchApi: (api) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.fetchApi", api),
  isImgOrVideo: (data) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.isImgOrVideo", data),
  setImageSourceType: (type) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.setImageSourceType", type),
  setEMediaViewer: (data) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.setEMediaViewer", data),
  setCommonBg: (data) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.setCommonBg", data),
  setApiType: (type) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.setApiType", type),
  showFolderSelect: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.showFolderSelect"),
  showImgSaveFolderSelect: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.showImgSaveFolderSelect"),
  showFileSelect: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.showFileSelect"),
  apiJsonPathApply: (jsonPath) =>
    ipcRenderer.invoke(
      "LiteLoader.background_plugin.apiJsonPathApply",
      jsonPath
    ),
  networkImgConfigApply: (filePath) =>
    ipcRenderer.invoke(
      "LiteLoader.background_plugin.networkImgConfigApply",
      filePath
    ),
  randomSelect: (isForce) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.randomSelect", isForce),
  getRefreshTime: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.getRefreshTime"),
  getNowConfig: () =>
    ipcRenderer.invoke("LiteLoader.background_plugin.getNowConfig"),
  changeRefreshTime: (refreshTime) =>
    ipcRenderer.invoke(
      "LiteLoader.background_plugin.changeRefreshTime",
      refreshTime
    ),
  setAutoRefresh: (isAutoRefresh) =>
    ipcRenderer.invoke(
      "LiteLoader.background_plugin.setAutoRefresh",
      isAutoRefresh
    ),
  setUseCache: (isUseCache) =>
    ipcRenderer.invoke("LiteLoader.background_plugin.setUseCache", isUseCache),
});
