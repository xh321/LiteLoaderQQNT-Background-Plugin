const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const iconv = require("iconv-lite");
var objectPath = require("object-path");
const { app, shell, net, BrowserWindow, ipcMain, dialog } = require("electron");

const RangesServer = require("./rangesServer.js");
const videoServer = new RangesServer();

const allowedImgExt = [
  "JPG",
  "BMP",
  "PNG",
  "APNG",
  "WEBP",
  "JPEG",
  "AVIF",
  "GIF",
];
const allowedVideoExt = ["MP4", "WEBM", "OGG"];
var pluginDataDir = path.join(LiteLoader.path.data, "background");
var pluginTmpDir = path.join(pluginDataDir, "tmp");

const configFilePath = path.join(pluginDataDir, "config.json");
const sampleConfig = {
  imgDir: path.join(pluginDataDir, "imgs").replaceAll("\\", "/"),
  imgSaveDir: path.join(pluginDataDir, "imgs").replaceAll("\\", "/"),
  imgFile: "",
  imgApi: "",
  imgApiJsonPath: "",
  apiType: "img",
  imgSource: "folder",
  refreshTime: 600,
  globalTransparentOffset: 0,
  isCommonBg: true,
  isAutoRefresh: true,
  overrideImgFile: "",
  enableBackgroundForMediaViewer: true,
  enableFrostedGlassStyle: true,
  apiOptions: {
    useCache: false,
  },
};
var nowConfig = loadConfig();

function isImgOrVideo(src) {
  if (allowedImgExt.indexOf(path.extname(src).toUpperCase().slice(1)) != -1) {
    return "img";
  }
  if (allowedVideoExt.indexOf(path.extname(src).toUpperCase().slice(1)) != -1) {
    return "video";
  }

  return "";
}

function readFileList(dir, filesList = []) {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {
      if (
        allowedImgExt.indexOf(path.extname(fullPath).toUpperCase().slice(1)) !=
          -1 ||
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

function calcDirSize(dir) {
  if (!fs.existsSync(dir)) return 0;

  const files = fs.readdirSync(dir);
  var total = 0;
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      total += calcDirSize(path.join(dir, item)); //递归读取文件
    } else {
      total += stat.size;
    }
  });
  return total;
}

// 获取0到n的随机整数
function rd(n) {
  return Math.floor(Math.random() * (n + 1));
}

let cachedApiUrl = "";
let cachedApiImg = "";
let cacheFolderImg = "";

function getRdFolderImg(folder) {
  var filesList = [];
  readFileList(folder, filesList);
  if (filesList.length == 0) {
    return "";
  } else {
    let n = rd(filesList.length - 1);
    return filesList[n];
  }
}

async function initVideoServer(src) {
  if (isImgOrVideo(src) == "video") {
    videoServer.setFilePath(src);
    return videoServer
      .startServer()
      .then((port) => {
        return `http://localhost:${port}/${path.basename(src)}`;
      })
      .catch((err) => {
        output("Start video server errror,", err);
        return "";
      });
  } else {
    videoServer.stopServer();
    return src;
  }
}

// 随机获取一张图片路径
async function rdpic(isForce) {
  if (
    nowConfig.overrideImgFile != null &&
    fs.existsSync(nowConfig.overrideImgFile)
  ) {
    return nowConfig.overrideImgFile;
  }
  //目录
  if (nowConfig.imgSource == null || nowConfig.imgSource == "folder") {
    if (isForce || nowConfig.isCommonBg === false) {
      output("从本地文件夹更新背景");
      cacheFolderImg = await initVideoServer(getRdFolderImg(nowConfig.imgDir));
      return cacheFolderImg;
    } else {
      //否则，使用缓存的值
      if (cacheFolderImg == "") {
        output("从本地文件夹更新背景");
        cacheFolderImg = await initVideoServer(
          getRdFolderImg(nowConfig.imgDir)
        );
      }
      return cacheFolderImg;
    }
  }
  //网络
  else if (
    nowConfig.imgSource == "network" ||
    nowConfig.imgSource == "network_video"
  ) {
    //如果是强制更换，或者每个页面不要求同一背景图，则重新请求一次api获取新图片
    if (isForce || nowConfig.isCommonBg === false) {
      output("从网络 API 更新背景");
      cachedApiImg = await fetchApi(nowConfig.imgApi);
      return cachedApiImg;
    } else {
      //否则，使用缓存的值
      if (cachedApiImg == "") {
        output("从网络 API 更新背景");
        cachedApiImg = await fetchApi(nowConfig.imgApi);
      }
      return cachedApiImg;
    }
  }
  //文件
  else if (nowConfig.imgSource == "file") {
    return await initVideoServer(nowConfig.imgFile);
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

function request(url) {
  var finalApiUrl = url;
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const req = protocol.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
      },
    });
    req.on("error", (error) => reject(error));
    req.on("response", (res) => {
      // 发生跳转就继续请求
      if (res.statusCode >= 300 && res.statusCode <= 399) {
        var realLocation = res.headers.location;
        if (!realLocation.startsWith("http")) {
          realLocation =
            new URL(url).origin +
            encodeURI(iconv.decode(realLocation, "utf-8"));
        }
        finalApiUrl = realLocation;
        return resolve(request(realLocation));
      }
      if (res.statusCode == 404) {
        return reject("404 Error");
      }
      if (!res.headers["content-type"].includes("image")) {
        return reject("Not a image");
      }

      const chunks = [];
      res.on("error", (error) => reject(error));
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () =>
        resolve({ url: finalApiUrl, data: Buffer.concat(chunks) })
      );
    });
  });
}

