<!-- search Public organization -->
<template>
  <div id="search">
    <div class="searchHeader">
      <div class="searchHeader_view1">
        <div class="text">{{ viewTitle }}</div>
        <div class="icon"><img src="../assets/images/ShutDown.png" @click="closeView"></div>
      </div>
      <div class="searchHeader_view2" v-if="viewName !== 'network'">
        <input type="text" :placeholder="$t('nav.search_components_placeHolder')" v-model="searchText">
        <div class="searchIcon"><img src="https://alchemywalletdownload.oss-cn-hongkong.aliyuncs.com/alchemypay/crypto-images/searchIcon.svg"></div>
      </div>
    </div>
    <div class="search_core">
      <!-- 选择国家和法币  -->
      <ul v-if="viewName === 'payCurrency' || viewName === 'payCurrency-sell' || viewName === 'payCurrency-sell-cardForm'">
        <div v-if="searchText===''">
          <div class="screen_title" v-if="recent_payCurrency.length > 0">Recent</div>
          <li class="payCurrencyLi" v-for="(item,index) in recent_payCurrency" :key="'recent_payCurrency'+index" @click="choiseItem('payCurrency',item)">
            <p class="seach_li_text">
              <img :src="item.flag" :key="item.flag">
              <span class="allName">{{ item.enCommonName }} -</span>
              <span class="abbreviationName"> {{ item.code }}</span>
            </p>
          </li>
<!--          <div class="screen_title" v-if="poplar_payCurrency.length > 0">Popular</div>-->
<!--          <li class="payCurrencyLi" v-for="(item,index) in poplar_payCurrency" :key="'poplar_payCurrency'+index" @click="choiseItem('payCurrency',item)">-->
<!--            <p class="seach_li_text">-->
<!--              <img :src="item.flag" :key="item.flag">-->
<!--              <span class="allName">{{ item.enCommonName }} -</span>-->
<!--              <span class="abbreviationName"> {{ item.code }}</span>-->
<!--            </p>-->
<!--          </li>-->
          <div class="screen_title">Available now</div>
          <li class="payCurrencyLi" v-for="(item,index) in basicData" :key="'basicData'+index" @click="choiseItem('payCurrency',item)">
            <p class="seach_li_text">
              <img :src="item.flag" :key="item.flag">
              <span class="allName">{{ item.enCommonName }} -</span>
              <span class="abbreviationName"> {{ item.code }}</span> <!--  v-if="viewName === 'payCurrency'" -->
              <!-- <span class="abbreviationName" v-if="viewName === 'payCurrency-sell'">{{ item.fiatCode }}</span> -->
            </p>
<!--            <p class="seach_li_rightIcon">-->
<!--              <img src="../assets/images/rightIcon.png">-->
<!--            </p>-->
          </li>
        </div>
        <div v-else>
          <li class="payCurrencyLi" v-for="(item,index) in searchData" :key="'searchData'+index" @click="choiseItem('payCurrency',item)">
            <p class="seach_li_text">
              <img :src="item.flag" :key="item.flag">
              <span class="allName">{{ item.enCommonName }} -</span>
              <span class="abbreviationName"> {{ item.code }}</span> <!--  v-if="viewName === 'payCurrency'" -->
              <!-- <span class="abbreviationName" v-if="viewName === 'payCurrency-sell'">{{ item.fiatCode }}</span> -->
            </p>
