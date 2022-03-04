<template>
  <div class=".lyric">
    <div class="bg" ref="bgi"></div>
    <header style="width:100vw;height:8vh; display:black">
      <div class="exit" @click="exit">
        <span class="iconfont icon-fanhui4"></span>
      </div>
      <div class="title sizeOne">{{ this.$store.state.musicName[this.$store.state.musicIndex] }}</div>
      <div class="share">
        <span class="iconfont icon-fenxiang-" style="font-size:9vw"></span>
      </div>
    </header>
    <ul ref="irc">
      <div style="height:30vh"></div>
      <li v-for="(item, i) in irc" :key="i" class="sizeOne lyric">{{ item }}</li>
      <div style="height:30vh"></div>
    </ul>
    <!-- 进度条 -->
    <footer class="slider">
      <div class="start" style="color:rgb(180,180,180)">{{ nowtime }}</div>
      <div class="main">
        <van-slider
          v-model="value"
          @change="onChange"
          @drag-start="onStart"
          @drag-end="onEnd"
          :max="step"
          bar-height=".1px"
          style="width:90% ;margin:auto"
        />
      </div>
      <div class="end" style="color:rgb(180,180,180)">{{ endtime }}</div>
    </footer>
    <!-- 进度条 -->
    <footer class="control">
      <!-- 播放方法 -->
      <div style="margin-right:6vw" class="box">
        <play-msg></play-msg>
      </div>
      <!-- 上一首 -->
      <div class="box">
        <span class="iconfont icon-diyiyeshouyeshangyishou"></span>
      </div>
      <!-- 暂停 -->
      <div v-if="$store.state.Playflag" style="width:18vw; height:18vw" class="box" @click="play">
        <span class="iconfont icon-zanting_o" style="font-size:18vw"></span>
      </div>
      <!-- 播放 -->
      <div v-else style="width:18vw;height:18vw" class="box" @click="play">
        <span class="iconfont icon-bofang" style="font-size:13vw"></span>
      </div>
      <!-- 下一首 -->
      <div class="box">
        <span class="iconfont icon-zuihouyiyemoyexiayishou" @click="nextMusic"></span>
      </div>
      <!-- 列表 -->
      <div style="margin-left:6vw" class="box">
        <span @click="showPopup" class="iconfont icon-liebiao" style="font-size:9.5vw"></span>
        <van-popup
          bind:close="onClose"
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
    </footer>
  </div>
</template>

