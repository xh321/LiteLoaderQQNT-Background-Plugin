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
    resetTimerListener: (callback) =>
        ipcRenderer.on(
            "LiteLoader.background_plugin.mainWindow.resetTimer",
            callback
        ),
    resetTimer: () =>
        ipcRenderer.invoke("LiteLoader.background_plugin.resetTimer"),
    reloadBg: () => ipcRenderer.invoke("LiteLoader.background_plugin.reloadBg"),
    resetAll: () => ipcRenderer.invoke("LiteLoader.background_plugin.resetAll"),
    setFrostedGlassStyle: (isEnable) =>
        ipcRenderer.invoke(
            "LiteLoader.background_plugin.setFrostedGlassStyle",
            isEnable
        ),
    showApiPathHelp: () =>
        ipcRenderer.invoke("LiteLoader.background_plugin.showApiPathHelp"),
    fetchApi: (api) =>
        ipcRenderer.invoke("LiteLoader.background_plugin.fetchApi", api),
    isImgOrVideo: (data) =>
        ipcRenderer.invoke("LiteLoader.background_plugin.isImgOrVideo", data),
    setImageSourceType: (type) =>
        ipcRenderer.invoke(
            "LiteLoader.background_plugin.setImageSourceType",
            type
        ),
    setApiType: (type) =>
        ipcRenderer.invoke("LiteLoader.background_plugin.setApiType", type),
    showFolderSelect: () =>
        ipcRenderer.invoke("LiteLoader.background_plugin.showFolderSelect"),
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
