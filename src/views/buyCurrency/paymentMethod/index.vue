<template>
  <div id="paymentMethod">
    <div class="paymentMethod-content">
      <!-- 历史支付的方式 -->
      <div class="payMethodsUl" v-if="savedCard.length !== 0 && $store.state.customized_orderMerchant">
        <div class="title">
          <div>{{ $t('nav.buy_payment_savedTitle') }}</div>
          <div class="edit" @click="editCardInfo" v-if="!$route.query.merchant_orderNo">
            <span>{{ editCardInfo_state===false ? 'Edit' : 'Cancel' }}</span>
          </div>
        </div>
        <div class="payMethodsLi" :class="{'cardCheck': cardCheck === index}" v-for="(item,index) in savedCard" :key="index" @click="choiseSavedCard(item,index)">
          <div class="payMethodsLi-left">
            <div class="cardIcon">
              <img v-if="item.payWayCode === '10003' || '10001'" src="../../../assets/images/10001-icon.png">
              <img v-if="item.payWayCode === 10004" src="../../../assets/images/10004-icon.png">
              <img v-if="item.payWayCode === 10005" src="../../../assets/images/10005-icon.png">
              <img v-if="item.payWayCode === 10006" src="../../../assets/images/10006-icon.png">
              <img v-if="item.payWayCode === 10008" src ="../../../assets/images/10008-icon.png">
            </div>
            <div class="cardInfo">
              <p>{{ item.payWayName }} <span>{{ $t('nav.buy_payment_ending') }} {{ item.cardNumber.substring(item.cardNumber.length-4) }}</span></p>
              <p>{{ $t('nav.buy_payment_instant') }}</p>
            </div>
          </div>
          <div class="payMethodsLi-right" v-if="cardCheck === index">
            <img src="../../../assets/images/cardCheckIcon.png">
          </div>
          <div class="payMethodsLi-right" v-if="editCardInfo_state===true">
            <img class="editIcon" src="../../../assets/images/edit-icon.png" alt="">
          </div>
        </div>
      </div>
      <!-- 选择新的支付方式 -->
      <div class="payMethodsUl">
        <div class="title">{{ $t('nav.buy_payment_addTitle') }}</div>
        <div class="payMethodsLi" :class="{'cardCheck': paymethodCheck === index}" v-for="(item,index) in paymethodList" :key="index" @click="choisePayMethods(item,index)">
          <div class="payMethodsLi-left">
            <div class="cardIcon">
              <img v-if="item.payWayCode === '10004'" src="../../../assets/images/10004-icon.png">
              <img v-else-if="item.payWayCode === '10005'" src="../../../assets/images/10005-icon.png">
              <img v-else-if="item.payWayCode === '10006'" src="../../../assets/images/10006-icon.png">
              <img v-else-if="item.payWayCode === '10008'" src="../../../assets/images/10008-icon.png">
              <img v-else-if="item.payWayCode === '10003' || '10001'" src="../../../assets/images/10001-icon.png">
            </div>
            <div class="cardInfo">
              <p>{{ item.payWayName }}</p>
              <p>{{ $t('nav.buy_payment_instant') }}</p>
            </div>
          </div>
          <div class="payMethodsLi-right">
            <img src="../../../assets/images/addCardIcon.png" v-if="paymethodCheck==='' || paymethodCheck !== index">
            <img src="../../../assets/images/cardCheckIcon.png" v-else>
          </div>
        </div>
      </div>
      <CryptoCurrencyAddress v-if="$store.state.customized_orderMerchant"/>
      <IncludedDetails class="IncludedDetails" ref="includedDetails_ref" :useFee="true" :isLoading="isLoading" :network="$store.state.buyRouterParams.network"/>
    </div>
    <button class="continue" :disabled="disabled" @click="confirm">
<!--      {{ $t('nav.Continue') }}-->
      Completed
      <img class="rightIcon" src="../../../assets/images/button-right-icon.svg" alt="" v-if="!request_loading">
      <i class="el-icon-loading rightIcon loadingIcon" v-else></i>
    </button>
  </div>
</template>

<script>
import IncludedDetails from "@/components/IncludedDetails.vue";
import CryptoCurrencyAddress from "@/components/CryptoCurrencyAddress.vue";
import {querySubmitToken} from "../../../utils/publicRequest";
import { AES_Decrypt,AES_Encrypt } from "../../../utils/encryp";

