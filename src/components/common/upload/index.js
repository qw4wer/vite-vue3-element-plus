import { computed, onMounted, ref, toRefs } from "vue"

import { mapLimit } from "async"
import to from "await-to-js";
import httpUtils from "../../../utils/http.utils"
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";


export const init = (props) => {
  const { url, multiple, limit, basePath } = toRefs(props)
  const id = ref()
  const start = ref(0)
  const route = useRoute()

  const end = computed(() => {
    return start.value + limit.value
  })
  const fileList = ref([])

  const showList = computed(() => fileList.value.slice(start.value, end.value))

  const maxHeight = computed(() => {
    return fileList.value.length * 36 + 'px'
  })

  const showHeight = computed(() => {
    return limit.value * 36 + 'px'
  })

  const showTop = computed(() => {
    return start.value * 36 + 'px'
  })

  const warpWidth = ref('0px')

  const warp = ref()
  const folderWarp = ref()
  const fileWarp = ref()

  onMounted(() => {
    warpWidth.value = `${warp.value.offsetWidth * 0.8}px`
    id.value = route.query.id || 0
  })

  const onSelect = (e) => {
    const { files } = e.target
    for (let i = 0; i < files.length; i++) {
      files[i].uid = Date.now() + i
      const uploadFile = {
        name: files[i].name,
        percentage: 0,
        status: "ready",
        size: files[i].size,
        raw: files[i],
        uid: files[i].uid
      }
      fileList.value.push(uploadFile)
    }
    e.target.value = ''
  }


  const multipleUpload = () => {

    const multipleArr = sliceArray(fileList.value, limit.value)

    mapLimit(multipleArr, 1, async (node) => {
      const percentage = ref(0)
      const status = ref('uploading')

      const formData = new FormData()
      node.forEach(value => {
        const { raw } = value
        let { webkitRelativePath } = raw
        value.percentage = percentage
        value.status = status
        formData.append("files", raw)
        if (webkitRelativePath == "") {
          webkitRelativePath = raw.name
        }
        formData.append("webkitRelativePath", `${basePath.value}${webkitRelativePath}`)
      })

      const [err] = await to(httpUtils.upload({
        url: `${url.value}\\${id.value}`,
        data: formData,
        uploadProgressCallback: (evt) => {
          percentage.value = Math.round(evt.loaded / evt.total * 100)
        }
      }))
      if (err) {
        status.value = 'error'
      } else {
        percentage.value = 100
        status.value = 'success'
      }

    })

  }

  const queueUpload = () => {
    mapLimit(fileList.value, limit.value, async (node) => {
      const { raw } = node
      let { webkitRelativePath } = raw
      const formData = new FormData()
      formData.append("file", raw)
      if (webkitRelativePath == "") {
        webkitRelativePath = raw.name
      }
      formData.append("webkitRelativePath", `${basePath.value}${webkitRelativePath}`)

      const [err] = await to(httpUtils.upload({
        url: `${url.value}\\${id.value}`,
        data: formData,
        uploadProgressCallback: (evt) => {
          node.status = 'uploading'
          node.percentage = Math.round(evt.loaded / evt.total * 100)
        }
      }))
      if (err) {
        node.status = 'error'
      } else {
        node.percentage = 100
        node.status = 'success'
      }
    }, (err, res) => {
      if (err) {
      } else {
      }
    })
  }

  const upload = () => {
    if (multiple.value) {
      multipleUpload()
    } else {
      queueUpload()
    }
  }

  const sliceArray = (arr, size) => {
    const res = [];
    for (let i = 0; i < arr.length; i = i + size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }

  const scrollListener = (e) => {
    start.value = Math.floor(e.target.scrollTop / 36);
  }

  const selectFile = () => {
    fileWarp.value.click()
  }
  const selectFolder = () => {
    folderWarp.value.click()
  }

  return {
    showList,
    fileList,
    upload,
    onSelect,
    scrollListener,
    maxHeight,
    showHeight,
    showTop,
    warp,
    warpWidth,
    fileWarp,
    folderWarp,
    selectFile,
    selectFolder
  }
}


