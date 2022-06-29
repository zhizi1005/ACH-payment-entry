module.exports = {
    language:'繁体中文',
    nav:{
        /**
         * 按钮文案
         */
        Continue: '繼續',
        Confirm: '確認',
        ConfirmPayment: '確認付款',
        queryOderState: '我已經完成付款',
        orderRsult: '返回首頁',

        /**
         * 组件
         */
        //网络地址组件
        networkAddress_components_title: '地址',
        //协议组件
        agreement_components_text1: '兹授權',
        agreement_components_text2: 'AlchemyPay ',
        agreement_components_text3: '當日從我選擇的付款方式中扣除上述金額，我充分瞭解此操作不能取消、召回或退款。',
        //查询订单状态提示
        orderTips_title: '系統沒有檢索到付款資訊',
        orderTips_text: '抱歉，我們沒有檢測到您的付款信息。 如果您確認付款，請在此頁面稍作停留，一旦我們收到您的付款，我們會將相應金額的USDT轉給您。',
        orderTips_buttonText: '我已瞭解',

        /**
         * 路由
         */
        routerName_buy: '買幣',
        routerName_sell: '賣幣',
        routerName_email: '輸入email地址',
        routerName_emailCode: '驗證碼',
        routerName_Transactions: '交易記錄',
        routerName_receivingMode: '收幣',
        routerName_paymentMethod: '選擇付款方式',
        routerName_basisIdAuth: 'basis-Id-Auth',
        routerName_buyForm: '輸入銀行卡信息',
        routerName_creditCardConfig: '確認付款',
        routerName_buyPayment: '付款',
        routerName_buyOtherWayPay: '確認付款',
        routerName_paymentResult: '付款結果',
        routerName_sellForm: '輸入信息',
        routerName_configSell: '確認',
        routerName_sellOrder: '訂單',

        /**
         * 菜单
         */
        login: '登錄',
        login_required: '格式錯誤.',
        loginOut: '退出',
        loginOut_title: '確定退出?',
        loginOut_Dismiss: '取消',
        enterEmail: '輸入email地址',
        loginTitle1: '通過Alchemy Pay結算',
        loginTitle2: '在數以百計的加密幣APP中最快捷、安全的結算方式。',
        codeTitle1: '已將確認碼發送至您的郵箱。',
        codeTitle2: '如果您未收到確認碼',
        codeTitle3: '將發送新的確認碼',
        codeSecond: 's',
        code_: ' 我同意Alchemy Pay之',
        code_name: '服務條款',
        code_and: '和',
        code_name2: '隱私政策',
        code_text: "我同意Alchemy Pay之",
        menu: '菜單',
        menu_transactions: '交易',
        menu_language: '語言',
        menu_terms: '服務條款',
        menu_privacy: '隱私政策',
        menu_logOut: '退出',
        RouterMenu_experience: '登錄方可體驗全部功能',

        /**
         * 首页
         */
        copyTips: '複製成功',
        // 买币标题
        home_buyTitle: "買幣",
        //卖币标题
        home_sellTitle: "賣幣",
        home_Tips: '繼續操作即表示您同意我們的 cookie 政策。',
        home_minAmountTips: '最低交易額為',
        home_maxAmountTips: '最高交易額為',
        home_feeTimeDownTitle: '剩餘時間',
        home_feeTimeDown: '引用更新數據',
        home_feeRampFeeTips: '低至',

        /**
         * 买币
         */
        home_youPay: '您支付',
        home_youBuyGet: '您支付',
        home_buyFee_timeDownTitle: '剩餘時間',
        home_buyFee_timeDown: '引用更新數據',
        home_buyFee_title1: '您得到',
        home_buyFee_title2: '获得',
        home_buyFee_rampFee: '服務費',
        home_buyFee_networkFee: '網絡費',
        //卖币
        home_youSell: '您卖出',
        home_youSellGet: '您獲得',
        home_sellFee_title1: '您賣出',
        home_sellFee_title2: '获得',
        home_sellFee_rampFee: '服務費',
        //搜索组件
        search_components_countryTitle: '選擇國家',
        search_components_cryptoTitle: '選擇幣種',
        search_components_networkTitle: '選擇網路',
        //买币 - 选择接收方式
        buy_receivingMode_tips: '輸入您的錢包地址',
        buy_receivingMode_addressTitle: '您的',
        buy_receivingMode_addressPlaceholder: '錢包地址…',
        buy_receivingMode_networkTitle: '您的ACH地址',
        buy_receivingMode_networkPlaceholder: '選擇網路',
        buy_receivingMode_addressTips1: '為無效',
        buy_receivingMode_addressTips2: '地址',
        //买币 - 选择支付方式
        buy_payment_savedTitle: '已保存的付款方式',
        buy_payment_addTitle: '添加新的付款方式',
        buy_payment_instant: '實時支付',
        buy_payment_ending: '支付完畢',
        //买币 - 确认订单 - 国际卡
        buy_configPay_title1: '支付方式',
        buy_configPay_title2: 'CVV',
        //买币 - 填写表单 - 国际卡
        buy_form_firstName: '名字',
        buy_form_lastName: '姓氏',
        buy_form_cardNumber: '卡號',
        buy_form_expirationDate: '有效日期',
        buy_form_CVV: 'CVV',
        buy_form_dataTips: '有效日期輸入有誤',
        buy_form_cardNumTips: '請輸入正確的有效日期。',
        buy_form_cvvTips: '請輸入正確的CVV',

        //买币 - 确认订单 - 印尼支付
        buy_configPayIDR_va_title: '銀行',
        buy_configPayIDR_va_codeTitle: '支付碼',
        buy_configPayIDR_timeDownTips: '請用以下方式完成支付',
        buy_configPayIDR_codeTips: '掃描二維碼以完成支付',
        buy_configPayIDR_ovo_phoneTips: '打開 OVO 應用程序完成支付。',
        //订单结果页
        payResult_errorMessage: '支付超時！',
        payResult_timeErrorMessage: '支付失敗！ 請檢查您的銀行卡信息。',
        payResult_feeAmount: '交易金額',
        payResult_feeAddress: '錢包地址',
        payResult_feeHash: '收費列表',
        payResult_feeWallet: 'ACH 錢包',
        payResult_feePassword: 'ACH 錢包',



        /**
         * 卖币
         */
        //卖币状态
        Sellorder_transfer:'請匯款',
        Sellorder_within:'至本地址',
        Sellorder_will:'將',
        Sellorder_get:'獲取',
        Sellorder_for:'  為',
        Sellorder_details:'請修改您銀行卡的詳細信息',
        Sellorder_page:'若繼續賣幣，請返回首頁',
        Sellorder_Crypto:'發送幣',
        Sellorder_Received:'已接收',
        Sellorder_Initiate:'匯款中',
        Sellorder_success:'成功',
        Sellorder_fail:'失敗',

        Sellorder_Transfer:'等待结果',
        Sellorder_Id:'訂單識別號',


        Sellorder_Network:'網路',
        Sellorder_Address:'地址',
        Sellorder_Card:'卡',
        Sellorder_Fail:'失敗原因',
        Sellorder_Continue:'繼續賣幣',
        Sellorder_QRCode:'掃描二維碼',
        Sellorder_You:'你',
        SellOrder_modified:'卡資訊目前無法修改',
        //菜单栏语言
        RouterMenu_Welcome:'歡迎來到Alchemy Pay!',
        RouterMenu_history:'沒有交易記錄',
        //确认订单页
        sell_configOrder_title: '銀行卡',
        //表单页
        sell_form_tips: '提示',
        sell_form_Name: '名字',
        sell_form_NameTips: '無效名字!',
        sell_form_Address: '地址',
        sell_form_AddressTips: '無效地址!',
        sell_form_AddressMultinomialTips: '地址不可為空',
        sell_form_City: '城市',
        sell_form_CityTips: '無效城市名!',
        sell_form_State: '州/省',
        sell_form_StateTips: '無效州/省名!',
        sell_form_Postcode: '郵政編碼',
        sell_form_PostcodeTips: '無效郵政編碼!',
        sell_form_accountNumber: '賬號',
        sell_form_accountNumberTips: '無效賬號!',
        sell_form_achCode: 'ACH 碼',
        sell_form_achCodeTips: '無效ACH 碼!',
        sell_form_contactNumber: '聯係號碼',
        sell_form_contactNumberTips: '無效聯係號碼!',
        sell_form_swiftCode: 'Swift 碼',
        sell_form_swiftCodeTips: '無效Swift碼!',
        sell_form_branchName: '支行名稱',
        sell_form_branchNameTips: '無效支行名稱！',
        sell_form_branchNameMultinomialTips: '支行名稱不可爲空',
        sell_form_accountType: '賬戶類型',
        sell_form_accountTypeTips: '無效賬戶類型!',
        sell_form_bankAccountType: '銀行賬戶類型',
        sell_form_bankAccountTypeTips: '無效銀行賬戶類型!',
        sell_form_bankAccountTypeLi_Saving: '儲蓄賬戶',
        sell_form_bankAccountTypeLi_Checking: '支票賬戶',
        sell_form_bankAccountTypeLi_TimeDeposit: '定期賬戶',
        sell_form_bankAccountTypeLi_Others: '其他',
        sell_form_bankCode: '銀行行號',
        sell_form_bankCodeTips: '無效銀行行號!',
        sell_form_branchCode: '分行行號',
        sell_form_branchCodeTips: '無效分行行號!',
        sell_form_locationId: '位置編碼',
        sell_form_locationIdTips: '無效位置編碼!',
        sell_form_CPFNumber: 'CPF 號',
        sell_form_CPFNumberTips: '無效CPF 號!',
        sell_form_IDType: 'ID 類型',
        sell_form_IDTypeTips: '無效ID 類型!',
        sell_form_bankAccountTypeLi_CUIT: 'CUIT',
        sell_form_bankAccountTypeLi_CUIL: 'CUIL',
        sell_form_IDNumber: 'ID 號碼',
        sell_form_IDNumberTips: '無效ID 號碼!',
        sell_form_accountTypeLi_Maestra: 'Maestra',
        sell_form_IDTypeLi_DNI: 'DNI',
        sell_form_IDTypeLi_RUC: 'RUC',
        sell_form_IDTypeLi_CE: 'CE',
        sell_form_IDTypeLi_PASS: 'PASS',
        sell_form_RUTNumber: 'RUT 號',
        sell_form_RUTNumberTips: '無效RUT 號!',
        sell_form_BSBCode: 'BSB 編碼',
        sell_form_BSBCodeTips: '無效BSB 編碼!',
        sell_form_Email: 'Email',
        sell_form_EmailTips: '無效Email地址!',
        sell_form_SortCode: '識別代碼',
        sell_form_SortCodeTips: '無效識別代碼!',
        sell_form_IFSC: 'IFSC',
        sell_form_IFSCTips: '無效IFSC!',
        sell_form_IDTypeLi_NIT: 'NIT',
        sell_form_IDTypeLi_CC: 'CC',
        sell_form_IDTypeLi_TI: 'TI',
        sell_form_IDTypeLi_RUT: 'RUT',
        sell_form_IDTypeLi_CI: 'CI',
        sell_form_TransitNumber: '轉賬編號',
        sell_form_TransitNumberTips: '無效轉賬編號!',
        sell_form_bankSwiftTips: 'Swift碼和位置編碼不能同時為空',
        sell_form_bankSwiftCodeTips: '銀行代碼和swift代碼不能同時為空',
        sell_form_bankCodeLocationIdTips: '銀行代碼和位置ID不能同時為空',

        //新增
        history_noListButton: '立即買幣',
        history_noListText: '沒有交易記錄',
        history_noMore: '沒有了',
        history_noListText2: '少量購幣，莫失良機',
        history_state_Complete: '完成',
        history_state_Processing: '正在處理',
        history_listTitle1: '訂單號',
        history_listTitle2: '加密幣',
        history_listTitle3: '服務識別號',
        fee_listTitle_price: '幣價',
        sell_order_title: '狀態-内容',
        fee_tips: '基於支付方式',
        search_components_Popular: '廣受歡迎',
        search_components_All: '全部',
        search_components_placeHolder: '在此處搜索… ',
        result_stateTo4_your: '您的',
        result_stateTo4: '訂單正在處理中，很快將發送到您指定的地址。',
        result_stateTo5: '已轉至您的錢包地址。',
        result_returnText_merchant: ' 返回',
        buy_configPayIDR_ovo_title: 'OVO電話',
        login_getCode: '重新發送',
        login_VerifyCode:'請輸入六位數驗證碼',
        login_Agreement:'請勾選用戶協定'

    }
}