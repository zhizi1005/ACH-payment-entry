<template>
  <div class="verifyCode-container">
      <div style="position:relative;flex:1">
        <div class="verifyCode_title" style="font-size:.16rem;color:#031633;margin:.42rem 0 .0rem">{{ $t('nav.codeTitle1') }}</div>
      <div class="verifyCode_content">
        <span v-for="(item,index) in number" :key="index" @click="changeBlur" :class="index===value.length?'active':''">{{ value[index] }}</span>
        <input type="input" style="outline: none; color:transparent;" v-model="value" :maxlength="6" ref="input">
      </div>
      <div class="verifyCode_title" style="margin-top:.4rem;text-align: center;" v-if="codeTime>0">{{ $t('nav.codeTitle3') }} {{ codeTime }}{{ $t('nav.codeSecond') }}</div>
      <div class="verifyCode_title" v-else style="margin-top:.4rem;text-align: center;" >{{ $t('nav.codeTitle2') }}  <span @click="getEmailCode">{{ $t('nav.login_getCode') }} </span></div>
      </div>
      <div style="position:relative;">

      <div class="verifyCode_button" @click="toLogin" :style="{background:netActive && !showLoading?'#0059DAFF':''}">
        {{ $t('nav.Proceed') }}
        <img class="icon" src="@/assets/images/rightIconSell.png" alt="" v-if="!showLoading">
        <van-loading class="icon" type="spinner" color="#fff" v-else/>
      </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios';
import { debounce } from '../../../utils/index';
import { AES_Encrypt } from '@/utils/encryp.js';
import { fingerprintId } from '@/utils/publicRequest.js';

  export default {
  name: "verifyCode",
  data(){
    return {
      number:6,
      value:'',
      codeTime:0,
      timeVal:null,
      showLoading:false
    }
  },
  mounted(){
    setTimeout(()=>{
      this.changeBlur()
    },500)
  },
  activated(){
    this.value = ''
    setTimeout(()=>{
      this.changeBlur()
    },500)

  },

  methods:{
    //input聚焦
    changeBlur(){
     this.$refs.input.focus()
    },
    //获取验证码
    getEmailCode:debounce(function (){
      this.value = ''
      this.changeBlur()
      // this.codeTime = 10
      let params = {
        email:this.$store.state.userEmail
      }
       this.$axios.post(this.$api.post_sendEmail,params,'').then(res=>{
         if(res.returnCode === '0000'){
           this.codeTime = 10
           window.clearInterval(this.timeVal);
           this.timeVal = null;
           this.timeVal = setInterval(()=>{
            this.codeTime--
            if(this.codeTime <= 0){
              window.clearInterval(this.timeVal)
              this.timeVal = null;
            }
          },1000)
         }
       })
    },500,false),
    toLogin(){
     if(this.netActive && this.showLoading === false){
       fingerprintId();
       let _this = this;
       this.showLoading = true
       var FormData = require('form-data');
        var data = new FormData();
         data.append('email', this.$store.state.userEmail);
         data.append('verificationCode', AES_Encrypt(this.value));
         data.append('fingerprintId', localStorage.getItem('fingerprint_id'));
         var config = {
          method: 'post',
          url: process.env.VUE_APP_BASE_API + this.$api.post_login,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

            'Accept-Language':sessionStorage.getItem('language')?sessionStorage.getItem('language'):'en-US'

          },
          data : data
        };
        axios.interceptors.response.use(function (config) {
          return config;
        }, function (error) {
          // Do something with response error
          return Promise.reject(error);
        })
        axios(config).then(function (response) {
          if(response.returnCode === '0000'){
            _this.codeErrorState = false;

            _this.$store.state.isLogin = true
            _this.$store.state.menuState = 'login'
            localStorage.removeItem('loginOut')
            localStorage.setItem('login_email',_this.$store.state.userEmail)
            setTimeout(()=>{
              _this.showLoading = false
            },2000)
            if(_this.$store.state.routerQueryPath === true){
              _this.$router.push('/');
              return
            }
            if(_this.$route.query.fromName === 'tradeList'){
              _this.$router.replace('/tradeHistory');
            }else{
              //登陆跳转路径根据router.from的路由跳转不同页面
              if(_this.$store.state.emailFromPath === 'buyCrypto'){
                _this.$router.replace(`/receivingMode`);
              }else if(_this.$store.state.emailFromPath === 'sellCrypto'){
                _this.$router.replace('/sell-formUserInfo')
              }else if(_this.$store.state.emailFromPath === 'Refund'){
                _this.$router.replace(`/Refund?cryptocurrency=${_this.$store.state.emailFromquery_refund_view.cryptocurrency}`)
              }else if(_this.$store.state.emailFromPath === 'tradeHistory-details'){
                _this.$router.replace(`/tradeHistory-details?orderId=${_this.$store.state.emailFromquery_tradeHistoryDetails_view.orderId}`)
              }else if(_this.$store.state.emailFromPath === 'sellOrder'){
                _this.$router.replace(`/sellOrder?orderId=${_this.$store.state.emailFromquery_sellCardInfo_view.orderId}`)
              }else{
                _this.$router.push('/');
              }
            }
          }else if(response.returnCode === "10002" || response.returnCode === "10003" || response.returnCode === "1026" || response.returnCode === "1027" || response.returnCode === "1025"){
            _this.codeErrorState = false;
            _this.showLoading = false
            _this.$toast({
              duration: 3000,
              message: response.returnMsg
            });
          }

        }).catch(function (error) {
          _this.showLoading = false
          console.log(error);
        });
     }else if(this.value.length < 6){
       this.$toast({
         duration: 3000,
         message: this.$t('nav.login_VerifyCode')
       });
       return
     }

    },

  },
  computed:{
    netActive(){
      if( this.value.length === 6){
        return true
      }else if(isNaN(this.value) === true){
        return false
      }else{
        return false
      }
    }
  },
  watch:{
    //验证码输入完成直接登陆
    value(newVal){
      if(newVal.length >= 6){
        this.showLoading = false
        this.toLogin()
      }
    }
  }
  }
