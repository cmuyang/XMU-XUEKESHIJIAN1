<template>
	
	<view class="top">
		<navigator class="top" url="/pages/index/index" open-type="switchTab" >
			<view type="default">返回</view>
		</navigator>
	</view>
	<view class="chat-body">
		
		
		<view v-for="(item,index) in chatList" :key="index">
			<view class="chat-one" v-if="!item.isMe">
				<image class="chat-face" @click="patpat()"  src="../../static/img/profile1.png"/>
				<view class="chat-box">
					<view class="chat-sender">小姐姐</view>
					<view class="chat-content" v-if="item.type==='txt'">{{item.content}}</view>
					<image class="chat-img" v-if="item.type==='img'" :src="item.content" mode="widthFix"/>
				</view>
			</view>
			<view v-else class="chat-one chat-one-mine">
				<view class="chat-box">
					<view class="chat-content" v-if="item.type==='txt'">{{item.content}}</view>
					<image class="chat-img" v-if="item.type==='img'" :src="item.content" mode="widthFix"/>
				</view>
				<image class="chat-face" src="../../static/img/profile3.png"/>
			</view>
		</view>
		<view class="chat-footer">
			<input class="msg-input" type="text" v-model="myInput" cursor-spacing="16"/>
			<image class="img-chose" src="/static/photoselect.jpg" @click="chooseImgAndSend " ></image>
			<image class="img-chose" src="/static/emojiselect.jpg" @click="chooseImgAndSend(),answer() " ></image>
			<view class="send-btn" @click="sendMsg">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				light:true,
				chatList:[
				{
					isMe:false,
					type:'txt',
					content:'你好，我是小姐姐'
				},
				{
					isMe:false,
					type:'img',
					content:'/static/img/shasha.png'
				},
				{
					isMe:true,
					type:'txt',
					content:'\n#1.单击小姐姐图像可以快速发送拍一拍  \n #2.给小姐姐发送信息可以得到她的快速回复“嗯嗯"\n#3.添加表情包选项，暂时可选择表情图片发送，有待完善”'
				},
				{
					isMe:true,
					type:'img',
					content:'/static/img/back.png'
				}
				],
				myIput:"",
				
				pat:""
			}
			
		},
		onShow(){
				if(!!uni.getStorageSync('chatList')){
					this.chatList=JSON.parse(getStorageSync('chatList'))
				}
				if(!!uni.getStorageSync('pat')){
					this.pat=JSON.parse(getStorageSync('pat'))
				}
		},
		methods: {
			sendMsg(){
				if(!this.myInput)return ;
				let txtMsg ={
					isMe:true,
					type:'txt',
					content:this.myInput
				}
				this.chatList.push(txtMsg)
				
				this.myInput= " "//?
				
				uni.setStorageSync('chatList',JSON.stringify(this.chatList))
				
				let txtMsg2 ={
					isMe:false,
					type:'txt',
					content:'嗯嗯'
				}
				this.chatList.push(txtMsg2)
				uni.setStorageSync('chatList',JSON.stringify(this.chatList))
				setTimeout(()=>{
					uni.pageScrollTo({
						scrollTop:999999,
						duration:0
					})
				})
			},
			answer(){
				let txtMsg2 ={
					isMe:false,
					type:'txt',
					content:'嗯嗯'
				}
				this.chatList.push(txtMsg2)
				uni.setStorageSync('chatList',JSON.stringify(this.chatList))
				setTimeout(()=>{
					uni.pageScrollTo({
						scrollTop:999999,
						duration:0
					})
				},100)
			},
			chooseImgAndSend() {  
			  setTimeout(() => {  
				uni.pageScrollTo({  
				  scrollTop: 99999,  
				  duration: 0,  
				});  
			  }); // 延迟1秒执行滚动操作，确保图片已发送成功并存储在 chatList 中  
		  
			  uni.chooseImage({  
				count: 9,  
				sizeType: ['orginial', 'compressed'],  
				sourceType: ['album', 'camera'],  
				success: (res) => {  
				  console.log(res.tempFilePaths[0]);  
				  var i;  
				  for (i = 0; i < res.tempFilePaths.length; i++) {  
					let sendMsg = {  
					  isMe: true,  
					  type: "img",  
					  content: res.tempFilePaths[i],  
					};  
					this.chatList.push(sendMsg);  

				  }  
				},  
			  })
			uni.setStorageSync('chatList', JSON.stringify(this.chatList))
			  
			setTimeout(() => {
				uni.pageScrollTo({  
				  scrollTop: 99999999,  
				  duration: 0,  
				});  
			})
			    
				 
			},
			patpat(){
				let txtMsg ={
					isMe:true,
					type:'txt',
					content:'拍拍你'
				}
				this.chatList.push(txtMsg)
				uni.setStorageSync('chatList',JSON.stringify(this.chatList))
				let txtMsg2 ={
					isMe:false,
					type:'txt',
					content:'嗯嗯'
				}
				this.chatList.push(txtMsg2)
				uni.setStorageSync('chatList',JSON.stringify(this.chatList))
				setTimeout(()=>{
					uni.pageScrollTo({
						scrollTop:999999,
						duration:0
					})
				})
			}
			 
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		position: fixed;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		justify-content: flex-end;
	}
.container{
	background-color: #f1f1f1;
	min-height: 100vh;
}
.chat-body{
	padding-bottom: 178upx;
	.chat-one{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-items: flex-start;
		align-items: flex-start;
		padding:20upx 0;
	}
	.chat-one-mine{
		justify-content: flex-end;
	}
	.chat-content{
		background-color: #f1f1f1;
		border-radius: 5px;
		padding: 10px;
	}
	.chat-img{
		float: left;
		max-width: 60%;
		border-radius: 5px;
	}
	.chat-one-mine .chat-img{
		float: right;
	}
	.chat-face{
		width: 84upx;
		height: 84upx;
		border-radius: 10upx;
		margin-left: 20upx;
	}
	.chat-one-mine .chat-face{
		margin-left: 0;
		margin-right: 20upx;
	}
	.chat-box{
		max-width: calc(100% - 290upx);
		margin-left: 20upx;
		font-size: 30upx;
	}
	.chat-one-mine .chat-box{
		margin-right: 20upx;
	}
	.chat-sender{
		color: #888;
		font-size: 28upx;
		margin-top: -8upx;
		margin-bottom: 10upx;
	}
	.chat-footer{
		width: 680upx;
		padding: 0 40upx;
		height: 120upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		border-top:1upx solid #ddd;
		
	}	
	.msg-input{
		background-color: #fff;
		width: calc(100% - 300upx);
		height: 70upx;
		line-height: 65upx;
		font-size: 30upx;
		border-radius: 10upx;
		padding: 0 20upx;
	}
	.img-chose{
		height: 70upx;
		width: 70upx;
		border: #888;
		border-radius: 10upx 10upx;
	}
}
</style>
