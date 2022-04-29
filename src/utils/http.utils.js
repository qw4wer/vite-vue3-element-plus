import axios from 'axios'

const get = (options) => {
  const {url, parameter, header} = options

  return axios({
    method:'get',
    url:url,
    header:Object.assign({}, header),
    data:parameter
  })
}

const post = (options) => {
  const {url, data, header} = options
  return axios({
    method:'post',
    url:url,
    header:Object.assign({}, header),
    data:data,
  })
}

const upload = (options) => {
  const {url, data, header, uploadProgressCallback} = options
  return axios({
    method:'post',
    url:url,
    header:Object.assign({}, header),
    data:data,
    onUploadProgress:evt => {
      uploadProgressCallback && uploadProgressCallback(evt)
    },

  })


}

export default {
  get,
  post,
  upload
}
