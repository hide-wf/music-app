<template>
  <div class="tracks">
    <div class="btn">
      <div>
        <span class="iconfont icon-yunhang" @click="allPlay"></span>
        <span class="textMeg">
          播放全部
          <span class="num">(共{{ tracks.length }}首)</span>
        </span>
      </div>
      <div>
        <van-button type="primary" class="vant-btn"
          >+ 收藏 ({{ changValue() }})</van-button
        >
      </div>
    </div>
    <div class="tracks-main">
      <div v-for="(item, i) in tracks" :key="i">
        <div class="music-box">
          <div class="quantity">{{ i + 1 }}</div>
          <div class="music-name" @click="getId(i)">
            <span class="bold">{{ item.name }}</span>
            <span class="simple">{{ item.al.name }}</span>
          </div>
          <div class="musci-set">
            <span class="iconfont icon-diandiandianshu"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="playmusicbox"></div>
  </div>
</template>

<script>
// import { musicList } from "../../api/musicList";
import { request } from "../../api/request";
export default {
  data() {
    return {
      playlist: {},
      tracks: [],
    };
  },
  methods: {
    allPlay() {
      console.log(111);
    },
    getId(i) {
      this.$store.state.isPlay = true;
      this.$store.commit("musicId", this.tracks[i].id);
      this.$store.commit("musicImg", this.tracks[i].al.picUrl);
      this.$store.commit("musicName", this.tracks[i].name);
    },
    changValue() {
      let n = this.playlist.subscribedCount;
      if (n > 10000) {
        n = Math.floor(n / 10000) + "万";
        return n;
      } else {
        return n;
      }
    },
  },
  activated() {
    request({
      url: "/playlist/detail?id=" + this.$route.query.id,
      method: "get",
    }).then((res) => {
      this.playlist = res.data.playlist;
      this.tracks = res.data.playlist.tracks;
    });
  },
  mounted() {},
};
</script>

<style scoped>
.tracks .btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 8vh;
}
.tracks .btn div {
  display: flex;
  align-items: center;
}
.tracks .btn div {
  margin: 3vw;
}
.vant-btn {
  width: 30vw;
  height: 5vh;
  white-space: nowrap;
  border-radius: 20px;
}
.textMeg {
  margin-left: 2vw;
  font-size: 5vw;
}
.num {
  font-size: 4vw;
  color: rgba(200, 200, 200, 0.9);
}
/* <= top  */
/* ------------------------ */
/* main => */

.music-name {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70vw;
  height: 7vh;
}
.music-name div {
  flex: 1;
  border: 1px solid red;
}
.tracks-main .music-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 8vh;
}
.quantity,
.musci-set {
  font-size: 6vw;
  flex: 1;
  text-align: center;
}
.musci-set .icon-diandiandianshu {
  font-size: 8vw;

  color: rgba(180, 180, 180, 1);
}
.bold {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 4.5vw;
}
.simple {
  color: rgb(150, 150, 150);
  font-size: 3vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playmusicbox {
  width: 100vw;
  height: 10vh;
}
</style>
