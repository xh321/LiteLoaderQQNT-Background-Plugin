const BackgroundSaveBtnHtml = `
<div
  id="backgroundSave"
  class="customBtn"
  style="app-region: no-drag; display: flex; height: 24px; justify-content: center; margin-bottom: 16px;margin-left:2px;"
>
  <i style="display: inline-flex; justify-content: center; align-items: center; color: var(--icon_primary)">
    <svg width="24" height="24" t="1707242102031" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1469" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path fill="currentColor" d="M682.752 627.894857L571.904 544.914286a47.725714 47.725714 0 0 0-57.014857 0l-97.572572 73.142857-130.084571-104.082286a47.286857 47.286857 0 0 0-56.246857-2.377143l-131.035429 88.137143V246.345143h696.832v238.738286a31.670857 31.670857 0 0 0 63.341715 0v-241.371429A60.745143 60.745143 0 0 0 799.451429 182.857143H97.28A60.745143 60.745143 0 0 0 36.571429 243.529143V819.2a60.745143 60.745143 0 0 0 60.672 60.672h477.805714a31.670857 31.670857 0 1 0 0-63.341714H99.913143v-140.397715l156.745143-105.398857 159.378285 127.488 127.305143-95.488 101.339429 75.995429a31.670857 31.670857 0 1 0 37.997714-50.688z" p-id="1470">
      </path>
      <path fill="currentColor" d="M543.378286 404.662857a95.085714 95.085714 0 1 0 95.085714-95.085714 95.085714 95.085714 0 0 0-95.085714 95.085714z m126.72 0a31.670857 31.670857 0 1 1-31.670857-31.670857 31.707429 31.707429 0 0 1 31.670857 31.670857z" p-id="1471">
      </path>
      <path fill="currentColor" d="M891.245714 829.513143l-21.174857 21.174857v-221.586286a29.257143 29.257143 0 1 0-58.514286 0v221.732572l-21.174857-21.174857a29.257143 29.257143 0 0 0-41.508571 0 29.257143 29.257143 0 0 0 0 41.398857l71.168 71.168 1.097143 1.024c0.182857 0 0.292571 0.292571 0.475428 0.365714a3.949714 3.949714 0 0 0 0.658286 0.548571l0.658286 0.548572c0.182857 0 0.292571 0.292571 0.475428 0.365714l0.731429 0.548572 0.475428 0.292571a3.657143 3.657143 0 0 0 0.841143 0.475429l0.475429 0.292571 0.841143 0.475429 0.475428 0.292571c0.292571 0 0.475429 0.292571 0.731429 0.365714l0.548571 0.292572 0.731429 0.292571 0.658286 0.292572 0.658285 0.292571 0.731429 0.292571 0.548571 0.182858 0.841143 0.292571a0.841143 0.841143 0 0 0 0.475429 0l0.914285 0.292571h0.475429a3.218286 3.218286 0 0 0 0.914286 0.182858h0.475428c0.182857 0 0.658286 0 0.914286 0.182857a1.170286 1.170286 0 0 1 0.548571 0h0.914286a145795831155.78513 145795831155.78513 0 0 1 1.462857 0.182857h2.925715a151002825111.04 151002825111.04 0 0 1 1.462857-0.182857h0.914285a1.170286 1.170286 0 0 0 0.548572 0c0.292571 0 0.658286 0 0.914286-0.182857s0.292571 0 0.475428 0 0.658286 0 0.914286-0.182858h0.475428l0.914286-0.292571h0.475429l0.841143-0.292571 0.548571-0.182858 0.731429-0.292571 0.658285-0.292571 0.658286-0.292572 0.731429-0.292571 0.548571-0.292572c0.292571 0 0.475429-0.292571 0.731429-0.365714l0.475428-0.292571 0.841143-0.475429 0.475429-0.292571a3.657143 3.657143 0 0 1 0.841142-0.475429l0.475429-0.292571 0.731429-0.548572c0.182857 0 0.292571-0.292571 0.475428-0.365714l0.658286-0.548572a3.986286 3.986286 0 0 1 0.658286-0.548571c0.182857 0 0.292571-0.292571 0.475428-0.365714l1.097143-1.024 71.168-71.168a29.257143 29.257143 0 0 0 0-41.508572 29.878857 29.878857 0 0 0-42.386286-0.036571z" p-id="1472">
      </path>
    </svg>
  </i>
</div>
`;

const BackgroundCustomBtnStyle = `
<style id="backgroundBtnStyle">
  .customBtn i:hover {
    color: var(--brand_standard) !important;
  }
</style>
`;

