<template>
  <Top></Top>
  <div class="userMsg">
    <img class="avatar" :src="$store.state.user.msg.avatarUrl" alt />
    <p class="nikename">{{ $store.state.user.msg.nickname }}</p>
    <div class="follow">
      <span>{{ $store.state.user.msg.followeds }} 关注</span>
      <span>{{ $store.state.user.msg.follows }} 粉丝</span>
      <span>Lv.{{ level }}</span>
    </div>
  </div>
  <router-link class="likeMusic" :to="{ path: '/listMusic', query: { id: likeMusic.id } }">
    <img :src="likeMusic.coverImgUrl" alt />
    <div class="name">{{ likeMusic.name }}</div>
    <div class="heart">?</div>
  </router-link>
  <div class="bgc"></div>
</template>

<script>
import $store from '../store/index.js';
import { request } from '../api/request.js';
import { reactive, toRefs } from '@vue/reactivity';
import Top from '../components/common/top.vue';
export default {
  setup() {
    let userMsg = reactive({
      level: ""
    });
    let tracks = reactive({
      likeMusic: []
    })
    // 
    request("/user/detail?uid=" + $store.state.user.msg.userId).then((res) => {
      localStorage.setItem("level", res.data.level)
      userMsg.level = localStorage.getItem("level");
    });
    request("/user/playlist?uid=" + $store.state.user.msg.userId).then((res) => {
      localStorage.setItem("likeMusic", JSON.stringify(res.data.playlist[0]));
      tracks.likeMusic = JSON.parse(localStorage.getItem("likeMusic"));
    })
    return {
      ...toRefs(userMsg),
      ...toRefs(tracks)
    };
  },
  components: { Top }
}
</script>

<style scoped>
.bgc {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(235, 235, 235);
}
.avatar {
  position: absolute;
  top: -10vw;
  left: 50%;
  transform: translateX(-10vw);
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
}
.userMsg {
  position: relative;
  margin: 10vh auto;
  width: 90vw;
  height: 15vh;
  border-radius: 5vw;
  background-color: rgb(255, 255, 255);
}
.nikename {
  padding-top: 13vw;
  text-align: center;
  font-size: 5vw;
  font-weight: 600;
}
.follow {
  padding-top: 3vw;
  text-align: center;
}
.follow span {
  margin: 3vw;
  color: rgb(100, 100, 100);
}
.likeMusic {
  padding: 5vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
}
.likeMusic img {
  width: 15vw;
  height: 15vw;
  border-radius: 10px;
}
.likeMusic .name {
  width: 65vw;
  font-size: 5vw;
}
</style>