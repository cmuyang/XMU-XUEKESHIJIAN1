<template>  
  <view class="container">  
    <view class="label">开始时间：</view>  
    <input v-model="startTime" type="datetime" class="input"/>  
    <view class="label">结束时间：</view>  
    <input v-model="endTime" type="datetime" class="input"/>  
    <view class="label">时间差：{{ timeDifference }}</view>  
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      startTime: '',  
      endTime: '',  
      timeDifference: ''  
    }  
  },  
  watch: {  
    startTime(newVal) {  
      this.calculateTimeDifference();  
    },  
    endTime(newVal) {  
      this.calculateTimeDifference();  
    }  
  },  
  methods: {  
    calculateTimeDifference() {  
      const time1 = new Date(this.startTime);  
      const time2 = new Date(this.endTime);  
      const difference = Math.abs(time2 - time1); // 计算差值，使用Math.abs确保得到正数  
      this.timeDifference = difference; // 更新时间差值  
    }  
  }  
}  
</script>  
  
<style scoped>  
.container {  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
}  
  
.label {  
  font-weight: bold;  
  margin-bottom: 10px;  
}  
  
.input {  
  padding: 5px;  
  border: 1px solid #ccc;  
  border-radius: 5px;  
}  
</style>