const BackgroundChangeBtnHtml = `
<div
  id="backgroundChange"
  class="customBtn"
  style="app-region: no-drag; display: flex; height: 24px; justify-content: center; margin-bottom: 16px;margin-left:2px;"
>
  <i style="display: inline-flex; justify-content: center; align-items: center; color: var(--icon_primary)">
    <svg width="24" height="24" t="1707309462760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6358" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path fill="currentColor" d="M224.028444 96.028444A159.971556 159.971556 0 0 0 64 256v447.317333a30.72 30.72 0 0 0 0 1.422223V768a159.971556 159.971556 0 0 0 160.028444 160.028444h351.971556a31.971556 31.971556 0 1 0 0-64H224.028444A95.971556 95.971556 0 0 1 128 768v-45.454222l190.065778-108.600889 207.36 148.081778a31.971556 31.971556 0 1 0 37.148444-52.053334l-98.190222-70.144 241.777778-214.926222 189.838222 135.566222v15.530667a32.028444 32.028444 0 0 0 64 0V256a160.028444 160.028444 0 0 0-160.028444-160.028444H224.028444zM682.666667 360.106667l-271.758223 241.550222-72.362666-51.712a31.971556 31.971556 0 0 0-34.474667-1.706667L128 648.874667V256c0-53.020444 43.008-96.028444 96.028444-96.028444h576c52.963556 0 95.971556 43.008 95.971556 96.028444v225.848889l-173.397333-123.904a32.028444 32.028444 0 0 0-39.822223 2.161778z m-394.695111-40.106667a31.971556 31.971556 0 1 1 64 0 31.971556 31.971556 0 0 1-64 0z m31.971555-96.028444a95.971556 95.971556 0 1 0 0 192 95.971556 95.971556 0 0 0 0-192z" fill="#000000" p-id="6359">
      </path>
      <path fill="currentColor" d="M703.431111 828.302222h224.711111a26.510222 26.510222 0 0 1 19.114667 45.852445l-46.933333 46.819555a26.339556 26.339556 0 0 1-37.432889 0 26.453333 26.453333 0 0 1 0-37.432889l2.275555-2.332444h-161.735111a26.453333 26.453333 0 1 1 0-52.906667z m232.448 19.797334zM929.28 783.075556h-224.711111a26.510222 26.510222 0 0 1-19.114667-45.852445l46.990222-46.762667a26.339556 26.339556 0 0 1 37.376-0.056888 26.453333 26.453333 0 0 1 0 37.432888l-2.275555 2.332445h161.735111a26.453333 26.453333 0 1 1 0 52.906667z m-232.448-19.797334z" fill="#000000" p-id="6360">
      </path>
    </svg>
  </i>
</div>
`;
export async function onSettingWindowCreated(view) {
  var tmpDirSize = getfilesize(await window.background_plugin.getTmpDirSize());
  var nowConfig = await window.background_plugin.getNowConfig();
  var nowImgDir = nowConfig.imgDir;
  var nowImgSaveDir = nowConfig.imgSaveDir;
  var nowImgApi = nowConfig.imgApi;
  var nowCommonBg = nowConfig.isCommonBg;
  var nowEnableBackgroundForMediaViewer =
    nowConfig.enableBackgroundForMediaViewer;
  var nowApiJsonPath = nowConfig.imgApiJsonPath;
  var nowApiType = nowConfig.apiType == null ? "img" : nowConfig.apiType;
  var nowImgSource =
    nowConfig.imgSource == null ? "folder" : nowConfig.imageSource;
  var nowImgFile = nowConfig.imgFile;
  var nNowEnableBackgroundForMediaViewer =
    nowEnableBackgroundForMediaViewer == null
      ? true
      : nowEnableBackgroundForMediaViewer;
  var nNowCommonBg = nowCommonBg == null ? true : nowCommonBg;
  var nNowImgApi = nowImgApi == null ? "" : nowImgApi;
  var nNowApiJsonPath = nowApiJsonPath == null ? "" : nowApiJsonPath;
  var nNowImgFile = nowImgFile == null ? "" : nowImgFile;
  let isFrostedGlassStyle =
    nowConfig.enableFrostedGlassStyle == null ||
    nowConfig.enableFrostedGlassStyle === true;
  let isAutoRefresh =
    nowConfig.isAutoRefresh == null || nowConfig.isAutoRefresh === true;
  let isUseCache = !(
    (nowConfig.apiOptions &&
      (nowConfig.apiOptions.useCache === false ||
        nowConfig.apiOptions.useCache == null)) ||
    nowConfig.apiOptions == null
  );
  const new_navbar_item = `
    <body>
      <div class="config_view">
        <section class="path">
          <h1>背景图设置</h1>
          <div class="wrap">
            <div class="vertical-list-item top-box">
              <h2>操作</h2>
              <div>
                <button id="refreshBgNow" class="q-button q-button--small q-button--secondary">立即更新一次背景</button>
                <button id="clearTmpDir" class="q-button q-button--small q-button--secondary">清空网络图片缓存文件夹（${tmpDirSize}）</button>
                <button id="resetAll" class="q-button q-button--small q-button--secondary">恢复默认设置</button>
              </div>
            </div>
            <hr class="horizontal-dividing-line" />
            <div class="vertical-list-item top-box">
            <h2>复制当然背景图路径</h2>
            <div>
              <button id="copyNowApiBg" class="q-button q-button--small q-button--secondary">复制最近一次API背景图</button>
              <button id="copyNowFolderBg" class="q-button q-button--small q-button--secondary">复制最近一次文件夹背景图</button>
            </div>
          </div>
          <hr class="horizontal-dividing-line" />
            <div class="vertical-list-item">
              <div>
                <h2>修改背景来源</h2>
                <span class="secondary-text">如果使用网络背景API，请务必选择正确是网络图片还是网络视频</span>
              </div>
              <div style="width: 25%; pointer-events: auto;">
                <section class="list-ctl">
                  <div class="ops-selects">
                  <div class="q-pulldown-menu small-size" data-id="image_source">
                      <div class="q-pulldown-menu-button">
                          <input class="content" type="text" readonly spellcheck="false">
                          <svg class="icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 6.0001L8.00004 10L4 6" stroke="currentColor" stroke-linejoin="round"></path>
                          </svg>
                      </div>
                      <div class="q-context-menu hidden" style="z-index:1">
                          <ul class="q-pulldown-menu-list small-size">
                                <li class="q-pulldown-menu-list-item" data-value="none">
                                  <span class="content">无背景图</span>
                                  <span class="icon">
                                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2 7L6.00001 11L14 3" stroke="currentColor" stroke-linejoin="round"></path>
                                      </svg>
                                  </span>
                              </li>
                              <li class="q-pulldown-menu-list-item" data-value="folder">
                                  <span class="content">目录</span>
                                  <span class="icon">
                                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2 7L6.00001 11L14 3" stroke="currentColor" stroke-linejoin="round"></path>
                                      </svg>
                                  </span>
                              </li>
                              <li class="q-pulldown-menu-list-item" data-value="file">
                                  <span class="content">单个文件</span>
                                  <span class="icon">
                                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2 7L6.00001 11L14 3" stroke="currentColor" stroke-linejoin="round"></path>
                                      </svg>
                                  </span>
                              </li>
                              <li class="q-pulldown-menu-list-item" data-value="network">
                                  <span class="content">网络图片</span>
                                  <span class="icon">
                                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2 7L6.00001 11L14 3" stroke="currentColor" stroke-linejoin="round"></path>
                                      </svg>
                                  </span>
                              </li>
                              <li class="q-pulldown-menu-list-item" data-value="network_video">
                              <span class="content">网络视频</span>
                              <span class="icon">
                                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M2 7L6.00001 11L14 3" stroke="currentColor" stroke-linejoin="round"></path>
                                  </svg>
                              </span>
                          </li>
                          </ul>
                      </div>
                  </div>
                </section>
              </div>
            </div>
            <hr class="horizontal-dividing-line" />
            <div class="vertical-list-item">
              <div>
                <h2>网络背景API链接</h2>
                <span class="secondary-text">目前仅支持GET请求，请确保直接访问链接能查看到图片/视频且未设置防盗链~</span>
              </div>
              <div style="width: 95%;display: flex;align-items: center;flex-direction: row; margin-left:20px; pointer-events: auto;">
                <input id="selectImageApi" style="width:70%" class="path-input text_color" type="text" spellcheck="false" placeholder="输入API地址（可选）" value="${nNowImgApi}">
                <button id="testNetworkApi" class="q-button q-button--small q-button--secondary">测试获取</button>
              </div>
            </div>
            <div class="vertical-list-item bottom-box">
              <div>
                <h2>网络背景API JSON路径</h2>
                <span class="secondary-text">若API返回的是JSON，请填写图片直链对应的 JSON 路径。</span>
              </div>
              <div style="width: 72%;display: flex;align-items: center;flex-direction: row; margin-left:20px; pointer-events: auto;">
                <input id="apiJsonPath" style="width:70%" class="path-input text_color" type="text" spellcheck="false" placeholder="输入 JSON 路径（可选）" value="${nNowApiJsonPath}">
                <button id="apiJsonPathHelp" class="q-button q-button--small q-button--secondary">查看帮助</button>
              </div>
            </div>          
            <div class="vertical-list-item">
              <div>
                <h2>保存背景图的路径</h2>
              </div>
              <div style="width: 55%; display: flex;align-items: center;flex-direction: row;margin-left:40px; pointer-events: auto;">
                <input id="selectImageSaveDir" style="width:70%" class="path-input text_color" type="text" spellcheck="false" placeholder="点击保存按钮后保存到哪" readonly="true" value="${nowImgSaveDir}">
                <button id="selectImageSaveDirBtn" class="q-button q-button--small q-button--secondary">选择目录</button>
              </div>
            </div>
            
          <hr class="horizontal-dividing-line" /> 
            <div class="vertical-list-item">
              <div>
                <h2>本地背景文件夹路径</h2>
              </div>
              <div style="width: 55%; display: flex;align-items: center;flex-direction: row;margin-left:40px; pointer-events: auto;">
                <input id="selectImageDir" style="width:70%" class="path-input text_color" type="text" spellcheck="false" placeholder="本地背景文件夹路径" readonly="true" value="${nowImgDir}">
                <button id="selectImageDirBtn" class="q-button q-button--small q-button--secondary">选择目录</button>
              </div>
            </div>
            
            <div class="vertical-list-item bottom-box">
            <div>
              <h2>本地背景路径</h2>
            </div>
            <div style="width: 55%; display: flex;align-items: center;flex-direction: row;margin-left:40px; pointer-events: auto;">
              <input id="selectImageFile" style="width:70%" class="path-input text_color" type="text" spellcheck="false" placeholder="本地背景文件路径" readonly="true" value="${nNowImgFile}">
              <button id="selectImageFileBtn" class="q-button q-button--small q-button--secondary">选择文件</button>
            </div>
          </div>
          
          <hr class="horizontal-dividing-line" />          

          <div class="vertical-list-item">
            <div>
              <h2>是否对所有窗口共用同一个背景</h2>
              <span class="secondary-text">修改将自动保存并立即生效</span>
            </div>
            <div id="switchCommonBg" class="q-switch">
              <span class="q-switch__handle"></span>
            </div>
          </div>

          <hr class="horizontal-dividing-line" />          

          <div class="vertical-list-item">
            <div>
              <h2>是否对媒体预览器生效背景</h2>
              <span class="secondary-text">修改将自动保存并在新打开的媒体预览器生效</span>
            </div>
            <div id="switchMediaViewer" class="q-switch">
              <span class="q-switch__handle"></span>
            </div>
          </div>

              <hr class="horizontal-dividing-line" />          

              <div class="vertical-list-item">
                <div>
                  <h2>是否对部分组件启用毛玻璃模糊效果</h2>
                  <span class="secondary-text">修改将自动保存并立即生效</span>
                </div>
                <div id="switchFrostedGlassStyle" class="q-switch">
                  <span class="q-switch__handle"></span>
                </div>
              </div>

              
              <hr class="horizontal-dividing-line" />          

              <div class="vertical-list-item">
                <div>
                  <h2>调整主背景图覆盖层透明度</h2>
                  <span class="secondary-text">修改将自动保存并立即生效（默认中间，也就是不调整）</span>
                </div>
                <input type="range" value="0" min="-100" max="100" step="1"
                class="q-button q-button--small q-button--secondary pick-opacity" style="width: 51%;" />
              </div>
          </div>
        </section>

        <section class="path">
          <h1>更新设置</h1>
          <div class="wrap">

            <div class="list">

              <div class="vertical-list-item">
                <div>
                  <h2>背景更新间隔</h2>
                  <span class="secondary-text">修改将自动保存并立即生效；为了最佳体验，请勿设置过短哦~</span>
                </div>
                <div style="width:105px;pointer-events: auto;">
                  <input id="refreshTimeInput" min="1" max="99999" maxlength="5" class="text_color path-input" style="width:75px;" type="number" value="${nowConfig.refreshTime}"/>秒
                </div>
              </div>

              <hr class="horizontal-dividing-line" />          

              <div class="vertical-list-item">
                <div>
                  <h2>是否自动轮播背景</h2>
                  <span class="secondary-text">修改将自动保存并立即生效</span>
                </div>
                <div id="switchAutoRoll" class="q-switch">
                  <span class="q-switch__handle"></span>
                </div>
              </div>

            </div>

          </div>
        </section>

        <section class="path">
          <h1>网络请求设置</h1>
          <div class="wrap">

            <div class="list">      

              <div class="vertical-list-item">
                <div>
                  <h2>是否启用视频缓存</h2>
                  <span class="secondary-text">若使用的API每次返回不同视频请关闭缓存，否则每次视频可能因为缓存无法更新；若API仅返回单个视频则可以开启缓存。注意：本选项现在对网络图片无效，网络图片均会自动保存。</span>
                </div>
                <div style="width:10%; display: flex;align-items: center;flex-direction: row;margin-left:40px; pointer-events: auto;" >
                  <div id="switchUseCache" class="q-switch">
                    <span class="q-switch__handle"></span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        <img id="testImage" class="img-hidden" style="width:80%; height:auto; margin-left:10%; border:1px solid;box-shadow: 2px 2px 2px 1px rgba(80,80, 80, 0.6);"></img>
        <div id="testVideo" class="img-hidden" style="width:80%; height:auto; margin-left:10%; border:1px solid;box-shadow: 2px 2px 2px 1px rgba(80,80, 80, 0.6);"></div>

        <style>
          .img-hidden {
            display:none;
          }

          .path-input {
            align-self: normal;
            flex: 1;
            border-radius: 4px;
            margin-right: 16px;
            transition: all 100ms ease-out;
          }
        
          .path-input:focus {
            padding-left: 4px;
          }
          
          .bq-icon {
            height:16px;
            width:16px;
          }
          
          /* 通用 */
          .config_view {
              margin: 20px;
          }
          
          /* 背景颜色透明度滑条 */
          .config_view input[type='range']::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 16px;
              width: 16px;
              border-radius: 8px;
              background: aqua;
              cursor: pointer;
          }
      
          .pick-opacity {
              padding: 4px;
          }

          .config_view h1 {
              color: var(--text_primary);
              font-weight: var(--font-bold);
              font-size: min(var(--font_size_3), 18px);
              line-height: min(var(--line_height_3), 24px);
              padding: 0px 16px;
              margin-bottom: 8px;
          }
          
          .config_view .wrap {
              /* Linux样式兼容：--fg_white */
              background-color: var(--fill_light_primary, var(--fg_white));
              border-radius: 8px;
              font-size: min(var(--font_size_3), 18px);
              line-height: min(var(--line_height_3), 24px);
              margin-bottom: 20px;
              overflow: hidden;
              padding: 0px 16px;
          }
          
          .config_view .vertical-list-item {
              margin: 12px 0px;
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          
          .config_view .horizontal-dividing-line {
              border: unset;
              margin: unset;
              height: 1px;
              background-color: rgba(127, 127, 127, 0.15);
          }
          
          .config_view .vertical-dividing-line {
              border: unset;
              margin: unset;
              width: 1px;
              background-color: rgba(127, 127, 127, 0.15);
          }
          
          .config_view .ops-btns {
              display: flex;
          }
          
          .config_view .hidden {
              display: none !important;
          }
          
          .config_view .disabled {
              pointer-events: none;
              opacity: 0.5;
          }
          
          .config_view .secondary-text {
              color: var(--text_secondary);
              font-size: min(var(--font_size_2), 16px);
              line-height: min(var(--line_height_2), 22px);
              margin-top: 4px;
          }
          
          .config_view .wrap .title {
              cursor: pointer;
              font-size: min(var(--font_size_3), 18px);
              line-height: min(var(--line_height_3), 24px);
          }
          
          .config_view .wrap .title svg {
              width: 1em;
              height: 1em;
              transform: rotate(-180deg);
              transition-duration: 0.2s;
              transition-timing-function: ease;
              transition-delay: 0s;
              transition-property: transform;
          }
          
          .config_view .wrap .title svg.is-fold {
              transform: rotate(0deg);
          }
          
          
          /* 模态框 */
          .config_view .modal-window {
              display: flex;
              justify-content: center;
              align-items: center;
              position: fixed;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 999;
              background-color: rgba(0, 0, 0, 0.5);
          }
          
          .config_view .modal-dialog {
              width: 480px;
              border-radius: 8px;
              /* Linux样式兼容：--fg_white */
              background-color: var(--bg_bottom_standard, var(--fg_white));
          }
          
          .config_view .modal-dialog header {
              font-size: 12px;
              height: 30px;
              line-height: 30px;
              text-align: center;
          }
          
          .config_view .modal-dialog main {
              padding: 0px 16px;
          }
          
          .config_view .modal-dialog main p {
              margin: 8px 0px;
          }
          
          .config_view .modal-dialog footer {
              height: 30px;
              display: flex;
              justify-content: right;
              align-items: center;
          }
          
          .config_view .modal-dialog .q-icon {
              width: 22px;
              height: 22px;
              margin: 8px;
          }
          
          
          /* 版本号 */
          .config_view .versions .wrap {
              display: flex;
              justify-content: space-between;
              padding: 16px 0px;
          }
          
          .config_view .versions .wrap>div {
              flex: 1;
              margin: 0px 10px;
              border-radius: 8px;
              text-align: center;
          }
          
          
          /* 数据目录 */
          .config_view .path .path-input {
              align-self: normal;
              flex: 1;
              border-radius: 4px;
              margin-right: 16px;
              transition: all 100ms ease-out;
          }
          
          .config_view .path .path-input:focus {
              padding-left: 5px;
              background-color: rgba(127, 127, 127, 0.1);
          }
          
          /* 选择框容器 */
          .config_view .list-ctl .ops-selects {
              display: flex;
              gap: 8px;
          }
          

          @media (prefers-color-scheme: light) {
              .text_color {
                  color: black;
              }
          }
          
          @media (prefers-color-scheme: dark) {
              .text_color {
                  color: white;
              }
          }

        </style>
      </div>
    </body>
  `;

  const parser = new DOMParser();

  const doc2 = parser.parseFromString(new_navbar_item, "text/html");
  const node2 = doc2.querySelector("body > div");

  const setPulldownValue = (id, value) => {
    const name = node2.querySelector(
      `.list-ctl .q-pulldown-menu[data-id="${id}"] [data-value="${value}"] .content`
    );
    name.parentNode.click();
  };

  var selectDir = async () => {
    var path = await window.background_plugin.showFolderSelect();

    if (path == "" || path == null) return;

    var realPath = path[0].replaceAll("\\", "/");
    node2.querySelector("#selectImageDir").value = realPath;
    setPulldownValue("image_source", "folder");
    await window.background_plugin.reloadBg();

    alert("成功修改路径为目录：" + realPath);
  };

  var selectImgSaveDir = async () => {
    var path = await window.background_plugin.showImgSaveFolderSelect();

    if (path == "" || path == null) return;

    var realPath = path[0].replaceAll("\\", "/");
    node2.querySelector("#selectImageSaveDir").value = realPath;

    alert("成功修改保存图片的路径为：" + realPath);
  };

  var selectFile = async () => {
    var path = await window.background_plugin.showFileSelect();

    if (path == "" || path == null) return;

    var realPath = path[0].replaceAll("\\", "/");
    node2.querySelector("#selectImageFile").value = realPath;
    setPulldownValue("image_source", "file");
    await window.background_plugin.reloadBg();

    alert("成功修改路径为单个文件：" + realPath);
  };

  function isUrl(str) {
    var v = new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    );
    return v.test(str);
  }

  var selectNetwork = async () => {
    var path = node2.querySelector("#selectImageApi").value;
    if (path == null || path.trim() == "") return;

    if (!isUrl(path)) {
      alert("URL不合法，请重新输入！");
      return;
    }

    await window.background_plugin.networkImgConfigApply(path);
  };

  var apiJsonPathChange = async () => {
    var path = node2.querySelector("#apiJsonPath").value;
    if (path == null || path.trim() == "") return;

    await window.background_plugin.apiJsonPathApply(path);
  };

  var clearTmpDir = async () => {
    await window.background_plugin.clearTmpDir();
    var tmpDirSize = getfilesize(
      await window.background_plugin.getTmpDirSize()
    );
    node2.querySelector(
      "#clearTmpDir"
    ).innerText = `清空缓存文件夹（${tmpDirSize}）`;
  };

  var refreshBg = async () => {
    await window.background_plugin.reloadBg();
  };

  var resetAll = async () => {
    var result = await window.background_plugin.resetAll();
    if (result == true) {
      alert("已重置所有设置，请重新打开设置界面");
      window.close();
    }
  };

  var testNetworkApi = async () => {
    var nowConfig = await window.background_plugin.getNowConfig();
    alert("请观察界面最下侧是否能显示，若无任何媒体显示则说明有问题。");
    if (nowConfig.apiType == "img") {
      node2.querySelector("#testVideo").classList.add("img-hidden");
      node2.querySelector("#testImage").classList.remove("img-hidden");

      var videoNode = document.getElementById("test-video");
      if (videoNode) {
        videoNode.parentElement.removeChild(videoNode);
      }

      var imgUrl = node2.querySelector("#selectImageApi").value;

      imgUrl = await window.background_plugin.fetchApi(imgUrl);
      if (isLocalFile(imgUrl)) {
        //前面加上协议头
        imgUrl = `local:///${imgUrl}`;
      }
      try {
        // var url = new URL(imgUrl);
        // url.searchParams.append("t", new Date().getTime());
        // imgUrl = url.toString();

        node2.querySelector("#testImage").src = imgUrl;
      } catch {
        alert("URL不合法，请重新输入！");
      }
    } else if (nowConfig.apiType == "video") {
      node2.querySelector("#testImage").classList.add("img-hidden");
      node2.querySelector("#testVideo").classList.remove("img-hidden");
      var imgUrl = node2.querySelector("#selectImageApi").value;

      imgUrl = await window.background_plugin.fetchApi(imgUrl);
      if (isLocalFile(imgUrl)) {
        //前面加上协议头
        imgUrl = `local:///${imgUrl}`;
      }
      try {
        // var url = new URL(imgUrl);
        // url.searchParams.append("t", new Date().getTime());

        // imgUrl = url.toString();

        var videoNode = document.getElementById("test-video");
        if (videoNode) {
          videoNode.parentElement.removeChild(videoNode);
        }

        var video = document.createElement("video");
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.volume = 0;
        video.style = "margin-left:10%;margin-right:10%;width:80%";
        video.id = "test-video";
        video.innerHTML = `<source src="${imgUrl}">`;
        document.getElementById("testVideo").appendChild(video);
      } catch {
        alert("URL不合法，请重新输入！");
      }
    } else {
      alert(
        "请先选择背景来源为网络图片或网络视频，再进行测试（否则插件不知道应该渲染图片还是视频）"
      );
    }
  };

  var apiJsonPathHelp = async () => {
    await window.background_plugin.showApiPathHelp();
  };

  var copyNowApiBg = async () => {
    var nowBg = await window.background_plugin.getNowBg();
    await navigator.clipboard.writeText(nowBg.api);
  };

  var copyNowFolderBg = async () => {
    var nowBg = await window.background_plugin.getNowBg();
    await navigator.clipboard.writeText(nowBg.folder);
  };

  node2.querySelector("#copyNowApiBg").onclick = copyNowApiBg;
  node2.querySelector("#copyNowFolderBg").onclick = copyNowFolderBg;
  node2.querySelector("#clearTmpDir").onclick = clearTmpDir;
  node2.querySelector("#refreshBgNow").onclick = refreshBg;
  node2.querySelector("#resetAll").onclick = resetAll;
  node2.querySelector("#selectImageSaveDirBtn").onclick = selectImgSaveDir;
  node2.querySelector("#selectImageDirBtn").onclick = selectDir;
  node2.querySelector("#selectImageFileBtn").onclick = selectFile;
  node2.querySelector("#selectImageApi").onblur = selectNetwork;
  node2.querySelector("#apiJsonPath").onblur = apiJsonPathChange;
  node2.querySelector("#testNetworkApi").onclick = testNetworkApi;
  node2.querySelector("#apiJsonPathHelp").onclick = apiJsonPathHelp;

  // 全局背景透明度偏移
  const backgroundOpacity = nowConfig.globalTransparentOffset;
  // 给pick-opacity(input)设置默认值
  const pickOpacity = node2.querySelector(".pick-opacity");
  pickOpacity.value = parseInt(backgroundOpacity * 100);
  // 给pick-opacity(input)添加事件监听
  pickOpacity.addEventListener("change", async (event) => {
    var realValue = event.target.value / 100;
    await window.background_plugin.setBGTransparent(realValue);
  });

  var q_switch_mediaViewer = node2.querySelector("#switchMediaViewer");

  if (nNowEnableBackgroundForMediaViewer == true) {
    q_switch_mediaViewer.classList.toggle("is-active");
  }

  q_switch_mediaViewer.addEventListener("click", async () => {
    if (q_switch_mediaViewer.classList.contains("is-active")) {
      //取消
      window.background_plugin.setEMediaViewer(false);
    } else {
      //重新设置
      window.background_plugin.setEMediaViewer(true);
    }
    q_switch_mediaViewer.classList.toggle("is-active");
  });

  var q_switch_commonBg = node2.querySelector("#switchCOmmonBg");

  if (nNowCommonBg == true) {
    q_switch_commonBg.classList.toggle("is-active");
  }

  q_switch_commonBg.addEventListener("click", async () => {
    if (q_switch_commonBg.classList.contains("is-active")) {
      //取消
      window.background_plugin.setCommonBg(false);
    } else {
      //重新设置
      window.background_plugin.setCommonBg(true);
    }
    q_switch_commonBg.classList.toggle("is-active");
  });

  var q_switch_fglass = node2.querySelector("#switchFrostedGlassStyle");

  if (isFrostedGlassStyle) {
    q_switch_fglass.classList.toggle("is-active");
  }

  q_switch_fglass.addEventListener("click", async () => {
    if (q_switch_fglass.classList.contains("is-active")) {
      //取消
      window.background_plugin.setFrostedGlassStyle(false);
    } else {
      //重新设置
      window.background_plugin.setFrostedGlassStyle(true);
    }
    q_switch_fglass.classList.toggle("is-active");
  });

  var q_switch_autoroll = node2.querySelector("#switchAutoRoll");

  if (isAutoRefresh) {
    q_switch_autoroll.classList.toggle("is-active");
  }

  q_switch_autoroll.addEventListener("click", async () => {
    if (q_switch_autoroll.classList.contains("is-active")) {
      //取消
      window.background_plugin.setAutoRefresh(false);
    } else {
      //重新设置
      window.background_plugin.setAutoRefresh(true);
    }
    q_switch_autoroll.classList.toggle("is-active");
  });

  var q_switch_usecache = node2.querySelector("#switchUseCache");

  if (isUseCache) {
    q_switch_usecache.classList.toggle("is-active");
  }

  q_switch_usecache.addEventListener("click", async () => {
    if (q_switch_usecache.classList.contains("is-active")) {
      //取消
      window.background_plugin.setUseCache(false);
    } else {
      //重新设置
      window.background_plugin.setUseCache(true);
    }
    q_switch_usecache.classList.toggle("is-active");
  });

  node2.querySelector("#refreshTimeInput").onblur = async () => {
    var time = parseFloat(node2.querySelector("#refreshTimeInput").value);
    if (time <= 0 || time > 99999) {
      alert("你的时间设置有误！将不会保存，请重新输入");
      return;
    }

    await window.background_plugin.changeRefreshTime(time);
  };

  //初始化下拉框
  const list_ctl = node2.querySelector(".list-ctl");
  const all_pulldown_menu_button = list_ctl.querySelectorAll(
    ".q-pulldown-menu-button"
  );
  //显示下拉框列表
  for (const pulldown_menu_button of all_pulldown_menu_button) {
    pulldown_menu_button.addEventListener("click", (event) => {
      const context_menu = event.currentTarget.nextElementSibling;
      context_menu.classList.toggle("hidden");
    });
  }

  node2.addEventListener("pointerup", (event) => {
    if (event.target.closest(".q-pulldown-menu-button")) {
      return;
    }
    if (!event.target.closest(".q-context-menu")) {
      const all_context_menu = list_ctl.querySelectorAll(".q-context-menu");
      for (const context_menu of all_context_menu) {
        context_menu.classList.add("hidden");
      }
    }
  });
  //下拉框选择
  const pulldown_menus = list_ctl.querySelectorAll(".q-pulldown-menu");
  for (const pulldown_menu of pulldown_menus) {
    const content = pulldown_menu.querySelector(
      ".q-pulldown-menu-button .content"
    );
    const pulldown_menu_list = pulldown_menu.querySelector(
      ".q-pulldown-menu-list"
    );
    const pulldown_menu_list_items = pulldown_menu_list.querySelectorAll(
      ".q-pulldown-menu-list-item"
    );

    // 初始化选择框按钮显示内容
    const setValueAndAddSelectedClass = (value) => {
      if (value == null) value = "folder";
      const name = pulldown_menu.querySelector(
        `[data-value="${value}"] .content`
      );
      name.parentNode.classList.add("selected");
      content.value = name.textContent;
    };

    switch (pulldown_menu.dataset.id) {
      case "image_source":
        {
          const value = nowConfig.imgSource;
          setValueAndAddSelectedClass(value);
        }
        break;
    }

    // 选择框条目点击
    pulldown_menu_list.addEventListener("click", async (event) => {
      const target = event.target.closest(".q-pulldown-menu-list-item");
      if (target == null) return;

      const item_value = target.dataset.value;

      // 判断是哪个选择框的，单独设置
      switch (pulldown_menu.dataset.id) {
        case "image_source":
          switch (item_value) {
            case "folder":
              var path = node2.querySelector("#selectImageDir").value;
              if (path == null || path.trim() == "") {
                alert("请先在下方选择文件夹路径，再选中背景来源为目录");
                return;
              }
              break;
            case "file":
              var path = node2.querySelector("#selectImageFile").value;
              if (path == null || path.trim() == "") {
                alert("请先在下方选择文件路径，再选中背景来源为单个文件");
                return;
              }
              break;
            case "network":
              var path = node2.querySelector("#selectImageApi").value;
              if (path == null || path.trim() == "") {
                alert("请先在下方输入背景链接地址，再选中背景来源为网络图片");
                return;
              } else {
                window.background_plugin.setApiType("img");
              }
              break;
            case "network_video":
              var path = node2.querySelector("#selectImageApi").value;
              if (path == null || path.trim() == "") {
                alert("请先在下方输入背景链接地址，再选中背景来源为网络视频");
                return;
              } else {
                window.background_plugin.setApiType("video");
              }
              break;
          }
          window.background_plugin.setImageSourceType(item_value);
          break;
      }

      if (target && !target.classList.contains("selected")) {
        // 移除所有条目的选择状态
        for (const pulldown_menu_list_item of pulldown_menu_list_items) {
          pulldown_menu_list_item.classList.remove("selected");
        }

        // 添加选择状态
        target.classList.add("selected");

        // 获取选中的选项文本
        const text_content = target.querySelector(".content").textContent;
        content.value = text_content;

        const all_context_menu = list_ctl.querySelectorAll(".q-context-menu");
        for (const context_menu of all_context_menu) {
          context_menu.classList.add("hidden");
        }
      }
    });
  }

  view.appendChild(node2);
}

