import axios from 'axios';
import { Toast } from 'vant';
import router from "../router";
import { AES_Decrypt, AES_Encrypt } from '@/utils/encryp.js';

//Process Sign
var timestamp = '';
function processSign(){
  if(localStorage.getItem("token")){
    let sign = localStorage.getItem("userId");
    let userId = sign.substring(sign.lastIndexOf("\H")+1,sign.length);
    let userNo = localStorage.getItem("userNo").substring(localStorage.getItem("userNo").length-5);
    timestamp = new Date().getTime();
    let newSign = AES_Encrypt(userId + "-" + userNo + "-" + timestamp);
    localStorage.setItem("sign",newSign);
  }
}

function requestPrompt(response){
  if (response) {
    // The request is executed and the server responds with a status code
    switch (response.returnCode) {
      case "70006":
        Toast(response.returnMsg);
        break;
      case "70003":
        Toast(response.returnMsg);
        break;
    }
  }
}

axios.defaults.timeout = 30000; // Set the request timeout (MS) to no more than half a minute

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error)
});

axios.interceptors.response.use(function (response) {
  //token effect: Login information verification
  if(response.config.url === localStorage.getItem('baseUrl') + '/user/login' && response.data.data !== null){
    localStorage.setItem("userId",AES_Decrypt(response.headers.sign));
    localStorage.setItem("token",response.headers.token);
    localStorage.setItem("email",response.data.data.email);
    localStorage.setItem("userNo",response.data.data.userNo);
    localStorage.setItem("kycStatus",response.data.data.kycStatus);
  }
  //token effect: Multiple trigger interface verification
  if(response.config.url === localStorage.getItem('baseUrl') + '/crypto/wallet/check'){
    localStorage.setItem("submit-token",response.headers.token);
  }
  if(response.config.url === localStorage.getItem('baseUrl') + '/trade/create'){
    localStorage.setItem("submit-token",response.headers.token);
  }
  //no login info
  if((response.data.returnCode === '70006' || response.data.returnCode === '70008') && router.currentRoute.path !== "/emailCode"){
    router.path !== '/emailCode' ? router.push(`/emailCode?routerParams${router.currentRoute.query.routerParams}`) : '';
    localStorage.removeItem("sign");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userNo");
    localStorage.removeItem("userId");
    localStorage.removeItem("kycStatus");
  }
  //Request callback prompt
  requestPrompt(response.data);
  return response.data
}, function (error) {
  let errMsg = '';
  if (error.response) {
    // The request is executed and the server responds with a status code
    switch (error.response.status) {
      case 400:
        errMsg = 'Error request';
        break;
      case 401:
        errMsg = 'Unauthorized, please log in again';
        // localStorage.removeItem("token");
        // this.$message.error(errMsg);
        break;
      case 403:
        errMsg = 'access denied';
        // localStorage.removeItem("token");
        // this.$message.error(errMsg);
        break;
      case 404:
        errMsg = 'Request error, the resource was not found';
        break;
      case 405:
        errMsg = 'Request method not allowed';
        break;
      case 408:
        errMsg = 'request timeout';
        break;
      case 500:
        errMsg = 'Server side error';
        break;
      case 501:
        errMsg = 'Network not implemented';
        break;
      case 502:
        errMsg = 'network error';
        break;
      case 503:
        errMsg = 'Service Unavailable';
        break;
      case 504:
        errMsg = 'Network Timeout';
        break;
      case 505:
        errMsg = 'The request is not supported by the HTTP version';
        break;
      default:
        errMsg = 'Connection error';
    }
  } else {
    errMsg = "Failed to connect to the server";
  }

  return Promise.reject(errMsg);

});
export default {
  /**
   *
   * @param url  Interface address
   * @param params Interface parameters (object)
   * @returns {Q.Promise<any>}
   */
  post(url, params, submitToken) {
    processSign();
    return axios({
      method: 'post',
      url: url,
      data: params,
      headers: {
        'token': localStorage.getItem('token') ? localStorage.getItem('token') : '',
        'sign': localStorage.getItem('sign') ? localStorage.getItem('sign') : '',
        'timestamp': timestamp,
        'submit-token': submitToken === 'submitToken' ? localStorage.getItem("submit-token") : '',
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept",
        // "Access-Control-Allow-Methods":"GET,POST",
      },
    }).then((response) => {
      if (response.returnCode === "0000") {
        return Promise.resolve(response);
      } else {
        // Toast(response.returnMsg);
        return Promise.reject('data');
      }
    }).catch(error => {
      console.log('failed', error);
    })
  },

  /**
   *
   * @param url  Interface address
   * @param params Interface parameters (object)
   * @returns {Q.Promise<any>}
   */
  get(url, params) {
    processSign();
    return axios({
      method: 'get',
      url: url,
      params: params,
      headers: {
        'token': localStorage.getItem('token') ? localStorage.getItem('token') : '',
        'sign': localStorage.getItem('sign') ? localStorage.getItem('sign') : '',
        'timestamp': timestamp,
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
      }
    }).then((response) => {
      // debugger;
      if (response.returnCode === "0000") {
        return Promise.resolve(response);
      } else {
        // Toast(response.returnMsg);
        return Promise.reject('data');
      }
    }).catch(function (error) {
      console.log('failed', error);
    });
  },

  /**
   *
   * @param url  Interface address
   * @param params Interface parameters (object)
   * @param Mainly used for login
   * @returns {Q.Promise<any>}
   */
  // postForm(url, params){
  //   return axios({
  //     method: 'post',
  //     url: url,
  //     params: params,
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     }
  //   }).then((response) => {
  //     // debugger;
  //     if (response.returnCode === "0000") {
  //       return Promise.resolve(response);
  //     } else {
  //       this.$toast(response.returnMsg);
  //       return Promise.reject('data');
  //     }
  //   }).catch(function (error) {
  //     console.log('failed', error);
  //   });
  // },

  // getJson(method) {
  //
  //   return new Promise((resolve, reject) => {
  //     axios({
  //       method: 'get',
  //       baseURL: '',
  //       url: method,
  //       dataType: "json",
  //       crossDomain: true,
  //       cache: false
  //     }).then(res => {
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  //
  // }
}