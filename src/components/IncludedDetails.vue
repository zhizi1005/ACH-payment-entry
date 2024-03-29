<template>
  <!-- Payment information -->
  <div class="paymentInformation">
    <div class="feeTitle">
      <div class="feeTitle-name">1 {{ routerParams.cryptoCurrency }} ≈ {{ price }} {{ payCommission.code }}</div>
      <div class="feeTitle-value">
        <div class="loading-svg">
         <img src="@/assets/images/SellTime.png" alt="">
        </div>
        <div class="feeTitle-value-text"><span>{{ timeDownNumber }}</span>{{ $t('nav.codeSecond') }}</div>
      </div>
    </div>
    <div class="fee-content">
      <div class="fee-content-title" @click="expandCollapse">
        <div class="left">
          {{ $t('nav.home_youBuyGet') }} <span>{{ routerParams.getAmount }} {{ routerParams.cryptoCurrency }}</span> {{ $t('nav.home_buyFee_title2') }} <span>{{ routerParams.amount }} {{ payCommission.code }}</span>
        </div>
        <!-- 商户接入模式禁止点击 -->
        <div class="right" v-if="this.$store.state.customized_orderMerchant">
          <img :src="detailsState?image_Top:imageBottom">
        </div>
      </div>
      <div class="fee-content-details" v-if="detailsState">
        <div class="fee-content-details-line">
          <div class="title">
            {{ $t('nav.home_buyFee_rampFee') }}
            <el-popover
                placement="top"
                :trigger="triggerType"
                :offset="-18"
                :content="this.$t('nav.fee_tips')">
              <div slot="reference"><img class="tipsIcon" src="../assets/images/exclamatoryMarkIcon.png"></div>
            </el-popover>
          </div>
          <div class="value"><span class="minText">{{ $t('nav.home_feeRampFeeTips') }}</span> {{ payCommission.symbol }} {{ payCommission.rampFee }}</div>
        </div>
        <div class="fee-content-details-line">
          <div class="title">{{ $t('nav.home_buyFee_networkFee') }}</div>
          <div class="value">{{ payCommission.symbol }} {{ networkFee }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 费用展示组件
 * titleStatus 标题展示状态
 * network 选择接收方式需带入网络信息
 * isHome 是否是首页使用(监听vuex.state加载数据)、初首页以外activated加载数据
 * useFee 是否使用费用数据
 * isLoading 是否开始加载费用数据
 */
import common from "../utils/common";

export default {
  name: "includedDetails",
  props: {
    isHome: {
      type: Boolean,
      default: null
    },
    network: {
      type: String,
      default: null
    },
    titleStatus: {
      type: Boolean,
      default: null
    },
    useFee: {
      type: Boolean,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: null
    },
  },
  data(){
    return{
      triggerType: "hover",

      timeDown: 60,
      timeOut: null,
      detailsState: false,
      feeInfo: {},
      routerParams: {},
      payCommission: {
        code: "",
        decimalDigits: 0,
        name: "",
        payCommission: [],
        payMax: 0,
        payMin: 0,
        rampFee: 0,
        symbol: "",
      },
      timeDownNumber: 15,
      imageBottom:require('@/assets/images/blackDownIcon1.png'),
      image_Top:require('@/assets/images/imageTop.png')
    }
  },
  watch:{
    'network': {
      deep: true,
      immediate: true,
      handler(val,oldVal){
        if(this.$store.state.customized_orderMerchant && val !== null && val !== '' && oldVal !== undefined && val !== oldVal){ // && (this.isHome === false || this.isHome === null)
          this.queryFee();
          this.timingSetting();
        }
      }
    },
    //首页输入金额改变后刷新数据
    '$store.state.buyRouterParams.amount': {
      deep: true,
      immediate: true,
      handler(val,oldVal) {
        if(this.isHome && this.isHome === true && Number(val) !== Number(oldVal)){
          this.queryFee();
          this.timingSetting();
        }
      }
    },
    //首页选择数字货币后刷新数据
    '$store.state.buyRouterParams.cryptoCurrency': {
      deep: true,
      handler(val,oldVal) {
        if(this.isHome && this.isHome === true && val !== oldVal) {
          this.queryFee();
          this.timingSetting();
        }
      }
    },
    '$store.state.buyRouterParams.exchangeRate': {
      deep: true,
      handler(val){
        this.routerParams.exchangeRate = val;
      }
    },
    'isLoading': {
      deep: true,
      immediate: true,
      handler(val){
        if(val === true && this.$store.state.buyRouterParams.cryptoCurrency !== ''){
          this.routerParams = this.$store.state.buyRouterParams;
          this.payCommission = this.$store.state.buyRouterParams.payCommission;
          this.queryFee();
          this.timingSetting();
        }
      }
    },
    '$store.state.buyRouterParams.payCommission.symbol': {
      deep: true,
      immediate: true,
      handler(val,oldVal){
        if(this.$store.state.buyRouterParams.cryptoCurrency !== '' && this.$store.state.customized_orderMerchant === true && val !== oldVal){
          this.queryFee();
          this.timingSetting();
        }
      }
    }
  },
  mounted(){
    //判断是pc还是移动端，用于展示的提示信息是click还是hover触发
    this.triggerType = common.equipmentEnd === 'pc' ? "hover" : "click";
  },
  activated(){
    //判断是pc还是移动端，用于展示的提示信息是click还是hover触发
    this.triggerType = common.equipmentEnd === 'pc' ? "hover" : "click";
    //接收路由信息
    this.$store.state.buyRouterParams.payCommission !== undefined ? this.payCommission = this.$store.state.buyRouterParams.payCommission : '';
    if(this.$store.state.buyRouterParams.cryptoCurrency !== ''){
      this.queryFee();
      this.timingSetting();
    }
  },
  destroyed(){
    this.timeDownNumber = 15;
    window.clearInterval(this.timeOut);
    this.timeOut = null;
  },
  deactivated(){
    this.timeDownNumber = 15;
    window.clearInterval(this.timeOut);
    this.timeOut = null;
  },
  computed: {
    //个位数>0，小数点后保留2位、个位数为0，小数点后最多保留6位
    networkFee(){
      if(this.feeInfo.networkFee !== undefined){
        let decimalDigits = 0;
        let resultValue = this.feeInfo.networkFee;
        resultValue = this.feeInfo.networkFee * this.$store.state.buyRouterParams.exchangeRate;
        resultValue >= 1 ? decimalDigits = 2 : decimalDigits = 6;
        let networkFee = resultValue.toFixed(decimalDigits);
        isNaN(resultValue) || networkFee <= 0 ? networkFee = 0 : '';
        return networkFee;
      }
    },
    price(){
      let decimalDigits = 0;
      let resultValue = this.feeInfo.price * this.routerParams.exchangeRate;
      resultValue >= 1 ? decimalDigits = 2 : decimalDigits = 6;
      let price = resultValue.toFixed(decimalDigits);
      isNaN(resultValue) || price <= 0 ? price = 0 : '';
      return price;
    },
  },
  methods:{
    //Countdown 15 refresh data
    timingSetting(){
      this.timeDownNumber = 15;
      window.clearInterval(this.timeOut);
      this.timeOut = null;
      this.timeOut = setInterval(()=> {
        if (this.timeDownNumber === 1) {
          this.timeDownNumber = 15;
          this.queryFee();
        }else{
          this.timeDownNumber -= 1;
        }
      },1000)
    },
    queryFee(){
      //接收路由信息
      this.routerParams = this.$store.state.buyRouterParams;
      this.payCommission = this.routerParams.payCommission;
      let params = {
        symbol: this.$store.state.buyRouterParams.cryptoCurrency+"USDT",
        coin: this.$store.state.buyRouterParams.cryptoCurrency,
        network: this.network
      }
      this.$axios.get(this.$api.get_inquiryFee,params).then(res=>{
        if(res && res.returnCode === "0000"){
          this.feeInfo = JSON.parse(JSON.stringify(res.data));
          //修改首页费用数据
          if(this.isHome && this.isHome === true){
            this.$parent.feeInfo = JSON.parse(JSON.stringify(res.data));
            //赋值费用数据
            this.useFee && this.useFee === true ? this.$parent.feeInfo = JSON.parse(JSON.stringify(this.feeInfo)) : '';
            this.$parent.calculationAmount();
          }
          //选择网络修改you get数量、商户对接计算you get数量
          if(this.$store.state.buyRouterParams.network !== '' && this.$store.state.buyRouterParams.network !== undefined){
            let rampFee = this.$store.state.buyRouterParams.payCommission.rampFee;
            let networkFee = this.$store.state.buyRouterParams.exchangeRate * this.feeInfo.networkFee;
            let price = this.feeInfo.price * this.routerParams.exchangeRate
            let newGetAmount = (this.$store.state.buyRouterParams.amount - networkFee - rampFee) / price;
            let decimalDigits = 0;
            newGetAmount >= 1 ? decimalDigits = 2 : decimalDigits = 6;
            newGetAmount = newGetAmount.toFixed(decimalDigits);
            isNaN(newGetAmount) || newGetAmount <= 0 ? newGetAmount = 0 : '';
            this.routerParams.getAmount = newGetAmount;
          }
          if(this.isLoading && this.isLoading === true){
            let rampFee = this.$store.state.buyRouterParams.payCommission.rampFee;
            this.feeInfo.networkFee = this.$store.state.buyRouterParams.exchangeRate * this.feeInfo.networkFee;
            let newGetAmount = (Number(this.$store.state.buyRouterParams.amount) - this.feeInfo.networkFee - rampFee) / this.feeInfo.price;
            let decimalDigits = 0;
            newGetAmount >= 1 ? decimalDigits = 2 : decimalDigits = 6;
            newGetAmount = newGetAmount.toFixed(decimalDigits);
            isNaN(newGetAmount) || newGetAmount <= 0 ? newGetAmount = 0 : '';
            this.routerParams.getAmount = newGetAmount;
          }
        }
      })
    },

    //Control details display status
    expandCollapse(){
      //商户接入模式禁止点击
      if(!this.$store.state.customized_orderMerchant){
        return;
      }

      this.detailsState = this.detailsState === true ? false : true;
      if(this.detailsState === true){
        setTimeout(()=>{
          this.$parent.$refs.includedDetails_ref.$el.scrollIntoView({behavior: "smooth", block: "end", inline: 'end'});
        })
        return
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.paymentInformation{
  .feeTitle{
    font-size: 13px;
    font-weight: normal;
    color: #6E7687;
    line-height: 15px;
    display: flex;
    align-items: center;
    padding: 0 .2rem 0;
    .feeTitle-name{
      font-family: SFProDisplayRegular;
      color: #031633;
    }
    .feeTitle-value{
      font-family: SFProDisplayRegular;
      display: flex;
      align-items: center;
      margin-left: auto;
      .loading-svg{
        margin-right: 0.04rem;

        margin-top: 0.02rem;
        img{
          height: 0.14rem;
        }
      }
      .feeTitle-value-text{
        color: #6E7687;
        span{
          display: inline-block;
          width: 0.15rem;
          text-align: center;
        }
      }
    }
  }

  .fee-content{
    background: #F4F5F7;
    border-radius: 0.12rem;
    margin-top: 0.4rem;
    padding: 0 0.2rem .2rem;
    .fee-content-title{
      padding:.2rem 0 .0rem;
      display: flex;
      align-items: center;
      font-size: 0.16rem;
      font-family: SFProDisplayRegular;
      font-weight: normal;
      color: #6E7687;
      cursor: pointer;
      span{
        font-weight: bold;
      }
      .left{
        word-break: break-all;
        font-size: 0.13rem;
        font-family: SFProDisplayRegular;
        font-weight: normal;
        color: #6E7687;
        span{
          color: #031633;
          font-family: SFProDisplayRegular;
        }
      }
      .right {
        margin-left: auto;
        img{
          width: 0.24rem;
        }
      }
    }

    .fee-content-details{
      padding: 0.0rem 0 0 0;
      .fee-content-details-line{
        display: flex;
        align-items: center;
        margin-top: 0.16rem;
        .title{
          display: flex;
          align-items: center;
          font-size: 0.13rem;
          font-family: "GeoLight", GeoLight;
          color: #6E7687;
          .tipsIcon{
            width: 0.12rem;
            height: 0.12rem;
            margin-left: 0.08rem;
            display: flex;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .value{
          margin-left: auto;
          display: flex;
          align-items: center;
          font-size: 0.13rem;
          font-family: SFProDisplayRegular;
          color: #031633;
          font-weight: normal;
          .minText{
            font-family: SFProDisplayRegular;
            font-weight: normal;
            color: #6E7687;
            margin-right: 0.04rem;
            margin-top: -0.02rem;
          }
        }
      }
    }

  }
}
</style>
