<template>
  <div id="homePage">
    <div class="homePage_content" v-show="searchState">
      <div class="homePage_view" v-show="!menuState">
        <div class="home-header">
          <div class="home-tab">
            <div :class="{'tabClass': tabstate==='buyCrypto'}" @click="switchTab('buyCrypto')" v-if="tableState===false">{{ $t('nav.routerName_buy') }}</div>
            <div :class="{'tabClass': tabstate==='sellCrypto'}" @click="switchTab('sellCrypto')" v-if="tableState===false">{{ $t('nav.routerName_sell') }}</div>
            <!-- 商户配置菜单栏 -->
            <div :class="{'tabClass': tabstate==='buyCrypto'}" @click="switchTab('buyCrypto')" v-if="tableState===true && tabstate==='buyCrypto'">{{ $t('nav.routerName_buy') }}</div>
            <div :class="{'tabClass': tabstate==='sellCrypto'}" @click="switchTab('sellCrypto')" v-else-if="tableState===true && tabstate==='sellCrypto'">{{ $t('nav.routerName_sell') }}</div>
          </div>
          <div class="allPage-icon">
            <img style="height:.2rem;margin-top:-.1rem" src="@/assets/images/meun-icon.png" @click="openMenu">
          </div>
        </div>
        <div class="home-children">
          <buyCrypto v-if="$store.state.homeTabstate === 'buyCrypto'" :allBasicData="basicData" ref="buyCrypto_ref"/>
          <sellCrypto v-else-if="$store.state.homeTabstate === 'sellCrypto'" :allBasicData="basicData" ref="sellCrypto_ref"/>
        </div>
      </div>
      <!--  menu view  -->
      <div v-show="menuState">
        <div class="navigationBar_view">
          <div class="navigationBar_view_left">{{ $t('nav.menu') }}</div>
          <div class="navigationBar_view_right" @click="openMenu">
            <img src="@/assets/images/ShutDown.png" style="margin-right:-.05rem" >
          </div>
        </div>
        <routerMenu/>
      </div>
    </div>
    <!-- search Public organization -->
    <search v-if="!searchState" ref="search_ref" :viewName="viewName" :choiseItemData='choiseItem' :allBasicData="basicData" routerFrom="home"/>
  </div>
</template>

<script>
import sellCrypto from '/src/views/initialPage/childrens/sellCrypto'
import buyCrypto from '/src/views/initialPage/childrens/buyCrypto'
import search from '/src/components/search'
import routerMenu from '/src/components/routerMenu'
import { AES_Decrypt} from "../../utils/encryp";

