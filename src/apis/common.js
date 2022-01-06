import httpUtils from '../utils/http.utils'

const urls = {
  processingRequest: '/api/common/processingRequest',
  getUrl: '/api/common/getUrl'
}

export default {
  processingRequest: (data) => {
    return httpUtils.post({
      url: urls.processingRequest,
      data: data
    })
  },
  getUrl: (data) => {
    return httpUtils.post({
      url: urls.getUrl,
      data: data
    })
  }
}