<!--            <p class="seach_li_rightIcon">-->
<!--              <img src="../assets/images/rightIcon.png">-->
<!--            </p>-->
          </li>
        </div>
      </ul>

      <!-- 买币选择加密货币 -->
      <ul v-if="viewName === 'currency'">
        <div v-if="searchText===''">
          <div class="screen_title" v-if="cryptoCurrency_recentList.length > 0">Recent</div>
          <li v-for="(item,index) in cryptoCurrency_recentList" :key="'cryptoCurrency_recentList'+index" @click="choiseItem('currency',item)">
            <div class="seach_li_img">
              <img :src="item.logoUrl">
              <!-- <p class="networkIcon" v-if="item.buyNetwork.logo"><img :src="item.buyNetwork.logo" alt=""></p> -->
            </div>
            <p class="seach_li_text currencyCopywriting">{{ item.name }} <span class="seach_li_allText" v-if="item.fullName"> - {{ item.fullName }}</span></p>   <!-- {{ item.buyNetwork.networkName }} -->
          </li>
          <div class="screen_title" v-if="popularList.length > 0">{{ $t('nav.search_components_Popular') }}</div>
          <li v-for="(item,index) in popularList" :key="'popularList'+index" @click="choiseItem('currency',item)">
            <div class="seach_li_img">
              <img :src="item.logoUrl">
              <!-- <p class="networkIcon" v-if="item.buyNetwork.logo"><img :src="item.buyNetwork.logo" alt=""></p> -->
            </div>
            <p class="seach_li_text currencyCopywriting">{{ item.name }} <span class="seach_li_allText" v-if="item.fullName"> - {{ item.fullName }}</span></p>
          </li>
          <div class="screen_title">{{ $t('nav.search_components_All') }}</div>
          <li :class="{'allCurrencyLi': index===0}" v-for="(item,index) in cryptoCurrencyVOList" :key="'cryptoCurrencyVOList'+index" @click="choiseItem('currency',item)">
            <div class="seach_li_img">
              <img :src="item.logoUrl">
              <!-- <p class="networkIcon" v-if="item.buyNetwork.logo"><img :src="item.buyNetwork.logo" alt=""></p> -->
            </div>
            <p class="seach_li_text currencyCopywriting">{{ item.name }} <span class="seach_li_allText" v-if="item.fullName"> - {{ item.fullName }}</span></p>
          </li>
        </div>
        <div v-else>
          <li v-for="(item,index) in searchData" :key="'searchData'+index" @click="choiseItem('currency',item)">
            <div class="seach_li_img">
              <img :src="item.logoUrl">
              <!-- <p class="networkIcon" v-if="item.buyNetwork.logo"><img :src="item.buyNetwork.logo" alt=""></p> -->
            </div>
            <p class="seach_li_text currencyCopywriting">{{ item.name }} <span class="seach_li_allText" v-if="item.fullName"> - {{ item.fullName }}</span></p>
          </li>
        </div>
      </ul>

      <!-- 选择网络 -->
      <ul v-else-if="viewName === 'network'">
        <li v-for="(item,index) in basicData" :key="'basicData'+index" @click="choiseItem('network',item)">
          <!-- {{ item.network }} -->
          <p class="seach_li_text"><span class="seach_li_allText">{{ item.networkName }}</span></p>
          <p class="seach_li_rightIcon"><img src="../assets/images/rightIcon.png"></p>
        </li>
      </ul>

      <!-- 卖币选择加密货币 -->
      <ul v-else-if="viewName === 'currency-sell'">
        <div v-if="searchText===''">
<!--          <div class="screen_title" v-if="cryptoCurrency_recentList.length > 0">Recent</div>-->
<!--          <li v-for="(item,index) in cryptoCurrency_recentList" :key="'cryptoCurrency_recentList'+index" @click="choiseItem('currency-sell',item)">-->
<!--            <div class="seach_li_img">-->
<!--              <img :src="item.logoUrl">-->
<!--              <p class="networkIcon"><img src="../assets/images/hk.svg" alt=""></p>-->
<!--            </div>-->
<!--            <p class="seach_li_text currencyCopywriting">{{ item.name }} <span class="seach_li_allText" v-if="item.buyNetwork"> - {{ item.buyNetwork.networkName }}</span></p>-->
<!--            <p class="seach_li_rightIcon"><img src="../assets/images/rightIcon.png"></p>-->
<!--          </li>-->
<!--          <div class="screen_title" v-if="popularList.length>0">Popular</div>-->
<!--          <li v-for="(item,index) in popularList" :key="'popularList'+index" @click="choiseItem('currency-sell',item)">-->
<!--            <div class="seach_li_img">-->
<!--              <img :src="item.logoUrl">-->
<!--              <p class="networkIcon"><img src="../assets/images/hk.svg" alt=""></p>-->
<!--            </div>-->
<!--            <p class="seach_li_text currencyCopywriting">{{ item.name }} <span class="seach_li_allText" v-if="item.sellNetwork"> - {{ item.sellNetwork.networkName }}</span></p>-->
<!--            <p class="seach_li_rightIcon"><img src="../assets/images/rightIcon.png"></p>-->
<!--          </li>-->
          <div class="screen_title">{{ $t('nav.search_components_All') }}</div>
          <li :class="{'allCurrencyLi': index===0}" v-for="(item,index) in cryptoCurrencyVOList" :key="'cryptoCurrencyVOList'+index" @click="choiseItem('currency-sell',item)">
            <div class="seach_li_img">
              <img :src="item.logoUrl">
              <p class="networkIcon" v-if="item.sellNetwork.logo"><img :src="item.sellNetwork.logo" alt=""></p>
            </div>
            <p class="seach_li_text currencyCopywriting">{{ item.name }} <span class="seach_li_allText" v-if="item.sellNetwork"> - {{ item.sellNetwork.networkName }}</span></p>
