const fs = require("fs");
const path = require("path");
var objectPath = require("object-path");
const { shell, net, BrowserWindow, ipcMain, dialog } = require("electron");

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
    imgApiJsonPath: "",
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

function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList); //递归读取文件
        } else {
            if (
                allowedImgExt.indexOf(
                    path.extname(fullPath).toUpperCase().slice(1)
                ) != -1 ||
                allowedVideoExt.indexOf(
                    path.extname(fullPath).toUpperCase().slice(1)
                ) != -1
            ) {
                filesList.push(fullPath.replace("\\", "/"));
            }
        }
    });
    return filesList;
}

// 获取0到n的随机整数
function rd(n) {
    return Math.floor(Math.random() * (n + 1));
}

// 随机获取一张图片路径
async function rdpic() {
    if (
        nowConfig.overrideImgFile != null &&
        fs.existsSync(nowConfig.overrideImgFile)
    ) {
        return nowConfig.overrideImgFile;
    }
    //目录
    if (nowConfig.imgSource == null || nowConfig.imgSource == "folder") {
        output("从本地文件夹更新背景");
        var filesList = [];
        readFileList(nowConfig.imgDir, filesList);
        if (filesList.length == 0) {
            return "";
        } else {
            let n = rd(filesList.length - 1);
            return filesList[n];
        }
    }
    //网络
    else if (
        nowConfig.imgSource == "network" ||
        nowConfig.imgSource == "network_video"
    ) {
        output("从网络 API 更新背景");
        return await fetchApi(nowConfig.imgApi);
    }
    //文件
    else if (nowConfig.imgSource == "file") {
        return nowConfig.imgFile;
    }
    //不要背景图
    else if (nowConfig.imgSource == "none") {
        return "";
    }
}

function isValidUrl(str) {
    const pattern = new RegExp(
        "^([a-zA-Z]+:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
    );
    return pattern.test(str);
}

async function fetchApi(api) {
    var resp = await net.fetch(api, {
        mode: "cors",
        credentials: "omit",
        cache: "no-store",
        redirect: "follow",
        referrer: api,
        referrerPolicy: "unsafe-url"
    });

    if (resp.ok) {
        var isJson = resp.headers
            .get("content-type")
            .includes("application/json");
        if (isJson) {
            var data = await resp.json();
            var apiUrl = objectPath.get(data, nowConfig?.imgApiJsonPath ?? "");
            if (!isValidUrl(apiUrl)) {
                return "";
            } else {
                output("本次获取到的背景图为：" + apiUrl);
                return apiUrl;
            }
        } else {
            return api;
        }
    }
    return "";
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
        "LiteLoader.background_plugin.fetchApi",
        async (event, api) => {
            return await fetchApi(api);
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
        "LiteLoader.background_plugin.apiJsonPathApply",
        (event, jsonPath) => {
            nowConfig.imgApiJsonPath = jsonPath;
            writeConfig();
            if (nowConfig.imgSource == "network") {
                sendChatWindowsMessage(
                    "LiteLoader.background_plugin.mainWindow.reloadBg"
                );
            }
        }
    );

    ipcMain.handle(
        "LiteLoader.background_plugin.showApiPathHelp",
        (event, data) => {
            const win = new BrowserWindow({
                width: 1024,
                height: 768,
                title: "API-JSON路径帮助",
                autoHideMenuBar: true
            });
            var htmlText = fs.readFileSync(
                path.join(__dirname, "assets", "API-JSON路径帮助.html"),
                "utf-8"
            );
            win.loadURL("about:blank");

            win.webContents.setWindowOpenHandler(({ url }) => {
                return {
                    action: "allow",
                    overrideBrowserWindowOptions: {
                        width: 1024,
                        height: 768,
                        autoHideMenuBar: true
                    }
                };
            });

            win.webContents.executeJavaScript(
                'document.write(decodeURIComponent("' +
                    encodeURIComponent(htmlText) +
                    '"))'
            );
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

function output(...args) {
    console.log("\x1b[32m%s\x1b[0m", "Background:", ...args);
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
