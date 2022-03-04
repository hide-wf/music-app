<template>
  <div class="search">
    <header>
      <van-icon name="arrow-left" size="6vw" @click="()=>$router.go(-1)" />
      <input v-model="value" placeholder="请输入搜索关键词" @keydown.enter="search" />
    </header>
    <router-view></router-view>
  </div>
</template>

 <script>
import { ref, watch,  toRefs } from "vue";
import { useRouter } from 'vue-router'
import $store from "../../store/index";
import { request } from "../../api/request";
export default {
  setup() {
    let value = ref("");
    const router = useRouter();

    function search() {
      if (value.value) {
        $store.commit("getHistory", value.value);

        router.replace("/search/searchMain");
        request("/cloudsearch?keywords=" + value.value).then((res) => {
          $store.commit("getSearchMusic", res.data.result.songs);

        })
      }
    }

    let timer;
    watch(value, (newVal) => {
      router.replace("/search/searchList");
      if (!value.value) {
        router.replace("/search/searchHome");
      } else {
        clearTimeout(timer)
        timer = setTimeout(() => {
          request("/search/suggest?keywords=" + newVal).then((res) => {
            $store.commit("getSearchList", [...res.data.result.albums, ...res.data.result.songs])
          })
        }, 200);
      }
    });
    return {
      search,
      value,
    };
  },
}
</script>

<style scoped lang="less">
.search {
  overflow: hidden;
  width: 100vw;
}
header {
  margin-top: 1vh;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  height: 6vh;
}
input {
  align-items: center;
  width: 90vw;
  height: 4vh;
  text-indent: 2vw;
  border-radius: 30px;
  border: 1px solid blue;
}
</style>