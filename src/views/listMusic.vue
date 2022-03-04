<template>
  <div>
    <top></top>
    <user-msg></user-msg>
    <tracks></tracks>
  </div>
</template>

<script>
import top from '../components/common/top.vue';
import userMsg from '../components/common/userMsg.vue';
import tracks from '../components/common/tracks.vue';
export default {
  data() {
    return {
      id: ""
    }
  },
  created() {
    this.id = this.$route.query.id;  
  },
  components :{
    tracks,
    top,
    userMsg
  }
}
</script>

<style>
</style>