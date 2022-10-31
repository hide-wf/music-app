<template>
  <van-form @submit="onSubmit" class="login">
    <h2>账号密码登录</h2>
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ required: true, message: '快tm把密码填上' }]"
      />
    </van-cell-group>
    <div style="margin:2vh auto;width:80vw">  
      <van-button round block type="primary" native-type="submit">登录</van-button>
    </div>
    <div class="loginType">
      <van-button round type="success" class="ponBtn" @click="$router.replace('/phoneLogin')">手机号码登录</van-button>
      <van-button
        round
        block
        type="danger"
        class="codeBtn"
        @click="$router.replace('/codeLogin')"
      >扫码登录</van-button>
    </div>
  </van-form>
  <div class="bg"></div>
</template>

<script>
import { ref } from "vue";
import { request } from "../../../api/request";
import { useRouter } from 'vue-router';
import $store from '../../../store/index'
export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter()
    const onSubmit = (values) => {
      request(`/login/cellphone?phone=${values.用户名}&password=${values.密码}`).then((res) => {
        if (res.data.code == 200) {
          $store.commit("login", res.data);
          router.replace("/user");
        } else {
          alert("登录失败");
        }
      })
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
}
</script>

<style scoped>
.login {
  margin-top: 15vh;
}
h2 {
  text-align: center;
  padding: 5vh;
  /* background-color: #fff; */
  /* color:  ; */
  font-weight: 600;
}
.bg {
  z-index: -1;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: rgba(100, 100, 100, 0.5); */
}
.loginType {
  position: relative;
  margin: 1vh auto;
  width: 80vw;
}
.ponBtn {
  width: 40vw;
  position: absolute;
  top: 0;
  left: 0;
}
.codeBtn {
  width: 40vw;
  position: absolute;
  top: 0;
  right: 0;
}
</style>