import { computed, onMounted, ref, toRefs, watch } from "vue"
import httpUtils from '../../../utils/http.utils'

import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import to from "await-to-js";


export const fileManger = (props) => {
  const { requestUrl, downloadFileUrl, multipleDownByZipUrl, previewUrl } = toRefs(props)
  const route = useRoute()
  const router = useRouter()

  const path = ref()
  const id = ref()
  const tableData = ref([])
  const breadcrumbList = ref(['root'])
  const selectRows = ref([])
  const canPerview = computed(() => {
    if (selectRows.value.length == 1) {
      const [one] = selectRows.value
      return !one.isDir
    }
    return false
  })
  const canDownFile = computed(() => {
    if (selectRows.value.length == 1) {
      const [one] = selectRows.value
      return !one.isDir
    }
    return false

  })
  const optionShow = computed(() => {
    return selectRows.value.length > 0 ? true : false
  })

  const fileTableRef = ref()

  onMounted(async () => {
    path.value = route.query.path || ''
    id.value = route.query.id || 0
  })

  watch(path, async (path, oldPath) => {

    breadcrumbList.value = ['root']
    const strings = path.split("\\")
    for (let string of strings) {
      breadcrumbList.value.push(string)
    }
    await router.push({
      query: {
        path: path,
        id: id.value
      }
    })
    await loadFileList(id, path)
    selectRows.value = []
  })


  onBeforeRouteUpdate(async (to, from) => {
    path.value = to.query.path
  })


  const selectFile = async (row) => {
    if (row.isDir) {
      let toPath = ''
      if (path.value) {
        toPath = `${path.value}\\${row.name}`
      } else {
        toPath = row.name
      }
      path.value = toPath
    } else {
      fileTableRef.value.toggleRowSelection(row)
    }

  }

  const selectPath = async (index) => {
    let strings = path.value.split("\\")
    strings = strings.slice(0, index)
    path.value = strings.join("\\")
  }


  const loadFileList = async (id, path) => {
    const url = requestUrl.value + `/${id.value}`
    const [err, data] = await to(httpUtils.post({
      url: url,
      data: {
        path: path
      }
    }))

    if (err) {

    }
    tableData.value = data.data.res
  }

  const downloadFile = async () => {
    const [err, res] = await to(httpUtils.down({
      url: downloadFileUrl.value +  `/${id.value}`,
      data: { path: `${path.value}\\${selectRows.value[0].name}` },
      downloadProgress: (evt) => {
        console.log(evt)
      }
    }))
    if (err) {

    }
    const { data, headers } = res
    let filename = ''
    if (headers['content-disposition']) {
      filename = headers['content-disposition'].match(/filename\*=(.*)/)[1]
      filename = decodeURIComponent(filename.substring(7))
    }

    let blob = new Blob([data])
    let url = window.URL.createObjectURL(blob)
    let a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()

    window.URL.revokeObjectURL(url)
  }
  const downloadPack = async () => {
    const selectPath = { multiple: [] }
    selectRows.value.forEach(value => {
      selectPath.multiple.push(`${path.value}\\${value.name}`)
    })

    const [err, res] = await to(httpUtils.down({
      url: multipleDownByZipUrl.value + `//${id.value}`,
      data: selectPath,
      downloadProgress: (evt) => {
        console.log(evt)
      }
    }))
    if (err) {

    }
    const { data, headers } = res
    let filename = ''
    if (headers['content-disposition']) {
      filename = headers['content-disposition'].match(/filename\*=(.*)/)[1]
      filename = decodeURIComponent(filename.substring(7))
    }

    let blob = new Blob([data])
    let url = window.URL.createObjectURL(blob)
    let a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()

    window.URL.revokeObjectURL(url)
  }

  const preview = async () => {
    window.open(`${previewUrl.value}\\${id.value}\\${path.value}\\${selectRows.value[0].name}`)
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
    preview,
    tableData,
    breadcrumbList,
    optionShow,
    canPerview,
    canDownFile,
    fileTableRef
  }

}
