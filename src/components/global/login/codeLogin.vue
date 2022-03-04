<template>
  <div>
    <img :src="qrimg" alt="">
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { request } from "../../../api/request";
export default {
  setup() {
    let qrimg = ref("")
    request("/login/qr/key").then((res) => {
      console.log(res.data.data.unikey);
      request("/login/qr/create?key=" + res.data.data.unikey + "&qrimg=true").then((res) => {
                 qrimg.value  = res.data.data.qrimg
      })
      
    })
  return{
    qrimg
  }
  }
}
</script>

<style>
</style>