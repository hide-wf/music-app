<template>
  <div class="userMsg">
    <div class="topMain">
      <div class="left-img">
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="right-content">
        <div class="nameText size">{{ playlist.name }}</div>
        <div class="avatar">
          <img :src="avatar" alt />
          <span class="nickname">
            {{ nickname }}
            <span class="iconfont icon-dayuhao"></span>
          </span>
        </div>
        <div class="description size">{{ playlist.description }}</div>
      </div>
    </div>

    <div class="bottomTab">
      <div>
        <span class="iconfont icon-jianyi"></span>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div>
        <span class="iconfont icon-fenxiang-"></span>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div>
        <span class="iconfont icon-xiazai"></span>
        <span>下载</span>
      </div>
      <div>
        <span class="iconfont icon-duoxuankuang"></span>
        <span>分享</span>
      </div>
    </div>
  </div>
</template>

<script>
import { musicList } from "../../api/musicList.js";
export default {
  data() {
    return {
      playlist: {},
      avatar: "",
      nickname: "",
    };
  },
  activated() {
    musicList(this.$route.query.id).then((res) => {
      this.playlist = res.data.playlist;
      this.avatar = this.playlist.creator.avatarUrl;
      this.nickname = this.playlist.creator.nickname;
    });
  },
};
</script>

<style scoped>
.userMsg {
  position: relative;
  margin-top: 3vh;
  width: 100vw;
  height: 33vh;
}
.topMain {
  display: flex;
  margin: auto;
  overflow: hidden;
  width: 90vw;
  height: 18vh;
  /* border: 1px solid pink; */
}
.bottomTab {
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  /* border: 1px solid rebeccapurple; */
}
.bottomTab div {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.bottomTab div span:nth-child(2) {
  margin-top: 1vh;
}
.left-img img {
  width: 18vh;
  height: 18vh;
}
.right-content {
  flex: 1;
  margin-left: 2vw;
}
.nameText {
  margin-left: 3vw;
  font-weight: 600;
}

.nickname,
.description {
  margin-left: 3vw;
  font-size: 2.8vw;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* border: 1px solid blue; */
  margin: 2vw;
  height: 5vh;
}

.avatar img {
  border-radius: 50%;
  width: 7vw;
  height: 7vw;
}
.avatar .icon-dayuhao {
  font-size: 2vw;
  color: #666;
}
</style>
