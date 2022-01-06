<template style="height: 100%;">
    <el-container style="height: 100%">
        <el-header class="top"></el-header>
        <el-container style="height: 100%">
            <el-aside width="250px">
                <nav-menus/>
            </el-aside>
            <el-main class="main">
                <Tabs/>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

  export default {
    name: 'MainLayout',
  }
</script>

<style scoped>
    .top {
        /*background-color: #66ccff;*/
        line-height: 20px;
        text-align: center;

    }

    .tab {
        background-color: #000000;
        line-height: 10px;
    }

    .el-aside {
        background-color: #4c4c4c;
        color: #333;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        height: auto;
    }

    .main {
        padding: 0px;
    }

</style>
