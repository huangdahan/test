import axios from 'axios'
// import config from './config'
import baseUrl from '@/api/proxy'
import config from '@/api/config'

// 引入  post  跨越
// 测试地址
axios.defaults.baseURL = baseUrl.baseUrl
//axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'};


axios.interceptors.request.use( // 这是拦截器设置tokne
config => {
    console.log('config', config)
//  sessionStorage.setItem("token", null);
    var tokenshow = sessionStorage.getItem("token");
    let token = tokenshow;
    if (token) { //  判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token
    }
    if (config.url.indexOf(baseUrl.baseUrl) === -1) {
      let getTimestamp = new Date().getTime()
      if (config.url.indexOf('?') > -1) {
        config.url = baseUrl.baseUrl + config.url + '&timestamp=' + getTimestamp
      } else {
        config.url = baseUrl.baseUrl + config.url + '?timestamp=' + getTimestamp
      }
      console.log('config.url', config.url)
    }else {
      let getTimestamp = new Date().getTime()
      if (config.url.indexOf('?') > -1) {
        config.url = config.url + '&timestamp=' + getTimestamp
      } else {
        config.url = config.url + '?timestamp=' + getTimestamp
      }
      console.log('config.url', config.url)
    }
    return config
},
err => {
    alert(err)
    return Promise.reject(err)
})
axios.interceptors.response.use(
response => { // 在这里可以设置请求成功的一些设置
  if ( response.success === 200) {

  };
  return response;
},
error => { // 在这里设置token过期的跳转
  console.log('设置token失效', error)
})

var http = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl.baseUrl + url, params, config).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        console.log('GET异常信息', error)
        resolve({success: false, errCode: 500})
        // reject(error)
      })
    })
  },
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  post (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, config).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        console.log('POST异常信息', error)
        resolve({success: false, code: 10011})
      })
    })
  }
}
export default http
