<template>
  <div style="background-color: beige">

    <input v-model="userName" type="text"/>
    <input v-model="userPwd" type="password"/>
    <el-button v-on:click="login($router)">登录</el-button>
    {{ message }}

    <div class="mask" v-show="loginIng"></div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapFields} from 'vuex-map-fields'

export default {
  name:'login',
  computed:{
    ...mapFields('login', [
      'userName',
      'userPwd',
      'loginIng',
      'message'
    ])
  },
  methods:{
    ...mapActions('login', [
      'login'
    ])

  }
}
</script>

<style scoped>
.mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background-color: rgba(100, 100, 204, 0.1);
}
</style>
