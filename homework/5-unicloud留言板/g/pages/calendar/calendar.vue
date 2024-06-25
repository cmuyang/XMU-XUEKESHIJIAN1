<template>
    <view>
        <uni-calendar @change="onDateChange"></uni-calendar>
    </view>
</template>

<script>
export default {
    // 组件注册等...
    methods: {
        onDateChange(event) {
            // 处理日期变更
            console.log(event.detail.value);
        }
    }
}
</script>
