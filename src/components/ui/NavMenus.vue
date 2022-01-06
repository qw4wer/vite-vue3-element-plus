<template>
    <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="activePath"
            router
    >

        <nav-menu-item :navMenus="navMenus" @selectMenu="selectMenu"></nav-menu-item>

    </el-menu>


</template>

<script>
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'

  export default {
    name: 'NavMenus',
    computed: {
      ...mapFields('nav', [
        'navMenus',
        'activePath'
      ])
    },
    methods: {
      ...mapActions('nav', [
        'selectMenu'
      ])
    }
  }
</script>

<style scoped>
    /*@import "~@fortawesome/fontawesome-free/css/all.css";*/
</style>
