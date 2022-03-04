<template>
  <ul>
    <li v-for="(item, i) in $store.state.searchList" @click="musicMain(item.name)" :key="i">
      <span class="iconfont icon-sousuo"></span>
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
// import $store from "../../store/index"
import { search } from "./search.js";
export default {
  setup() {
    function musicMain(name) {
      search(name)
    }
    return {
      musicMain
    }
  },

}
</script>

<style scoped>
.icon-sousuo {
  margin: 3vw;
  font-size: 5.5vw;
  color: rgb(50, 50, 50);
}
ul {
  margin-top: 1vh;
}
li {
  /* margin-top: 2vh; */
  /* text-indent: 2em; */
  line-height: 6vh;
  height: 6vh;
  font-size: 4vw;
  /* border-radius: 30px; */
  border-bottom: 1px solid rgb(200, 201, 245);
}
</style>