<!--            <p class="seach_li_rightIcon"><img src="../assets/images/rightIcon.png"></p>-->
          </li>
        </div>
        <div v-else>
          <li v-for="(item,index) in searchData" :key="'search_'+index" @click="choiseItem('currency-sell',item)">
            <div class="seach_li_img">
              <img :src="item.logoUrl">
              <p class="networkIcon" v-if="item.sellNetwork.logo"><img :src="item.sellNetwork.logo" alt=""></p>
            </div>
            <p class="seach_li_text currencyCopywriting">{{ item.name }} <span class="seach_li_allText"> - {{ item.sellNetwork.networkName }}</span></p>
<!--            <p class="seach_li_rightIcon"><img src="../assets/images/rightIcon.png"></p>-->
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 搜索、选择列表组件
 */

export default {
  name: "search",
  props: ['viewName','allBasicData','choiseItemData','routerFrom'],
  data(){
    return{
      viewTitle: "",

      //Search for data
      searchText: "",

      //all data(all / network)
      basicData: {},

      //国家法币上次交易数据
      recent_payCurrency: [],
      //热门国家法币
      poplar_payCurrency: [],

      cryptoCurrency_recentList: [],
      //Recommended digital currency list
      popularList: [],
      //Support digital currency list
      cryptoCurrencyVOList: [],

      //国家法币
      countryLegalCurrency: [],
    }
  },
  computed: {
    //Fuzzy search
    searchData(){
      //选择国家和法币
      if(this.searchText && (this.viewName === 'payCurrency' || this.viewName === 'payCurrency-sell' || this.viewName === 'payCurrency-sell-cardForm')) { //country
        let resultArray_country1 = [],resultArray_country2 = [],resultArray_country3 = [],resultArray_country4 = [],all_resultArray_country = [];
        //根据国家名称筛选
        resultArray_country1 = this.basicData.filter((value,index) => {
          if(value.enCommonName.includes(this.searchText)){
            this.basicData[index].indexOfNum = value.enCommonName.indexOf(this.searchText);
            return value;
          }
        })
        resultArray_country2 = this.basicData.filter((value,index) => {
          if(value.enCommonName.includes(this.searchText.charAt(0).toUpperCase() + this.searchText.slice(1))){
            this.basicData[index].indexOfNum = value.enCommonName.indexOf(this.searchText.charAt(0).toUpperCase() + this.searchText.slice(1));
            return value;
          }
        })
        //根据国家简称筛选
        resultArray_country3 = this.basicData.filter((value,index) => {
          if(value.alpha2.includes(this.searchText)){
            this.basicData[index].indexOfNum = value.alpha2.indexOf(this.searchText);
            return value;
          }
        })
        resultArray_country4 = this.basicData.filter((value,index) => {
          if(value.alpha2.includes(this.searchText.toUpperCase())){
            this.basicData[index].indexOfNum = value.alpha2.indexOf(this.searchText.toUpperCase());
            return value;
          }
        })
        all_resultArray_country = all_resultArray_country.concat(resultArray_country4).concat(resultArray_country3).concat(resultArray_country2).concat(resultArray_country1);
        all_resultArray_country = [...new Set(all_resultArray_country)];
        all_resultArray_country.sort((a,b)=>{return a.indexOfNum-b.indexOfNum});
        return all_resultArray_country;
      }

      //买币选择加密货币
      if(this.searchText && this.viewName === 'currency'){
        let resultArray1 = [],resultArray2 = [],resultArray3 = [],resultArray4 = [],all_resultArray = [];
        //Match full name
        resultArray1 = this.cryptoCurrencyVOList.filter((value,index) => {
          if(value.fullName.includes(this.searchText)){
            this.cryptoCurrencyVOList[index].indexOfNum = value.fullName.indexOf(this.searchText);
            return value;
          }
        })
        //Match full name - Initial to capital
        resultArray2 = this.cryptoCurrencyVOList.filter((value,index) => {
          if(value.fullName.includes(this.searchText.replace(/^\S/, s => s['toUpperCase']()))){
            this.cryptoCurrencyVOList[index].indexOfNum = value.fullName.indexOf(this.searchText.replace(/^\S/, s => s['toUpperCase']()));
            return value
          }
        })
        //Matching abbreviations - Capitalize
        resultArray3 = this.cryptoCurrencyVOList.filter((value,index) => {
          if(value.name.includes(this.searchText.toUpperCase())){
            this.cryptoCurrencyVOList[index].indexOfNum = value.name.indexOf(this.searchText.toUpperCase());
            return value
          }
        })
        //Matching abbreviations
        resultArray4 = this.cryptoCurrencyVOList.filter((value,index) => {
          if(value.name.includes(this.searchText)){
            this.cryptoCurrencyVOList[index].indexOfNum = value.name.indexOf(this.searchText);
            return value;
          }
        })
        all_resultArray = all_resultArray.concat(resultArray1).concat(resultArray2).concat(resultArray3).concat(resultArray4);
        all_resultArray = [...new Set(all_resultArray)];
        all_resultArray.sort((a,b)=>{return a.indexOfNum-b.indexOfNum});
        return all_resultArray;
      }

      //卖币选择加密货币
      if(this.searchText && this.viewName === 'currency-sell'){
        let resultArray1 = [],resultArray2 = [],resultArray3 = [],resultArray4 = [],all_resultArray = [];
        //Match full name
        resultArray1 = this.cryptoCurrencyVOList.filter((value,index) => {
          if(value.fullName.includes(this.searchText)){
            this.cryptoCurrencyVOList[index].indexOfNum = value.fullName.indexOf(this.searchText);
            return value
          }
        })
        //Match full name - Initial to capital
        resultArray2 = this.cryptoCurrencyVOList.filter((value,index) => {
          if(value.fullName.includes(this.searchText.replace(/^\S/, s => s['toUpperCase']()))){
            this.cryptoCurrencyVOList[index].indexOfNum = value.fullName.indexOf(this.searchText.replace(/^\S/, s => s['toUpperCase']()))
            return value
          }
        })
        //Matching abbreviations - Capitalize
        resultArray3 = this.cryptoCurrencyVOList.filter((value,index) => {
          if(value.name.includes(this.searchText.toUpperCase())){
            this.cryptoCurrencyVOList[index].indexOfNum = value.name.indexOf(this.searchText.toUpperCase())
            return value
          }
        })
        //Matching abbreviations
        resultArray4 = this.cryptoCurrencyVOList.filter((value,index) => {
          if(value.name.includes(this.searchText)){
            this.cryptoCurrencyVOList[index].indexOfNum = value.name.indexOf(this.searchText)
            return value
          }
        })
        all_resultArray = all_resultArray.concat(resultArray1).concat(resultArray2).concat(resultArray3).concat(resultArray4);
        all_resultArray = [...new Set(all_resultArray)];
        all_resultArray.sort((a,b)=>{return a.indexOfNum-b.indexOfNum});
        return all_resultArray;
      }
    }
  },
  watch: {
    allBasicData: {
      immediate: true,
      deep: true,
      handler() {
        this.initializationData();
      },
    }
  },
  mounted(){
    this.customComponentTitle();
  },
  methods: {
    //Judge title name
    customComponentTitle(){
      if(this.viewName === 'payCurrency' || this.viewName === 'payCurrency-sell' || this.viewName === 'payCurrency-sell-cardForm'){
        this.viewTitle = this.$t('nav.search_components_countryTitle');
        return;
      }
      if(this.viewName === 'currency' || this.viewName === 'currency-sell'){
        this.viewTitle = this.$t('nav.search_components_cryptoTitle');
        return;
      }
      if(this.viewName === 'network'){
        this.viewTitle = this.$t('nav.search_components_networkTitle');
        return;
      }
    },

    //Get and call component path, processing data
    initializationData(){
      if(this.viewName === 'currency'){
        this.basicData = JSON.parse(JSON.stringify(this.allBasicData));
        this.$nextTick(()=>{
          // let newCurrencyList = [];
          // let newPopularList = [];
          // let newrecentList = [];
          // let newCurrencyList_network = [];
          // let newPopularList_network = [];
          // let newrecentList_network = [];
          //受欢迎的
          // if(this.basicData.cryptoCurrencyResponse.popularList){
          //   newPopularList = this.basicData.cryptoCurrencyResponse.popularList.filter(item=>{ return item.purchaseSupported === 1 });
          //   newPopularList.forEach(item=>{
          //     if(item.buyNetworkList){
          //       item.buyNetworkList.forEach(item2=>{
          //         let fiat = {
          //           buyNetwork: item2,
          //         }
          //         fiat = {...fiat,...item};
          //         newPopularList_network.push(fiat);
          //       })
          //     }
          //   });
          //   this.popularList = newPopularList_network;
          // }
          // //全部
          // if(this.basicData.cryptoCurrencyResponse.cryptoCurrencyList){
          //   newCurrencyList = this.basicData.cryptoCurrencyResponse.cryptoCurrencyList.filter(item=>{ return item.purchaseSupported === 1 });
          //   newCurrencyList.forEach(item=>{
          //     if(item.buyNetworkList){
          //       item.buyNetworkList.forEach(item2=>{
          //         let fiat = {
          //           buyNetwork: item2,
          //         }
          //         fiat = {...fiat,...item};
          //         newCurrencyList_network.push(fiat);
          //       })
          //     }
          //   });
          //   this.cryptoCurrencyVOList = newCurrencyList_network;
          // }
          // //历史交易过的币种
          // if(this.basicData.cryptoCurrencyResponse.buyRecentList){
          //   newrecentList = this.basicData.cryptoCurrencyResponse.buyRecentList.filter(item=>{ return item.purchaseSupported === 1 });
          //   newrecentList.forEach(item=>{
          //     if(item.buyNetworkList){
          //       item.buyNetworkList.forEach(item2=>{
          //         let fiat = {
          //           buyNetwork: item2,
          //         }
          //         fiat = {...fiat,...item};
          //         newrecentList_network.push(fiat);
          //       })
          //     }
          //   });
          //   this.cryptoCurrency_recentList = newrecentList_network
          // }
          this.cryptoCurrencyVOList = [];
          this.cryptoCurrency_recentList = [];
          this.popularList = [];
          if(this.basicData.cryptoCurrencyResponse.cryptoCurrencyList){
            this.cryptoCurrencyVOList = this.basicData.cryptoCurrencyResponse.cryptoCurrencyList.filter(item=>{return item.purchaseSupported === 1});
          }
          if(this.basicData.cryptoCurrencyResponse.buyRecentList){
            this.cryptoCurrency_recentList = this.basicData.cryptoCurrencyResponse.buyRecentList.filter(item=>{return item.purchaseSupported === 1});
          }
          if(this.basicData.cryptoCurrencyResponse.popularList){
            this.popularList = this.basicData.cryptoCurrencyResponse.popularList.filter(item=>{return item.purchaseSupported === 1});
          }
        })
        return;
      }
      if(this.viewName === 'network'){
        this.basicData = [];
        this.basicData = JSON.parse(JSON.stringify(this.allBasicData));
        return;
      }
      if(this.viewName === 'payCurrency'){
        this.basicData = [];
        this.recent_payCurrency = [];
        this.poplar_payCurrency = [];
        let newWorldList = [];
        let recent_newWorldList = [];
        let poplar_newWorldList = [];
        if(this.allBasicData.worldList){
          this.allBasicData.worldList.forEach(item=>{
            if(item.buyFiatList){
              item.buyFiatList.forEach(item2=>{
                let fiat = {
                  code: item2.code,
                }
                fiat = {...fiat,...item};
                newWorldList.push(fiat);
              })
            }
          });
          newWorldList = newWorldList.filter(item=>{return item.buyEnable === 1});
        }
        if(this.allBasicData.buyRecentWorldList){
          this.allBasicData.buyRecentWorldList.forEach(item=>{
            if(item.buyFiatList){
              item.buyFiatList.forEach(item2=>{
                let fiat = {
                  code: item2.code,
                }
                fiat = {...fiat,...item};
                recent_newWorldList.push(fiat);
              })
            }
          });
          recent_newWorldList = recent_newWorldList.filter(item=>{return item.buyEnable === 1});
        }
        if(this.allBasicData.buyPoplarWorldFiat){
          this.allBasicData.buyPoplarWorldFiat.forEach(item=>{
            if(item.buyFiatList){
              item.buyFiatList.forEach(item2=>{
                let fiat = {
                  code: item2.code,
                }
                fiat = {...fiat,...item};
                poplar_newWorldList.push(fiat);
              })
            }
          });
          poplar_newWorldList = poplar_newWorldList.filter(item=>{return item.buyEnable === 1});
        }

        this.recent_payCurrency = recent_newWorldList;
        this.basicData = newWorldList;
        this.poplar_payCurrency = poplar_newWorldList;
        return;
      }
      if(this.viewName === 'payCurrency-sell' || this.viewName === 'payCurrency-sell-cardForm'){
        let allBasicData = JSON.parse(JSON.stringify(this.allBasicData));
        this.basicData = [];
        this.recent_payCurrency = [];
        this.poplar_payCurrency = [];
        let newWorldList = [];
        let recent_newWorldList = [];
        let poplar_newWorldList = [];
        if(allBasicData.worldList){
          allBasicData.worldList.forEach(item=>{
            if(item.sellFiatList){
              item.sellFiatList.forEach(item2=>{
                let fiat = {
                  code: item2.code,
                }
                fiat = {...fiat,...item};
                newWorldList.push(fiat);
              })
            }
          });
          newWorldList = newWorldList.filter(item=>{return item.sellEnable === 1});
        }
        this.basicData = newWorldList;
        //上次购买过的国家和法币
        if(allBasicData.sellRecentWorldList){
          allBasicData.sellRecentWorldList.forEach(item=>{
            if(item.sellFiatList){
              item.sellFiatList.forEach(item2=>{
                let fiat = {
                  code: item2.code,
                }
                fiat = {...fiat,...item};
                recent_newWorldList.push(fiat);
              })
            }
          });
          recent_newWorldList = recent_newWorldList.filter(item=>{return item.buyEnable === 1});
        }
        this.recent_payCurrency = recent_newWorldList;
        //热门的
        // if(this.allBasicData.buyPoplarWorldFiat){
        //   this.allBasicData.buyPoplarWorldFiat.forEach(item=>{
        //     if(item.buyFiatList){
        //       item.buyFiatList.forEach(item2=>{
        //         let fiat = {
        //           code: item2.code,
        //         }
        //         fiat = {...fiat,...item};
        //         poplar_newWorldList.push(fiat);
        //       })
        //     }
        //   });
        //   poplar_newWorldList = poplar_newWorldList.filter(item=>{return item.buyEnable === 1});
        // }
        // this.poplar_payCurrency = poplar_newWorldList;
        return;
      }
      if(this.viewName === 'currency-sell'){
        this.basicData = JSON.parse(JSON.stringify(this.allBasicData));
        if(this.basicData.cryptoCurrencyResponse){
          let newCurrencyList = [];
          // let newPopularList = [];
          // let newrecentList = [];
          let newCurrencyList_network = [];
          // let newPopularList_network = [];
          // let newrecentList_network = [];
          newCurrencyList = this.basicData.cryptoCurrencyResponse.cryptoCurrencyList.filter(item=>{ return item.isSell === 1 });
          // newPopularList = this.basicData.cryptoCurrencyResponse.popularList.filter(item=>{ return item.isSell === 1 });
          // newrecentList = this.basicData.cryptoCurrencyResponse.sellRecentList.filter(item=>{ return item.isSell === 1 });
          //受欢迎的
          // newPopularList.forEach(item=>{
          //   if(item.sellNetworkList){
          //     item.sellNetworkList.forEach(item2=>{
          //       let fiat = {
          //         sellNetwork: item2,
          //       }
          //       fiat = {...fiat,...item};
          //       newPopularList_network.push(fiat);
          //     })
          //   }
          // });
          // this.popularList = newPopularList_network;
          //全部
          newCurrencyList.forEach(item=>{
            if(item.sellNetworkList){
              item.sellNetworkList.forEach(item2=>{
                let fiat = {
                  sellNetwork: item2,
                }
                fiat = {...fiat,...item};
                newCurrencyList_network.push(fiat);
              })
            }
          });
          this.cryptoCurrencyVOList = newCurrencyList_network;
          //历史交易过的币种
          // newrecentList.forEach(item=>{
          //   if(item.sellNetworkList){
          //     item.sellNetworkList.forEach(item2=>{
          //       let fiat = {
          //         sellNetwork: item2,
          //       }
          //       fiat = {...fiat,...item};
          //       newrecentList_network.push(fiat);
          //     })
          //   }
          // });
          // this.cryptoCurrency_recentList = newrecentList_network
        }
        return;
      }
    },

    //close component
    closeView(){
      if(this.viewName === 'currency' || this.viewName === 'currency-sell' || this.viewName === 'payCurrency-sell' || this.viewName === 'payCurrency') {
        this.$parent.searchState = true;
        return;
      }
      if(this.viewName === 'network'){
        this.$parent.$parent.$refs.viewTab.tabState = true;
        this.$parent.searchViewState = false;
        return;
      }
      if(this.$route.path === '/sell-formUserInfo' && this.viewName === "payCurrency-sell-cardForm"){
        this.$parent.$parent.$refs.viewTab.changeCountry_state = false;
        this.$parent.changeCountry_state = false;
      }
    },

    //Select data
    choiseItem(type,item){
      setTimeout(()=>{
        if(type === 'currency'){
          this.$parent.$refs.buyCrypto_ref.currencyData.icon = item.logoUrl;
          this.$parent.$refs.buyCrypto_ref.currencyData.name = item.name;
          this.$parent.$refs.buyCrypto_ref.currencyData.networkFee = item.networkFee;
          this.$parent.$refs.buyCrypto_ref.currencyData.price = item.price;
          this.$parent.$refs.buyCrypto_ref.currencyData.serviceFee = item.serviceFee;
          this.$parent.$refs.buyCrypto_ref.currencyData.buyNetwork = item.buyNetworkList;
          this.$store.state.buyRouterParams.cryptoCurrency = item.name;
          this.$parent.$refs.buyCrypto_ref.payinfo();
          this.$parent.searchState = true;
          return;
        }
        if(type === 'network'){
          this.$nextTick(()=>{
            this.$parent.buyParams.network = item.network;
            this.$parent.network_fullName = item.networkName;
            this.$store.state.buyRouterParams.network = item.network;
            this.$store.state.buyRouterParams.network_fullName = item.network;
            this.$parent.networkRegular = item.addressRegex;
            this.$parent.$parent.$refs.viewTab.tabState = true;
            this.$parent.searchViewState = false;
            if(!new RegExp(this.$parent.networkRegular).test(this.$parent.buyParams.address)){
              this.$parent.walletAddress_state = true;
            }else{
              this.$parent.walletAddress_state = false;
            }
          })
          return;
        }
        if(this.viewName === 'currency-sell'){ //卖币
          let currencyData = {
            icon: item.logoUrl,
            name: item.name,
            maxSell: item.sellNetwork.maxSell,
            minSell: item.sellNetwork.minSell,
            cryptoCurrencyNetworkId: item.cryptoCurrencyNetworkId,
            symbol: item.symbol,
            sellNetwork: item.sellNetwork
          }
          this.$parent.$refs.sellCrypto_ref.currencyData = currencyData;
          this.$store.state.sellRouterParams.currencyData = currencyData;
          this.$store.state.sellRouterParams.cryptoCurrency = item.name;
          this.$store.state.feeParams.symbol = item.symbol;
          this.$store.state.feeParams_order.symbol = item.symbol;
          this.$parent.$refs.sellCrypto_ref.amountControl();
          this.$parent.searchState = true;
          return;
        }
        //country payCurrency
        if(type === 'payCurrency'){
          if(this.viewName === 'payCurrency'){ //买币
            this.$parent.$refs.buyCrypto_ref.handlePayWayList(item,2);
            this.$parent.searchState = true;
            // this.$parent.$refs.buyCrypto_ref.amountControl();
          }else if(this.viewName === 'payCurrency-sell'){ //卖币
            this.$parent.$refs.sellCrypto_ref.handlePayWayList(item,2);
            this.$parent.$refs.sellCrypto_ref.amountControl();
            this.$parent.searchState = true;
          }else if(this.viewName === 'payCurrency-sell-cardForm'){
            this.$store.state.sellRouterParams.formPositionData = item;
            this.$parent.initializeForm();
            this.$parent.queryCardInfoList();
            this.$parent.initializeGoDown();
            // this.$store.state.feeParams.fiatCode = item.code;
            // this.$store.state.feeParams.alpha2 = item.alpha2;
            this.$store.state.feeParams_order.alpha2 = item.alpha2;
            this.$store.state.feeParams_order.fiatCode = item.code;
            this.$parent.$parent.$refs.viewTab.changeCountry_state = false;
            this.$parent.changeCountry_state = false;
            this.$parent.isOldCardInfo = false;
          }
          return;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
#search{
  z-index: 99;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .search_core{
    flex: 1;
    overflow: auto;
    .screen_title{
      font-size: 0.13rem;
      font-family: "GeoDemibold", GeoDemibold;
      color: #6E7687;
      margin-top: 0.24rem;
      &:first-child{
        margin-top: 0;
      }
    }
    .allCurrencyLi{
      margin-top: 0.16rem !important;
    }
    ul{
      height: 100%;
      .payCurrencyLi:first-child{
        margin-top: 0;
      }
      li{
        display: flex;
        align-items: center;
        margin-top: 0.24rem;
        cursor: pointer;
        .seach_li_img{
          display: flex;
          width: 0.36rem;
          height: 0.36rem;
          background: #94ACBA;
          border-radius: 50%;
          position: relative;
          img{
            width: 0.36rem;
            border-radius: 50%;
            background: #E0E0E0;
          }
          .networkIcon{
            width: 0.19rem;
            height: 0.19rem;
            background: #FFFFFF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0;
            right: -0.06rem;
            img{
              width: 0.15rem;
              height: 0.15rem;
              border-radius: 50%;
            }
          }
        }
        .seach_li_text{
          font-size: 0.16rem;
          font-family: "GeoDemibold", GeoDemibold;
          font-weight: 400;
          color: #6E7687;
          display: flex;
          align-items: center;
          margin-left: 0.05rem;
          .seach_li_allText{
            font-family: "GeoLight",GeoLight;
            margin-left: 0.04rem;
          }
          .allName{
            font-size: 0.16rem;
            font-family: "GeoDemibold", GeoDemibold;
            font-weight: normal;
            color: #6E7687;
          }
          .abbreviationName{
            font-family: "GeoLight",GeoLight;
            margin-left: 0.03rem;
            color: #6E7687;
          }
          img{
            width: 0.36rem;
            height: 0.36rem;
            border-radius: 50%;
            margin-right: 0.08rem;
            background: #E0E0E0;
          }
        }
        .currencyCopywriting{
          margin-left: 0.11rem;
        }
        .seach_li_rightIcon{
          display: flex;
          align-items: center;
          margin-left: auto;
          font-size: 0.16rem;
          font-weight: 400;
          color: #232323;
          img{
            height: 0.22rem;
            margin-left: 0.21rem;
          }
        }
      }
      li:nth-of-type(1){
        margin-top: 0.16rem;
      }
    }
  }
}
.searchHeader{
  padding-bottom: 0.24rem;
  .searchHeader_view1{
    font-size: 0.21rem;
    font-family: "GeoDemibold", GeoDemibold;
    color: #232323;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 0 0.1rem 0.1rem;
    .text{
      font-size: .18rem;
      color: #031633;
    }
    .icon{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.1rem;
      margin-left: auto;
      cursor: pointer;
      img{
        width: 0.22rem
      }
    }
  }
  .searchHeader_view2{
    width: 100%;
    height: 0.6rem;
    background: #F4F5F7;
    border-radius: 10px;
    border: 1px solid #0059DA;;
    display: flex;
    margin-top: 0.3rem;
    position: relative;
    border-radius: .3rem;
    overflow: hidden;
    input{
      width: 100%;
      height: 100%;
      font-size: 0.16rem;
      font-family: "GeoRegular", GeoRegular;
      font-weight: normal;
      padding: 0 0.47rem;
      background: #F7F8FA;
      border-radius: 10px;
      outline: none;
      border: none;
      color: #6E7687;
    }
    input::placeholder{
      color: #BFBFBF;
    }
    .searchIcon{
      display: flex;
      position: absolute;
      left: 0.2rem;
      top: 0.21rem;
      img{
        width: 0.16rem;
      }
    }
  }
}
</style>
