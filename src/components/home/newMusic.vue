<template>
  <div class="newMusic">
    <h3>推荐新音乐</h3>
    <ul style="margin-top:1.5vh">
      <li class="list" v-for="(item, i) in result" :key="i" @click="getId(i)">
        <div class="i">
          <img :src="item.picUrl" />
        </div>
        <div class="name sizeOne">
          <ul>
            <li style="font-size:5.6vw;">{{item.name}}</li>
            <li style="font-size:4vw;color:rgb(200,200,200)">{{item.song.album.company}}</li>
          </ul>
        </div>
        <div class="icon">
          <span class="iconfont icon-shipin-" style="color:rgb(100,100,100)"></span>
        </div>
      </li>
    </ul>
    <div style="height:10vh"></div>
  </div>
</template>

<script>
import { request } from '../../api/request';
export default {
  data() {
    return {
      result: []
    }
  },
  created() {
    request("/personalized/newsong").then((res) => {
      this.result = res.data.result;
  

    })
  },
  methods:{
     getId(i) {
      this.$store.state.isPlay = true;
      this.$store.state.Playflag = true
      this.$store.commit("musicId", this.result[i].id);
      this.$store.commit("musicImg", this.result[i].picUrl);
      this.$store.commit("musicName", this.result[i].name);
    },
  }
}
</script>

<style scoped>
h3 {
  margin-left: 2vw;
}
.list {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 11vh;
  font-size: 5vw;
  border-radius: 20px;
  border-bottom: 1px solid rgb(180, 180, 180);
}
.name {
  padding: 3vw;
  width: 65vw;
}
.name ul{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.i,
.icon {
  text-align: center;
  flex: 1;
  /* border: 1px solid red; */
}
.i img {
  width: 15vw;
  height: 15vw;
  border-radius: 10px;
}
</style>