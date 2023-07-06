const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("background_plugin", {
    reloadBgListener: (callback) =>
        ipcRenderer.on(
            "betterQQNT.background_plugin.mainWindow.reloadBg",
            callback
        ),
    resetTimerListener: (callback) =>
        ipcRenderer.on(
            "betterQQNT.background_plugin.mainWindow.resetTimer",
            callback
        ),
    resetTimer: () =>
        ipcRenderer.invoke("betterQQNT.background_plugin.resetTimer"),
    reloadBg: () => ipcRenderer.invoke("betterQQNT.background_plugin.reloadBg"),
    showFolderSelect: () =>
        ipcRenderer.invoke("betterQQNT.background_plugin.showFolderSelect"),
    showFileSelect: () =>
        ipcRenderer.invoke("betterQQNT.background_plugin.showFileSelect"),
    randomSelect: () =>
        ipcRenderer.invoke("betterQQNT.background_plugin.randomSelect"),
    getRefreshTime: () =>
        ipcRenderer.invoke("betterQQNT.background_plugin.getRefreshTime"),
    getNowConfig: () =>
        ipcRenderer.invoke("betterQQNT.background_plugin.getNowConfig"),
    changeRefreshTime: (refreshTime) =>
        ipcRenderer.invoke(
            "betterQQNT.background_plugin.changeRefreshTime",
            refreshTime
        ),
    setAutoRefresh: (setAutoRefresh) =>
        ipcRenderer.invoke(
            "betterQQNT.background_plugin.setAutoRefresh",
            setAutoRefresh
        )
});
