<template>
  <div @click="playMsg">
    <span
      v-if="$store.state.playMsg === 1"
      class="iconfont icon-suijibofang"
      style="font-size:7vw ;color:rgb(180,180,180)"
    ></span>
    <span
      v-if="$store.state.playMsg === 2"
      class="iconfont icon-hanhan-01-01"
      style="font-size:7vw;color:rgb(180,180,180)"
    ></span>
    <span
      v-if="$store.state.playMsg === 3"
      class="iconfont icon-shunxubofang"
      style="font-size:7vw;color:rgb(180,180,180)"
    ></span>
  </div>
</template>

<script>
export default {
  methods: {
    playMsg() {
      if (this.$store.state.playMsg < 3) {
        this.$store.state.playMsg++;  
      }
      else {
        this.$store.state.playMsg = 1;
      }
    },
  }

}
</script>

<style>
</style>
