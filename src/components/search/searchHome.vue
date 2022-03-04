<template>
  <main>
    <div class="history" v-show="$store.state.history.length > 0">
      <h5 style="width:10vw;font-size:5vw;font-weight:550;flex-shrink: 0;">历史</h5>
      <div class="text">
        <div 
        class="list-text" v-for="(item, i) in $store.state.history" :key="i"
        @click="searchHistory(item)"
        >{{ item }}</div>
      </div>
      <div>
        <van-icon @click="delHistory" name="delete-o" size="6vw" style="width:10vw" />
        <van-dialog showCancelButton overlay closeOnClickOverlay />
      </div>
    </div>
    <div style="margin-top:3vh">
      <h2>热搜榜</h2>
      <ul>
        <li v-for="(item, i) in hot" :key="i" class="sizeOne" @click="searchWord(item.searchWord)">
          <span style="margin:3vw;" :class="i < 3 ? 'toplist' : ''">{{ i + 1 }}.</span>
          <span :class="i < 3 ? 'toptext' : ''">{{ item.searchWord }}</span>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { ref } from '@vue/reactivity';
import { request } from "../../api/request";
import { search } from './search';
import { Dialog } from 'vant';
import $store from "../../store/index";
export default {
  name: "searchHome",
  setup() {
    let hot = ref([]);
    let show = ref(true);
    
    console.log($store.state.history.length > 1);

    request("/search/hot/detail").then((res) => {
      hot.value = res.data.data;
    })

    function searchWord(name) {
      search(name)
    }

    function delHistory() {
      Dialog.confirm({
        title: '是否确认删除',
        // theme: 'round-button',
      }).then(() => {
        $store.commit("getHistory", 1)
      });
    }
    function searchHistory(name){
      search(name)
    }
    return {
      show,
      hot,
      delHistory,
      searchWord,
      searchHistory
    }
  }

}
</script>

<style scoped>
main {
  height: 92vh;
}
.history {
  padding: 2vw;
  display: flex;
  justify-content: space-between;
  /* text-align: center; */
  align-items: center;
  height: 8vh;
}
.text {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 3vw;
  width: 80vw;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 8vh;

}
.list-text {
    flex-shrink: 0;
  padding: 2vw;
  margin: 2vw;
  height: 4vh;
  font-size: 4vw;
  border-radius: 50%;
  background-color: rgb(200, 200, 200);
  color: rgb(30, 30, 30);
}
.text::-webkit-scrollbar {
  display: none;
}
h2 {
  width: 100vw;
  text-align: center;
}
ul {
  margin-top: 2vh;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(10, 10%);
  align-items: center;
  width: 100vw;
  height: 50vh;
}
li {
  padding: 5vw;
}
.toplist {
  color: rgb(255, 0, 0);
  font-weight: 600;
}
.toptext {
  font-weight: 600;
}
</style>