"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "微信"
    };
  },
  onLoad() {
    console.log("index page load");
  },
  onShow() {
    console.log("index page load");
  },
  onPullDownRefresh() {
    console.log("页面下拉刷新记录");
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86136/Desktop/学科实践/作业2-多端运行项目/class3/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
