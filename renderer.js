export async function onConfigView(view) {
    var nowConfig = await window.background_plugin.getNowConfig();
    var nowImgDir = nowConfig.imgDir;
    let isAutoRefresh =
        nowConfig.isAutoRefresh == null || nowConfig.isAutoRefresh === true;
    const new_navbar_item = `
    <body>
      <div class="config_view">
        <section class="path">
          <h1>背景图设置</h1>
          <div class="wrap">
            <div class="vertical-list-item top-box">
              <h2>修改背景图来源</h2>
              <div>
                <button id="refreshBgNow" class="q-button q-button--small q-button--secondary">立即更新一次背景图</button>
                <button id="selectImageDirBtn" class="q-button q-button--small q-button--secondary">选择目录</button>
                <button id="selectImageFileBtn" class="q-button q-button--small q-button--secondary">选择单个文件</button>
              </div>
            </div>
            <hr class="horizontal-dividing-line" />
            <div class="vertical-list-item">
              <text>当前背景图来源：<span id="imgSourceType">${
                  nowConfig.imgSource == "folder" || nowConfig.imgSource == null
                      ? "目录"
                      : "单个文件"
              }</span></text>
            </div>
            <hr class="horizontal-dividing-line" />
            <div class="vertical-list-item bottom-box">
              <input id="selectImageDir" class="path-input text_color" type="text" spellcheck="false" readonly="true" value="${nowImgDir}">
            </div>
          </div>
        </section>

        <section class="path">
          <h1>更新设置</h1>
          <div class="wrap">

            <div class="list">

              <div class="vertical-list-item">
                <div>
                  <h2>背景图更新间隔</h2>
                  <span class="secondary-text">修改将自动保存并立即生效；为了最佳体验，请勿设置过短哦~</span>
                </div>
                <div style="width:80px;" style="width: 75px; pointer-events: auto;">
                  <input id="refreshTimeInput" min="1" max="999" maxlength="3" class="text_color path-input" style="width:45px;" type="number" value="${
                      nowConfig.refreshTime
                  }"/>秒
                </div>
              </div>

              <hr class="horizontal-dividing-line" />          

              <div class="vertical-list-item">
                <div>
                  <h2>是否自动轮播背景图</h2>
                  <span class="secondary-text">修改将自动保存并立即生效</span>
                </div>
                <div id="switchAutoRoll" class="q-switch">
                  <span class="q-switch__handle"></span>
                </div>
              </div>

            </div>

          </div>
        </section>


        <style>
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

    var selectDir = async () => {
        var path = await window.background_plugin.showFolderSelect();
        alert("成功修改路径为目录：" + path);
        var realPath = path[0].replaceAll("\\", "/");
        node2.querySelector("#imgSourceType").innerText = "目录";
        node2.querySelector("#selectImageDir").value = realPath;

        await window.background_plugin.reloadBg();
    };

    var selectFile = async () => {
        var path = await window.background_plugin.showFileSelect();
        alert("成功修改路径为单个文件：" + path);
        var realPath = path[0].replaceAll("\\", "/");
        node2.querySelector("#imgSourceType").innerText = "单个文件";
        node2.querySelector("#selectImageDir").value = realPath;

        await window.background_plugin.reloadBg();
    };

    var refreshBg = async () => {
        await window.background_plugin.reloadBg();
    };

    node2.querySelector("#refreshBgNow").onclick = refreshBg;
    node2.querySelector("#selectImageDirBtn").onclick = selectDir;
    node2.querySelector("#selectImageFileBtn").onclick = selectFile;

    var q_switch = node2.querySelector("#switchAutoRoll");

    if (isAutoRefresh) {
        q_switch.classList.toggle("is-active");
    }

    q_switch.addEventListener("click", async () => {
        if (q_switch.classList.contains("is-active")) {
            //取消
            window.background_plugin.setAutoRefresh(false);
        } else {
            //重新设置
            window.background_plugin.setAutoRefresh(true);
        }
        q_switch.classList.toggle("is-active");
    });

    node2.querySelector("#refreshTimeInput").onblur = async () => {
        var time = parseFloat(node2.querySelector("#refreshTimeInput").value);
        if (time <= 0) {
            alert("你的时间设置有误！将不会保存，请重新输入");
            return;
        }

        await window.background_plugin.changeRefreshTime(time);
    };

    view.appendChild(node2);
}
export function onLoad() {
    console.log("[Background]", "开始检测页面路径", new Date());

    var isMainPage = false;

    var bgUpdateTimer = null;

    const interval3 = setInterval(async () => {
        console.log(window.location.href);
        if (
            window.location.href.indexOf("#/main/message") != -1 ||
            window.location.href.indexOf("#/chat/") != -1
        ) {
            //如果之前已经进过这里，说明是重复进入，直接清除计时器退出即可
            if (isMainPage) {
                clearInterval(interval3);
                return;
            }
            isMainPage = true;
            console.log(
                "[Background]",
                "检测到主页页面或聊天页面，注入背景更新函数",
                new Date()
            );

            //监听任何可能的重载背景的请求
            await window.background_plugin.reloadBgListener(
                async (event, message) => {
                    reloadBg(await window.background_plugin.randomSelect());
                }
            );

            //监听任何可能的重载计时器的请求
            await window.background_plugin.resetTimerListener(
                async (event, message) => {
                    await resetTimer();
                }
            );

            reloadBg(await window.background_plugin.randomSelect());
            patchCss();

            await resetTimer();

            clearInterval(interval3);
        } else if (window.location.href.indexOf("#/blank") == -1) {
            console.log(
                "[Background]",
                "非主页或聊天页面，停止注入",
                new Date()
            );
            clearInterval(interval3);
        }
    }, 100);

    var resetTimerFlag = false;
    async function resetTimer() {
        //防并发
        if (resetTimerFlag) return;
        resetTimerFlag = true;

        if (bgUpdateTimer != null) {
            clearInterval(bgUpdateTimer);
        }
        var nowConfig = await window.background_plugin.getNowConfig();

        let isAutoRefresh =
            nowConfig.isAutoRefresh == null || nowConfig.isAutoRefresh === true;

        if (isAutoRefresh) {
            console.log(
                "[Background]",
                `当前背景更新间隔：${nowConfig.refreshTime}秒`,
                new Date()
            );
            bgUpdateTimer = setInterval(async () => {
                console.log("[Background]", "更新背景", new Date());
                reloadBg(await window.background_plugin.randomSelect());
            }, nowConfig.refreshTime * 1000);
        } else {
            console.log(
                "[Background]",
                "用户设置了不自动更新，仅更新一次",
                new Date()
            );
        }

        resetTimerFlag = false;
    }

    function reloadBg(imgUrl) {
        const element = document.createElement("style");
        document.head.appendChild(element);

        document.documentElement.style.setProperty(
            "--background-image-url",
            `url("appimg://${imgUrl}")`
        );
    }

    function patchCss() {
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
      @media (prefers-color-scheme: dark) {
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
          background: rgba(80, 80, 80, 0.15)!important;
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
          background: rgba(30, 30, 30, 0.85)!important;
        }

        .chat-header {
          background: rgba(0, 0, 0, 0.2)!important;
        }

        .message__timestamp,
        .gray-tip-content,
        .group-user__name.text-ellipsis,
        .user-name > span {
          color: #fff;
          mix-blend-mode: difference;
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

        .chat-msg-area__vlist{
          z-index:unset!important;
        }

        .sticker-panel {
          background: rgba(0, 0, 0, 0.9)!important;
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

        /* 添加模糊 */
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
        .chat-input-area {
          backdrop-filter: brightness(110%) saturate(120%) blur(8px);
        }

        .viewport-list__inner{
          background-color: rgb( 0 0 0  / 70%)!important;
        }

        .recent-contact{
          background-color: rgb(0 0 0  / 10%)!important;
        }

        .ad-wrapper{
          background-color: rgb(0 0 0  / 40%)!important;
        }

        .group-assistent-list__top{
          background-color: rgb(0 0 0  / 70%)!important;
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
          background-color: rgb(0 0 0  / 70%)!important;
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
          background-color: rgb(0 0 0  / 80%)!important;
        }

        .aio{
          background-color: rgb(0 0 0  / 70%)!important;
        }
        .group-member-list > div.viewport-list > div.viewport-list__inner{
          background-color: rgb(0 0 0 / 0%)!important;
        }
      }

      @media (prefers-color-scheme: light) {
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
          mix-blend-mode: difference;
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

        .q-divider,
        .resize-handler,
        .resize-handler > *{
          background: rgba(230, 230, 230, 0.15)!important;
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
          background: rgba(230, 230, 230, 0.75)!important;
        }

        .chat-header {
          background: rgba(255, 255, 255, 0.35)!important;
        }

        .message__timestamp,
        .gray-tip-content,
        .group-user__name.text-ellipsis,
        .user-name > span {
          color: #fff;
          mix-blend-mode: difference;
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
        
        .chat-msg-area__vlist{
          z-index:unset!important;
        }
  
        .sticker-panel {
          background: rgba(255, 255, 255, 0.9)!important;
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

        /* 添加模糊 */
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
        .chat-input-area {
          backdrop-filter: brightness(90%) saturate(120%) blur(8px);
        }
  
        .q-dialog-main {
          background: rgba(255,255,255,0.8)!important;
        }
  
        .ark-view-message_not-support{
          background: rgba(255,255,255,0.2)!important;
        }
  
        .viewport-list__inner{
          background-color: rgb( 255 255 255  / 70%)!important;
        }
  
        .recent-contact{
          background-color: rgb(255 255 255  / 20%)!important;
        }
  
        .ad-wrapper{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .group-assistent-list__top{
          background-color: rgb(255 255 255  / 70%)!important;
        }
  
        .q-context-sub-menu__container , .q-context-menu{
          background: unset!important;
          background-color: rgb(255 255 255  / 85%)!important;
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
          background-color: rgb(255 255 255  / 70%)!important;
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
          background-color: rgb(255 255 255  / 80%)!important;
        }
  
        .aio{
          background-color: rgb(255 255 255  / 50%)!important;
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
