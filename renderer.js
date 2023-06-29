export async function onConfigView(view) {
    var nowConfig = await window.background_plugin.getNowConfig();
    var nowImgDir = nowConfig.imgDir;
    let tmpIndex = nowImgDir.lastIndexOf("/");
    let nowDirName = nowImgDir.substr(tmpIndex + 1);
    const new_navbar_item = `
  <div class="q-scroll-view scroll-view--show-scrollbar" data-v-c15b275e="" style="display: block;">
  <div class="common-tab" data-v-dd43c29c="" data-v-c15b275e="">
    <div class="setting-item-title" data-v-526bdad1="" data-v-6c241f5a="">背景图</div>
    <div class="chat-page" data-v-6c241f5a="">
      <div class="chat-page__send-msg" data-v-6c241f5a="">
        <span class="label" data-v-6c241f5a="">背景图片文件夹</span>
        <div class="q-pulldown-menu small-size pulldown-menu" aria-disabled="false" data-v-6c241f5a="" style="width: 150px; pointer-events: auto;">
          <div class="q-pulldown-menu-button">
            <!---->
            <input style="cursor:pointer;" id="selectImageDir" type="text" class="content" spellcheck="false" readonly="" placeholder="请选择图片文件夹" value="${nowDirName}" aria-controls="qContextMenu" aria-expanded="false" aria-haspopup="menu" aria-owns="qContextMenu" role="combobox">
            <span id="selectImageDirBtn" style="top:0!important;cursor:pointer;" class="icon">
              <i class="q-icon" data-v-f2a2e0a3="" style="--64bccad3: inherit; --3111caac:16px;">
                <svg t="1686929070383" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2418" width="200" height="200">
                  <defs>
                  <style><![CDATA[
                    @media (prefers-color-scheme: light) {
                    .path {
                      stroke: black;
                      fill: black;
                      }
                    }
                    @media (prefers-color-scheme: dark) {
                      .path {
                        stroke: grey;
                        fill: grey;
                      }
                    }
                  ]]></style>
                </defs>
                  <path class="path" d="M850.3296 374.9888v-45.2096c0-47.4624-38.4-100.5568-89.2416-100.5568h-224.8704l-6.7584-12.4416a62.976 62.976 0 0 0-56.32-33.8944H226.6624A84.6336 84.6336 0 0 0 143.0528 268.8v467.7632a84.6336 84.6336 0 0 0 83.6096 85.8624h578.56a84.6336 84.6336 0 0 0 83.6096-85.8624V449.5872c0-27.136-14.6944-54.2208-38.4-74.5472z m-64.4096-22.5792h-184.32l-30.72-58.7776h190.976c10.24 0 24.8832 19.2 24.8832 36.1472v22.5792z m38.4 96v286.976a21.0944 21.0944 0 0 1-19.2 21.4528h-578.56a20.48 20.48 0 0 1-19.2-21.4528V267.6736a21.0944 21.0944 0 0 1 19.2-21.4528h245.248l81.3568 153.6a33.28 33.28 0 0 0 28.2624 16.9472h209.92c12.4928 0.0512 32.9728 20.3776 32.9728 31.6416z" p-id="2419">
                  </path>
                </svg>
              </i>
            </span>
          </div>
          <!---->
        </div>
      </div>
    </div>
    <style>
      @media (prefers-color-scheme: light) {
        .text_color {
          color:black;
        }
      }
      @media (prefers-color-scheme: dark) {
        .text_color {
          color:white;
        }
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
      
      </style>
    <div class="setting-item-title" data-v-526bdad1="" data-v-dfbdec9c="">更新时间</div>
    <div class="panel-main" data-v-dfbdec9c="">
      <div data-v-dfbdec9c="">
        <span class="label" data-v-6c241f5a="">请输入背景图更新时间（秒）</span>
        <div class="tips" data-v-dfbdec9c="">修改会自动保存，重启NTQQ生效</div>
      </div>
      <div style="width:80px;" class="q-pulldown-menu small-size pulldown-menu" aria-disabled="false" data-v-6c241f5a="" style="width: 150px; pointer-events: auto;">
        <div style="width:80px;" class="q-pulldown-menu-button">
          <input id="refreshTimeInput" min="1" max="999" maxlength="3" class="text_color path-input" style="width:80px;" type="number" placeholder="单位：秒" value="${nowConfig.refreshTime}"/>
        </div>
      </div>
    </div>
    <!--<div class="ops" data-v-7fb79317="">
      <div class="ops-btns" data-v-7fb79317="">
        <button class="q-button q-button--secondary q-button--small" aria-disabled="false" aria-busy="false" data-v-7fb79317="">
          <span class="q-button__slot-warp">应用</span>
        </button>
      </div>
    </div>-->
  </div>
  <div class="loadmore-placeholder" style="display: none;">
  </div>
</div>
  `;
    const parser = new DOMParser();

    const doc2 = parser.parseFromString(new_navbar_item, "text/html");
    const node2 = doc2.querySelector("body > div");

    var selectDir = async () => {
        var path = await window.background_plugin.showFolderSelect();
        alert("成功修改路径为：" + path);
        var realPath = path[0].replaceAll("\\", "/");
        let index = realPath.lastIndexOf("/");
        let dirName = realPath.substr(index + 1);
        node2.querySelector("#selectImageDir").value = dirName;
    };

    node2.querySelector("#selectImageDir").onclick = selectDir;
    node2.querySelector("#selectImageDirBtn").onclick = selectDir;

    node2.querySelector("#refreshTimeInput").onblur = async () => {
        await window.background_plugin.changeRefreshTime(
            parseInt(node2.querySelector("#refreshTimeInput").value)
        );
    };

    view.appendChild(node2);
}
export function onLoad() {
    console.log("[Background]", "开始检测页面路径", new Date());

    var isMainPage = false;

    const interval3 = setInterval(async () => {
        console.log(window.location.href);
        if (window.location.href.indexOf("#/main/message") != -1 || window.location.href.indexOf("#/chat/") != -1) {
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

            reloadBg(await window.background_plugin.randomSelect());
            patchCss();

            setInterval(async () => {
                console.log("[Background]", "更新背景", new Date());
                reloadBg(await window.background_plugin.randomSelect());
            }, (await window.background_plugin.getRefreshTime()) * 1000);

            clearInterval(interval3);
        } else if (window.location.href.indexOf("#/blank") == -1) {
            console.log("[Background]", "非主页或聊天页面，停止注入", new Date());
            clearInterval(interval3);
        }
    }, 100);

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
        .search-result {
          background: rgba(30, 30, 30, 0.85)!important;
        }

        .chat-header {
          background: rgba(0, 0, 0, 0.2)!important;
        }

        .group-user__name.text-ellipsis,
        .user-name > span {
          color: #fff!important;
          mix-blend-mode: difference!important;
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

        /* 添加模糊 */
        .search-result,
        .av-call-status,
        .self-avatar-mini-card,
        .sidebar,
        .msg-content-container,
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
          background-color: rgb(0 0 0  / 90%)!important;
        }

        .chat-msg-area{
          background-color: rgb(0 0 0  / 0%)!important;
        }

        .group-member{
          background-color: rgb(0 0 0  / 40%)!important;
        }

        .contact-top-bar{
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
          background-color: rgb(0 0 0  / 60%)!important;
        }

        .aio{
          background-color: rgb(0 0 0  / 70%)!important;
        }
        .group-member-list > div.viewport-list > div.viewport-list__inner{
          background-color: rgb(0 0 0 / 0%)!important;
        }
      }

      @media (prefers-color-scheme: light) {
        .search-result {
          background: rgba(230, 230, 230, 0.85)!important;
        }

        .chat-header {
          background: rgba(255, 255, 255, 0.35)!important;
        }

        .group-user__name.text-ellipsis,
        .user-name > span {
          color: #fff!important;
          mix-blend-mode: difference!important;
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
  
        /* 添加模糊 */
        .search-result,
        .av-call-status,
        .self-avatar-mini-card,
        .sidebar,
        .msg-content-container,
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
          background-color: rgb(255 255 255  / 90%)!important;
        }
  
        .chat-msg-area{
          background-color: rgb(255 255 255  / 0%)!important;
        }
  
        .group-member{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .contact-top-bar{
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
          background-color: rgb(255 255 255  / 60%)!important;
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
