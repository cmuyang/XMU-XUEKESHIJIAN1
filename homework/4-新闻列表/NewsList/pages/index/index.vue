<template>
	<view>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in news" :key="index"
				@tap="openinfo(item.post_id)">
				<image class="uni-media-list-logo" :src="item.Image"></image><!--  -->
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">{{item.title}}</view>
					<view class="subuni-media-list-text-top">{{item.abstract}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{item.created_at}}</view>
				</view>
			</view>
			
		</view>
	</view>

	<view class="chat-footer">
		
		<input class="msg-input"  v-model="inputtitle"  cursor-spacing="16"/>
		<view class="send" >新闻标题</view>
		<input class="msg-input"  v-model="inputauthor" cursor-spacing="16"/>
		<view class="send" >新闻作者</view>
		<input class="msg-input"  v-model="inputtime" cursor-spacing="16"/>
		<view class="send" >新闻时间</view>
		<input class="msg-input"  v-model="inputcontent" cursor-spacing="16"/>
		<view class="send" >新闻内容</view>
		
		<image class="img-chose" src="/static/photoselect.jpg" @click="chooseImg() " ></image>
		<view class="chat-sender" @click="sendnews()">新增新闻</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: [{
					post_id: 1,
					title:'脆皮大学生频频出现猝死现象？',
					author:'Chen yaosi',
					time:'2023-11-02',
					abstract:'当代大学生体质极差，在内卷时代，各方面的压力使得大学生猝死率达到99%...',
					Image:'/static/1.webp'
				},
				{
					    post_id: 2,
					    title: '摆摊兴起：年轻人的新生活方式',
					    author: '文心一言',
					    time: '2023-11-12  ',
						abstract:'近年来，摆摊在全球范围内迅速兴起，成为一种新的生活方式和创业途径。特别是在一些大都市，摆摊文化已经融入了年轻人的日常生活...',
						Image:'/static/2.webp'
			    },
				{
					    post_id: 3,
					    title: '保研政策助力优秀学子，开拓学术研究新领域',
					    author: '文心一言',
					    time: '2023-11-12  ',
						abstract:'近年来，保研政策越来越受到重视。许多高校都加强了保研的力度，不仅扩大了保研学生的比例...',
						Image:'/static/3.webp'
				}
				],
				inputtitle:"",
				inputauthor:"",
				inputtime:"",
				inputcontent:"",
				img:"",
				myInput:""
			};
		},
		onShow(){
				if(!!uni.getStorageSync('news')){
					this.lnews=JSON.parse(getStorageSync('news'))
				}
		},
		methods: {
			openinfo(e) {
				var newsid = e;
				uni.navigateTo({
					url: '../info/info?newsid=' + newsid
				});
			},
			chooseImg() {//选图暂时没有实现
			  uni.chooseImage({  
				count: 1,  
				sizeType: ['orginial', 'compressed'],  
				sourceType: ['album', 'camera'],  
				success: (res) => {  
				  console.log(res.tempFilePaths[0]);  
					 img = res.tempFilePaths[0] 
				  }  
				  
			  })
			uni.setStorageSync('news', JSON.stringify(this.lnews)) 
			},
			sendnews() {
			      if (
			        !this.inputtitle.trim() ||
			        !this.inputauthor.trim() ||
			        !this.inputtime.trim() ||
			        !this.inputcontent.trim()
			      ) {
			        uni.showToast({
			          title: '标题、作者、时间和内容不能为空',
			          icon: 'none',
			        });
			        return;
			      }
			
			      const newNews = {
			        post_id: this.news.length + 1,
			        title: this.inputtitle,
			        author: this.inputauthor,
			        created_at: this.inputtime,
			        content: this.inputcontent,
					Image:''
			      };
			      this.news.push(newNews);
			      uni.setStorageSync('news', this.news);
			
			      this.showPopup = false;
			
			      this.inputtitle = '';
			      this.inputauthor = '';
			      this.inputtime = '';
			      this.inputcontent = '';
			    },
				
			  
			
		},
	}
</script>

<style>
	.uni-media-list-body {
			height: auto;
		}
	
		.uni-media-list-text-top {  
		  font-size: 1.0em;  
		  font-weight: bold; 
		   letter-spacing: 0.1px;
		}  
		  
		.subuni-media-list-text-top {  
		  font-size: 0.7em; /* 或者你想要的任何小于1.6em的值 */  
		} 
		.uni-media-list-logo{
			width:50;
		}
	
	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list-text-top {
		line-height: 1.6em;
	}

	.chat-sender{
		color: #550000;
		font-size: 30upx;
		margin-top: -8upx;
		margin-bottom: 10upx;
		float: r;
	}
	.send{
		
		left: 10;
		color: #888;
		font-size: 28upx;
		margin-top: -8upx;
		margin-bottom: 10upx;
	}
	.chat-footer{
		width: 680upx;
		padding: 0 40upx;
		height: 350upx;
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
		float:left;
		background-color: #fff;
		width: calc(100% - 300upx);
		height: 70upx;
		line-height: 60upx;
		font-size: 30upx;
		border-radius: 10upx;
		padding: 10 20upx;
		margin: 2upx;
	}
	.img-chose{
		bottom: 0;
		height: 70upx;
		width: 90upx;
		border: #888;
		border-radius: 10upx 10upx;
	}


		
</style>