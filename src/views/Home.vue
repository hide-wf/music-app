<template>
  <div>
    <top-nav class="top"></top-nav>
    <div class="box"></div>
    <banner></banner>
    <list-tab></list-tab>
    <musics></musics>
    <new-music></new-music>
  </div>
</template>
<script>
import topNav from '../components/home/topNav.vue';
import banner from '../components/home/banner.vue';
import listTab from "../components/home/listTab.vue"
import musics from '../components/home/musics.vue';
import newMusic from '../components/home/newMusic.vue';
export default {
  components: {
    topNav,
    banner,
    listTab,
    musics,
    newMusic
},
  data() {
    return {

    }
  },
}
</script>
<style scoped>
.top {
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 10;
}
.box {
  width: 100vw;
  height: 8vh;
}

</style>