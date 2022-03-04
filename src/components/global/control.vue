<template>
  <div>
    <h4 style="width:100vw ; height: 4vh;">
      当前播放
      <span>{{ $store.state.musicIndex + 1 }}</span>
    </h4>
    <div class="grid">
      <main>
        <div class="way">
          
          <span class="iconfont icon-suijibofang01" style="margin-left: 3vw"></span>
          <span>随机播放</span>
        </div>
      </main>
      <main>
        <div class="way way2">
          <span class="iconfont icon-lajitong"></span>
        </div>
      </main>
    </div>
    <footer>
      <div class="list" v-for="(item, i) in $store.state.musicName" :key="i">
        <div class="name sizeOne" @click="Cipmusic(i)">{{ item }}</div>
        <div class="del" @click="del(i)">
          <van-icon name="cross" color="rgb(100,100,100)" size="4vw" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    data() {
        return {
          
        };
    },
    methods: {
        Cipmusic(i) {
            this.$store.state.musicIndex = i;
            this.$store.state.musicPlay++;
        },
        del(i) {
            this.$store.state.musicId.splice(i, 1);
            this.$store.state.musicImg.splice(i, 1);
            this.$store.state.musicName.splice(i, 1);
            this.$store.state.musicIndex--;
        }
    },
    watch: {}
};
</script>

<style scoped>
h4{
  margin-top: 2vh;
  text-align: center;
}
h4 span {
  font-size: 3vw;
  font-weight: 600;
  color: rgb(150, 150, 150);
}
.grid {
  width: 100vw;
  height: 6vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.grid main {
  position: relative;
  width: 100%;
  height: 100%;
}
.way {
  margin-top: 1vh;
  display: flex;
  align-items: center;
}
.way2 {
  margin-right: 3vw;
  justify-content: end;
}
.way span {
  margin-left: 2vw;
}
.iconfont {
  color: rgb(50, 50, 50);
  font-size: 6.5vw;
}
footer {
  margin-left: 5vw;
  width: 100vw;
}
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: start;
  width: 90vw;
  height: 6vh;
}
.name {
  display: flex;
  align-items: center;
  padding: 2vw;
  width: 80vw;
  height: 100%;
  border-radius: 3vw;
  border-bottom: 1px solid blue;
}
</style> 