export default {
  name: "paymentMethod",
  components: { IncludedDetails,CryptoCurrencyAddress },
  data(){
    return{
      buyParams: {},

      editCardInfo_state: false,

      cardCheck: '',
      savedCard: [],

      paymethodCheck: '',
      paymethodList: [],

      //全部历史交易记录
      userPayment: {},

      payMethod: {},

      feeInfo: {},

      //商户信息加载完 加载费用数据
      isLoading: false,

      request_loading: false,
    }
  },
  computed: {
    disabled(){
      if(((JSON.stringify(this.payMethod) !== '{}' && this.request_loading === false) || (this.paymethodCheck !== ''&&this.request_loading === false)) && !this.editCardInfo_state){
        return false;
      }else{
        return true;
      }
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.editCardInfo_state = false;
      if((to.path === '/paymentMethod' && from.path === '/receivingMode') || (to.path === '/paymentMethod' && from.path === '/modifyCardInfo')){
        vm.InitializationData();
      }
    })
  },
  mounted(){
    //接入商户逻辑
    if(!this.$store.state.customized_orderMerchant){
      this.buyOrderInfo();
      return;
    }

    this.InitializationData();
  },
  activated() {
    //上一页返回还原解密数据
    this.savedCard[this.cardCheck] ? this.savedCard[this.cardCheck].cardNumber = AES_Decrypt(this.savedCard[this.cardCheck].cardNumber) : '';
  },
  deactivated(){
    this.request_loading = false;
  },
  methods: {
    //商户接入查询
    buyOrderInfo(){
      let _this = this;
      this.$axios.get(this.$api.get_orderState + this.$route.query.merchant_orderNo,'').then(res=>{
        if(res && res.returnCode === "0000" && res.data !== null){
          //获取订单信息
          this.$store.state.buyRouterParams.cryptoCurrency = res.data.cryptoCurrency;
          _this.$store.state.buyRouterParams.amount = res.data.fiatCurrencyAmount;
          _this.$store.state.buyRouterParams.payCommission.symbol = res.data.currencySymbol;
          _this.$store.state.buyRouterParams.payCommission.code = res.data.fiatCurrency;
          _this.$store.state.buyRouterParams.addressDefault = res.data.address;
          _this.$store.state.buyRouterParams.networkDefault = res.data.network;
          _this.$store.state.buyRouterParams.network = res.data.network;
          _this.$store.state.buyRouterParams.submitForm = res.data.cardInfo;
          _this.$store.state.buyRouterParams.feeRate = res.data.feeRate;
          _this.$store.state.buyRouterParams.fixedFee = res.data.fixedFee;
          _this.$store.state.buyRouterParams.exchangeRate = res.data.usdToXR;
          //计算rampFee
          let decimalDigits = 0;
          let resultValue = Number(res.data.feeRate) * Number(res.data.amount) + res.data.fixedFee;
          resultValue >= 1 ? decimalDigits = 2 : decimalDigits = 6;
          let rampFee = resultValue.toFixed(decimalDigits);
          isNaN(resultValue) || rampFee <= 0 ? rampFee = 0 : '';
          this.$store.state.buyRouterParams.payCommission.rampFee = rampFee;
          //支付方法列表
          _this.queryPayMethods();
          //费用组件计算数量
          _this.isLoading = true;
        }
      })
    },

    InitializationData(){
      this.cardCheck = '';
      this.savedCard = [];
      this.paymethodCheck = '';
      this.paymethodList = [];
      this.payMethod = {};
      if(!this.$route.query.orderNo){
        this.queryPayMethods();
      }
    },
    queryPayMethods(){
      let _this = this;
      let params = {
        appId: sessionStorage.getItem('accessMerchantInfo') ? JSON.parse(sessionStorage.getItem('accessMerchantInfo')).appId : '',
        alpha2: this.$store.state.buyRouterParams.positionData ? this.$store.state.buyRouterParams.positionData.alpha2 : '',
        currency: this.$store.state.buyRouterParams.payCommission.code,
      }
      this.$axios.get(this.$api.get_payMethods,params).then(res=>{
        if(res){
          //存储货币支持的支付方式
          this.$nextTick(()=>{
            _this.paymethodList = res.data.fiatPayment;
            _this.userPayment = res.data.userPayment;
            _this.savedCard = [];
            //处理历史交易方式 - 匹配货币支持的支付方式,添加payWayCode、payWayName
            Object.keys(res.data.userPayment).forEach(item=>{
              res.data.userPayment[item].forEach((item2,index2)=>{
                res.data.userPayment[item][index2].cardNumber = AES_Decrypt(item2.cardNumber);
                _this.paymethodList.forEach(item3=>{
                  if(item === item3.payWayCode){
                    res.data.userPayment[item][index2].payWayCode = item3.payWayCode;
                    res.data.userPayment[item][index2].payWayName = item3.payWayName;
                    _this.savedCard.push(item2);
                  }
                })
              })
            });
            //只有10001放开历史卡信息功能 - 筛选10001信息
            _this.savedCard = _this.savedCard.filter(item=>{
              return item.payWayCode === '10001';
            })
            //只有信用卡开放历史卡信息功能
            if(_this.$store.state.customized_orderMerchant && _this.savedCard.length !== 0 ){
              _this.choiseSavedCard(_this.savedCard[0],0)
            }
            //商户接入模式展示国际卡
            if(!_this.$store.state.customized_orderMerchant){
              _this.choisePayMethods(_this.paymethodList[0],0)
            }
          })
        }
      })
    },

    //选择历史支付方式
    choiseSavedCard(item,index){
      if(this.editCardInfo_state === true){
        this.$store.state.buyRouterParams.submitForm = item;
        let goUrl = `/modifyCardInfo?submitForm=${JSON.stringify(item)}&configPaymentFrom=userPayment`
        this.$router.push(goUrl)
        return
      }
      this.cardCheck = index;
      this.paymethodCheck = "";
      this.payMethod = item;
      this.$store.state.sellRouterParams.fullName = AES_Decrypt(item.firstname) + ' '+ AES_Decrypt(item.lastname)
      this.$store.state.sellRouterParams.fullName = AES_Encrypt(this.$store.state.sellRouterParams.fullName)
    },

    //选择支付方式
    choisePayMethods(item,index){
      if(this.editCardInfo_state === true){
        return
      }
      this.paymethodCheck = index;
      this.cardCheck = "";
      this.payMethod = item;
    },

    //开放修改卡信息
    editCardInfo(){
      this.editCardInfo_state = this.editCardInfo_state === false ? true : false;
      if(!this.editCardInfo_state){
        if(this.$store.state.customized_orderMerchant && this.savedCard.length !== 0 ){
          this.choiseSavedCard(this.savedCard[0],0)
        }
      }else{
        this.cardCheck = "";
        this.paymethodCheck = "";
        this.payMethod = "";
      }
    },

    //确认支付方式
    async confirm(){
      //最多添加5张卡
      if(this.paymethodCheck !== '' && this.payMethod.payWayCode === '10001' && this.savedCard.length > 5){
        this.$toast({
          duration: 3000,
          message: "Add 5 cards at most"
        });
        return;
      }

      //接入商户模式不需要创建订单
      if(!this.$store.state.customized_orderMerchant){
        this.$store.state.buyRouterParams.orderNo = this.$route.query.merchant_orderNo;
        this.$store.state.buyRouterParams.payWayCode = this.payMethod.payWayCode;
        this.$store.state.buyRouterParams.payWayName = this.payMethod.payWayName;
        this.JumpRouter();
        return;
      }


      this.request_loading = true;
      let submitToken = await querySubmitToken();
      if(submitToken === true){
        //确认下单 获取订单id
        this.buyParams = this.$store.state.placeOrderQuery;
        this.buyParams.payWayCode = this.payMethod.payWayCode;
        this.buyParams.cryptoCurrencyVolume = this.$store.state.buyRouterParams.getAmount;
        this.buyParams.alpha2 = this.$store.state.buyRouterParams.positionData.alpha2;
        //存在商户信息将信息带入请求地址
        let urlQuery = '';
        if(JSON.parse(sessionStorage.getItem("accessMerchantInfo")).merchantParam){
          urlQuery = `?${JSON.parse(sessionStorage.getItem("accessMerchantInfo")).merchantParam}`;
        }
        this.$axios.post(this.$api.post_buy + urlQuery,this.buyParams,'submitToken').then(res=>{
          if(res && res.returnCode === '0000'){
            this.$store.state.buyRouterParams.orderNo = res.data.orderNo;
            this.$store.state.buyRouterParams.kyc = res.data.kyc;
            this.$store.state.buyRouterParams.submitForm = res.data;
            this.$store.state.buyRouterParams.payWayCode = this.payMethod.payWayCode;
            this.$store.state.buyRouterParams.payWayName = this.payMethod.payWayName;
            this.JumpRouter();
          }else{
            this.request_loading = false;
          }
        }).catch(()=>{
          this.request_loading = false;
        })
      }else{
        this.request_loading = false;
      }
    },

    //根据支付方式 控制跳转路径
    JumpRouter(){
      //选择历史支付
      if(this.cardCheck !== '' && this.payMethod.payWayCode === '10001'){
        this.payMethod.cardNumber = AES_Encrypt(this.payMethod.cardNumber);
        this.$store.state.buyRouterParams.userCardId = this.payMethod.userCardId;
        let goUrl = `/creditCardConfig?submitForm=${JSON.stringify(this.payMethod)}&configPaymentFrom=userPayment`
        //是否需要kyc验证
        this.isKyc(goUrl)
        return;
      }
      if(this.cardCheck !== '' && (this.payMethod.payWayCode === '10003' || '10008')){
        let goUrl = `/otherWays-VA?payMethod=${JSON.stringify(this.payMethod)}`
        this.isKyc(goUrl)
        return;
      }
      if(this.cardCheck !== '' && (this.payMethod.payWayCode === '10004' || '10005' || '10006')){
        let goUrl = `/otherWayPay?payMethod=${JSON.stringify(this.payMethod)}`
        this.isKyc(goUrl)
        return;
      }

      //选择新填写支付方式
      if(this.paymethodCheck !== '' && this.payMethod.payWayCode === '10001' && this.savedCard.length <= 5){ //USD
        this.$router.push(`/creditCardForm-cardInfo?merchant_orderNo=${this.$route.query.merchant_orderNo}`);
        return;
      }
      if(this.paymethodCheck !== ''  && this.payMethod.payWayCode !== '10001'){ //IDR | 10008
        if(this.payMethod.payWayCode === '10003' || this.payMethod.payWayCode === '10008'){
          this.$router.push(`/otherWays-VA`);
          return;
        }
        if(this.payMethod.payWayCode === '10004' || this.payMethod.payWayCode === '10005' || this.payMethod.payWayCode === '10006'){ //QRIS DANA OVO
          this.$router.push(`/otherWayPay`);
        }
      }
    },
    //是否需要kyc验证
    //第一个参数是需要跳转的地址  第二个参数是kyc验证之后我要跳转的地址
    isKyc(Url){
      //  this.$axios.post(this.$api.post_getKycThrough,'','').then(res=>{
      //    if(res && res.returnCode === '0000'){
      //       if(res.data===true){
      //         this.$store.state.WhichPage = Url
      //         this.$router.push('/kycVerification')
      //         return
      //       }
            this.$router.push(Url)
      //     }else{
      //       this.request_loading = false;
      //     }
      //   }).catch(()=>{
      //    this.request_loading = false;
      //  })
    }
  }
}
</script>

