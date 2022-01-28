<template>
  <div>

    <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" :default-expand-all="true"
             node-key="title">
      <template #default="{ node }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <font-awesome-icon @click="toAppend(node)" icon="plus" class="icon"/>
              <font-awesome-icon @click="toEdit(node)" icon="edit" class="icon"/>
              <font-awesome-icon :class="{disable:node.data.children}" @click="!node.data.children && trash(node)"
                                 icon="trash"
                                 class="icon"/>

            </span>
          </span>
      </template>
    </el-tree>

    <button @click="save">save</button>

    <form-dialog ref="routerDialog" :submit-fn="submitFn" :after-submit-fn="()=>{}">
      <template v-slot:body>
        <router-form :routerFormData="formData" @clear="clear"/>
      </template>
    </form-dialog>

  </div>
</template>

<script>
import {getCurrentInstance, onMounted, ref} from "vue";
import db from "../../../utils/localStorage.db.utils";
import to from "await-to-js";
import apis from '../../../apis'
import jsonpath from 'jsonpath'

export default {
  name:'index',
  setup:function () {

    const action = ref('add')
    const treeData = ref([])
    const formData = ref({})
    const currentNode = ref({})
    const instance = getCurrentInstance();
    const { proxy } = getCurrentInstance();
    const loadData = async() => {
      const token = db.get('token')
      const [err, {data}] = await to(apis.user.getRouterAndPermissions(token))
      if (err) {

      } else {
        treeData.value = [{title:'全部', children:data['routers']}]
      }
    }

    const toAppend = (node) => {
      clear()
      action.value = 'add'
      currentNode.value = node
      instance.ctx.$refs.routerDialog.openDialog()
    }
    const toEdit = (node) => {
      formData.value = node.data
      currentNode.value = node
      action.value = 'edit'
      instance.ctx.$refs.routerDialog.openDialog()
    }


    const append = async() => {
      // const [node] = jsonpath.query(treeData.value, `$..*[?(@.$treeNodeId==${currentNode.value.id})]`)
      const {data} = currentNode.value
      !data.children ? data.children = [] : ''
      data.children.push(formData.value)
      clear()
      return {type:true}
    }
    const edit = async() => {
      const [node] = jsonpath.query(treeData.value, `$..*[?(@.$treeNodeId==${currentNode.value.id})]`)
      return {type:true}
    }
    const trash = async (node) => {


      // const {parent} = node
      //
      // for (let i = 0; i < parent.data.children.length; i++) {
      //   if (parent.data.children[i].$treeNodeId == node.data.$treeNodeId) {
      //     parent.data.children.splice(i, 1)
      //   }
      // }

      console.log(proxy.$confirm);
      console.log(instance.proxy.$confirm);
      console.log(node.parent);

    }

    const submitFn = async(d, node) => {
      let data
      switch (action.value) {
        case 'add':
          data = await append(d)
          break
        case "edit":
          data = await edit(node)

          break
      }
      return data
    }

    const clear = () => {
      formData.value = {}
    }

    onMounted(() => {
      console.clear()
      loadData()

    })

    const defaultProps = {
      children:'children',
      label:'title',
    }

    const save = async() => {
      const [{children}] = treeData.value
      console.log(treeData.value)
      const [err, {data}] = await to(apis.router.updateRouter(children))
      if (err) {

      } else {
        console.log(data);
      }

    }


    return {
      treeData,
      defaultProps,
      formData,
      loadData,
      append,
      edit,
      trash,
      submitFn,
      toAppend,
      toEdit,
      clear,
      save,
    }
  },
  computed:{},
  methods:{}
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.icon {
  padding-right: 10px
}

.disable {
  opacity: 0.3
}
</style>
