<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Loading></Loading>
    <Playmusic></Playmusic>
  </div>
</template>

<script>
import Playmusic from "./components/global/playmusic.vue";
import Loading from "./components/global/loading.vue";
export default {
  components: {
    Playmusic,
    Loading
},
}
</script>

<style>
@import url("./assets/App.css");

</style>