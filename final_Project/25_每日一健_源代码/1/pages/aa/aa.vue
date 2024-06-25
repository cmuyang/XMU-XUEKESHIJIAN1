<template>  
  <view >  
  
    <unicloud-db ref="udb" where="state==true ||user_id._id == $cloudEnv_uid" v-slot:default="{data, loading, error, options}" collection="guestbook,uni-id-users" field="_id,text,state,user_id.nickname,user_id.avatar_file,user_id._id">  
      <view v-if="error">{{error.message}}</view>  
      <view v-else>  
        <uni-list>  
            <uni-list-item v-for="item in data" :key="item._id" :title="item.user_id.nickname " :note="item.text+(item.state?'':'--审核中')"></uni-list-item>              </uni-list> 
     
	  </view>  
    </unicloud-db>  
    <!-- 输入框 -->  
    <view class="fixed-box" style="margin-top: 20px;">  
      <input type="text" v-model="newText" placeholder="请输入新条目的文本" class="input">  
      <button type="primary" @click="add" class="button">添加</button>  
    </view>  
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      newText: '' // 新条目的文本  
    }  
  },  
  methods: {  
    add() {  
      const db = uniCloud.database();  
      const guestbookTable = db.collection('guestbook');  
      if (this.newText.trim()) {  
        guestbookTable.add({  
          "text": this.newText,  
          // "state": false,  
          // "user_id": ""  
        });  
        this.newText = ''; // 清空输入框  
      } else {  
        console.log("请输入内容");  
        // 或者显示一个提示  
      }  
    }  
  }  
}  
</script>  
  
<style>  
.container {  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  padding: 20px;  
}  
  
.item {  
  display: flex;  
  align-items: center;  
  margin-bottom: 10px;  
}  
  
.main {  
  flex: 1;  
}  
  
cloud-image {  
  width: 500px;  
  height: 50px;  
}  
  
.nickname {  
  font-size: 14px;  
  font-weight: bold;  
}  
  
.fixed-box {  
    position: fixed;  
    bottom: 0;  
    left: 0;  
    width: 100%;  
    background-color: rgba(255, 255, 255, 0.8);  
    padding: 10px;  
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.1);  
  }  
</style>