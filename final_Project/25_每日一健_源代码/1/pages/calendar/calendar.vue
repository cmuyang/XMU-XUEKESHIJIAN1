<template>
  <view>
    <uni-calendar :events="events" @change="onCalendarChange" :selected="selected"></uni-calendar>
	<view class="input-container">
		<view class="label">锻炼时长：</view>
		<view  class="input-box">
			<uni-easyinput v-model="selectedTime" focus placeholder="请输入锻炼时长(min)" ></uni-easyinput>
		</view>
	</view>
	<view class="input-container">
		<view class="label">选择类型：</view>
		<view class="input-box">
			 <uni-data-select v-model="selectedActivity" :localdata="rangeArr" @change="changeActive"></uni-data-select>
		</view>
	</view>
	<view class="input-container">
		<view class="label">锻炼心得：</view>
		<view class="input-box">
			<uni-easyinput v-model="experience" focus placeholder="请输入锻炼心得" ></uni-easyinput>
		</view>
	</view>
    <button class="save-btn" type="primary" @click="saveActivity">保存</button>
    <view class="savedData-container">
		<view class="savedData-item" v-for="item in savedData">
			<view>{{item.userName}}</view>
			<view>{{item.physicalDate}}  锻炼时长:{{item.physicalLong}}分钟</view>
			<view>
				<view v-for="items in rangeArr" v-if="item.physicalType ==items.value ">{{items.text}}</view>
			</view>
			<view>{{item.physicalXind}}</view>
		</view>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      events: [
        // 在这里添加用户的健康活动记录数据
        {
          date:'2023-12-14',
          title:'跑步5公里',
          description:'今天进行了有氧运动'
        },
      ],
	  selectedActivity:'', // 用于存储选择的运动方式
	  rangeArr:[
		  {value:1,text:"跑步"},
		  {value:2,text:"骑行"},
		  {value:3,text:"游泳"},
		  {value:4,text:"羽毛球"},
		  {value:5,text:"乒乓球"},
		  
	  ],
	  selected:[], //已打卡
	  experience:'', //锻炼心得
      selectedTime: '', // 用于存储选择的运动时间
      savedData: [] ,// 用于显示保存的数据
	  selectDate:'',// 选择的日期
    };
  },
  onLoad() {
  	 this.getList()
  },
  methods: {
    onCalendarChange(event) {
      console.log('选中日期变化', event);
	  this.selectDate = event.fulldate
      // 在这里可以处理日历日期变化的逻辑
    },
	// 选择类型
	changeActive(e){
		console.log(e)
		this.selectedActivity = e
	},
	// 查询数据
	getList(){
		uniCloud.callFunction({
			name:'physical', // 云函数名称
			data:{
				action:'list', // 找到对应方法
				pageIndex:1,
				pageSize:20, // 一页展示20条
				filter:{   //查询条件
					userId:uni.getStorageSync('uni-id-pages-userInfo')._id
				}
			},
			success:res=>{
				console.log('res',res)
				this.savedData = res.result.data
				uni.setStorageSync('exerciseData', res.result.data);
				res.result.data.forEach(item=>{  //for循环
					let obj = {
						date:item.physicalDate,
						info:this.rangeArr.find(items=>items.value == item.physicalType).text, // 找根据类型到对应的一条数据
						data:{ 
							name: item.userName
						}
					}
					this.selected.push(obj)
				})
			}
		})
	},
	// 保存操作
    saveActivity() {
		console.log(uni.getStorageSync('uni-id-pages-userInfo'))
		if(!uni.getStorageSync('uni_id_token')){  //判断是否登录
			uni.showToast({
				title:'请先登录！',
				icon:'none'
			})
			return
		}
		if(this.selectDate == ''){
			uni.showToast({
				title:'请选择日期',
				icon:'none'
			})
			return
		}else if(this.selectedTime == ''){
			uni.showToast({
				title:'请输入锻炼时长',
				icon:'none'
			})
			return
		}else if(this.selectedActivity == ''){
			uni.showToast({
				title:'请选择类型',
				icon:'none'
			})
			return
		}else if(this.experience == ''){
			uni.showToast({
				title:'请输入锻炼心得',
				icon:'none'
			})
			return
		}
		
		let obj = {
			userName:uni.getStorageSync('uni-id-pages-userInfo').username, //从缓存中取数据
			userId:uni.getStorageSync('uni-id-pages-userInfo')._id,
			physicalDate:this.selectDate,//锻炼时间
			physicalType:this.selectedActivity,//锻炼类型
			physicalLong: this.selectedTime,//锻炼时长
			physicalXind:this.experience  //锻炼心得
		}
		// 调用云函数添加
		uniCloud.callFunction({
			name:'physical',
			data:{
				action:'add',
				datas:obj
			},
			success:res=>{
				if(res.result.code == 0){//清空输入数据
					this.experience ='', //锻炼心得
					  this.selectedTime='', // 用于存储选择的运动时间
					 this.selectedActivity= '', // 用于存储选择的运动方式
					  this.selectDate='',// 选择的日期
					 
					uni.showToast({
						title:'添加成功',
						icon:'none'
					})
					 this.getList()
				}
			}
		})
    }
  }
};
</script>

<style>
.input-container{
	display: flex;
	align-items: center;
	padding: 20rpx ;
}
.label{
	width: 30%;
	font-size: 30rpx;
	font-weight: bold;
}
.input-box{
	width: 400rpx;
	height: 60rpx;
	border-radius: 20rpx;
}
.save-btn{
	width: 80%;
	margin: 100rpx auto;
}
.savedData-container{
	padding: 20rpx;
}
.savedData-item{
	margin: 20rpx 0;
	border: 1px solid #f4f4f4;
	border-radius: 20rpx;
	padding: 20rpx;
	background-color: #f3f4f6;
}
</style>