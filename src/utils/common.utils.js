import flat from 'flat'
import _ from 'lodash'

const filterAndAddRouter = (navMenus) => {
  const arr = []
  const flatten = flat.flatten(navMenus)
  Object.keys(flatten).forEach((k, i) => {
    if (k.indexOf('viewPath') !== -1) {
      let obj = _.get(navMenus, k.replace('.viewPath', ''))
      if (flatten[k] !== '') {
        arr.push({
          path: obj.path,
          viewPath: obj.viewPath,
          meta: {
            path: obj.path,
            title: obj.title
          },

          component: () => import(/* @vite-ignore */`/src/views/${obj.viewPath}`)
        })
      }
    }
  })

  return arr
}
/**
 * 传入数组，根据路径获取值并push入数组
 * @param obj
 * @param path
 * @returns {Array}
 */
const flatObjByPath = (obj, path) => {
  const arr = []
  _.flatMap(obj, (i) => {
    arr.push(_(i).get(path))
  })
  return arr
}

export default {
  filterAndAddRouter,
  flatObjByPath
}
