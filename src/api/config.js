import Qs from 'qs'
// var sessionId = window.localStorage.getItem('sessionId')
// console.log('ss', sessionId)
import baseUrl from '@/api/proxy'
export default{

  // 请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
  url: '/route',
  // 基础url前缀
baseURL: baseUrl.baseUrl, // 测试环境
//   baseURL: 'http://120.27.251.109:8080', // 开发环境
  // baseURL: 'http://172.17.73.244:8089', // 开发环境 文德
  // baseURL: 'http://172.17.72.21:8089', // 开发环境 任光
  // baseURL: 'http://172.18.110.250:8089', // 开发环境 本地
  // 请求方法同上
  method: 'GET',

  transformRequest: [function (data) {
    // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
    data.CustData = JSON.stringify(data.CustData)
    // 由于使用的form-data传数据所以要格式化
    data = Qs.stringify(data)
    return data
  }],

  transformResponse: [function (data) {
    // 这里提前处理返回的数据
    return data
  }],
  
//var tokenshow = sessionStorage.getItem("token");

  // 请求头信息
  // x-www-form-urlencoded
  // headers: {'Content-Type': 'application/json', 'Authorization': '11111', 'Access-Control-Allow-Origin': '*'},
//headers: {'Content-Type': 'application/x-www-form-urlencoded'},

  // parameter参数
  params: {
    /* eid: 8484662,
    openid: '57c80528e4b07e300ed4ffbb',
    pubacckey: '',
    timestamp: '',
    nonce: '',
    pubaccid: '' */
  },

  paramsSerializer: function (params) {
    return Qs.stringify(params)
  },

  // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {
    // EID: '8484662',
    // Method: 'kis.APP003678.ueanalysis.UEStockAnalysis.',
    // NetID: '8484662159954',
    // CustData: {
    //   'Result': '',
    //   'ErrMsg': '',
    //   'AccountDB': '',
    //   'TotalPage': '',
    //   'CurrentPage': '1',
    //   'ItemsOfPage': '100',
    //   'Data': {}
    // }
  },

  // 设置超时时间
  timeout: 20000,

  withCredentials: true, //
  // withCredentials: false, // default

  responseType: 'json', // default

  onUploadProgress: function (progressEvent) {
  // Do whatever you want with the native progress event
  },

  onDownloadProgress: function (progressEvent) {
  // Do whatever you want with the native progress event
  },

  maxContentLength: 2000,

  validateStatus: function (status) {
    return status >= 200 && status < 300
    // default
  },

  maxRedirects: 5
  // default
}
