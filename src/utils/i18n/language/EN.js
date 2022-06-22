module.exports = {
  language:'english',
  nav:{
    /**
     * 按钮文案
     */
    Continue: 'Continue',
    Confirm: 'Confirm',
    ConfirmPayment: 'Confirm Payment',
    queryOderState: 'I have completed the payment',
    orderRsult: 'Continue to buy crypto',

    /**
     * 组件
     */
    //网络地址组件
    networkAddress_components_title: 'Address',
    //协议组件
    agreement_components_text1: 'I authorise ',
    agreement_components_text2: 'AlchemyPay ',
    agreement_components_text3: 'to debit my chosen payment method for the amount above on today’s date and understand that this can not be cancelled, recalled or refunded. ',
    //查询订单状态提示
    orderTips_title: 'Payment not funt',
    orderTips_text: 'Sorry, we did not detect your payment information. If you confirm the payment, please stay on this page for a few minutes, once we receive your payment, we will transfer the corresponding amount of USDT to you. ',
    orderTips_buttonText: 'I Understand',

    /**
     * 路由
     */
    routerName_buy: 'Buy Crypto',
    routerName_sell: 'Sell Crypto',
    routerName_email: 'Enter Email Address',
    routerName_emailCode: 'Verification code',
    routerName_Transactions: 'Transactions',
    routerName_receivingMode: 'Receive coins',
    routerName_paymentMethod: 'Choose payment method',
    routerName_basisIdAuth: 'basis-Id-Auth',
    routerName_buyForm: 'Enter card details',
    routerName_creditCardConfig: 'Confirm Payment',
    routerName_buyPayment: 'Payment',
    routerName_buyOtherWayPay: 'Confirm Payment',
    routerName_paymentResult: 'Payment Result',
    routerName_sellForm: 'Enter Information',
    routerName_configSell: 'Confirm',
    routerName_sellOrder: 'Order',

    /**
     * 菜单
     */
    login: 'Login',
    loginOut: 'Login out',
    loginOut_title: 'Are you sure you want to logout?',
    loginOut_Dismiss: 'Dismiss',
    enterEmail: 'Enter email',
    loginTitle1: 'Checkout with Alchemy Pay',
    loginTitle2: 'The fastest and safest way to checkout on hundreds of crypto apps.',
    codeTitle1: 'We’ve sent a confirmation code to your email.',
    codeTitle2: 'If your code doesn\'t arrive shortly. ',
    codeTitle3: 'New verification code sent ',
    codeSecond: 's',
    code_: ' I agree with Alchemy Pay\'s ',
    code_name: 'Terms of Service',
    code_and: 'and',
    code_name2: 'Privacy Policy',
    menu: 'Menu',
    menu_transactions: 'Transactions',
    menu_language: 'Language',
    menu_terms: 'Terms of Service',
    menu_privacy: 'Privacy Policy',
    menu_logOut: 'Log Out',

    /**
     * 首页
     */
    copyTips: 'copy success',
    // 买币标题
    home_buyTitle: "Buy Crypto",
    //卖币标题
    home_sellTitle: "Sell Crypto",
    home_Tips: 'By continuing you agree to our cookie policy.',
    home_minAmountTips: 'The minimum transaction amount is',
    home_maxAmountTips: 'The maximum transaction amount is',
    home_feeTimeDownTitle: 'Remaining time',
    home_feeTimeDown: 'Quote updates in',
    home_feeRampFeeTips: 'as low as',

    /**
     * 买币
     */
    home_youPay: 'You Pay',
    home_youBuyGet: 'You Get',
    home_buyFee_timeDownTitle: 'Remaining time',
    home_buyFee_timeDown: 'Quote updates in',
    home_buyFee_title1: 'You get',
    home_buyFee_title2: 'for',
    home_buyFee_rampFee: 'Ramp fee',
    home_buyFee_networkFee: 'Network fee',
    //卖币
    home_youSell: 'You Sell',
    home_youSellGet: 'You Get',
    home_sellFee_title1: 'You sell',
    home_sellFee_title2: 'to',
    home_sellFee_rampFee: 'Ramp fee',
    //搜索组件
    search_components_countryTitle: 'Select Country',
    search_components_cryptoTitle: 'Select Crypto',
    search_components_networkTitle: 'Select Network',
    //买币 - 选择接收方式
    buy_receivingMode_tips: 'Enter your wallet address.',
    buy_receivingMode_addressTitle: 'Your ACH address',
    buy_receivingMode_addressPlaceholder: 'Wallet Address…',
    buy_receivingMode_networkTitle: 'Your ACH address',
    buy_receivingMode_networkPlaceholder: 'Select Network',
    buy_receivingMode_addressTips1: 'Not a valid ACH',
    buy_receivingMode_addressTips2: 'address.',
    //买币 - 选择支付方式
    buy_payment_savedTitle: 'Saved payment methods',
    buy_payment_addTitle: 'Add a new payment methods',
    buy_payment_instant: 'Instant',
    buy_payment_ending: 'Ending',
    //买币 - 确认订单 - 国际卡
    buy_configPay_title1: 'Paying with',
    buy_configPay_title2: 'CVV',
    //买币 - 填写表单 - 国际卡
    buy_form_firstName: 'First Name',
    buy_form_lastName: 'Last Name',
    buy_form_cardNumber: 'Card Number',
    buy_form_expirationDate: 'Expiration Date',
    buy_form_CVV: 'CVV',
    buy_form_dataTips: 'Invaid expiry date',
    buy_form_cardNumTips: 'Please enter a valid card number.',
    buy_form_cvvTips: 'Please enter a valid CVV',

    //买币 - 确认订单 - 印尼支付
    buy_configPayIDR_va_title: 'BANK',
    buy_configPayIDR_va_codeTitle: 'Payment Code',
    buy_configPayIDR_timeDownTips: 'Plese completa payment with ',
    buy_configPayIDR_codeTips: 'Scan QR Code to complete payment',
    buy_configPayIDR_ovo_phoneTips: 'Open OVO app to complete payment.',
    //订单结果页
    payResult_errorMessage: 'Invoice Expired!',
    payResult_timeErrorMessage: 'Payment Fail! Please check your card information.',
    payResult_feeAmount: 'Amount',
    payResult_feeAddress: 'Address',
    payResult_feeHash: 'Hash',
    payResult_feeWallet: 'ACH Wallet',
    payResult_feePassword: 'ACH Wallet',



    /**
     * 卖币
     */
    //卖币状态
    Sellorder_transfer:'Please transfer ',
    Sellorder_within:'to the address within ',
    Sellorder_will:'will ',
    Sellorder_get:'get ',
    Sellorder_for:'  for ',
    Sellorder_details:'Please modify your card details',
    Sellorder_page:'If you still want to sell crypto,Return to home page',
    Sellorder_Crypto:'Send Crypto',
    Sellorder_Received:'Received Crypto',
    Sellorder_Initiate:'Initiate Transfer',
    Sellorder_success:'success',
    Sellorder_fail:'fail',
    Sellorder_Transfer:'In Transfer',
    Sellorder_Id:'Order ID',
    Sellorder_Network:'Network',
    Sellorder_Address:'Address',
    Sellorder_Card:'Card',
    Sellorder_Fail:'Fail Reason',
    Sellorder_Continue:'Continue to sell crypto',
    Sellorder_QRCode:'Scan QR Code',
    //菜单栏语言
    RouterMenu_Welcome:'Welcome to Alchemy Pay!',
    RouterMenu_experience:'Login to unlock the full experience',
    RouterMenu_Transactions:'Transactions',
    RouterMenu_history:'No history yet',
    RouterMenu_Language:'Language',
    RouterMenu_Service:'Terms of Service',
    RouterMenu_Policy:'Privacy Policy',
    RouterMenu_logout:'Are you sure you want to logout?',
    RouterMenu_Dismiss:'Dismiss',

    sell_configOrder_title: 'Bank Card',
    //表单页
    sell_form_Name: 'Name',
    sell_form_NameTips: 'Invalid Name!',
    sell_form_Address: 'Address',
    sell_form_AddressTips: 'Invalid Address!',
    sell_form_AddressMultinomialTips: 'Address can not be null',
    sell_form_City: 'City',
    sell_form_CityTips: 'Invalid City!',
    sell_form_State: 'State',
    sell_form_StateTips: 'Invalid State!',
    sell_form_Postcode: 'Postcode',
    sell_form_PostcodeTips: 'Invalid Postcode!',
    sell_form_accountNumber: 'Account Number',
    sell_form_accountNumberTips: 'Invalid Account Number!',
    sell_form_achCode: 'ACH Code',
    sell_form_achCodeTips: 'Invalid ACH Code!',
    sell_form_contactNumber: 'Contact Number',
    sell_form_contactNumberTips: 'Invalid Contact Number!',
    sell_form_swiftCode: 'Swift Code',
    sell_form_swiftCodeTips: 'Invalid Swift Code!',
    sell_form_branchName: 'Branch Name',
    sell_form_branchNameTips: 'Invalid Branch Name!',
    sell_form_branchNameMultinomialTips: 'Branch name can not be null',
    sell_form_bankAccountType: 'Bank Account Type',
    sell_form_bankAccountTypeTips: 'Invalid Bank Account Type!',
    sell_form_bankAccountTypeLi_Saving: 'Saving',
    sell_form_bankAccountTypeLi_Checking: 'Checking',
    sell_form_bankAccountTypeLi_TimeDeposit: 'Time Deposit',
    sell_form_bankAccountTypeLi_Others: 'Others',
    sell_form_bankCode: 'Bank Code',
    sell_form_bankCodeTips: 'Invalid Bank Code!',
    sell_form_branchCode: 'Branch Code',
    sell_form_branchCodeTips: 'Invalid Branch Code!',
    sell_form_locationId: 'Location Id',
    sell_form_locationIdTips: 'Invalid Location Id!',
    sell_form_CPFNumber: 'CPF Number',
    sell_form_CPFNumberTips: 'Invalid CPF Number!',
    sell_form_IDType: 'ID Type',
    sell_form_IDTypeTips: 'Invalid ID Type!',
    sell_form_bankAccountTypeLi_CUIT: 'CUIT',
    sell_form_bankAccountTypeLi_CUIL: 'CUIL',
    sell_form_IDNumber: 'ID Number',
    sell_form_IDNumberTips: 'Invalid ID Number!',
    sell_form_accountTypeLi_Maestra: 'Maestra',
    sell_form_IDTypeLi_DNI: 'DNI',
    sell_form_IDTypeLi_RUC: 'RUC',
    sell_form_IDTypeLi_CE: 'CE',
    sell_form_IDTypeLi_PASS: 'PASS',
    sell_form_RUTNumber: 'RUT Number',
    sell_form_RUTNumberTips: 'Invalid RUT Number!',
    sell_form_BSBCode: 'BSB Code',
    sell_form_BSBCodeTips: 'Invalid BSB Code!',
    sell_form_Email: 'Email',
    sell_form_EmailTips: 'Invalid Email!',
    sell_form_SortCode: 'Sort Code',
    sell_form_SortCodeTips: 'Invalid Sort Code!',
    sell_form_IFSC: 'IFSC',
    sell_form_IFSCTips: 'Invalid IFSC!',
    sell_form_IDTypeLi_NIT: 'NIT',
    sell_form_IDTypeLi_CC: 'CC',
    sell_form_IDTypeLi_TI: 'TI',
    sell_form_IDTypeLi_RUT: 'RUT',
    sell_form_IDTypeLi_CI: 'CI',
    sell_form_TransitNumber: 'Transit Number',
    sell_form_TransitNumberTips: 'Invalid Transit Number!',
    sell_form_bankSwiftTips: 'cannot be empty at the same time',
    sell_form_bankSwiftCodeTips: 'Bank code and swift code cannot be empty at the same time',
    sell_form_bankCodeLocationIdTips: 'Bank code and location id cannot be empty at the same time',
  }
}