</script>
<style lang="scss" scoped>
.verifyCode-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .verifyCode_title{
    font-size: .13rem;
    color: #6E7687;
    font-family: "SFProDisplayRegular";
    span{
      color: rgba(0, 71, 173, 1);
      cursor: pointer;
    }
  }
  .verifyCode_content{
    width: 100%;
    height: .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: .3rem;
    span{
      display: inline-block;
      width: .5rem;
      height: .65rem;
      border-radius: .12rem;
      font-size: .24rem;
      background: #F4F5F7;
      text-align: center;
      line-height: .65rem;
    }
    .active{
      border: 1px solid #0059DAFF;
    }
    input{
      width: 100%;
      height: 100%;
      border: none;
      position: absolute;
      z-index: -1;
      pointer-events: none;
        text-indent: -999em; /*文本向左缩进*/
    margin-left: -100%; /*输入框光标起始点向左左移*／
    width: 200%; /*输入框增大一倍*/
    opacity: 0;

    }
  }
  .verifyCode_button{
    width: 100%;
    height: .58rem;
    background: rgba(0, 89, 218, 0.5);
    border-radius: .29rem;
    font-size: .17rem;
    display: flex;
    justify-content: center;
    align-items: center;
    // position: absolute;
    // bottom: 0rem;
    position: relative;
    color: #FAFAFA;
    font-family: "SFProDisplayRegular";
    cursor: pointer;
    .icon{
      // width: .24rem;
      height: .2rem;
      margin-left: .12rem;
      span{
        height: .15rem;
        position: absolute;
        left: .08rem;
        top: .02rem;
      }
    }
  }
  .bottom{
    display: flex;
    margin-bottom: .08rem;
    // position: relative;
    // bottom: .14rem;
    div{
      line-height: .2rem;
      margin-left: .11rem;
    }
  }
  .bottom ::v-deep .el-checkbox__inner:hover{
  border-color: #DFDFDF !important;
}
  .bottom ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{

    background-color: #0059DA;
    border: 1px solid #0059DA;
    border-radius: 0.05rem;
  }
  .bottom ::v-deep .el-checkbox__inner{
    // width: .16rem !important;
    //   height: .16rem !important;
    border: 1px solid #DFDFDF;
    margin-top: .03rem;
  }
}
</style>
