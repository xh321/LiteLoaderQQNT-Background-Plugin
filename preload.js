const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("background_plugin", {
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
