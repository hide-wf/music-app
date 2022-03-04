<template>
  <div>
    <van-nav-bar title="" left-text="退出" left-arrow @click-left="exitpage" >
      <template  #right>
        <van-icon name="search"  size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  methods :{
    exitpage(){
      this.$router.go(-1)
    }
  },
  // toSearch(){
  //   this.$router.push("/search")
  // }
}
</script>

<style>
</style>