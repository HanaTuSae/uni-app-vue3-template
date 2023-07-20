import { useRouterBefore, useRouterAfter } from './index.js'

uni.addInterceptor('navigateTo', {
  invoke(result) {
    // nextTick(() => {
    return linsInko({
      path: result.url,
      context: null,
      openType: 'navigateTo'
    })
    // })
  }
  // success(result) {

  // }
})
uni.addInterceptor('redirectTo', {
  invoke(result) {
    // nextTick(() => {
    return linsInko({
      path: result.url,
      context: null,
      openType: 'redirectTo'
    })
    // })
  }
  // success(result) {
  //   const pages = getCurrentPages().pop()
  //   const path = pages?.route ?? ''
  //   // const msg = result.errMsg ?? ''
  //   // const opentype = msg.split(':')[0] ?? ''
  //   return linsInko({
  //     path: path,
  //     context: null,
  //     openType: 'redirectTo'
  //   })
  // }
})
uni.addInterceptor('reLaunch', {
  invoke(result) {
    return linsInko({
      path: result.url,
      context: null,
      openType: 'reLaunch'
    })
  }
  // success(result) {
  //   const pages = getCurrentPages().pop()
  //   const path = pages?.route ?? ''
  //   // const msg = result.errMsg ?? ''
  //   // const opentype = msg.split(':')[0] ?? ''
  //   // 这里的链接是去往的链接
  //   return linsInko({
  //     path: path,
  //     context: null,
  //     openType: 'reLaunch'
  //   })
  // }
})
uni.addInterceptor('switchTab', {
  invoke(result) {
    return linsInko({
      path: result.url,
      context: null,
      openType: 'switchTab'
    })
  }
  // success(result) {
  //   const pages = getCurrentPages().pop()
  //   const path = pages?.route ?? ''
  //   // const msg = result.errMsg ?? ''
  //   // const opentype = msg.split(':')[0] ?? ''
  //   // 这里的链接是去往的链接
  //   return linsInko({
  //     path: path,
  //     context: null,
  //     openType: 'switchTab'
  //   })
  // }
})
uni.addInterceptor('navigateBack', {
  invoke(result) {
    // nextTick(() => {
    const pages = getCurrentPages().pop()
    const path = pages?.route ?? ''
    // const msg = result.errMsg ?? ''
    // const opentype = msg.split(':')[0] ?? ''
    // 这里返回的链接是返回前的链接，并非返回后的链接。
    // 这里在h5端不需要监测，因为有全局监测实现。
    // #ifndef H5
    return linsInko({
      path: path,
      context: null,
      openType: 'navigateBack'
    })
    // #endif
    // })
  },
  success(result) {

  }
})
// #ifdef H5
window.addEventListener('popstate', (ev) => {
  if (ev.state) {
    linsInko({
      path: ev.state.forward,
      context: null,
      openType: 'navigateBack'
    })
  }
})
// #endif

// 路由拦截
function linsInko(obj) {
  obj.path = obj.path[0] === '/' ? obj.path.substr(1) : obj.path
  return useRouterBefore(obj)
}
