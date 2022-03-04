<template>
  <div class="listTab">
    <div>
      <span class="iconfont icon-tuijian"></span>
      <span>每日推荐</span>
    </div>
    <div>
      <span class="iconfont icon--xingxingtuijian"></span>
      <span>私人FM</span>
    </div>
    <div>
      <span class="iconfont icon-gedan"></span>
      <span>歌单</span>
    </div>
    <div>
      <span class="iconfont icon-paihangbang"></span>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.listTab{
  display: flex;
  justify-content: space-around;
}
.listTab div{
  text-align: center;
  display: flex;
  flex-direction: column;
}
.listTab .iconfont{
  padding: 1vw;
  font-size: 12vw;
}
</style>