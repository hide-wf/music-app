<template>
  <div>
    <h6 style="margin:2vh;font-size:5vw">共({{ $store.state.SearchMusic.length }})条结果</h6>
    <div class="music-list-box" v-for="(item, i) in $store.state.SearchMusic" :key="i">
      <div style="font-size:5vw;width:10vw;margin:2vw;" :class="i < 3 ? 'red' : ''">{{ i + 1 }}</div>
      <div class="music-name" @click="playMusic(i)">
        <p style="font-size:5vw;color:rgb(10,10,150)" class="sizeOne">{{ item.name }}</p>
        <p style="font-size:4vw;color:rgb(50,50,50)" class="sizeOne">{{ item.ar[0].name }}</p>
      </div>
      <div>
        <van-icon name="descending" size="6vw" />
      </div>
    </div>
    <footer>已经到底了</footer>
  </div>
</template>

<script>
import $store from "../../store/index";
export default {
  setup() {
    function playMusic(i) {
      $store.state.isPlay = true;
      $store.commit("musicId", $store.state.SearchMusic[i].id);
      $store.commit("musicImg", $store.state.SearchMusic[i].al.picUrl);
      $store.commit("musicName", $store.state.SearchMusic[i].name);
    }

    return {
      playMusic
    }
  }
}
</script>

<style scoped>
.red{
  color : red;
  font-size: 5vw;
  font-weight: 800;
}
.music-list-box {
  padding: 3vw 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: .5px solid rgba(150,150,150); */
}

.music-name {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70vw;
  height: 6vh;
}
footer {
  text-align: center;
  font-size: 5vw;
  line-height: 7.5vh;
  height: 15vh;
  color: rgb(50, 50, 50);
}
</style>