function getfilesize(size) {
  //把字节转换成正常文件大小
  if (!size) return "0B";
  var num = 1024.0; //byte
  if (size < num) return size + "B";
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + "KB"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

function isLocalFile(src) {
  return /(^[A-Za-z]{1}:[/\\]{1,2}.*)|(^[/\\]{1,2}.*)/.test(src);
}

onLoad();

async function insertLeftMenuBtn() {
  //来自：https://github.com/qianxuu/LiteLoaderQQNT-Plugin-Demo-mode/blob/main/src/renderer.js
  //主界面功能菜单添加按钮
  let findCount = 0;
  var nowConfig = await window.background_plugin.getNowConfig();
  const findFuncMenuInterval = setInterval(() => {
    if (findCount++ > 50) {
      clearInterval(findFuncMenuInterval);
    }
    // 获取功能菜单
    const funcMenu = document.querySelector(".func-menu");
    if (funcMenu) {
      clearInterval(findFuncMenuInterval);

      var saveBtn = document.getElementById("backgroundSave");
      if (saveBtn) {
        saveBtn.parentElement.removeChild(saveBtn);
      }

      var changeBtn = document.getElementById("backgroundChange");
      if (changeBtn) {
        changeBtn.parentElement.removeChild(changeBtn);
      }

      var style = document.getElementById("backgroundBtnStyle");
      if (style) {
        style.parentNode.removeChild(style);
      }

      // 插入按钮和悬停样式
      if (nowConfig.imgSource == "network" && nowConfig.apiType == "img") {
        funcMenu.insertAdjacentHTML("afterbegin", BackgroundSaveBtnHtml);
        // 下载背景图按钮
        const backgroundSaveBtn = document.querySelector("#backgroundSave");
        backgroundSaveBtn.addEventListener("click", async () => {
          await window.background_plugin.saveNowBg();
        });
      }
      if (nowConfig.imgSource == "network" || nowConfig.imgSource == "folder") {
        funcMenu.insertAdjacentHTML("afterbegin", BackgroundChangeBtnHtml);
        // 更新背景图按钮
        const backgroundChangeBtn = document.querySelector("#backgroundChange");
        backgroundChangeBtn.addEventListener("click", async () => {
          await window.background_plugin.reloadBg();
        });
      }
      document.head.insertAdjacentHTML("beforeend", BackgroundCustomBtnStyle);
    }
  }, 100);
}

function onLoad() {
  console.log("[Background]", "开始检测页面路径", new Date());

  var isMainPage = false;

  const interval3 = setInterval(async () => {
    var nowConfig = await window.background_plugin.getNowConfig();
    if (
      window.location.href.indexOf("#/main/message") != -1 ||
      window.location.href.indexOf("#/chat") != -1 ||
      window.location.href.indexOf("#/forward") != -1 ||
      window.location.href.indexOf("#/record") != -1 ||
      window.location.href.indexOf("#/setting") != -1 ||
      window.location.href.indexOf("#/fileManager") != -1 ||
      window.location.href.indexOf("#/file-manager") != -1 ||
      ((nowConfig.enableBackgroundForMediaViewer ||
        nowConfig.enableBackgroundForMediaViewer == null) &&
        (window.location.href.indexOf("#/imageViewer") != -1 ||
          window.location.href.indexOf("#/image-viewer") != -1)) ||
      window.location.href.indexOf("#/about") != -1
    ) {
      //如果之前已经进过这里，说明是重复进入，直接清除计时器退出即可
      if (isMainPage) {
        clearInterval(interval3);
        return;
      }

      isMainPage = true;
      clearInterval(interval3);

      console.log(
        "[Background]",
        "检测到主页页面或聊天页面，注入背景更新函数",
        new Date()
      );

      if (window.location.href.indexOf("#/main/message") != -1) {
        await insertLeftMenuBtn();
      }

      //监听任何可能的重载背景的请求
      await window.background_plugin.reloadBgListener(
        async (event, selectedImg) => {
          var nowSelect = selectedImg;
          if (nowSelect == "" || nowSelect == null) {
            nowSelect = await window.background_plugin.randomSelect(true);
          }

          await reloadBg(nowSelect);

          if (await getNowIsVideo(nowSelect)) {
            //如果是视频，需要设置一下视频地址
            setVideoSrc(nowSelect);
          }

          if (window.location.href.indexOf("#/main/message") != -1) {
            await insertLeftMenuBtn();
          }
        }
      );

      await window.background_plugin.repatchFrostedGlassStyleListener(
        async (event, message) => {
          await patchFrostedGlassStyle();
        }
      );

      await window.background_plugin.reloadBgTransparentListener(
        async (event, message) => {
          await reloadBackgroundTransparent();
        }
      );

      patchCss();

      await patchFrostedGlassStyle();

      var nowSelect = await window.background_plugin.randomSelect(false);

      await reloadBg(nowSelect);

      if (await getNowIsVideo(nowSelect)) {
        //如果是视频，需要设置一下视频地址
        setVideoSrc(nowSelect);
      }
    } else if (window.location.href.indexOf("#/blank") == -1) {
      console.log("[Background]", "非主页或聊天页面，停止注入", new Date());
      clearInterval(interval3);
    }
  }, 100);

  async function getNowIsVideo(src) {
    var nowConfig = await window.background_plugin.getNowConfig();

    var isVideo =
      //要么是视频后缀名
      (await window.background_plugin.isImgOrVideo(src ?? "")) == "video" ||
      //要么不是本地文件，且是视频API
      (!isLocalFile(src) && nowConfig.apiType == "video");
    await reloadBackgroundTransparent();
    return isVideo;
  }

  async function reloadBackgroundTransparent(value = null) {
    var globalTransparentOffset = value;
    if (globalTransparentOffset == null) {
      var nowConfig = await window.background_plugin.getNowConfig();
      var globalTransparentOffset = nowConfig.globalTransparentOffset;
      if (globalTransparentOffset == null) {
        globalTransparentOffset = 0;
      }
    }

    document.documentElement.style.setProperty(
      "--background-image-transparent-offset",
      globalTransparentOffset
    );
  }

  async function reloadBg(imgUrl) {
    if (imgUrl == "" || imgUrl == null || (await getNowIsVideo(imgUrl))) {
      //地址为空，说明没获取到图片，直接置空背景图
      //视频的话也不需要背景图
      document.documentElement.style.removeProperty("--background-image-url");
      return;
    }

    // 清理视频节点
    var thisNode = document
      .evaluate(
        "/html/body/div[@id='app']/video[@id='background-video']",
        document
      )
      .iterateNext();
    if (thisNode) {
      thisNode.parentElement.removeChild(thisNode);
    }

    var nowConfig = await window.background_plugin.getNowConfig();
    var realUrl = encodeURI(imgUrl);
    //如果是本地路径
    if (isLocalFile(imgUrl)) {
      //前面加上协议头
      realUrl = `local:///${realUrl}`;
    } else if (
      imgUrl.indexOf("http") == 0 &&
      //确定不开启缓存，再加时间戳避免缓存
      ((nowConfig.apiOptions &&
        (nowConfig.apiOptions.useCache === false ||
          nowConfig.apiOptions.useCache == null)) ||
        nowConfig.apiOptions == null)
    ) {
      //加上时间戳，防止缓存
      var url = new URL(imgUrl);
      url.searchParams.append("t", new Date().getTime());
      realUrl = url.toString();
    }

    //图片预载，加载完毕后再更新属性
    var img = new Image();
    img.src = realUrl;
    img.onload = function () {
      var globalTransparentOffset = nowConfig.globalTransparentOffset;
      if (globalTransparentOffset == null) {
        globalTransparentOffset = 0;
      }

      document.documentElement.style.setProperty(
        "--background-image-url",
        `url("${realUrl}")`
      );

      document.documentElement.style.setProperty(
        "--background-image-transparent-offset",
        globalTransparentOffset
      );
    };
    console.log("[Background]", "加载图片：" + imgUrl);
  }

  async function patchFrostedGlassStyle() {
    var nowConfig = await window.background_plugin.getNowConfig();

    var thisNode = document
      .evaluate(
        "/html/head/style[@id='background-plugin-frostedglass-css']",
        document
      )
      .iterateNext();
    if (thisNode) {
      thisNode.parentElement.removeChild(thisNode);
    }

    if (
      nowConfig.enableFrostedGlassStyle == null ||
      nowConfig.enableFrostedGlassStyle == true
    ) {
      var stylee = document.createElement("style");
      stylee.type = "text/css";
      stylee.id = "background-plugin-frostedglass-css";
      var sHtml = `
      @media (prefers-color-scheme: dark) {
        /* 添加模糊 */
        .favorites-layout__left-area,
        .contact,
        .search-result,
        .av-call-status,
        .self-avatar-mini-card,
        .sidebar,
        .forward-msg,
        .normal-file,
        .forward-ops .op-icon,
        .radio-tab,
        .sys-notify-card,
        .recent-contact,
        .chat-input-area,
        .main-area__footer {
          backdrop-filter: brightness(110%) saturate(120%) blur(8px);
        }
      }
      
      @media (prefers-color-scheme: light) {
        /* 添加模糊 */
        .favorites-layout__left-area,
        .contact,
        .search-result,
        .av-call-status,
        .self-avatar-mini-card,
        .sidebar,
        .forward-msg,
        .normal-file,
        .forward-ops .op-icon,
        .radio-tab,
        .sys-notify-card,
        .recent-contact,
        .chat-input-area,
        .main-area__footer {
          backdrop-filter: brightness(90%) saturate(120%) blur(8px);
        }
      }
      `;

      stylee.innerHTML = sHtml;
      document.getElementsByTagName("head").item(0).appendChild(stylee);
    }
  }

  function setVideoSrc(videoSrc) {
    if (isLocalFile(videoSrc)) {
      videoSrc = "local:///" + encodeURI(videoSrc);
    }

    var thisNode = document.getElementById("background-video");
    if (thisNode) {
      thisNode.setAttribute("src", videoSrc);
    } else {
      var video = document.createElement("video");
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.volume = 0;
      video.src = videoSrc;
      video.id = "background-video";
      if (document.querySelector(".tab-container")) {
        document.querySelector(".tab-container").appendChild(video);
      } else if (document.querySelector(".container")) {
        document.querySelector(".container").appendChild(video);
      } else if (document.querySelector("#app.forward")) {
        document.querySelector("#app.forward").appendChild(video);
      } else if (document.querySelector("#app")) {
        document.querySelector("#app").appendChild(video);
      }
    }
  }

  async function patchCss() {
    var thisNode = document
      .evaluate("/html/head/style[@id='background-plugin-css']", document)
      .iterateNext();
    if (thisNode) {
      thisNode.parentElement.removeChild(thisNode);
    }

    var stylee = document.createElement("style");
    stylee.type = "text/css";
    stylee.id = "background-plugin-css";
    var sHtml = `
        #background-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -999;
        }
      @media (prefers-color-scheme: dark) {

        /* 非主界面半透明（左侧） */
        .nav-bar-container, .setting-tab {
          background: rgba(0,0,0,0.8)!important;
        }

        /* 非主界面半透明（右侧） */
        .group-msg-container, .setting-main, .file-manager-main {
          background: rgba(0,0,0,0.85)!important;
        }

        /* 需要半透明的控件 */
        /* 公共组件 */
        :has(> .q-switch), :has(> .label), .panel-main, .main-search, setting-panel, setting-select,setting-option,setting-divider,
        /* 设置页面专用 */
        .add-perm, .other-shortcut, .common-shotcut, .chat-page, .new-msg , .cue-tone, .location-setting, .storage-item, .setting-item-group,
        /* 文件选择器*/
       .file-list-normal-scroll-container, .file-list-normal-sort-title
        {
          background: rgba(255,255,255,0.15)!important;
        }

        /* 需要完全透明的子控件（避免重复透明度不好看） */
        /* 公共组件 */
        .item-container, .q-collapse-item__header, .q-collapse-item, .q-collapse, setting-list, setting-item, setting-text,setting-switch,setting-button,
        /* 设置页面专用 */
        .setting-item, .verify-way, .question-audit, .close-shotcut, .chat-page__item, .new-msg__item, .cue-tone__item, .shortcut-conflict, .vertical-list-item,
        /* 文件选择器 */
        .sender-container, .file-type-container, .group-file-container
        {
          background: rgba(255,255,255,0)!important;
        }

        /* 关于页 */
        .version {
          color: white;
          background: rgba(80,80,80,0.8);
          margin-bottom: 0;
          padding-bottom: 4px;
          padding-top:8px;
        }
        .copyright {
          color: white;
          background: rgba(80,80,80,0.8);
          padding-bottom: 8px;
        }

        
        /* 合并转发页面 */
        .forward > #ml-root {
          background-color: rgba(0,0,0,0.7)!important;
        }
        .forward .draggable-view__container .title {
          background-color: rgba(0,0,0,0.85)!important;
        }

        /* 聊天记录页面 */
        .record {
          background-color: rgba(0,0,0,0.7)!important;
        }
        .record-msg-date {
          background-color: rgba(0,0,0,0.75)!important;
        }

        .record .msg-content-container {
          border-radius:8px!important;
          padding:0!important;
        }
        
        .record .message-content {
          padding-top: 8px!important;
          padding-left: 8px!important;
          padding-right:8px!important;
          padding-bottom:8px!important;
        }


        .main-area__footer {
          box-shadow: rgb(25 25 25) 0px 0px 20px 4px;
          background: rgba(80,80,80,0.95)!important;
        }

        .image-viewer__tip {
          box-shadow: rgb(80 80 80) 0px 0px 20px 4px;
        }

        /* 将图片预览器重置为黑色 */
        .main-area__content {
          background: rgb(80,80,80,0.8)!important;
        }

        .favorites-layout,
        .favorites-layout__content {
          background:unset!important;
        }

        .favorites-layout__left-area {
          background: rgba(30, 30, 30, 0.85)!important;
        }

        .favorites-layout__right-area {
          background: rgba(30,30,30,0.85)!important;
        }

        .markdown_it_link {
          color: #2398ff;
        }

        .viewport-list {
          background-image: unset!important;
        }

        .q-dialog-main {
          background: rgba(80,80,80,0.8)!important;
        }

        .q-dialog-main .selector {
          background: rgba(80,80,80,0)!important;
        }
        
        .q-dialog-main .msg-abstract {
          background: rgba(80,80,80,0.6)!important;
        }

        .q-dialog-main .selector .q-collapse-item__header {
          background: rgba(80,80,80,0.1)!important;
          backdrop-filter: brightness(80%) saturate(120%) blur(8px);
        }

        .q-dialog-main .selector .q-collapse-item__content .viewport-list__inner {
          background: rgba(80,80,80,0)!important;
        }

        .q-dialog-main .selector .list-item {
          background: rgba(80,80,80,0.4)!important;
          margin-bottom: 5px;
        }
      
        .q-dialog-main .selector .forward-view .selector-editor {
          background: rgba(80,80,80,0.6)!important;
        }


        .contact-adder-btn,
        .q-input {
          background: rgba(80, 80, 80, 0.5)!important;
        }

        .q-pulldown-menu-button {
          background: rgba(80, 80, 80, 0.25)!important;
        }

        .tab {
          background: rgba(80, 80, 80, 0)!important;
        }
        
        .tab .radio-tab {
          background: rgba(80, 80, 80, 0.35)!important;
        }

        .tab .q-collapse-item__header,
        .tab .tab-header {
          background: rgba(80, 80, 80, 0)!important;
        }

        .tab .viewport-list__inner {
          background: rgba(80, 80, 80, 0)!important;
        }

        .sys-notify-list .viewport-list__inner {
          background: rgba(80, 80, 80, 0)!important;
        }

        .q-divider {
          background: rgba(80, 80, 80, 1)!important;
        }

        .resize-handler,
        .resize-handler > *{
          background: rgba(80, 80, 80, 0)!important;
        }

        .profile,
        .sys-notify {
          background: rgba(30, 30, 30, 0.85)!important;
        }

        .resize-handler,
        .resize-handler > * {
          background: rgba(30, 30, 30, 0.15)!important;
        }

        .main-search {
          background: rgba(30, 30, 30, 0.5)!important;
        }
        
        .contact__top-area {
          background: rgba(30, 30, 30, 0)!important;
        }

        .contact {
          background: rgba(30, 30, 30, 0.85)!important;
        }

        .search-result {
          background: rgba(30, 30, 30, 0.92)!important;
        }

        .chat-header {
          background: rgba(0, 0, 0, 0.2)!important;
        }

        .message__timestamp,
        .gray-tip-content,
        .group-user__name.text-ellipsis,
        .user-name > span {
          color:white;
          backrgound: rgba(80,80,80,0.8)!important;
        }
        
        .member-role-tag {
          background: rgba(80,80, 80)!important;
        }

        .av-call-status {
          background: rgba(0, 0, 0, 0.5)!important;
        }

        .tab-container{
          background-color: unset!important;
        }

        .msg-content-container , .forward-msg{
          background-color: rgb(0 0 0 / 40%)!important;
        }

        .expression-panel,.expression-panel-inner,.sticker-panel {
          background: rgba(0, 0, 0, 0.9)!important;
          z-index:999!important;
        }

        #ml-root {
          z-index:0!important;
        }

        .v-scrollbar-track {
          z-index:999!important;
        }
        .v-scrollbar-thumb {
          z-index:999!important;
        }

  
        .ark-view-message_not-support{
          background: rgba(0,0,0,0.2)!important;
        }

        .q-dialog-main {
          background: rgba(0,0,0,0.8)!important;
        }
  

        .self-avatar-mini-card{
          background: rgba(0,0,0,0.7)!important;
        }

        #app > div.container {
          background: rgba(0,0,0,0.0)!important;
        }

        #app::before {
          content: "";
          width: 100%;
          height: 100%;
          position: fixed;
          background-image: var(--background-image-url)!important;
          background-size: cover!important;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          transition: background-image 1.5s ease-in-out;
          z-index: -1;
        }

        /* 列表条目圆角 */
        .viewport-list__inner {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 8px;
        }

        .list-item {
            border-radius: 16px;
        }

        .list-item:hover {
          background-color: rgba(0, 0, 0, 0.1) !important;
        }

        .msg-content-container {
          backdrop-filter: brightness(120%) saturate(120%) blur(8px);
        }

        .recent-contact .viewport-list__inner{
          background-color: rgb( 0 0 0  / 0%)!important;
        }

        .recent-contact{
          background-color: rgb(0 0 0  / 70%)!important;
        }

        .ad-wrapper{
          background-color: rgb(0 0 0  / 40%)!important;
        }

        .group-assistent-list__top{
          background-color: rgb(0 0 0  / 0%)!important;
        }

        .q-context-sub-menu__container , .q-context-menu{
          background: unset!important;
          background-color: rgb(0 0 0  / 85%)!important;
        }

        .q-context-menu{
          border:1px solid rgba(80,80,80,0.6)!important;
        }

        .chat-msg-area{
          background-color: rgb(0 0 0  / 0%)!important;
        }

        .group-member{
          background-color: rgb(0 0 0  / 40%)!important;
        }

        .recent-contact .contact-top-bar{
          background-color: rgb(0 0 0  / 0%)!important;
        }

        .group-notice{
          background-color: rgb(0 0 0  / 40%)!important;
        }

        .msg-input{
          background-color: rgb(0 0 0  / 40%)!important;
        }

        .operation{
          background-color: rgb(0 0 0  / 40%)!important;
        }

        .chat-func-bar{
          background-color: rgb(0 0 0 / 40%)!important;
          padding-bottom: 8px!important;
        }

        .sidebar{
          background-color: rgb(0 0 0  / 50%)!important;
        }

        .aio{
          background-color: rgba(0,0,0,calc(0.7 + var(--background-image-transparent-offset)))!important;
        }
        .group-member-list > div.viewport-list > div.viewport-list__inner{
          background-color: rgb(0 0 0 / 0%)!important;
        }
      }

      @media (prefers-color-scheme: light) {
        /* 非主界面半透明（左侧） */
        .nav-bar-container, .setting-tab {
          background: rgba(250,250,250,0.85)!important;
        }

        /* 非主界面半透明（右侧） */
        .group-msg-container, .setting-main, .file-manager-main {
          background: rgba(250,250,250,0.88)!important;
        }

        /* 需要半透明的控件 */
        /* 公共组件 */
        :has(> .q-switch), :has(> .label), .panel-main, .main-search, setting-panel, setting-select,setting-option,setting-switch,setting-button,setting-divider,
        /* 设置页面专用 */
        .add-perm, .other-shortcut, .common-shotcut, .chat-page, .new-msg , .cue-tone, .location-setting, .storage-item, .setting-item-group,
        /* 文件选择器*/
       .file-list-normal-scroll-container, .file-list-normal-sort-title
        {
          background: rgba(250,250,250,0.7)!important;
        }

        /* 需要完全透明的子控件（避免重复透明度不好看） */
        /* 公共组件 */
        .item-container, .q-collapse-item__header, .q-collapse-item, .q-collapse, setting-list, setting-item, setting-text,
        /* 设置页面专用 */
        .setting-item, .verify-way, .question-audit, .close-shotcut, .chat-page__item, .new-msg__item, .cue-tone__item, .shortcut-conflict, .group-body .viewport-list__inner, .vertical-list-item,
        /* 文件选择器 */
        .sender-container, .file-type-container, .group-file-container
        {
          background: rgba(255,255,255,0)!important;
        }

        /* 将图片预览器重置为白色 */
        .main-area__content {
          background: rgb(255,255,255,0.8)!important;
        }

        .main-area__footer {
          background: rgba(250, 250, 250, 0.6)!important;
          box-shadow: rgb(250 250 250) 0px 0px 20px 4px;
        }

        .main-area__footer .q-tooltips .q-icon, .image-viewer__size {
          color:black!important;
        }

        .image-viewer__tip {
          background: white!important;
          color:black!important;
          box-shadow: rgb(200 200 200) 0px 0px 20px 4px;
        }

        /* 关于页 */
        .version {
          color: black;
          background: rgba(250,250,250,0.8);
          margin-bottom: 0;
          padding-bottom: 4px;
          padding-top:8px;
        }
        .copyright {
          color: black;
          background: rgba(250,250,250,0.8);
          padding-bottom: 8px;
        }

        /* 合并转发页面 */
        .forward > #ml-root {
          background-color: rgb(255 255 255  / 50%)!important;
        }
        .forward .draggable-view__container .title {
          background-color: rgb(255 255 255  / 75%)!important;
        }

        
        /* 聊天记录页面 */
        .record {
          background-color: rgba(255,255,255,0.7)!important;
        }
        .record-msg-date {
          background-color: rgba(255,255,255,0.85)!important;
        }

        .record .msg-content-container {
          border-radius:8px!important;
          padding:0!important;
        }
        
        .record .message-content {
          padding-top: 8px!important;
          padding-left: 8px!important;
          padding-right:8px!important;
          padding-bottom:8px!important;
        }


        .group-notice .content {
          color: #3d3d3d!important;
        }

        .favorites-layout,
        .favorites-layout__content {
          background:unset!important;
        }

        .favorites-layout__left-area {
          background: rgba(255, 255, 255, 0.75)!important;
        }

        .favorites-layout__right-area {
          background: rgba(255,255,255,0.8)!important;
        }

        .viewport-list {
          background-image: unset!important;
        }

        .q-dialog-main {
          background: rgba(255,255,255,0.8)!important;
        }

        .q-dialog-main .selector {
          background: rgba(255,255,255,0)!important;
        }
        
        .q-dialog-main .msg-abstract {
          background: rgba(255,255,255,0.6)!important;
        }

        .q-dialog-main .selector .q-collapse-item__header {
          background: rgba(255,255,255,0.55)!important;
          backdrop-filter: brightness(80%) saturate(120%) blur(8px);
        }

        .q-dialog-main .selector .q-collapse-item__content .viewport-list__inner {
          background: rgba(255,255,255,0.4)!important;
        }

        .q-dialog-main .selector .list-item {
          background: rgba(255,255,255,0.4)!important;
          margin-bottom: 5px;
        }
        
        .q-dialog-main .selector .forward-view .selector-editor {
          background: rgba(255,255,255,0.6)!important;
        }
        
        .buddy-profile__info-uin {
          color: #fff;
          font-weight:900;
          backrgound: rgba(255,255,255,0.8)!important;
        }

        .contact-adder-btn,
        .q-input {
          background: rgba(230, 230, 230, 0.5)!important;
        }

        .q-pulldown-menu-button {
          background: rgba(230, 230, 230, 0.25)!important;
        }

        .tab {
          background: rgba(230, 230, 230, 0)!important;
        }
        
        .tab .radio-tab {
          background: rgba(230, 230, 230, 0.35)!important;
        }

        .tab .q-collapse-item__header,
        .tab .tab-header {
          background: rgba(230, 230, 230, 0)!important;
        }

        .tab .viewport-list__inner {
          background: rgba(230, 230, 230, 0)!important;
        }

        .sys-notify-list .viewport-list__inner {
          background: rgba(230, 230, 230, 0)!important;
        }

        .profile,
        .sys-notify {
          background: rgba(230, 230, 230, 0.75)!important;
        }

        .q-divider {
          background: rgba(230, 230, 230, 1)!important;
        }

        .resize-handler,
        .resize-handler > *{
          background: rgba(230, 230, 230, 0)!important;
        }

        .main-search {
          background: rgba(230, 230, 230, 0.5)!important;
        }
        
        .contact__top-area {
          background: rgba(230, 230, 230, 0)!important;
        }

        .contact {
          background: rgba(255, 255, 255, 0.75)!important;
        }

        .search-result {
          background: rgba(230, 230, 230, 0.92)!important;
        }

        .chat-header {
          background: rgba(255, 255, 255, 0.35)!important;
        }

        .message__timestamp,
        .gray-tip-content,
        .group-user__name.text-ellipsis,
        .user-name > span {
          color: #000!important;
          backrgound: rgba(255,255,255,0.8)!important;
        }

        #app > div.container {
          background: rgba(255,255,255,0.0)!important;
        }

        .member-role-tag {
          background: rgba(248, 248, 248,0.6)!important;
        }

        .av-call-status {
          background: rgba(255, 255, 255, 0.5)!important;
        }

        .tab-container{
          background-color: unset!important;
        }
  
        .reply-inline , .reply-element {
          color: grey!important;
        }
  
        .msg-content-container , .forward-msg{
          color: black!important;
          background-color: rgb(255 255 255 / 40%)!important;
        }
  
        .expression-panel,.expression-panel-inner, .sticker-panel {
          background: rgba(255, 255, 255, 0.9)!important;
          z-index:999!important;
        }

        #ml-root {
          z-index:0!important;
        }

        .v-scrollbar-track {
          z-index:999!important;
        }
        .v-scrollbar-thumb {
          z-index:999!important;
        }
        .self-avatar-mini-card{
          background: rgba(255,255,255,0.7)!important;
        }

        #app::before {
          content: "";
          width: 100%;
          height: 100%;
          position: fixed;
          background-image: var(--background-image-url)!important;
          background-size: cover!important;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          transition: background-image 1.5s ease-in-out;
          z-index: -1;
        }
  
        /* 列表条目圆角 */
        .viewport-list__inner {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 8px;
        }
  
        .list-item {
            border-radius: 16px;
        }
  
        .list-item:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
  
        .msg-content-container {
          backdrop-filter: brightness(120%) saturate(120%) blur(8px);
        }
  
        .q-dialog-main {
          background: rgba(255,255,255,0.8)!important;
        }
  
        .ark-view-message_not-support{
          background: rgba(255,255,255,0.2)!important;
        }
  
        .recent-contact .viewport-list__inner{
          background-color: rgb( 255 255 255  / 20%)!important;
        }
  
        .recent-contact{
          background-color: rgb(255 255 255  / 80%)!important;
        }
  
        .ad-wrapper{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .group-assistent-list__top{
          background-color: rgb(255 255 255  / 20%)!important;
        }
  
        .q-context-sub-menu__container , .q-context-menu{
          background: unset!important;
          background-color: rgb(255 255 255  / 85%)!important;
          color:black;
        }
        
        .q-context-menu-item__text {
          color:black;
        }

        .q-context-menu-item:hover {
          background-color: rgb(240 240 240 / 95%)!important;
        }

        .q-context-menu-item__icon .q-icon .path {
          color:black!important;
          stroke: black!important;
          fill: black!important;
        }

        .q-context-menu{
          border:1px solid rgba(230,230,230,0.6)!important;
        }
  
        .chat-msg-area{
          background-color: rgb(255 255 255  / 0%)!important;
        }
  
        .group-member{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .recent-contact .contact-top-bar{
          background-color: rgb(255 255 255  / 20%)!important;
        }
  
        .group-notice{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .msg-input{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .operation{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .chat-func-bar{
          background-color: rgb(255 255 255 / 40%)!important;
          padding-bottom: 8px!important;
        }
  
        .sidebar{
          background-color: rgb(255 255 255  / 50%)!important;
        }
  
        .aio{
          background-color: rgba(255,255,255,calc(0.5 + var(--background-image-transparent-offset)))!important;
        }

        .group-member-list > div.viewport-list > div.viewport-list__inner{
          background-color: rgb(255 255 255  / 0%)!important;
        }
      }
      `;
    stylee.innerHTML = sHtml;
    document.getElementsByTagName("head").item(0).appendChild(stylee);
  }
}
