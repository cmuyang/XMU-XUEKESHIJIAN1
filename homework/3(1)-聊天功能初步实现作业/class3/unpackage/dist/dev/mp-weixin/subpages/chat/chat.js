"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      light: true,
      chatList: [
        {
          isMe: false,
          type: "txt",
          content: "你好，我是小姐姐"
        },
        {
          isMe: false,
          type: "img",
          content: "/static/img/shasha.png"
        },
        {
          isMe: true,
          type: "txt",
          content: '\n#1.单击小姐姐图像可以快速发送拍一拍  \n #2.给小姐姐发送信息可以得到她的快速回复“嗯嗯"\n#3.添加表情包选项，暂时可选择表情图片发送，有待完善”'
        },
        {
          isMe: true,
          type: "img",
          content: "/static/img/back.png"
        }
      ],
      myIput: "",
      pat: ""
    };
  },
  onShow() {
    if (!!common_vendor.index.getStorageSync("chatList")) {
      this.chatList = JSON.parse(getStorageSync("chatList"));
    }
    if (!!common_vendor.index.getStorageSync("pat")) {
      this.pat = JSON.parse(getStorageSync("pat"));
    }
  },
  methods: {
    sendMsg() {
      if (!this.myInput)
        return;
      let txtMsg = {
        isMe: true,
        type: "txt",
        content: this.myInput
      };
      this.chatList.push(txtMsg);
      this.myInput = " ";
      common_vendor.index.setStorageSync("chatList", JSON.stringify(this.chatList));
      let txtMsg2 = {
        isMe: false,
        type: "txt",
        content: "嗯嗯"
      };
      this.chatList.push(txtMsg2);
      common_vendor.index.setStorageSync("chatList", JSON.stringify(this.chatList));
      setTimeout(() => {
        common_vendor.index.pageScrollTo({
          scrollTop: 999999,
          duration: 0
        });
      });
    },
    answer() {
      let txtMsg2 = {
        isMe: false,
        type: "txt",
        content: "嗯嗯"
      };
      this.chatList.push(txtMsg2);
      common_vendor.index.setStorageSync("chatList", JSON.stringify(this.chatList));
      setTimeout(() => {
        common_vendor.index.pageScrollTo({
          scrollTop: 999999,
          duration: 0
        });
      });
    },
    chooseImgAndSend() {
      setTimeout(() => {
        common_vendor.index.pageScrollTo({
          scrollTop: 99999,
          duration: 0
        });
      });
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["orginial", "compress"],
        sourceType: ["album", "camera"],
        success: (res) => {
          console.log(res.tempFilePaths[0]);
          var i;
          for (i = 0; i < 1; i++) {
            let sendMsg = {
              isMe: true,
              type: "img",
              content: res.tempFilePaths[i]
            };
            this.chatList.push(sendMsg);
          }
        }
      });
      common_vendor.index.setStorageSync("chatList", JSON.stringify(this.chatList));
      setTimeout(() => {
        common_vendor.index.pageScrollTo({
          scrollTop: 99999,
          duration: 0
        });
      });
    },
    patpat() {
      let txtMsg = {
        isMe: true,
        type: "txt",
        content: "拍拍你"
      };
      this.chatList.push(txtMsg);
      common_vendor.index.setStorageSync("chatList", JSON.stringify(this.chatList));
      let txtMsg2 = {
        isMe: false,
        type: "txt",
        content: "嗯嗯"
      };
      this.chatList.push(txtMsg2);
      common_vendor.index.setStorageSync("chatList", JSON.stringify(this.chatList));
      setTimeout(() => {
        common_vendor.index.pageScrollTo({
          scrollTop: 999999,
          duration: 0
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.chatList, (item, index, i0) => {
      return common_vendor.e({
        a: !item.isMe
      }, !item.isMe ? common_vendor.e({
        b: common_vendor.o(($event) => $options.patpat(), index),
        c: item.type === "txt"
      }, item.type === "txt" ? {
        d: common_vendor.t(item.content)
      } : {}, {
        e: item.type === "img"
      }, item.type === "img" ? {
        f: item.content
      } : {}) : common_vendor.e({
        g: item.type === "txt"
      }, item.type === "txt" ? {
        h: common_vendor.t(item.content)
      } : {}, {
        i: item.type === "img"
      }, item.type === "img" ? {
        j: item.content
      } : {}), {
        k: index
      });
    }),
    b: _ctx.myInput,
    c: common_vendor.o(($event) => _ctx.myInput = $event.detail.value),
    d: common_vendor.o((...args) => $options.chooseImgAndSend && $options.chooseImgAndSend(...args)),
    e: common_vendor.o(($event) => ($options.chooseImgAndSend(), $options.answer())),
    f: common_vendor.o((...args) => $options.sendMsg && $options.sendMsg(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a91d9e27"], ["__file", "C:/Users/86136/Desktop/学科实践/作业2-多端运行项目/class3/subpages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
