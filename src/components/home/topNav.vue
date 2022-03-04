<template>
  <div class="topNav">
    <div class="topLeft">
      <span class="iconfont icon-liebiao"></span>
    </div>
    <div class="topCenter">
      <span @click="$router.push('/user')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <router-link to="/search" class="iconfont icon-sousuo"></router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.topNav{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 8vh;
}
.topCenter{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50vw;
  font-size: 4vw;
  font-family: "微软雅黑";
}
.active{
  font-size: 5vw;
  font-weight:900;
  color: #0999CC ;
}
</style>