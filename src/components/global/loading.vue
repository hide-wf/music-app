<template>
  <van-overlay :show="$store.state.isLoading" style="z-index:100;">
    <van-loading size="10vw" type="spinner" vertical color="rgb(37, 143, 250" class="load">加载中...</van-loading>
  </van-overlay>
</template>

<script>
export default {
}
</script>

<style scoped>
.load{
  margin-top: 40vh; 
}
</style>