<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
	<view>
		<navigator url="/pages/found/found" open-type="switchTab">
			<button type="default">跳转发现页</button>
		</navigator>
		
		<navigator url="/subpages/chat2/chat2" open-type="redirect">
			<button type="default">聊天</button>
		</navigator>
		<navigator url="/subpages/chat/chat" open-type="redirect">
			<button type="default">与小姐姐聊天</button>
		</navigator>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				title: '微信',
				
			}
		},
		onLoad() {
			console.log('index page load')
		},
			
		onShow() {
			console.log('index page load')
		},
		onPullDownRefresh() {
			console.log('页面下拉刷新记录')
		},
		methods: {

		}
	}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