<script>
import { request } from '../../api/request';
import Control from './control.vue';
import playMsg from './playMsg.vue';
export default {
  components: {
    Control,
    playMsg
  },
  data(){
    return {
      time: [],
      nowtime: "00:00",
      endtime: "00:00",
      irc: [],
      value: 0,
      step: "",
      show: false,
      flag: true
    }
  },
  created() {
    this.split();
  },
  unmounted() {
    document.querySelector("audio").removeEventListener("timeupdate", this.timeupdate);
  },
  methods: {
    allTime() {
      let audio = document.querySelector("audio")
      if (audio.readyState > 0) {
        let m = parseInt(audio.duration / 60, 10);
        let s = parseInt(audio.duration % 60);
        this.step = m * 60 + s
        this.endtime = m + ":" + s;
      }
    },
    onClose() {
      this.$store.state.isPlay = false;
    },
    showPopup() {
      this.show = true;
    },
    // 进度条
    onChange(e) {
      document.querySelector("audio").currentTime = e;
    },
    onStart() {
      this.flag = false;
    }, onEnd() {
      this.flag = true;
    },
    // 返回
    exit() {
      this.$router.go(-1);
      this.$store.state.isPlay = true
    },
    // 暂停，播放
    play() {
      let e = document.querySelector("audio");
      if (this.$store.state.Playflag) {
        e.pause();
        this.$store.state.Playflag = false;
      } else {
        e.play();
        this.$store.state.Playflag = true;
      }
    },
    // 下一首
    nextMusic() {
      this.allTime();
      this.$store.state.musicPlay++
      this.time = []
      if (this.$store.state.musicId.length == 1) {
      }
      else if (this.$store.state.musicIndex == this.$store.state.musicId.length - 1) {
        this.$store.state.musicIndex = 0;
        this.irc = [];
        this.split();
      }
      else {
        this.$store.state.musicIndex++;
        this.irc = [];
        this.split();
      }
      // console.log(this.$store.state.musicId[this.$store.state.musicIndex]);
    },
    // 分割 歌词
    split() {
      let id = this.$store.state.musicId[this.$store.state.musicIndex];
      request("/lyric?id=" + id).then((res) => {
        let lrc = res.data.lrc.lyric;
        let arr = (lrc.split("["));
        for (let i = 0; i < arr.length; i++) {
          let newArr = arr[i].split("]");
          this.time.push(newArr[0].split(".")[0]);
          if (newArr[1]) {
            this.irc.push(newArr[1]);
          }
        }
      })
    },
    // 更新时间 ， 歌词滚动
    timeupdate() {
      this.allTime()
      // irc.scrollTo(0, i * 100 )
      let nows = document.querySelector("audio").currentTime;
      if (this.flag) {
        this.value = nows;
      }
      if (nows > 60) {
        let m = parseInt(nows / 60);
        let s = parseInt(nows - m * 60);
        if (s >= 10) {
          this.nowtime = "0" + m + ":" + s
        } else {
          this.nowtime = "0" + m + ":0" + s
        }
      }
      else if (nows < 10) {
        this.nowtime = '00:0' + parseInt(nows)
      }
      else {
        this.nowtime = '00:' + parseInt(nows)
      }
      //歌词滚动
      if (this.$refs.irc) {
        for (let i = 0; i < this.time.length; i++) {
          let nowtime = this.nowtime.split(":"); //当前时间
          nowtime = nowtime[0] * 60 + nowtime[1];

          let beforeTime = this.time[i].split(":"); // 前一个时间
          beforeTime = beforeTime[0] * 60 + beforeTime[1];

          let after
          if (this.time[i + 1]) {   //后一个时间
            after = this.time[i + 1].split(":");
            after = after[0] * 60 + after[1];
          }
          this.$refs.irc.children[i].setAttribute("class", "lyric sizeOne")
          if (nowtime <= after && nowtime >= beforeTime) {
            this.$refs.irc.scrollTo(0, i * window.innerHeight * 0.06);
            this.$refs.irc.children[i - 1].setAttribute("class", "lyric sizeOne")
            this.$refs.irc.children[i].setAttribute("class", "new");
          }
        }
      }
    }
  },
  mounted() {
    let audio = document.querySelector("audio");
    // 播放方法
    audio.addEventListener("ended", () => {
      this.$store.state.Playflag = false
      switch (this.$store.state.playMsg) {
        case 1:
          while (this.$store.state.musicIndex == Math.floor(Math.random() * this.$store.state.musicId.length)) {
            this.$store.state.musicIndex = Math.floor(Math.random() * this.$store.state.musicId.length)
          }
          break;
        case 2:
          audio.loop = true;
          break;
        case 3:
          this.nextMusic();
          break;
      }
    })
    //音乐全部时长
    this.allTime();
    audio.addEventListener("timeupdate", this.timeupdate)
  },
  watch: {
    "$store.state.musicPlay"() {
      // console.log(this.$store.state.musicIndex);
      this.$store.state.Playflag = true
      let audio = document.querySelector("audio")
      if (audio.readyState > 0) {
        let m = parseInt(audio.duration / 60, 10);
        let s = parseInt(audio.duration % 60, 10);
        this.step = m * 60 + s
        this.endtime = m + ":" + s
      }
      let id = this.$store.state.musicId[this.$store.state.musicIndex];
      document.querySelector("audio").src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.$store.state.Playflag = true;
    }
  }

}
</script>
<style scoped>
.lyric {
  color: rgb(180, 180, 180);
  font-size: 4.5vw;
  height: 6vh;
}
.new {
  font-size: 5.5vw !important;
  color: rgb(255, 255, 255) !important;
}
header {
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}
.title {
  color: rgb(200, 200, 200);
  width: 70vw;
  font-size: 4.8vw;
  font-weight: 500;
}
.exit,
.share {
  margin-top: 3.5vh;
  width: 100%;
  height: 100%;
  flex: 1;
}
.iconfont {
  color: rgb(200, 200, 200);
}
.bg {
  position: absolute;
  z-index: -10;
  width: 100vw;
  height: 100vh;
  background-color: rgb(40, 44, 52);
  opacity: 0.8;
}
ul {
  margin: auto;
  width: 70vw;
  height: 75vh;
  overflow: scroll;
}
ul li {
  padding: 3vw;
  text-align: center;
}
ul::-webkit-scrollbar {
  display: none;
}
.slider {
  margin-top: 3vh;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}
.slider .main {
  width: 65vw;
}
.start,
.end {
  flex: 1;
}
.control {
  position: absolute;
  bottom: 2vh;
  display: flex;
  justify-content: center;
  width: 100vw;
}
.control .box {
  /* : 2vw; */
  display: flex;
  align-items: center;
  text-align: center;
}
.control div .iconfont {
  font-size: 12vw;
}
.icon-bofang {
  margin: auto;
}
</style>