<style lang="scss" scoped>
#paymentMethod{
  display: flex;
  flex-direction: column;
  .paymentMethod-content{
    flex: 1;
    overflow: auto;
    .payMethodsUl{
      margin-top: 0.28rem;
      .title{
        font-size: 0.13rem;
        font-family: "GeoRegular", GeoRegular;
        font-weight: normal;
        color: #707070;
        display: flex;
        align-items: center;
        .edit{
          margin-left: auto;
          color: #0059DA;
          cursor: pointer;
        }
      }
      .payMethodsLi{
        min-height: 0.56rem;
        background: #F3F4F5;
        border-radius: 0.12rem;
        border: 1px solid #F3F4F5;
        display: flex;
        align-items: center;
        padding: 0 0.21rem;
        margin-top: 0.1rem;
        cursor: pointer;
        .payMethodsLi-left{
          display: flex;
          justify-content: center;
          align-items: center;
          .cardIcon{
            display: flex;
            min-width: 0.24rem;
            img{
              width: 0.24rem;
            }
          }
          .cardInfo{
            font-size: 0.16rem;
            font-family: "GeoRegular", GeoRegular;
            font-weight: normal;
            color: #232323;
            margin-left: 0.2rem;
            span{
              font-size: 0.13rem;
              font-family: "GeoLight", GeoLight;
              font-weight: normal;
              color: #707070;
              margin-left: 0.1rem;
            }
            p:last-child{
              font-size: 0.13rem;
              font-family: "GeoLight", GeoLight;
              font-weight: normal;
              color: #707070;
            }
          }
        }
        .payMethodsLi-right{
          margin-left: auto;
          display: flex;
          .editIcon{
            width: 0.24rem;
            height: 0.24rem;
          }
          img{
            width: 0.14rem;
          }
        }
      }
      .cardCheck{
        border: 1px solid #0059DA;
      }
      &:nth-of-type(2){
        margin-bottom: 0.4rem;
      }
    }
  }

  .continue{
    width: 100%;
    height: 0.58rem;
    background: #0059DA;
    border-radius: 0.29rem;
    font-size: 0.17rem;
    font-family: "GeoRegular", GeoRegular;
    font-weight: normal;
    color: #FFFFFF;
    margin-top: 0.16rem;
    cursor: pointer;
    border: none;
    position: relative;
    .rightIcon{
      width: 0.24rem;
      position: absolute;
      top: 0.17rem;
      right: 0.32rem;
      font-size: 0.12rem;
    }
    .loadingIcon{
      //top: 0.15rem;
      font-size: 0.24rem;
    }
  }
  .continue:disabled{
    background: rgba(0, 89, 218, 0.5);
    cursor: no-drop;
  }
}
.IncludedDetails{
  margin-top: 0.1rem;
  padding-bottom: 0.2rem;
}
</style>
