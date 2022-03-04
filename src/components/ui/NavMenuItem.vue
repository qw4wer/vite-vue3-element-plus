<template>
  <div>
    <template v-for="(navMenu, index) in navMenus">
      <!-- 最后一级菜单 -->
      <el-menu-item v-if="!navMenu.children&&navMenu"
                    :data="navMenu" :index="(navMenu.path || '')" @click="selectMenu(navMenu)">
        <template #title>
          <font-awesome-icon :icon="navMenu.icon" class="icon"/>
          <span> {{ navMenu.title }}</span>
        </template>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-sub-menu v-if="navMenu.children&&navMenu"
                   :data="navMenu" :index="(parentIndex || 0 ) + '-' + index">
        <template #title>
          <font-awesome-icon :icon="navMenu.icon" class="icon"/>
          <span> {{ navMenu.title }}</span>
        </template>
        <!-- 递归 -->
        <nav-menu-item :navMenus="navMenu.children" @selectMenu="selectMenu"
                       :parent-index="(parentIndex || 0 ) + '-' + index"></nav-menu-item>
      </el-sub-menu>
    </template>
  </div>
</template>
<script>
export default {
  name:'NavMenuItem',
  props:['navMenus', 'parentIndex'],
  methods:{
    selectMenu:function (event) {
      this.$emit('selectMenu', event)
    }
  },
  data() {
    return {}
  },
  mounted() {
  }
}
</script>

<style scoped>
.icon {
  padding-right: 10px;
}
</style>
