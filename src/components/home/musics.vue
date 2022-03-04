 <template>
  <div class="musics">
    <div class="musics-title">
      <span class="left-title">发现好歌单</span>
      <span class="right-title">查看更多</span>
    </div>
    <!-- 歌单 -->
    <div class="auto">
      <div class="musics-main">
        <router-link
          :to="{ path: '/listMusic', query: { id: item.id } }"
          class="outsize"
          v-for="(item, i) in result"
          :key="i"
        >
          <div class="img">
            <img :src="item.picUrl" alt />
          </div>
          <div class="bottom-text size">{{ item.name }}</div>
        </router-link>
        <!--  ------------------------------------------------ -->
      </div>
    </div>
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
    request("/personalized?limit=7").then((res) => {
      this.result = res.data.result;
    })
  },
}
</script>

<style scoped>
.musics {
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
  /* border: 1px solid pink; */
  height: 30vh;
}
.musics .musics-title {
  display: flex;
  justify-content: space-between;
}
.musics-title span {
  margin: 3vw;
}
.left-title {
  font-size: 4.5vw;
  font-weight: 600;
  font-family: "微软雅黑";
}
.right-title {
  padding: 1vw;
  border: 1px solid rgb(75, 69, 69);
  border-radius: 5vw;
}
/* 歌单  */
.auto {
  flex: 1;
  width: 100vw;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.auto::-webkit-scrollbar {
  display: none;
}
.musics-main {
  width: 130vh;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
}
.musics-main .outsize {
  display: flex;
  flex-direction: column;
  width: 15vh;
  height: 22vh;
}
.musics-main .outsize .img {
  width: 15vh;
  height: 15vh;
}
.musics-main .outsize .img img {
  border-radius: 3vw;
  width: 15vh;
  height: 15vh;
}
.bottom-text {
  font-weight: 600;
  margin-top: 1vh;
  font-size: 3.2vw;
}
</style>