import LuchRequest from 'luch-request'
// import { createSSRApp } from 'vue'
// import { h5Login } from '@/utils/html5Utils'
// import { removeStorageData } from '@/utils/uniUtil'

const $http = new LuchRequest()

// 初始化请求配置
$http.setConfig((httpConfig) => {
  /* httpConfig 为默认全局配置*/
  httpConfig = {
    ...httpConfig,
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 30000, // 30秒超时
    custom: {
      catch: true, // 是否返回错误信息
      toast: true, // 是否显示错误信息
      // 加载动画
      loading: false, // 是否显示加载动画
      loadingTxt: '拼命加载中', // 文字
      mask: true // 是否显示遮罩
    }
  }
  return httpConfig
})

// 是否刷新状态
let isRefreshing = false
// 队列数组
let subscribers = []
// 获取token后执行队列
function onAccessTokenFetched() {
  subscribers.forEach(callback => {
    callback()
  })
  subscribers = []
}
// 添加队列
function addSubscriber(callback) {
  subscribers.push(callback)
}
// 检测登录状态
function checkLoginStatus(config) {
  // 这需要添加一个开关，防止重复请求
  if (!isRefreshing) {
    refreshTokenRequst()
  }
  isRefreshing = true
  // 这个Promise函数很关键
  const retryOriginalRequest = new Promise(resolve => {
    addSubscriber(() => {
      resolve($http.request(config))
    })
  })
  return retryOriginalRequest
}

// 请求token
function refreshTokenRequst() {
  // #ifdef H5
  // h5Login().then(() => {
  //   onAccessTokenFetched()
  //   isRefreshing = false
  // }).catch((err) => {
  //   if (err === '登录失败') {
  //     uni.showToast({
  //       title: '刷新token错误',
  //       icon: 'none'
  //     })
  //   }

  //   return Promise.reject(new Error('请求错误'))
  // })
  // #endif
  // #ifdef MP
  // const authStore = useAuthStore()

  // authStore.wxLogin().then(() => {
  //   onAccessTokenFetched()
  //   isRefreshing = false
  // }).catch(() => {
  //   uni.showToast({
  //     title: '刷新token错误',
  //     icon: 'none'
  //   })
  //   return Promise.reject(new Error('请求错误'))
  // })
  // #endif
}

// 请求拦截
$http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  // 加载动画
  const { loading, loadingTxt, mask } = config.custom
  loading && uni.showLoading({
    title: loadingTxt,
    mask: mask
  })

  // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
  config.data = config.data || {}

  // const authStore = useAuthStore()

  // // token存在，添加进请求头
  // if (authStore.token) {
  //   config.header.Authorization = authStore.token
  // }
  // else { checkLoginStatus(config) }
  process.env.NODE_ENV === 'development' && console.log(config)
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

// 响应拦截
$http.interceptors.response.use((response) => {
  uni.hideLoading()

  let data = response.data
  process.env.NODE_ENV === 'development' && console.log(data)
  // #ifdef H5
  data = typeof data === 'string' ? JSON.parse(data) : data
  // #endif

  // const userStore = useUserStore()
  // const authStore = useAuthStore()

  // 自定义参数
  const custom = response.config?.custom
  if (Number(data.errorCode) !== 0) {
    const errorStatus = {
      // 301: () => {
      //   emptyUserInfo()

      //   uni.navigateTo({
      //     url: '/pages/index/index'
      //   })
      // },
      // 302: () => {
      //   if (data.data) {
      //     uni.navigateTo({
      //       url: data.data
      //     })
      //   } else {
      //     uni.navigateBack()
      //   }
      // },
      402: () => {
        // 未绑定学生信息
        uni.reLaunch({
          url: `/pages/login/login`
        })
      }
      // 404: () => {
      //   uni.navigateBack()
      // },
      // 100009: () => {
      //   emptyUserInfo()

      //   uni.navigateTo({
      //     url: '/pages/index/index'
      //   })
      // }

    }
    // 401单独处理
    if (Number(data.errorCode) === 401) {
      // userStore.emptyUserInfo()
      // authStore.emptyToken()
      // #ifdef H5
      // removeStorageData('code')
      // #endif

      // 请求token
      return checkLoginStatus(response.config)
    } else if (custom?.toast) {
      // 是否显示错误信息弹窗
      zShowModal({
        content: data.msg,
        success: (res) => {
          if (res.confirm && errorStatus[Number(data.errorCode)]) {
            errorStatus[Number(data.errorCode)]()
          }
        }
      })
    } else {
      if (errorStatus[Number(data.errorCode)]) {
        return errorStatus[Number(data.errorCode)]()
      }
    }

    // 如果需要catch返回，则进行reject
    if (custom?.catch) {
      return Promise.reject(data)
    } else {
      // 否则返回一个pending中的promise，请求不会进入catch中
      return new Promise(() => {})
    }
  }

  // return data.data === undefined ? {} : data.data
  return data
}, (error) => {
  uni.hideLoading()

  const { config: { custom, params, url, data: routeData }, statusCode, errMsg, data, header } = error
  console.log(error)

  let content = '无法获取数据，请检查您的设备网络'
  if (statusCode) {
    const statusObj = {
      0: '网络错误，请检查网络重试',
      1: '请求超时，请刷新重试!',
      2: '文件保存失败，请重新保存'
    }
    content = statusObj[statusCode] ?? `请求错误:${statusCode}，请联系管理员！`
  }

  // 是否显示错误信息弹窗
  if (custom?.toast) {
    zShowModal({ content })
  }

  // 收集错误信息, 排除日志接口
  // if (!custom?.isLog) {
  //   const app = createSSRApp()
  //   // const { proxy } = getCurrentInstance()
  //   app.config.errorHandler({
  //     statusCode,
  //     message: errMsg,
  //     api: { url, data: routeData, params },
  //     response: { data, header }
  //   })
  // }

  // 如果需要catch返回，则进行reject
  if (custom?.catch) {
    return Promise.reject(error?.data ?? error)
  } else {
    // 否则返回一个pending中的promise，请求不会进入catch中
    return new Promise(() => {})
  }
})

export default $http
