export function onLoad() {
  const new_navbar_item = `
    <div class="nav-item" data-v-53503cce="">
	<i class="q-icon icon icon_color" data-v-f2a2e0a3="" data-v-53503cce="" style="--64bccad3: inherit; --3111caac:16px;">
		<svg t="1685888727779" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3380" width="200" height="200">
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
          stroke: white;
          fill: white;
         }
      }
    ]]></style>
  </defs>
    <path class="path" d="M841.71335 65.290005 182.285626 65.290005c-64.511269 0-116.995621 52.484352-116.995621 116.995621L65.290005 841.71335c0 64.511269 52.484352 116.995621 116.995621 116.995621l659.427724 0c64.511269 0 116.995621-52.484352 116.995621-116.995621L958.708971 182.285626C958.708971 117.774357 906.225643 65.290005 841.71335 65.290005zM182.285626 107.833961l659.427724 0c41.051975 0 74.451666 33.398668 74.451666 74.451666l0 136.557142c-150.09446 5.26184-290.370297 66.084091-396.978337 172.692131-49.960879 49.961902-89.841168 107.331517-118.694309 169.625282-83.496669-70.835302-204.372667-75.376735-292.65841-13.617136L107.833961 182.285626C107.833961 141.232628 141.232628 107.833961 182.285626 107.833961zM107.833961 841.71335 107.833961 702.627618c76.54228-74.311473 198.833511-74.234725 275.272437 0.24457-24.303522 65.298192-37.026288 135.112234-37.026288 206.91149 0 2.223644 0.343831 4.366448 0.977257 6.381337L182.285626 916.165016C141.232628 916.165016 107.833961 882.766348 107.833961 841.71335zM841.71335 916.165016 387.646807 916.165016c0.633427-2.01489 0.977257-4.157693 0.977257-6.381337 0-146.71755 57.053414-284.572244 160.647817-388.166647 98.570993-98.570993 228.166583-154.963351 366.894158-160.204725L916.166039 841.71335C916.165016 882.766348 882.766348 916.165016 841.71335 916.165016z" fill="#fff" p-id="3381"></path>
    <path class="path" d="M312.397986 413.458683c60.8376 0 110.332874-49.494251 110.332874-110.332874s-49.494251-110.332874-110.332874-110.332874-110.332874 49.494251-110.332874 110.332874S251.559363 413.458683 312.397986 413.458683zM312.397986 235.337913c37.378306 0 67.788919 30.40959 67.788919 67.788919s-30.40959 67.788919-67.788919 67.788919-67.788919-30.40959-67.788919-67.788919S275.018657 235.337913 312.397986 235.337913z" fill="#fff" p-id="3382"></path>
    </svg>
	</i>
	<div class="name" data-v-53503cce="">背景设置</div>
	<!--v-if-->
    </div>
    `;

  // 解析HTML
  const parser = new DOMParser();

  const doc2 = parser.parseFromString(new_navbar_item, "text/html");
  const node2 = doc2.querySelector("body > div");

  node2.addEventListener("click", async () => {
    var path = await window.background_plugin.showFolderSelect();
    alert("成功修改路径为：" + path);
  });

  console.log("[Background]", "开始检测页面路径", new Date());
  //是设置页面，注入设置菜单
  const interval2 = setInterval(() => {
    console.log(window.location.href);
    if (window.location.href.indexOf("#/setting/settings/common") != -1) {
      console.log("[Background]", "检测到设置页面，注入设置菜单", new Date());
      var nodes = document.querySelector(".nav-bar");

      if (nodes) {
        clearInterval(interval2);
      }
      // 插入
      nodes.appendChild(node2);
    } else if (window.location.href.indexOf("#/blank") == -1) {
      console.log("[Background]", "非设置页面，停止注入", new Date());
      clearInterval(interval2);
    }
  }, 100);

  const interval3 = setInterval(async () => {
    console.log(window.location.href);
    if (window.location.href.indexOf("#/main/message") != -1) {
      console.log(
        "[Background]",
        "检测到主页页面，注入背景更新函数",
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
      console.log("[Background]", "非主页，停止注入", new Date());
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
        .tab-container{
          background-color: unset!important;
        }

        .msg-content-container , .forward-msg{
          background-color: rgb(0 0 0 / 30%)!important;
        }

        .chat-msg-area__vlist{
          z-index:unset!important;
        }

        .sticker-panel {
          background: rgba(0, 0, 0, 0.7)!important;
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
          background-color: rgb(0 0 0  / 60%)!important;
        }

        .q-context-sub-menu__container , .q-context-menu{
          background: unset!important;
          background-color: rgb(0 0 0  / 80%)!important;
        }

        .chat-msg-area{
          background-color: rgb(0 0 0  / 30%)!important;
        }

        .group-member{
          background-color: rgb(0 0 0  / 70%)!important;
        }

        .contact-top-bar{
          background-color: rgb(0 0 0  / 60%)!important;
        }

        .group-notice{
          background-color: rgb(0 0 0  / 60%)!important;
        }

        .msg-input{
          background-color: rgb(0 0 0  / 60%)!important;
        }

        .operation{
          background-color: rgb(0 0 0  / 60%)!important;
        }

        .chat-func-bar{
          background-color: rgb(0 0 0 / 60%)!important;
          padding-bottom: 8px!important;
        }

        .sidebar{
          background-color: rgb(0 0 0  / 60%)!important;
        }

        .aio{
          background-color: rgb(0 0 0  / 70%)!important;
        }
      }

      @media (prefers-color-scheme: light) {
        .tab-container{
          background-color: unset!important;
        }
  
        .reply-inline , .reply-element {
          color: grey!important;
        }
  
        .msg-content-container , .forward-msg{
          color: black!important;
          background-color: rgb(255 255 255 / 30%)!important;
        }
        
        .chat-msg-area__vlist{
          z-index:unset!important;
        }
  
        .sticker-panel {
          background: rgba(255, 255, 255, 0.7)!important;
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
  
  
  
        .viewport-list__inner{
          background-color: rgb( 255 255 255  / 70%)!important;
        }
  
        .recent-contact{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .ad-wrapper{
          background-color: rgb(255 255 255  / 40%)!important;
        }
  
        .group-assistent-list__top{
          background-color: rgb(255 255 255  / 60%)!important;
        }
  
        .q-context-sub-menu__container , .q-context-menu{
          background: unset!important;
          background-color: rgb(255 255 255  / 80%)!important;
        }
  
        .chat-msg-area{
          background-color: rgb(255 255 255  / 50%)!important;
        }
  
        .group-member{
          background-color: rgb(255 255 255  / 70%)!important;
        }
  
        .contact-top-bar{
          background-color: rgb(255 255 255  / 60%)!important;
        }
  
        .group-notice{
          background-color: rgb(255 255 255  / 60%)!important;
        }
  
        .msg-input{
          background-color: rgb(255 255 255  / 60%)!important;
        }
  
        .operation{
          background-color: rgb(255 255 255  / 60%)!important;
        }
  
        .chat-func-bar{
          background-color: rgb(255 255 255 / 60%)!important;
          padding-bottom: 8px!important;
        }
  
        .sidebar{
          background-color: rgb(255 255 255  / 60%)!important;
        }
  
        .aio{
          background-color: rgb(255 255 255  / 70%)!important;
        }
      }
      `;
    stylee.innerHTML = sHtml;
    document.getElementsByTagName("head").item(0).appendChild(stylee);
  }
}
