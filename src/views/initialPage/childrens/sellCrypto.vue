<template>
  <div id="buyCrypto">
    <!-- 买币功能模块 -->
    <div class="buyCrypto_content">
      <div class="methods_select cursor" :class="{'inputFocus': inputFocus}">
        <div class="methods_select-left">
          <div class="form_title pay_title">{{ $t('nav.home_youSell') }}</div>
          <van-field class="pay_input" type="number" v-model.number="payAmount" @focus="inputFocus=true" @blur="inputFocus=false" @input="inputChange" :disabled="payAmountState" pattern="[0-9]*" inputmode="decimal" placeholder="0.00"/>
        </div>
        <div class="get_company" @click="openSearch('currency-sell')">
          <div class="getImg networkImg">
            <img :src="currencyData.icon">
            <div class="networkIcon" v-if="currencyData.sellNetwork && currencyData.sellNetwork.logo"><img :src="currencyData.sellNetwork.logo"></div>
          </div>
          <div class="getText">{{ currencyData.name }}</div>
          <div class="rightIcon"><img src="@/assets/images/homeRight-icon.png"></div>
        </div>
        <div class="warning_text" v-if="warningTextState" v-html="payAmount_tips"></div>
      </div>

      <div class="methods_select cursor get_methods_select">
        <div class="methods_select-left">
          <div class="form_title">{{ $t('nav.home_buyFee_title1') }}</div>
          <div class="get_input">
            <span v-if="getAmount!==''">{{ getAmount }}</span>
            <span class="no_getAmount" v-else>0.00</span>
          </div>
        </div>
        <div class="get_company" @click="openSearch('payCurrency-sell')">
          <div class="getImg"><img :src="positionData.positionImg"></div>
          <div class="getText">{{ payCommission.code }}</div>
          <img class="rightIcon" src="@/assets/images/homeRight-icon.png">
        </div>
      </div>

      <!-- 费用模块 -->
      <div class="calculationProcess" v-if="detailedInfo_state">
        <IncludedDetailsSell ref="includedDetails_ref" :isHome="true"/>
      </div>
    </div>

    <footer>
      <button class="continue" @click="nextStep" :disabled="!continueState" :class="{'continue_true': continueState}">
        Proceed · Sell {{ currencyData.name }}
        <img class="rightIcon" src="../../../assets/images/button-right-icon.svg" alt="" v-if="lodingStatus">
        <van-loading class="rightIcon" type="spinner" color="#fff" v-else/>
      </button>
      <div class="footer_logoView">
        <p class="logoText">Powered By</p>
        <div class="logo">
          <img src="../../../assets/images/homePageLogo.jpg" alt="">
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import common from "../../../utils/common";
import IncludedDetailsSell from '../../../components/IncludedDetails-sell';

