<template>  
  <view>  
  计算时间差（单位：s）
    <time-calculator :startTime="startDate" :endTime="endDate" @update="updateTime"></time-calculator>  
  </view>  
</template>  
  
<script>  
import TimeCalculator from '@/component/new_file.vue'; // 引入组件文件路径，根据实际情况修改  
  
export default {  
  components: { TimeCalculator }, // 注册组件  
  data() {  
    return {  
      startDate: '', // 从父组件传递的值，可以根据实际情况修改名称和类型  
      endDate: '' // 从父组件传递的值，可以根据实际情况修改名称和类型  
    }  
  },  
  methods: {  
    updateTime(difference) { // 处理子组件触发的事件，可以根据实际情况修改名称和参数列表  
      console.log('时间差：', difference); // 在控制台打印时间差，可以根据实际情况修改代码逻辑和行为  
    }  
  }  
}  
</script>