async function savePic(url, localPath) {
  try {
    const req = await request(url);
    cachedApiUrl = req.url;
    if (!fs.existsSync(localPath) || !fs.statSync(localPath).isDirectory) {
      fs.mkdirSync(path.dirname(localPath), { recursive: true });
    }
    fs.writeFileSync(localPath, req.data);
    return true;
  } catch (e) {
    output("Download pic error:" + e, "url=", url);
    return false;
  }
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function fetchApi(api) {
  var resp = await net.fetch(api, {
    mode: "cors",
    credentials: "omit",
    cache: "no-store",
    redirect: "follow",
    referrer: api,
    referrerPolicy: "unsafe-url",
  });

  if (resp.ok) {
    var isJson = resp.headers.get("content-type").includes("application/json");
    var isImage = resp.headers.get("content-type").includes("image");
    if (isJson) {
      var data = await resp.json();
      var apiUrl = objectPath.get(data, nowConfig?.imgApiJsonPath ?? "");
      if (!isValidUrl(apiUrl)) {
        return "";
      } else {
        output("本次获取到的背景图为：" + apiUrl);
        var fileName = getImgFileNameFromUrl(apiUrl);

        var localPic = path.join(pluginTmpDir, fileName);
        cachedApiUrl = apiUrl;
        var result = await savePic(apiUrl, localPic);
        if (!result) {
          //更换下一张图片
          return await fetchApi(api);
        }
        return localPic;
      }
    } else if (isImage) {
      const mime = (await import("mime")).default;
      //如果直接是图片文件，则提取content-type
      var fileExt = mime.getExtension(resp.headers.get("content-type"));

      var fileName = getImgFileNameFromUrl(api, fileExt);

      var localPic = path.join(pluginTmpDir, fileName);

      cachedApiUrl = api;

      var result = await savePic(api, localPic);
      if (!result) {
        dialog.showMessageBox({
          type: "error",
          title: "错误",
          message:
            "背景图下载失败，请检查你的网络后重新进设置页面更新一次背景图。",
          buttons: ["确定"],
        });
      }
      return localPic;
    } else {
      return api;
    }
  }
  return "";
}

function getImgFileNameFromUrl(url, ext = "jpg") {
  var fileName = path.parse(url);
  if (isImgOrVideo(fileName.base) == "") {
    //文件后缀不是支持的图片格式
    fileName = uuid() + "." + ext;
  } else {
    //若后缀名支持，直接按原文件名保存即可
    fileName = fileName.base;
  }
  return fileName;
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

// 没必要监听配置文件修改了
// var isSelfWrite = false;
// // 监听配置文件修改
// function watchConfigChange() {
//   if (!fs.existsSync(configFilePath)) {
//     initConfig();
//   }
//   fs.watch(
//     configFilePath,
//     "utf-8",
//     debounce(async () => {
//       if (isSelfWrite) {
//         //因为fs.watch可能会触发多次，所以延迟
//         setTimeout(() => {
//           isSelfWrite = false;
//         }, 500);
//         return;
//       }
//       nowConfig = loadConfig();

//       await resetTimer();
//     }, 100)
//   );
// }

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
    !fs.existsSync(sampleConfig.imgDir) ||
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
  fs.writeFileSync(configFilePath, JSON.stringify(nowConfig, null, 2), "utf-8");
}

function sendChatWindowsMessage(event, message = "") {
  for (var window of mainWindowObjs) {
    if (window.isDestroyed()) continue;
    window.webContents.send(event, message);
  }
}

onLoad();

var bgUpdateTimer = null;
var resetTimerFlag = false;
async function resetTimer() {
  //防并发
  if (resetTimerFlag) return;
  resetTimerFlag = true;

  if (bgUpdateTimer != null) {
    clearInterval(bgUpdateTimer);
    bgUpdateTimer = null;
  }

  output("重置背景图定时器");

  let isAutoRefresh =
    nowConfig.isAutoRefresh == null || nowConfig.isAutoRefresh === true;

  if (isAutoRefresh) {
    output(`当前背景更新间隔：${nowConfig.refreshTime}秒`);

    var updateBg = async () => {
      output("更新背景");

      sendChatWindowsMessage(
        "LiteLoader.background_plugin.mainWindow.reloadBg",
        nowConfig.isCommonBg === true || nowConfig.isCommonBg == null
          ? await rdpic(true)
          : ""
      );
    };

    await updateBg();
    bgUpdateTimer = setInterval(
      async () => await updateBg(),
      nowConfig.refreshTime * 1000
    );
  } else {
    output("用户设置了不自动更新，仅更新一次");
  }

  setTimeout(() => {
    resetTimerFlag = false;
  }, 500);
}

function emptyDir(path) {
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    const filePath = `${path}/${file}`;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      emptyDir(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

function rmEmptyDir(path, level = 0) {
  const files = fs.readdirSync(path);
  if (files.length > 0) {
    let tempFile = 0;
    files.forEach((file) => {
      tempFile++;
      rmEmptyDir(`${path}/${file}`, 1);
    });
    if (tempFile === files.length && level !== 0) {
      fs.rmdirSync(path);
    }
  } else {
    level !== 0 && fs.rmdirSync(path);
  }
}

function onLoad() {
  app.whenReady().then(resetTimer);

  ipcMain.handle(
    "LiteLoader.background_plugin.clearTmpDir",
    async (event, message) => {
      return await new Promise((accept) => {
        dialog
          .showMessageBox({
            type: "warning",
            title: "警告",
            message:
              "是否立即清空缓存文件夹？这将导致立即更新一次背景图，同时之前缓存的API背景图都将被永久删除。",
            buttons: ["确定", "取消"],
            cancelId: 1,
          })
          .then(async (idx) => {
            //确定
            if (idx.response == 0) {
              emptyDir(pluginTmpDir);
              rmEmptyDir(pluginTmpDir);

              nowConfig = loadConfig();

              output("已清空背景文件夹");

              await resetTimer();
              accept(true);
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
    "LiteLoader.background_plugin.getTmpDirSize",
    async (event, message) => {
      return calcDirSize(pluginTmpDir);
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.resetTimer",
    async (event, message) => {
      await resetTimer();
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.reloadBg",
    async (event, message) => {
      sendChatWindowsMessage(
        "LiteLoader.background_plugin.mainWindow.reloadBg",
        nowConfig.isCommonBg === true || nowConfig.isCommonBg == null
          ? await rdpic(true)
          : ""
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
            cancelId: 1,
          })
          .then(async (idx) => {
            //确定
            if (idx.response == 0) {
              isSelfWrite = true;
              //重置配置文件
              fs.unlinkSync(configFilePath);
              isSelfWrite = false;

              nowConfig = loadConfig();
              accept(true);

              await resetTimer();
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
    async (event, type) => {
      nowConfig.imgSource = type;
      writeConfig();
      sendChatWindowsMessage(
        "LiteLoader.background_plugin.mainWindow.reloadBg",
        nowConfig.isCommonBg === true || nowConfig.isCommonBg == null
          ? await rdpic(true)
          : ""
      );
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.setApiType",
    async (event, type) => {
      nowConfig.apiType = type;
      writeConfig();
      // sendChatWindowsMessage(
      //     "LiteLoader.background_plugin.mainWindow.reloadBg",
      //     nowConfig.isCommonBg === true || nowConfig.isCommonBg == null
      //         ? await rdpic(true)
      //         : ""
      // );
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.networkImgConfigApply",
    async (event, api) => {
      nowConfig.imgApi = api.toString();
      writeConfig();
      if (nowConfig.imgSource == "network") {
        sendChatWindowsMessage(
          "LiteLoader.background_plugin.mainWindow.reloadBg",
          nowConfig.isCommonBg === true || nowConfig.isCommonBg == null
            ? await rdpic(true)
            : ""
        );
      }
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.setCommonBg",
    async (event, data) => {
      nowConfig.isCommonBg = data;
      writeConfig();
      sendChatWindowsMessage(
        "LiteLoader.background_plugin.mainWindow.reloadBg",
        nowConfig.isCommonBg === true || nowConfig.isCommonBg == null
          ? await rdpic(true)
          : ""
      );
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.apiJsonPathApply",
    async (event, jsonPath) => {
      nowConfig.imgApiJsonPath = jsonPath;
      writeConfig();
      if (nowConfig.imgSource == "network") {
        sendChatWindowsMessage(
          "LiteLoader.background_plugin.mainWindow.reloadBg",
          nowConfig.isCommonBg === true || nowConfig.isCommonBg == null
            ? await rdpic(true)
            : ""
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
        autoHideMenuBar: true,
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
            autoHideMenuBar: true,
          },
        };
      });

      win.webContents.executeJavaScript(
        'document.write(decodeURIComponent("' +
          encodeURIComponent(htmlText) +
          '"))'
      );
    }
  );

  ipcMain.handle("LiteLoader.background_plugin.isImgOrVideo", (event, data) => {
    return isImgOrVideo(data);
  });

  ipcMain.handle(
    "LiteLoader.background_plugin.setEMediaViewer",
    async (event, isEnable) => {
      nowConfig.enableBackgroundForMediaViewer = isEnable;
      writeConfig();
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
        properties: ["openDirectory"], // 选择文件夹
      });
      nowConfig.imgSource = "folder";
      nowConfig.imgDir = filePath.toString().replaceAll("\\", "/");
      writeConfig();
      //render层会重载bg
      return filePath;
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.showImgSaveFolderSelect",
    (event, message) => {
      const window = BrowserWindow.fromWebContents(event.sender);
      let filePath = dialog.showOpenDialogSync(window, {
        title: "请选择点击按钮后保存当前背景图到哪个文件夹",
        properties: ["openDirectory"], // 选择文件夹
      });
      nowConfig.imgSaveDir = filePath.toString().replaceAll("\\", "/");
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
            extensions: allowedImgExt.concat(allowedVideoExt),
          },
          { name: "所有文件(*.*)", extensions: ["*"] },
        ],
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
    async (event, isAutoRefresh) => {
      nowConfig.isAutoRefresh = isAutoRefresh;
      writeConfig();

      await resetTimer();
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.setUseCache",
    (event, isUseCache) => {
      if (nowConfig.apiOptions == null) {
        nowConfig.apiOptions = {
          useCache: false,
        };
      }
      nowConfig.apiOptions.useCache = isUseCache;
      writeConfig();
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.setBGTransparent",
    (event, value) => {
      nowConfig.globalTransparentOffset = value;
      writeConfig();
      sendChatWindowsMessage(
        "LiteLoader.background_plugin.mainWindow.reloadGlobalTransparentOffset"
      );
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.changeRefreshTime",
    async (event, refreshTime) => {
      nowConfig.refreshTime = refreshTime;
      writeConfig();

      await resetTimer();
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.getNowBg",
    async (event, message) => {
      return { folder: cacheFolderImg, api: cachedApiUrl };
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.saveNowBg",
    async (event, message) => {
      if (nowConfig.imgSaveDir == null) {
        nowConfig.imgSaveDir = path
          .join(pluginDataDir, "imgs")
          .replaceAll("\\", "/");
      }
      if (!fs.existsSync(nowConfig.imgSaveDir)) {
        fs.mkdirSync(nowConfig.imgSaveDir, { recursive: true });
      }

      if (nowConfig.imgSource == "network") {
        if (!fs.existsSync(cachedApiImg)) {
          dialog.showMessageBox({
            type: "warning",
            title: "警告",
            message:
              "当前尚未下载到背景文件，无法保存，请等待当前背景加载完毕再试。若长期未加载，请前往设置检查API配置是否正确。",
            buttons: ["确定"],
          });
          return;
        }

        var targetPath = path.join(
          nowConfig.imgSaveDir,
          path.basename(cachedApiImg)
        );
        fs.copyFileSync(cachedApiImg, targetPath);
        dialog
          .showMessageBox({
            type: "info",
            title: "提示",
            message: "保存背景成功！",
            buttons: ["确定", "打开所在文件夹"],
            cancelId: 0,
          })
          .then(async (idx) => {
            //确定
            if (idx.response == 1) {
              shell.showItemInFolder(targetPath);
            }
          });
      } else {
        //不支持
        dialog.showMessageBox({
          type: "warning",
          title: "警告",
          message: "仅支持保存来源为网络图片的背景",
          buttons: ["确定"],
        });
      }
    }
  );

  ipcMain.handle(
    "LiteLoader.background_plugin.randomSelect",
    async (event, isForce) => {
      return await rdpic(isForce);
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
  console.log(
    "\x1b[32m%s\x1b[0m",
    "Background:",
    ...args,
    " @ ",
    new Date().toLocaleString()
  );
}

var mainWindowObjs = [];
function onBrowserWindowCreated(window) {
  window.webContents.on("did-stop-loading", () => {
    if (
      window.webContents.getURL().indexOf("#/main/message") != -1 ||
      window.webContents.getURL().indexOf("#/chat") != -1 ||
      window.webContents.getURL().indexOf("#/forward") != -1 ||
      window.webContents.getURL().indexOf("#/record") != -1 ||
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
  onBrowserWindowCreated,
};
