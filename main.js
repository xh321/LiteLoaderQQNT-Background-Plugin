const fs = require("fs");
const path = require("path");
const { BrowserWindow, ipcMain } = require("electron");
const { dialog } = require("electron");

const allowedExt = [".JPG", ".BMP", ".PNG", ".WEBP", ".JPEG"];
const configFilePath = path.join(__dirname, "config.json");
const sampleConfig = {
  imgDir: path.join(__dirname, "imgs").replaceAll("\\", "/"),
  refreshTime: 600,
  isAutoRefresh: true
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

// 获取图片文件名称
function filename(picDir) {
  return new Promise((resolve, reject) => {
    readdir(picDir)
      .then((data) => {
        let paths = [];
        let name;
        data.map((name, index) => {
          let tmpPath = picDir + "/" + name;
          //let tmpPath = path.join(picDir, name)
          filestat(tmpPath)
            .then((stats) => {
              if (
                !stats.isDirectory() &&
                allowedExt.indexOf(path.extname(tmpPath).toUpperCase()) != -1
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
        reject(err);
      });
  });
}

// 获取0到n的随机整数
function rd(n) {
  return Math.floor(Math.random() * (n + 1));
}

// 随机获取一张图片路径
function rdpic() {
  return new Promise((resolve, reject) => {
    filename(nowConfig.imgDir).then((data) => {
      let n = rd(data.length - 1);
      resolve(data[n]);
    });
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

// 监听配置文件修改
function watchConfigChange() {
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(
      configFilePath,
      JSON.stringify(sampleConfig, null, 2),
      "utf-8"
    );
  }
  fs.watch(
    configFilePath,
    "utf-8",
    debounce(() => {
      nowConfig = loadConfig();
    }, 100)
  );
}

function loadConfig() {
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(
      configFilePath,
      JSON.stringify(sampleConfig, null, 2),
      "utf-8"
    );
    return sampleConfig;
  } else {
    return JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
  }
}

function writeConfig() {
  fs.writeFileSync(configFilePath, JSON.stringify(nowConfig, null, 2), "utf-8");
}

function onLoad(plugin) {
  ipcMain.handle(
    "betterQQNT.background_plugin.showFolderSelect",
    (event, message) => {
      const window = BrowserWindow.fromWebContents(event.sender);
      let filePath = dialog.showOpenDialogSync(window, {
        title: "请选择背景图存放的文件夹",
        properties: ["openDirectory"], // 选择文件夹
      });
      nowConfig.imgDir = filePath.toString().replaceAll("\\", "/");
      writeConfig();
      return filePath;
    }
  );

  ipcMain.handle(
    "betterQQNT.background_plugin.setAutoRefresh",
    (event, isAutoRefresh) => {
      nowConfig.isAutoRefresh = isAutoRefresh;
      writeConfig();
    }
  );

  ipcMain.handle(
    "betterQQNT.background_plugin.changeRefreshTime",
    (event, refreshTime) => {
      nowConfig.refreshTime = refreshTime;
      writeConfig();
    }
  );


  ipcMain.handle(
    "betterQQNT.background_plugin.randomSelect",
    async (event, message) => {
      return await rdpic();
    }
  );

  ipcMain.handle(
    "betterQQNT.background_plugin.getNowConfig",
    async (event, message) => {
      return nowConfig;
    }
  );

  ipcMain.handle(
    "betterQQNT.background_plugin.getRefreshTime",
    async (event, message) => {
      return nowConfig.refreshTime;
    }
  );

  // ipcMain.handle(
  //   "betterQQNT.background_plugin.showSetting",
  //   (event, message) => {
  //     const window = BrowserWindow.fromWebContents(event.sender);

  //     const win = new BrowserWindow({
  //       webPreferences: {
  //           devTools: true
  //       }
  //   });
  //   win.webContents.toggleDevTools()
  //   console.log(win)
  //   console.log(window)

  //     return true;
  //   }
  // );
}

function onBrowserWindowCreated(window) {
  watchConfigChange();
}

module.exports = {
  onLoad,
  onBrowserWindowCreated,
};
