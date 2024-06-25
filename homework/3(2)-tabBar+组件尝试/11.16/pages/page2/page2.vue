<template>
	<view>
		<view>
			<view>1.计时器</view>
			<!-- 一般用法 -->
		<uni-countdown :day="1" :hour="1" :minute="12" :second="40"></uni-countdown>
		
		<!-- 不显示天数 -->
		<uni-countdown :show-day="false" :hour="12" :minute="12" :second="12"></uni-countdown>
		
		<!-- 修改颜色 -->
		<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :day="1" :hour="2" :minute="30" :second="0"></uni-countdown>

		</view>
		<view>
			<view>2.抽屉</view>
			<button @click="showDrawer" type="primary">右侧弹出 显示Drawer</button>
			<uni-drawer ref="showRight" mode="right" :mask-click="false">
				<scroll-view style="height: 100%;" scroll-y="true">
					<button @click="closeDrawer" type="primary">关闭Drawer</button>
					<view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
				</scroll-view>
			</uni-drawer>
		</view>
		<view>
			<view>3.超链接</view>
			<uni-link href="https://uniapp.dcloud.io/" text="https://uniapp.dcloud.io/"></uni-link>

		</view>
		<view>4.弹窗</view>
		<view>
				<button @click="open">打开弹窗</button>
				<uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup>
			</view>
	</view>
</template>

<script>
	export default {
		methods: {
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			 open(){
			        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			        this.$refs.popup.open('top')
			      }

		}
	}
</script>


<style>

</style>