export default {
  name: "buyCrypto",
  components: { IncludedDetailsSell },
  props: ['allBasicData'],
  data(){
    return{
      //you pay Prompt information
      warningTextState: false,

      //All data
      basicData: {},

      //Location data
      positionData: {
        positionValue: '',
        positionImg: '',
        alpha2: '',
        code: ''
      },

      payAmount: '',
      getAmount: '',

      //Expense information
      feeInfo: {},
      detailedInfo_state: false,

      //you get Currency information
      currencyData: {
        icon: '',
        name: '',
        maxSell: '',
        minSell: '',
        cryptoCurrencyNetworkId: '',
        symbol: ''
      },

      //Payment method information
      payCommission: {},
      allPayCommission: [],

      triggerType: "hover",

      inputFocus: false,
      lodingStatus:true
    }
  },

  computed: {
    //you pay input status - Data can only be entered after loading
    payAmountState(){
      if(this.currencyData.maxSell > 0 && this.currencyData.minSell > 0){
        return false
      }else{
        return true
      }
    },
    //确认按钮状态
    continueState(){
      if((this.positionData.positionValue !== ''&&
          this.payAmount !== '' && Number(this.payAmount) >= this.currencyData.minSell &&
          Number(this.payAmount) <= this.currencyData.maxSell && this.getAmount !== '' &&
          Number(this.payAmount) > 0) && this.lodingStatus ){
        //增加loding效果
        return true
      }else{
        return false
      }
    },
    payAmount_tips(){
      var minError = `${this.$t('nav.home_minAmountTips')} ${this.currencyData.minSell}.`;
      var maxError = `${this.$t('nav.home_maxAmountTips')} ${this.currencyData.maxSell}.`;
      if(Number(this.payAmount) < this.currencyData.minSell){
        return minError;
      }else if(Number(this.payAmount) > this.currencyData.maxSell){
        return maxError;
      }
    }
  },
  watch: {
    allBasicData: {
      immediate: true,
      deep: true,
      handler() {
        this.allBasicData.worldList !== undefined ? this.currentLocation() : '';
      },
    },
    payAmount: {
      deep: true,
      handler() {
        this.amountControl();
      }
    },
  },
  methods: {
    openSearch(view){
      //The address bar contains merchant information. It is forbidden to select
      if(view === 'currency'){
        return;
      }
      this.$parent.openSearch(view,this.allPayCommission);
    },

    //限制输入六位小数
    inputChange(val){
      if(val.indexOf('.') > 0){
        this.payAmount = val.substr(0,val.indexOf('.')+7);
      }
    },

    //Process the quantity and display status of received legal currency
    amountControl(){
      if(this.payAmount === ''){
        this.warningTextState = false;
        return;
      }
      //Purchase amount prompt
      if (Number(this.payAmount) >= this.currencyData.minSell && Number(this.payAmount) <= this.currencyData.maxSell){
        this.warningTextState = false;
        this.$store.state.sellRouterParams.amount = this.payAmount;
        //How many digital currencies can I exchange
        this.payinfo();
      }else{
        this.warningTextState = true;
        this.getAmount = "";
        this.detailedInfo_state = false;
      }
    },

    //Purchase information details - Scheduled refresh
    payinfo(){
      if (Number(this.payAmount) >= this.currencyData.minSell && Number(this.payAmount) <= this.currencyData.maxSell){
        this.detailedInfo_state = true;
        setTimeout(()=>{
          document.getElementById("buyCrypto").scrollIntoView({behavior: "smooth", block: "end"});
        })
      }else{
        this.detailedInfo_state = false;
      }
    },

    //Real time calculation getAmount
    calculationAmount(){
      if(Number(this.payAmount) >= this.currencyData.minSell && Number(this.payAmount) <= this.currencyData.maxSell){
        //Filter exchange rate - Calculate cost and accepted quantity
        // this.feeInfo.price = this.feeInfo.rate * this.feeInfo.price;
        this.feeInfo.rampFee = ((this.payAmount * this.feeInfo.price * this.feeInfo.percentageFee) + this.feeInfo.fixedFee) * this.feeInfo.rate;
        let decimalDigits = 0;
        let resultValue = (this.payAmount * this.feeInfo.price * this.feeInfo.rate) - this.feeInfo.rampFee;
        resultValue >= 1 ? decimalDigits = 2 : decimalDigits = 6;
        let getAmount = resultValue.toFixed(decimalDigits);
        isNaN(resultValue) || getAmount <= 0 ? getAmount = 0 : '';
        this.getAmount = getAmount;
        this.$store.state.sellRouterParams.getAmount = this.getAmount;
      }
    },

    //position country
    currentLocation(){
      //提示效果判断
      this.triggerType = common.equipmentEnd === 'pc' ? "hover" : "click";

      this.basicData = this.allBasicData;

      //将you pay的币种和国家数据合并在一起
      this.basicData.worldList.forEach((item,index)=>{
        if(item.sellFiatList){
          item.sellFiatList.forEach((item2,index2)=>{
            this.basicData.fiatCurrencyList.forEach(item3=>{
              if(item3.code === item2){
                this.basicData.worldList[index].sellFiatList[index2] = item3;
              }
            })
          })
        }
      })
      if(this.basicData.sellRecentWorldList){
        this.basicData.sellRecentWorldList.forEach((item,index)=>{
          if(item.sellFiatList){
            item.sellFiatList.forEach((item2,index2)=>{
              this.basicData.fiatCurrencyList.forEach(item3=>{
                if(item3.code === item2){
                  this.basicData.sellRecentWorldList[index].sellFiatList[index2] = item3;
                }
              })
            })
          }
        })
      }

      //获取定位的国家信息
      var worldData = {};
      worldData = this.basicData.worldList.filter((item)=> {
        if(item.alpha2 === this.basicData.param.areaCode){
          return item;
        }
      })
      //商家配置的法币没有默认国家的法币，默认商家配置币种第一个
      if(worldData[0].sellEnable === 0){
        worldData = this.basicData.worldList.filter(item=>{return item.sellEnable === 1});
      }
      this.handlePayWayList(worldData[0],1);
    },

    handlePayWayList(data,state){
      //根据国家对应的币种处理数据
      //state - 1页面初始化数据处理 state - 2选择国家后数据处理
      if(state === 1){
        let currencyData_default = [];
        currencyData_default = this.basicData.cryptoCurrencyResponse.cryptoCurrencyList.filter(item=>{return item.name === "BTC"})[0];
        if(currencyData_default === undefined){
          currencyData_default = this.basicData.cryptoCurrencyResponse.cryptoCurrencyList.filter(item=>{return item.isSell===1})[0];
        }
        this.currencyData = {
          icon: currencyData_default.logoUrl,
          name: currencyData_default.name,
          maxSell: currencyData_default.sellNetworkList[0].maxSell,
          minSell: currencyData_default.sellNetworkList[0].minSell,
          cryptoCurrencyNetworkId: currencyData_default.cryptoCurrencyNetworkId,
          sellNetwork: currencyData_default.sellNetworkList[0]
        }
        this.$store.state.feeParams.symbol = currencyData_default.symbol; //name -- popularList币种
        this.$store.state.feeParams_order.symbol = currencyData_default.symbol; //name -- popularList币种
        this.$store.state.sellRouterParams.cryptoCurrency = currencyData_default.name;
        this.$store.state.sellRouterParams.currencyData = this.currencyData;
        this.payCommission = data.sellFiatList[0];
        this.positionData.code = data.sellFiatList[0].code;
      }else{
        data.sellFiatList.forEach(item=>{
          if(item.code === data.code){
            this.payCommission = item;
          }
        })
      }
      //展示所需国家参数
      this.positionData = {
        positionValue: data.enCommonName,
        positionImg: data.flag,
        alpha2: data.alpha2,
        code: this.payCommission.code,
        enCommonName: data.enCommonName,
      };
      //费用所需参数
      this.$store.state.sellRouterParams.payCommission = this.payCommission;
      this.$store.state.feeParams.fiatCode = this.payCommission.code;
      this.$store.state.feeParams.alpha2 = data.alpha2;
      this.$store.state.feeParams_order.fiatCode = this.payCommission.code;
      this.$store.state.feeParams_order.alpha2 = data.alpha2;
      this.positionData.worldId = data.worldId;
      this.$store.state.sellRouterParams.positionData = this.positionData;
      this.$store.state.sellRouterParams.formPositionData = this.positionData;
      this.amountControl();
    },

    nextStep(){
      //是否是从菜单进入
      this.$store.state.routerQueryPath = false
      this.lodingStatus = false
      // this.continueState = false
      // this.payCommission.symbol = this.$store.state.feeParams.symbol;
      // let routerParams = {
      //   amount: this.payAmount,
      //   getAmount: this.getAmount,
      //   cryptoCurrency: this.currencyData.name,
      //   currencyData: this.currencyData,
      //   payCommission: this.payCommission,
      //   positionData: this.positionData
      // }
      // this.$store.state.sellRouterParams = JSON.parse(JSON.stringify(routerParams));

      //清空邮件单页面跳转状态
      this.$store.state.emailFromPath = '';

      //跳转填写卡信息
      this.$store.state.homeTabstate = 'sellCrypto';

      this.$store.state.cardInfoFromPath = 'configSell';

      delete this.$store.state.sellForm;
      delete this.$store.state.sellRouterParams.cardInfoList;
      //是否为风险
      if(localStorage.getItem("token")){
        this.$axios.post(this.$api.post_kycDisabled,'','').then(res=>{
          if(res && res.returnCode === '0000'){

            //KYC失败次数过多 此账号为风险账号
            if(res.data){
              this.$parent.$parent.AccountisShow = true

                this.lodingStatus = true

            }else{
              this.$router.push('/sell-formUserInfo');
               setTimeout(() => {
                this.lodingStatus = true
              }, 1000);
            }
          }
        })
      }else{

        this.$store.state.emailFromPath = 'sellCrypto';
        this.$router.push('/emailCode');
         setTimeout(() => {
            this.lodingStatus = true
          }, 1000);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
html,body,#buyCrypto{
  width: 100%;
  height: 100%;
}
#buyCrypto{
  display: flex;
  flex-direction: column;
  .buyCrypto_content{
    flex: 1;
    overflow: auto;
  }
}

.form_title{
  font-family: 'SFProDisplayRegular',SFProDisplayRegular;
  font-style: normal;
  font-weight: 400;
  font-size: 0.13rem;
  color: #031633;
}

.methods_title{
  margin-top: 0.2rem;
}
.methods_select{
  min-height: 1rem;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 0.06rem;
  padding: 0 0.16rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  &:nth-of-type(2){
    margin-top: 0.12rem;
  }
}
.inputFocus{
  border: 1px solid #41B8FD;
  box-shadow: 0 0 0.35rem rgba(89, 153, 248, 0.2);
}

.get_methods_select{
  min-height: 0.8rem;
  .methods_select-left{
    margin-top: 0;
  }
  .get_company{
    margin-top: 0;
  }
}


.pay_input{
  width: 1.4rem;
  border: none;
  outline: none;
  font-family: 'SFProDisplayMedium',SFProDisplayMedium;
  font-weight: 500;
  font-size: 0.29rem;
  color: #0047AD;
  padding: 0;
  margin-top: 0.06rem;
  &::placeholder{
    color: #C2C2C2 !important;
  }
}

.warning_text{
  position: absolute;
  bottom: 0.08rem;
  left: 0.18rem;
  font-family: 'SFProDisplayRegular',SFProDisplayRegular;
  font-weight: 400;
  font-size: 0.13rem;
  color: #FF3333;
  line-height: 0.13rem;
}

.methods_select-left{
  margin-top: -0.1rem;
}
.get_input{
  width: 1.8rem;
  height: 0.28rem;
  overflow: auto;
  font-family: SFProDisplayMedium;
  font-weight: 500;
  font-size: 0.28rem;
  line-height: 0.28rem;
  color: #031633;
  margin-top: 0.06rem;
  .no_getAmount{
    color: #C2C2C2;
  }
}
.get_company{
  margin-left: auto;
  margin-top: -0.1rem;
  padding: 0 0.12rem;
  min-width: 1.2rem;
  height: 0.46rem;
  background: #F7F8FA;
  border: 1px solid #EEEEEE;
  border-radius: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "SFProDisplayRegular", SFProDisplayRegular;
  cursor: pointer;
  .networkImg{
    margin-right: 0.12rem!important;
  }
  .getImg{
    display: flex;
    margin-right: 0.06rem;
    width: 0.24rem;
    min-height: 0.24rem;
    background: #94ACBA;
    border-radius: 50%;
    position: relative;
    img{
      width: 0.24rem;
      border-radius: 50%;
    }
    .networkIcon{
      background: #FFFFFF;
      width: 0.16rem;
      height: 0.16rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 0;
      right: -0.06rem;
      img{
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 50%;
      }
    }
  }
  .getText{
    display: flex;
    font-family: 'SFProDisplayRegular',SFProDisplayRegular;
    font-style: normal;
    font-weight: 400;
    font-size: 0.13rem;
    color: #063376;
    min-width: 0.28rem;
  }
  .rightIcon{
    display: flex;
    align-items: center;
    width: 0.24rem;
    margin-left: auto;
    img{
      width: 0.24rem;
    }

  }

}


footer{
  .footer_logoView{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.08rem;
    font-family: SFProDisplayRegular;
    font-weight: 400;
    font-size: 0.13rem;
    color: #C2C2C2;
    .logoText{
      margin-right: 0.12rem;
      margin-top: 0.02rem;
    }
    .logo{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.8rem;
      img{
        width: 0.8rem;
      }
    }
  }
}
.continue{
  width: 100%;
  height: 0.58rem;
  background: rgba(0, 89, 218, 0.5);
  border-radius: 0.29rem;
  font-size: 0.17rem;
  font-family: "GeoRegular", GeoRegular;
  font-weight: normal;
  color: #FFFFFF;
  margin-top: 0.16rem;
  cursor: no-drop;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.12rem;
  .rightIcon{
    width: 0.2rem;
    margin-left: 0.08rem;
  }
  .rightIcon{
    span{
      height: .18rem;
    }

  }
}
.continue_true{
  background: #0059DA;
  cursor: pointer;
}

.cursor{
  cursor: auto;
}

.calculationProcess{
  margin-top: 0.08rem;
  margin-bottom: 0.1rem;
}

@keyframes loadingIcon {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@media (prefers-reduced-motion: no-preference) {
  .loadingIcon {
    animation: loadingIcon infinite 2s linear;
  }
}

.pay_input ::v-deep .van-cell__value--alone{
  min-height: 0.28rem;
}
.pay_input ::v-deep .van-field__control{
  min-height: 0.28rem;
  border: none;
  outline: none;
  font-size: 0.28rem !important;
  font-family: 'SFProDisplayMedium',SFProDisplayMedium;
  font-weight: 500;
  color: #0047AD !important;
  &::placeholder{
    color: #C2C2C2 !important;
  }
}
</style>
