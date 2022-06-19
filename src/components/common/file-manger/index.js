import {computed, onMounted, ref, toRefs, watch} from "vue"
import httpUtils from '../../../utils/http.utils'

import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import to from "await-to-js";


export const fileManger = (props) => {
  const {requestUrl} = toRefs(props)
  const route = useRoute()
  const router = useRouter()

  const path = ref()
  const tableData = ref([])
  const breadcrumbList = ref(['root'])
  const selectRows = ref([])
  const optionShow = computed(() => {
    return selectRows.value.length > 0 ? true : false
  })

  const fileTableRef = ref()

  onMounted(async() => {
    path.value = route.query.path || ''
  })

  watch(path, async(path, oldPath) => {

    breadcrumbList.value = ['root']
    const strings = path.split("\\")
    for (let string of strings) {
      breadcrumbList.value.push(string)
    }
    await router.push({
      query:{
        path:path
      }
    })
    await loadFileList(path)
    selectRows.value = []
  })

  onBeforeRouteUpdate(async(to, from) => {
    path.value = to.query.path
  })


  const selectFile = async(row) => {
    if (row.isDir) {
      let toPath = ''
      if (path.value) {
        toPath = `${path.value}\\${row.name}`
      } else {
        toPath = row.name
      }
      path.value = toPath
    }
  }

  const selectPath = async(index) => {
    let strings = path.value.split("\\")
    strings = strings.slice(0, index)
    path.value = strings.join("\\")
  }


  const loadFileList = async(path) => {
    const [err, data] = await to(httpUtils.post({
      url:requestUrl.value,
      data:{
        path:path
      }
    }))

    if (err) {

    }
    tableData.value = data.data.res
  }

  const downloadFile = async() => {
    const [err, res] = await to(httpUtils.down({
      url:'http://127.0.0.1:3000/api/files/downFile',
      data:{path:`${path.value}\\${selectRows.value[0].name}`},
      downloadProgress:(evt) => {
        console.log(evt)
      }
    }))
    if (err) {

    }
    const {data, headers} = res
    let filename = ''
    if (headers['content-disposition']) {
      filename = headers['content-disposition'].match(/filename\*=(.*)/)[1]; // 获取filename*的值
      filename = decodeURIComponent(filename.substring(7)) // 这个下标6就是UTF-8''
    }

    let blob = new Blob([data]); // 为blob设置文件类型，这里以.xlsx为例
    let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
    let a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    // 释放这个临时的对象url
    window.URL.revokeObjectURL(url);
  }
  const downloadPack = async() => {
    const selectPath = {multiple:[]}
    selectRows.value.forEach(value => {
      selectPath.multiple.push(`${path.value}\\${value.name}`)
    })

    console.log(selectPath);

    const [err, res] = await to(httpUtils.down({
      url:'http://127.0.0.1:3000/api/files/multipleDownByZip',
      data:selectPath,
      downloadProgress:(evt) => {
        console.log(evt)
      }
    }))
    if (err) {
    
    }
    const {data, headers} = res
    let filename = ''
    if (headers['content-disposition']) {
      filename = headers['content-disposition'].match(/filename\*=(.*)/)[1]; // 获取filename*的值
      filename = decodeURIComponent(filename.substring(7)) // 这个下标6就是UTF-8''
    }
    
    let blob = new Blob([data]); // 为blob设置文件类型，这里以.xlsx为例
    let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
    let a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    // 释放这个临时的对象url
    window.URL.revokeObjectURL(url);
  }

  const rowClick = (row, column, event) => {
    fileTableRef.value.toggleRowSelection(row)
  }

  const selectionChange = (selection) => {
    selectRows.value = selection
  }


  return {
    selectFile,
    selectPath,
    rowClick,
    selectionChange,
    downloadFile,
    downloadPack,
    tableData,
    breadcrumbList,
    optionShow,
    fileTableRef
  }

}
