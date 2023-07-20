// import { toUserPage } from '@/hooks/useUser'
// import { useAuthStore } from '@/store/auth'
// import { useUserStore } from '@/store/user.js'

// 白名单
// const whiteList = ['/pages/login/login']

/**
 * 路由访问前执行的函数
 * @param path 页面路径，不带前缀/
 */
export const useRouterBefore = (arg) => {
  // 每一个页面在初化前都会执行
  // const userStore = useUserStore()
  // const authStore = useAuthStore()
  console.log('路由：加载前', arg)

  return true

  // 已登录
  // if (whiteList.some(item => item.includes(arg.path)) || authStore.isLogin) {
  //   // console.log('已登录')
  //   return true
  // } else {
  //   console.log('路由：登录过期，清除用户信息')
  //   userStore.emptyUserInfo()
  //   authStore.emptyToken()

  //   // 未登录，且不是白名单，跳转至登录页 redirectTo navigateTo
  //   uni.redirectTo({
  //     url: `/pages/jumpLoginPage/jumpLoginPage`
  //   })

  //   return false
  // }
}
/**
 * 路由访问后执行的函数
 * @param path 页面路径，不带前缀/
 * @param opts 页面加载完成后返回的参数
 */
export const useRouterAfter = (arg) => {
  console.log('路由：加载后')
  // 每一个页面初始后都会执行
}
