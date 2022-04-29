<template>

  <el-dropdown style="padding-right: 10px">
    <el-button type="primary">
      上传
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="selectFile">上传文件</el-dropdown-item>
        <el-dropdown-item @click="selectFolder">上传文件夹</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <input ref="folderWarp" style="display: none" type="file" webkitdirectory multiple @change="onSelect">
  <input ref="fileWarp" style="display: none" type="file" @change="onSelect">
  <el-button @click="upload">开始上传</el-button>
  <div @scroll="scrollListener" class="list-wrap" :style="{height:showHeight}" ref="warp">
    <div :style="{height:maxHeight}"></div>
    <ul :style="{top:showTop}" class="list">
      <li v-for="item in showList" :key="item" :style="{width: warpWidth}">
        <div>
          <a>
            <el-icon>
              <font-awesome-icon icon="file" class="icon"/>
            </el-icon>
            <span>{{ item.name }}</span>
            <el-progress :percentage="item.percentage"
                         :class="{progressHide:item.status==='ready' }">
              <template #default="scope">
                <span v-if="scope.percentage < 100 && item.status!='error'">{{
                    parseFloat(scope.percentage).toFixed(2) + '%'
                  }}
                </span>
                <font-awesome-icon v-if="item.status==='error'" icon="close"/>
                <font-awesome-icon v-if="item.status==='success'" icon="check"/>
              </template>
            </el-progress>
          </a>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import {init} from './index'

export default {
  name:"upload",
  props:{
    url:String,
    multiple:{
      type:Boolean,
      default:false
    },
    limit:{
      type:Number,
      default:10
    },
    basePath:{
      type:String,
      default:''
    }
  },
  setup(props) {

    return {...init(props)}
  },
}
</script>

<style scoped>
li {
  list-style: none;
}

.progressHide {
  visibility: hidden
}

.list-wrap {
  position: relative;
  overflow-y: scroll;
}

.list {
  position: absolute;
  top: 0;
  left: 0;
  /*max-height: 200px;*/
  /*overflow-y: auto*/
}


</style>
