<template>
  <div class="playmusic" v-show="$store.state.isPlay">
    <div class="left" @click="routerTo">
      <div class="musicImg">
        <img :src="musicImg" alt />
        <!-- 待修改 -->
      </div>
      <div class="musicText">
        <div class="musicname sizeOne">{{ musicName }}</div>
        <!-- 待修改 -->
        <div class="tishi">点击跳转至歌词页面</div>
      </div>
    </div>
    <div class="right">
      <div class="on-off" @click="io">
        <span v-if="$store.state.Playflag" class="iconfont icon-zanting_o" style="font-size:12vw"></span>
        <span v-else class="iconfont icon-bofang"></span>
      </div>
      <div class="musicList">
        <van-cell @click="showPopup" class="iconfont icon-liebiao"></van-cell>
        <van-popup
          v-model:show="show"
          position="bottom"
          :style="{
            height: '60%',
          }"
          round
          duration="0.2"
          transition-appear
        >
          <Control></Control>
        </van-popup>
      </div>
    </div>
    <audio :src="musicUrl" autoplay></audio>
  </div>
</template>

<script>
import Control from './control.vue';
export default {
  data() {
    return {
      musicImg: "",
      musicName: "",
      musicUrl: "",
      flag: true,
      show: false
    };
  },
  mounted() {
    let e = document.querySelector("audio")
    e.pause();
    this.$store.state.Playflag = false;
  },
  methods: {
    routerTo() {
      this.$router.push("/lyric");
      this.$store.state.isPlay = false
    },
    showPopup() {
      this.show = true;
    },
    io() {
      let e = document.querySelector("audio");
      if (this.$store.state.Playflag) {
        e.pause();
        this.$store.state.Playflag = false;
      }
      else {
        e.play();
        this.$store.state.Playflag = true;
      }
    }
  },
  watch: {
    "$store.state.musicPlay": {
      handler() {
        this.$store.state.Playflag = true;
        let id = this.$store.state.musicId[this.$store.state.musicIndex];
        this.musicName = this.$store.state.musicName[this.$store.state.musicIndex];
        this.musicImg = this.$store.state.musicImg[this.$store.state.musicIndex];
        this.musicUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      },
      immediate: true
    }

  },
  components: { Control }
}
</script>
<style scoped>
.playmusic {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 7vh;
  border-top: 0.5px solid rgb(200, 200, 200);
  background-color: #fff;
}
.left {
  display: flex;
  width: 75vw;
}
.right {
  flex: 1;
}
.musicImg,
.musicImg img {
  margin: 0.5vw;
  border-radius: 50%;
  width: 5.5vh;
  height: 5.5vh;
}

.musicText {
  margin-left: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.musicname {
  width: 60vw;
  font-size: 4.5vw;
  font-weight: 500;
}
.tishi {
  font-size: 2vw;
  font-weight: 300;
}
.right {
  display: flex;
}
.on-off,
.musicList {
  width: 15vw;
  display: flex;
  text-align: center;
  align-items: center;
}
.icon-bofang {
  transform: translateX(1.5vw);
  font-size: 8.5vw !important;
}
.iconfont {
  /* margin-right: 3vw; */
  font-size: 9vw;
  color: #444;
}
.icon-liebiao {
  margin-left: -4vw;
}
</style>