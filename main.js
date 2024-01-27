const fs = require("fs");
const path = require("path");
const { BrowserWindow, ipcMain, dialog } = require("electron");

const allowedImgExt = [
    "JPG",
    "BMP",
    "PNG",
    "APNG",
    "WEBP",
    "JPEG",
    "AVIF",
    "GIF"
];
const allowedVideoExt = ["MP4", "WEBM", "OGG"];
var pluginDataDir = path.join(LiteLoader.path.data, "background");

const configFilePath = path.join(pluginDataDir, "config.json");
const sampleConfig = {
    imgDir: path.join(pluginDataDir, "imgs").replaceAll("\\", "/"),
    imgFile: "",
    imgApi: "",
    apiType: "img",
    imgSource: "folder",
    refreshTime: 600,
    isAutoRefresh: true,
    overrideImgFile: "",
    enableFrostedGlassStyle: true,
    apiOptions: {
        useCache: false
    }
};
var nowConfig = loadConfig();

function readdir(res) {
    return new Promise((resolve, reject) => {
        fs.readdir(res, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

// 读取文件属性
function filestat(res) {
    return new Promise((resolve, reject) => {
        fs.stat(res, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

function isImgOrVideo(src) {
    if (allowedImgExt.indexOf(path.extname(src).toUpperCase().slice(1)) != -1) {
        return "img";
    }
    if (
        allowedVideoExt.indexOf(path.extname(src).toUpperCase().slice(1)) != -1
    ) {
        return "video";
    }
}

// 获取图片文件名称
function filename(picDir) {
    var dirStat = fs.statSync(picDir);
    if (fsExistsSync(picDir) && dirStat.isDirectory) {
        return new Promise((resolve, reject) => {
            readdir(picDir)
                .then((data) => {
                    if (data.length == 0) {
                        resolve([]);
                        return;
                    }
                    let paths = [];
                    let name;
                    data.map((name, index) => {
                        let tmpPath = picDir + "/" + name;
                        //let tmpPath = path.join(picDir, name)
                        filestat(tmpPath)
                            .then((stats) => {
                                if (
                                    (!stats.isDirectory() &&
                                        allowedImgExt.indexOf(
                                            path
                                                .extname(tmpPath)
                                                .toUpperCase()
                                                .slice(1)
                                        ) != -1) ||
                                    allowedVideoExt.indexOf(
                                        path
                                            .extname(tmpPath)
                                            .toUpperCase()
                                            .slice(1)
                                    ) != -1
                                ) {
                                    paths.push(tmpPath.replace("\\", "/"));
                                }
                                if (index + 1 === data.length) {
                                    resolve(paths);
                                }
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    } else {
        return Promise.reject();
    }
}

// 获取0到n的随机整数
function rd(n) {
    return Math.floor(Math.random() * (n + 1));
}

// 随机获取一张图片路径
function rdpic() {
    return new Promise((resolve, reject) => {
        if (
            nowConfig.overrideImgFile != null &&
            fs.existsSync(nowConfig.overrideImgFile)
        ) {
            resolve(nowConfig.overrideImgFile);
            return;
        }
        //目录
        if (nowConfig.imgSource == null || nowConfig.imgSource == "folder") {
            filename(nowConfig.imgDir)
                .then((data) => {
                    if (data.length == 0) {
                        resolve("");
                    } else {
                        let n = rd(data.length - 1);
                        resolve(data[n]);
                    }
                })
                .catch(() => {
                    resolve("");
                });
        }
        //网络
        else if (
            nowConfig.imgSource == "network" ||
            nowConfig.imgSource == "network_video"
        ) {
            resolve(nowConfig.imgApi);
        }
        //文件
        else if (nowConfig.imgSource == "file") {
            resolve(nowConfig.imgFile);
        }
        //不要背景图
        else if (nowConfig.imgSource == "none") {
            resolve("");
        }
    });
}

// 防抖函数
function debounce(fn, time) {
    let timer = null;
    return function (...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, time);
    };
}

var isSelfWrite = false;
// 监听配置文件修改
function watchConfigChange() {
    if (!fs.existsSync(configFilePath)) {
        initConfig();
    }
    fs.watch(
        configFilePath,
        "utf-8",
        debounce(() => {
            if (isSelfWrite) {
                //因为fs.watch可能会触发多次，所以延迟
                setTimeout(() => {
                    isSelfWrite = false;
                }, 500);
                return;
            }
            nowConfig = loadConfig();
            sendChatWindowsMessage(
                "LiteLoader.background_plugin.mainWindow.resetTimer"
            );
            sendChatWindowsMessage(
                "LiteLoader.background_plugin.mainWindow.reloadBg"
            );
        }, 100)
    );
}

function loadConfig() {
    if (!fs.existsSync(configFilePath)) {
        initConfig();
        return sampleConfig;
    } else {
        return JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
    }
}

function initConfig() {
    if (
        !fsExistsSync(sampleConfig.imgDir) ||
        !fs.statSync(sampleConfig.imgDir).isDirectory
    ) {
        fs.mkdirSync(sampleConfig.imgDir, { recursive: true });
    }
    fs.writeFileSync(
        configFilePath,
        JSON.stringify(sampleConfig, null, 2),
        "utf-8"
    );
}

function writeConfig() {
    isSelfWrite = true;
    fs.writeFileSync(
        configFilePath,
        JSON.stringify(nowConfig, null, 2),
        "utf-8"
    );
}

function sendChatWindowsMessage(message) {
    for (var window of mainWindowObjs) {
        if (window.isDestroyed()) continue;
        window.webContents.send(message);
    }
}

onLoad();

function onLoad() {
    ipcMain.handle(
        "LiteLoader.background_plugin.resetTimer",
        async (event, message) => {
            sendChatWindowsMessage(
                "LiteLoader.background_plugin.mainWindow.resetTimer"
            );
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.reloadBg",
        async (event, message) => {
            sendChatWindowsMessage(
                "LiteLoader.background_plugin.mainWindow.reloadBg"
            );
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.resetAll",
        async (event, message) => {
            return await new Promise((accept) => {
                dialog
                    .showMessageBox({
                        type: "warning",
                        title: "警告",
                        message: "你确定要恢复默认设置吗？",
                        buttons: ["确定", "取消"],
                        cancelId: 1
                    })
                    .then((idx) => {
                        //确定
                        if (idx.response == 0) {
                            isSelfWrite = true;
                            //重置配置文件
                            fs.unlinkSync(configFilePath);
                            isSelfWrite = false;

                            nowConfig = loadConfig();
                            accept(true);

                            sendChatWindowsMessage(
                                "LiteLoader.background_plugin.mainWindow.resetTimer"
                            );
                            sendChatWindowsMessage(
                                "LiteLoader.background_plugin.mainWindow.reloadBg"
                            );
                        }
                        //取消
                        else if (idx.response == 1) {
                            //什么也不做
                            accept(false);
                        }
                    });
            });
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.setImageSourceType",
        (event, type) => {
            nowConfig.imgSource = type;
            writeConfig();
            sendChatWindowsMessage(
                "LiteLoader.background_plugin.mainWindow.reloadBg"
            );
        }
    );

    ipcMain.handle("LiteLoader.background_plugin.setApiType", (event, type) => {
        nowConfig.apiType = type;
        writeConfig();
        sendChatWindowsMessage(
            "LiteLoader.background_plugin.mainWindow.reloadBg"
        );
    });

    ipcMain.handle(
        "LiteLoader.background_plugin.networkImgConfigApply",
        (event, api) => {
            nowConfig.imgApi = api.toString();
            writeConfig();
            if (nowConfig.imgSource == "network") {
                sendChatWindowsMessage(
                    "LiteLoader.background_plugin.mainWindow.reloadBg"
                );
            }
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.isImgOrVideo",
        (event, data) => {
            return isImgOrVideo(data);
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.setFrostedGlassStyle",
        (event, isEnable) => {
            nowConfig.enableFrostedGlassStyle = isEnable;
            writeConfig();
            sendChatWindowsMessage(
                "LiteLoader.background_plugin.mainWindow.repatchFrostedGlassStyle"
            );
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.showFolderSelect",
        (event, message) => {
            const window = BrowserWindow.fromWebContents(event.sender);
            let filePath = dialog.showOpenDialogSync(window, {
                title: "请选择背景所在的文件夹（可同时包含图片和视频）",
                properties: ["openDirectory"] // 选择文件夹
            });
            nowConfig.imgSource = "folder";
            nowConfig.imgDir = filePath.toString().replaceAll("\\", "/");
            writeConfig();
            //render层会重载bg
            return filePath;
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.showFileSelect",
        (event, message) => {
            const window = BrowserWindow.fromWebContents(event.sender);
            var allowedExtStr = `*.${allowedImgExt[0]};`;
            allowedImgExt.forEach((i) => {
                allowedExtStr += `*.${i};`;
            });
            allowedVideoExt.forEach((i) => {
                allowedExtStr += `*.${i};`;
            });
            let filePath = dialog.showOpenDialogSync(window, {
                title: "请选择一张图片或一个视频作为背景",
                properties: ["openFile"], // 选择文件
                filters: [
                    {
                        name: `图片或视频文件(${allowedExtStr})`,
                        extensions: allowedImgExt.concat(allowedVideoExt)
                    },
                    { name: "所有文件(*.*)", extensions: ["*"] }
                ]
            });
            nowConfig.imgSource = "file";
            nowConfig.imgFile = filePath.toString().replaceAll("\\", "/");
            writeConfig();
            //render层会重载bg
            return filePath;
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.setAutoRefresh",
        (event, isAutoRefresh) => {
            nowConfig.isAutoRefresh = isAutoRefresh;
            writeConfig();
            sendChatWindowsMessage(
                "LiteLoader.background_plugin.mainWindow.resetTimer"
            );
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.setUseCache",
        (event, isUseCache) => {
            if (nowConfig.apiOptions == null) {
                nowConfig.apiOptions = {
                    useCache: false
                };
            }
            nowConfig.apiOptions.useCache = isUseCache;
            writeConfig();
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.changeRefreshTime",
        (event, refreshTime) => {
            nowConfig.refreshTime = refreshTime;
            writeConfig();
            sendChatWindowsMessage(
                "LiteLoader.background_plugin.mainWindow.resetTimer"
            );
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.randomSelect",
        async (event, message) => {
            return await rdpic();
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.getNowConfig",
        async (event, message) => {
            return nowConfig;
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.getRefreshTime",
        async (event, message) => {
            return nowConfig.refreshTime;
        }
    );
}

var mainWindowObjs = [];
function onBrowserWindowCreated(window) {
    watchConfigChange();

    window.webContents.on("did-stop-loading", () => {
        if (
            window.webContents.getURL().indexOf("#/main/message") != -1 ||
            window.webContents.getURL().indexOf("#/chat") != -1 ||
            window.webContents.getURL().indexOf("#/setting") != -1 ||
            window.webContents.getURL().indexOf("#/fileManager") != -1 ||
            window.webContents.getURL().indexOf("#/file-manager") != -1 ||
            window.webContents.getURL().indexOf("#/imageViewer") != -1 ||
            window.webContents.getURL().indexOf("#/image-viewer") != -1 ||
            window.webContents.getURL().indexOf("#/about") != -1
        ) {
            mainWindowObjs.push(window);
        }
    });
}

module.exports = {
    onBrowserWindowCreated
};
