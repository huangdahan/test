/**
 * ddd
 */
import CryptoJS from 'crypto-js'

var utils = {
  hideLoading () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.$vux.Loading.hide()
        resolve(true)
      }, 2000)
    })
  },
  showLoading () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.$vux.Loading.show()
        resolve(true)
      }, 2000)
    })
  },
  encrypt (password, key) {
    var srcs = CryptoJS.enc.Utf8.parse(password)
    var keyTemp =  CryptoJS.enc.Utf8.parse(key)
    var encrypted = CryptoJS.AES.encrypt(srcs, keyTemp, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString()
    return encrypted
  }
}

export default utils
