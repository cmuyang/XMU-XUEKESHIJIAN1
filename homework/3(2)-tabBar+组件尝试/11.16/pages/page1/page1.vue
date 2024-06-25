<template>
  <view class="container">
    <view class="section">
      <icon :type="value" size="26"/>
      <text>{{ value }}</text>
      <rich-text>
        <text>这是一段富文本内容，可以包含格式化的文本、列表、标题等。</text>
      </rich-text>
      <progress :percentage="50" class="progress"></progress>
    </view>
    <form @submit="handleSubmit">
      <view class="section">
        <label for="name">姓名:</label>
        <input id="name" type="text" v-model="formData.name" class="input"></input>
      </view>
      <view class="section">
        <label for="age">年龄:</label>
        <input id="age" type="number" v-model="formData.age" class="input"></input>
      </view>
      <view class="section">
        <label for="gender">性别:</label>
        <radio-group v-model="formData.gender">
          <radio value="男">男</radio>
          <radio value="女">女</radio>
        </radio-group>
      </view>
      <view class="section">
        <label for="email">邮箱:</label>
        <input id="email" type="email" v-model="formData.email" class="input"></input>
      </view>
      <view class="section">
        <label for="phone">电话:</label>
        <input id="phone" type="tel" v-model="formData.phone" class="input"></input>
      </view>

      <!-- 添加 picker-view 组件 -->
      <view class="container">
		  选择日期：
          <picker-view @change="handlePickerChange">
            <picker-view-column>
              <view v-for="year in years" :key="year">{{ year }}</view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="month in months" :key="month">{{ month }}</view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="day in days" :key="day">{{ day }}</view>
            </picker-view-column>
          </picker-view>
      
          <view>
            <text>选择的日期: {{ selectedDate }}</text>
          </view>
        </view>
		<view class="uni-title">显示当前value</view>
		<view>
			<slider value="50" @change="sliderChange" show-value />
		</view>
      <view class="uni-list">去过的国家
        <checkbox-group>
          <label class="uni-list-cell" v-for="item in items" :key="item.value">
            <checkbox :value="item.value" :checked="item.checked">{{ item.name }}</checkbox>
          </label>
        </checkbox-group>
      </view>
      <!-- 本示例未包含完整 css，获取外链 css 请参考上文，在 hello uni-app 项目中查看 -->
      <view class="section">
        <button type="primary" @click="handleSubmit" class="button">提交</button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
		  years: ["2021", "2022", "2023"],
		      months: Array.from({ length: 12 }, (_, i) => String(i + 1)),
		      days: Array.from({ length: 31 }, (_, i) => String(i + 1)),
		      selectedDate: "",
		      pickerValue: [0, 0, 0], // 初始选择的年、月、日
      value: 'form',
      items: [
        { value: 'CHN', name: '中国', checked: true },
        { value: 'USA', name: '美国', checked: false },
        { value: 'BRA', name: '巴西', checked: false },
        { value: 'JPN', name: '日本', checked: false },
        { value: 'ENG', name: '英国', checked: false },
        { value: 'FRA', name: '法国', checked: false },
      ],
      formData: {
        name: '',
        age: null,
        gender: '',
        email: '',
        phone: '',
        country: '',
      },
    };
  },
  methods: {
	   sliderChange(e) {
	              console.log('value 发生变化：' + e.detail.value)
	          },
	handlePickerChange(e) {
	      this.pickerValue = e.detail.value;
	      this.updateSelectedDate();
	    },
		 updateSelectedDate() {
      const [yearIndex, monthIndex, dayIndex] = this.pickerValue;
      const selectedYear = this.years[yearIndex];
      const selectedMonth = this.months[monthIndex];
      const selectedDay = this.days[dayIndex];
      this.selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    },
    handleSubmit() {
      this.showMessage('提交成功');
      // 执行提交操作，如发送请求到服务器等
    },
    
    showMessage(message) {
      // 弹出消息提示框
      uni.showToast({
        title: message,
        icon: 'success', // 消息提示图标，可选值有：none, success, fail, loading
        duration: 2000, // 提示持续时间，单位 ms
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
picker-view {
  width: 100%;
  height: 200px;
}

.section {
  display: flex;
  margin-bottom: 1rem;
}
.uni-list-cell {
  justify-content: flex-start;
}
</style>
