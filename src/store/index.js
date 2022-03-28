import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'
//
Vue.use(Vuex)

//
// // https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)
//
// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})
//
const store = new Vuex.Store({
  // modules,
  // getters
    state: {
        routerParams: {},
    }
})

export default store

//localStorage strore state
if(localStorage.getItem("store")){
    store.replaceState(Object.assign({},store.state),JSON.parse(localStorage.getItem("store")));
}
window.addEventListener("beforeunload",()=>{
    localStorage.setItem("store",JSON.stringify(store.state));
})
