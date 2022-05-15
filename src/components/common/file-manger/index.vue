<template>
  <div class="manger">
    <div class="main">
      <!--  面包屑路径    -->
      <el-breadcrumb separator="/" style="margin-left: 15px">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
          <el-link @click="selectPath(index)">{{ item }}</el-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-table ref="fileTableRef" :data="tableData" style="width: 100%" @row-click="rowClick"
                @selection-change="selectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="文件名" min-width="50%" prop="name">
          <template #default="scope">
            <font-awesome-icon :icon="scope.row.isDir? 'folder':'file'" class="icon"/>
            <el-link @click.stop="selectFile(scope.row)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="大小" min-width="15%" prop="size"/>
        <el-table-column align="center" label="日期" min-width="20%" prop="modTime"/>
      </el-table>
    </div>
    <div :class="{open:optionShow}" class="options">
      <div><span>操作</span></div>
      <el-button size="large" type="primary" @click="downloadFile">下载</el-button>
      <el-button size="large" type="primary" @click="downloadPack">打包</el-button>
      <el-button size="large">预览</el-button>
      <el-button size="large">删除</el-button>
    </div>
  </div>
</template>

<script>
import {fileManger} from "../file-manger";

export default {
  name:"file-manger",
  setup(props) {
    return {...fileManger(props)}
  },
  props:{
    requestUrl:{
      default:'',
      type:String
    }
  }
}
</script>

<style scoped>
.icon {
  padding-right: 10px
}

.manger {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  width: 100%;

}

.manger .main {
  flex-basis: 100%;
  -webkit-box-flex: 0;
  flex-grow: 0;
  overflow-x: hidden;
}

.manger .options {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  width: 0;
  transition-duration: 0.3s;
  border-color: #dddede;
  border-style: solid;
  border-width: 0;
  border-radius: 3px;
  align-content: space-between
}

.manger .options * {
  margin-top: 10px;
}

.manger .options.open {
  width: 150px;
  opacity: 1;
  border-left-width: 1px;
}

.el-button + .el-button {
  margin-left: 0px !important;
}

</style>
