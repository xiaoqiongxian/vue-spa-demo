import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import appStore from '../components/app-store.js';//引入全局store对象
import pageOneStore from '../views/page-one-store.js';//引入第一个页面的store对象

export default new vuex.Store({
    modules: {
        app: appStore,
        pageOne:pageOneStore
    }
})