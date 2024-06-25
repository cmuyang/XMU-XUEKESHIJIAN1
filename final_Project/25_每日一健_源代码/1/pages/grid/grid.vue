<template>
  <view class="content">
    <view class="news-list">
      <view
        class="news-item"
        hover-class="news-item-hover"
        v-for="(item, index) in news"
        :key="index"
        @tap="openInfo(item.post_id)"
      >
        <image class="news-image" :src="item.image"></image>
        <view class="news-details">
          <view class="news-title">{{ item.title }}</view>
          <view class="news-meta">{{ item.created_at }} {{ item.author }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      news: [	  {
	    post_id: 1,
	    title: '健身科普| 健身减脂的四个阶段',
	    author: '作者 | 新华社',
	    created_at: '2023-11-06 11:10',
		image: '/static/newsphoto/1.jpg',
	  },
	  {
	    post_id: 2,
	    title: '说说你们知道的健身小tips，帮助新人小白少走弯路',
	    author: '凤凰WEEKLY',
	    created_at: '2023-11-01 09:00 ',
		image: '/static/newsphoto/2.png'
	  },
	  {
	    post_id: 3,
	    title: '跳韩舞，享瘦身之乐：探索健康与活力的舞蹈世界',
	    author: '风雪不知夜归人',
	    created_at: '2023-11-01 15:39',
		image: '/static/newsphoto/3.jpg'
	  },
	  {
	    post_id: 4,
	    title: '跑起来|《强风吹拂》：动画激发年轻人的跑步热情，助力健康生活',
	    author: '野村和也',
	    created_at: '2023-11-06 18:34',
		image: '/static/newsphoto/4.jpg'
	  },
	    {
	      post_id: 5,
	      title: '健身器材|AEKE轻力量运动镜A1---轻力量运动体系,破解新时代健身迷局',
	      author: 'AEKE',
	      created_at: '2023-10-19 11:04',
	      image: '/static/newsphoto/5.jpg'
	    },
	    {
	      post_id: 6,
	      title: '体育新闻|乌利塞斯·萨拉维亚不断打破自己的纪录；卢西亚·加纳创下新纪录',
	      author: 'SWIMUNION',
	      created_at: '2023-09-28 16:30',
		  image: '/static/newsphoto/6.jpg'
	    },
		{
		  post_id: 7,
		  title: '新手健身计划（力量/增肌/减脂）',
		  author: '知乎专栏',
		  created_at: '2023-11-09 16:13',
		  image: '/static/newsphoto/7.jpg'
		}], // 新闻数据
    };
  },
  methods: {
    openInfo(postId) {
      uni.navigateTo({
        url: `../info/info?newsid=${postId}`,
      });
    }
  },
};
</script>

<style>
.content {
  padding: 20rpx;
}

.news-list {
  margin-top: 20rpx;
}

.news-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #f5f5f5;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
}

.news-item:hover {
  background-color: #e0e0e0;
}

.news-image {
  width: 100rpx;
  height: 100rpx;
  margin-right: 20rpx;
  border-radius: 10rpx;
}

.news-details {
  flex: 1;
}

.news-title {
  font-weight: bold;
  font-size: 32rpx;
  margin-bottom: 10rpx;
}

.news-meta {
  color: #666;
  font-size: 24rpx;
}

.add-news-button {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #409eff;
  color: #fff;
  text-align: center;
  border-radius: 10rpx;
  cursor: pointer;
}

.popup-content {
  padding: 20rpx;
}

.popup-input {
  margin-bottom: 20rpx;
}

input,
textarea,
button {
  width: 100%;
  padding: 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  border: 1rpx solid #ccc;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

textarea {
  height: 200rpx;
}
</style>