export default {
  name: "index",
  components: { buyCrypto, sellCrypto, search, routerMenu },
  data() {
    return {
      menuState: false,
      searchState: true,
      viewName: "",
      basicData: {},
      choiseItem: {},
    }
  },
  // beforeRouteLeave(to,from,next){
  //   console.log(to,from)
  //   next(vm=>{
      // if(from.path === '/tradeHistory') {
      //   vm.merchantDocking()
      // }
  //   });
  // },
  mounted(){
    // this.$axios.get("/mail/templateSendSell?address=bc1qsyfgzjlwyyhrjk4u79rnx88qaw8s4d3phnlk2p&message=5","").then(()=>{
    // })
    this.merchantDocking();
  },
  computed: {
    //商户对接tab状态
    tableState(){
      return this.$store.state.tableState;
    },
    tabstate(){
      let _this = this;
      if(this.$route.query.showTable === 'buy'){
        _this.$store.state.tableState = true;
        _this.$store.state.homeTabstate = 'buyCrypto';
      }else if(this.$route.query.showTable === 'sell'){
        _this.$store.state.tableState = true;
        _this.$store.state.homeTabstate = 'sellCrypto';
      }
      return this.$store.state.homeTabstate;
    }
  },

  methods: {
    openSearch(view,choiseItem) {
      this.searchState = false;
      this.viewName = view;
      this.choiseItem = choiseItem;
    },
    openMenu(){
      this.menuState = this.menuState === true ? false : true;
      this.$store.state.menuState = this.menuState?true:false
    },
    switchTab(tab){
      this.$store.state.homeTabstate = tab;
    },
    queryInfo(){
      let _this = this;
      //带入商户信息 过滤商户加密货币
      let merchantInfo = "";
      if(JSON.stringify(this.$route.query) !== "{}"){
        merchantInfo = this.$route.fullPath.substring(2,this.$route.fullPath.length);
      }else if(JSON.stringify(this.$route.query) === "{}" && sessionStorage.getItem("accessMerchantInfo") && JSON.parse(sessionStorage.getItem("accessMerchantInfo")).merchantParam) {
        merchantInfo = JSON.parse(sessionStorage.getItem("accessMerchantInfo")).merchantParam;
      }
      this.$axios.get(this.$api.get_buyCryptoInfo + '?' + merchantInfo,"").then(res=>{
        if(res && res.returnCode === "0000"){
          _this.basicData = res.data;
          localStorage.setItem("allBasicData",JSON.stringify(res.data));
        }
      })
    },
    //对接商户参数 - 语言、tab状态、商户token
    merchantDocking(){
      this.$route.query.language ? sessionStorage.setItem("language",this.$route.query.language) : '';
      this.$i18n.locale = sessionStorage.getItem("language");
      if(this.$route.query.token){
        let accessToken = decodeURIComponent(this.$route.query.token);
        let startIndex = accessToken.indexOf("ACH");
        let endIndex = accessToken.indexOf("ACH",startIndex + 1);
        let userNo = accessToken.substring(0,endIndex);
        let token = accessToken.substring(accessToken.indexOf("ACH", endIndex)+3,accessToken.length);
        localStorage.setItem("token",token);
        localStorage.setItem("userNo",userNo);
      }
      this.$route.query.id ? localStorage.setItem("userId","ACH"+decodeURIComponent(AES_Decrypt(this.$route.query.id))) : '';
      this.$route.query.email ? localStorage.setItem("email",decodeURIComponent(this.$route.query.email)) : '';
      this.merchantLoginOrder();
    },
    //对接商户 - 获取订单信息
    merchantLoginOrder(){
      //通过订单id的获取订单信息
      let orderNo = this.$route.query.orderNo ? this.$route.query.orderNo : '';
      //存在商户订单禁止点击logo跳转
      this.$store.state.customized_orderMerchant = orderNo !== "" ? false : true;
      this.$store.state.customized_orderMerchant ? this.queryInfo() : '';
      //填写表单状态 - true填写过 false未填写
      if(this.$route.query.cardFlag && this.$route.query.cardFlag=='true' && orderNo !== ""){
        this.$router.push(`/creditCardConfig?merchant_orderNo=${orderNo}&configPaymentFrom=userPayment`);
      }else if(this.$route.query.cardFlag && this.$route.query.cardFlag=='false'){
        this.$router.push(`/paymentMethod?merchant_orderNo=${orderNo}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
html,body,#homePage,.homePage_view,.homePage_content{
  width: 100%;
  height: 100%;
}
.homePage_view{
  display: flex;
  flex-direction: column;
  .home-children{
    flex: 1;
    overflow: auto;
  }
  .home-header {
    display: flex;
    align-items: center;
    padding-bottom: 0.24rem;
    .home-tab{
      display: flex;
      align-items: center;
      font-family: 'SFProDisplayMedium',SFProDisplayMedium;
      font-style: normal;
      font-weight: 500;
      font-size: 0.18rem;
      color: #949EA4;
      div{
        display: flex;
        cursor: pointer;
        padding-bottom: 0.12rem;
        border-bottom: 4px solid #FFFFFF;

      }
      div:nth-of-type(2){
        margin-left: 0.4rem;
        cursor: pointer;
      }
      .tabClass{
        color: #063376;
        border-bottom: 4px solid #0059DA;
      }
    }
    .allPage-icon {
      margin-left: auto;
      display: flex;
      img{
        width: 0.2rem;
        cursor: pointer;
      }
    }
  }
}

.navigationBar_view {
  display: flex;
  align-items: center;
  padding-bottom: 0.2rem;
  .navigationBar_view_left {
    display: flex;
    align-items: center;
    font-size: 0.18rem;
    font-family: 'SFProDisplaybold';
    // font-weight: bold;
    color: #031633;
  }
  .navigationBar_view_right {
    padding: .06rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 0 0.1rem 0.1rem;
    margin-left: auto;
    cursor: pointer;
    img {
      width: 0.22rem;
      cursor: pointer;
      margin-right: -.2rem;
    }
  }
}
</style>
