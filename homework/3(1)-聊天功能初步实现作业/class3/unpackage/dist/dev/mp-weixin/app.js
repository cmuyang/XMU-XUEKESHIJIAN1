"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/error/404.js";
  "./pages/found/found.js";
  "./pages/txl/txl.js";
  "./pages/mine/mine.js";
  "./subpages/news/news.js";
  "./subpages/chat/chat.js";
  "./subpages/chat2/chat2.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  onPageNotFound() {
    common_vendor.index.navigateTo({
      url: "/pages/error/404"
    });
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/86136/Desktop/学科实践/作业2-多端运行项目/class3/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
