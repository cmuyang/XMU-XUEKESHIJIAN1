"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }, 2e3);
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86136/Desktop/学科实践/作业2-多端运行项目/class3/pages/error/404.vue"]]);
wx.createPage(MiniProgramPage);
