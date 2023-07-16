const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("background_plugin", {
    reloadBgListener: (callback) =>
        ipcRenderer.on(
            "LiteLoader.background_plugin.mainWindow.reloadBg",
            callback
        ),
    resetTimerListener: (callback) =>
        ipcRenderer.on(
            "LiteLoader.background_plugin.mainWindow.resetTimer",
            callback
        ),
    resetTimer: () =>
        ipcRenderer.invoke("LiteLoader.background_plugin.resetTimer"),
    reloadBg: () => ipcRenderer.invoke("LiteLoader.background_plugin.reloadBg"),
    resetAll: () => ipcRenderer.invoke("LiteLoader.background_plugin.resetAll"),
    setImageSourceType: (type) =>
        ipcRenderer.invoke(
            "LiteLoader.background_plugin.setImageSourceType",
            type
        ),
    showFolderSelect: () =>
        ipcRenderer.invoke("LiteLoader.background_plugin.showFolderSelect"),
    showFileSelect: () =>
        ipcRenderer.invoke("LiteLoader.background_plugin.showFileSelect"),
    networkImgConfigApply: (filePath) =>
        ipcRenderer.invoke(
            "LiteLoader.background_plugin.networkImgConfigApply",
            filePath
        ),
    randomSelect: () =>
        ipcRenderer.invoke("LiteLoader.background_plugin.randomSelect"),
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
        ipcRenderer.invoke(
            "LiteLoader.background_plugin.setUseCache",
            isUseCache
        )
});
