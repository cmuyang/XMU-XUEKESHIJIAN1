<template>
  <view class="container">
	  <!-- Loading Modal -->
	<view v-if="loading" class="loading-modal">
	    <text class="loading-text">锻炼数据统计中~</text>
	</view>
    <!-- 锻炼方式总时长图表 -->
    <qiun-data-charts 
      type="column"
      :opts="totalChartOpts"
      :chartData="totalChartData"
    />
    <!-- 最近一周运动时长图表 -->
    <qiun-data-charts 
      type="line"
      :opts="recentChartOpts"
      :chartData="recentChartData"
    />
	 <!-- 最长锻炼时间的一天、累计已打卡多少天的统计信息 -->
<view class="statistics">
  <view class="stat-item">
    <text class="stat-label">累计打卡天数</text>
    <text class="stat-value">{{ totalDaysLogged || '暂无数据' }} 天</text>
  </view>
</view>
</view>
</template>

<script>
export default {
  data() {
    return {
	  loading: true,  // Loading indicator
      totalChartData: {},  // 锻炼方式总时长图表数据
      recentChartData: {}, // 最近一周运动时长图表数据
      totalChartOpts: {
        // 针对锻炼方式总时长图表的配置
      },
      recentChartOpts: {
        // 针对最近一周运动时长图表的配置
      },
      longestExerciseDay: '',       // 最长锻炼时间的一天
      totalDaysLogged: 0,           // 累计已打卡多少天
    };
  },
  onLoad() {
	this.showLoadingModal();
    this.generateTotalChartData();
    this.generateRecentChartData();
    this.calculateStatistics(); 
  },

  methods: {
	  showLoadingModal() {
	        setTimeout(() => {
	          this.loading = false;  // Simulating a delay, you can adjust this as needed
	        }, 2000);
	      },
    async generateTotalChartData() {
      try {
        // 调用云函数获取锻炼时长数据
        const res = await uniCloud.callFunction({
          name: 'physical',
          data: {
            action: 'list', // 云函数中的查询方法
            pageIndex: 1,
            pageSize: 100, // 假设最大条数为 100
            filter: {
				userId:uni.getStorageSync('uni-id-pages-userInfo')._id
            },
          },
        });

        // 处理从云函数获取的数据，根据需要的数据格式生成锻炼方式总时长图表数据
        const exerciseData = res.result.data || [];
        let categories = ["跑步", "骑行", "游泳", "羽毛球", "乒乓球"];
        let series = [
          {
            name: "锻炼时长",
            data: Array.from({ length: categories.length }, (_, index) => {
              const type = index + 1;
              const filteredData = exerciseData.filter(item => item.physicalType === type);
              return filteredData.reduce((total, item) => total + parseInt(item.physicalLong), 0);
            }),
          },
        ];

        this.totalChartData = { categories, series };
      } catch (error) {
        console.error('Error fetching totalChartData:', error);
      }
    },
    async generateRecentChartData() {
      try {
        // 调用云函数获取锻炼时长数据
        const res = await uniCloud.callFunction({
          name: 'physical',
          data: {
            action: 'list', // 云函数中的查询方法
            pageIndex: 1,
            pageSize: 100, // 假设最大条数为 100
            filter: {
			  userId:uni.getStorageSync('uni-id-pages-userInfo')._id
            },
          },
        });

        // 处理从云函数获取的数据，获取最近一周的日期数组
        const exerciseData = res.result.data || [];
        const recentDates = this.getRecentDates(7);

        // 根据需要的数据格式生成最近一周运动时长图表数据
        const recentCategories = recentDates;
        const recentSeries = [
          {
            name: "运动时长",
            data: recentDates.map(date => {
              const filteredData = exerciseData.filter(item => item.physicalDate === date);
              return filteredData.reduce((total, item) => total + parseInt(item.physicalLong), 0);
            }),
          },
        ];

        this.recentChartData = { categories: recentCategories, series: recentSeries };
      } catch (error) {
        console.error('Error fetching recentChartData:', error);
      }
    },
    getRecentDates(count) {
      const today = new Date();
      const recentDates = [];
      for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        recentDates.push(formattedDate);
      }
      return recentDates;
    },
    async calculateStatistics() {
      try {
        // 调用云函数获取锻炼时长数据
        const res = await uniCloud.callFunction({
          name: 'physical',
          data: {
            action: 'list', // 云函数中的查询方法
            pageIndex: 1,
            pageSize: 100, // 假设最大条数为 100
            filter: {
			  userId:uni.getStorageSync('uni-id-pages-userInfo')._id
            },
          },
        });

        // 处理从云函数获取的数据
        const exerciseData = res.result.data || [];

        // 计算最长锻炼时间的一天
        if (exerciseData.length > 0) {
          const longestExercise = exerciseData.reduce((prev, current) => {
            return parseInt(current.physicalLong) > parseInt(prev.physicalLong) ? current : prev;
          }, {});
          this.longestExerciseDay = longestExercise.physicalDate;
        } else {
          this.longestExerciseDay = '暂无数据';
        }

        // 计算累计已打卡多少天
        const uniqueDaysLogged = [...new Set(exerciseData.map(item => item.physicalDate))];
        this.totalDaysLogged = uniqueDaysLogged.length;
      } catch (error) {
        console.error('Error calculating statistics:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.loading-modal {
  position: fixed;
  top: 50%; 
  left: 50%;
  width: 5%; 
  height: 5%; 
  background: #8e8e8e; 
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%); 
}


.loading-text {
  color: #fff;
  font-size: 16rpx;
}

.statistics {
  margin-top: 20rpx;
}

.stat-item {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.stat-label {
  flex: 1;
  font-weight: bold;
}

.stat-value {
  color: #333; 
}
</style>
