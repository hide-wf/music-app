<template>
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" lazy-render>
      <van-swipe-item v-for="(item,index) in banners" :key = index>
        <img :src="item.pic"  alt=""/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {request} from '../../api/request';
export default {
  data() {
    return {
      banners : [] 
    }
  },
  created() {
    request("/banner?type=1").then((res) => {
      this.banners = res.data.banners.splice(5,4);

    });
  },
};
</script>

<style>
.banner{
  height: 22vh;
}
.my-swipe .van-swipe-item {
  height: 22vh;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img{
  width: 100vw;
  height: 22vh;
}
</style>