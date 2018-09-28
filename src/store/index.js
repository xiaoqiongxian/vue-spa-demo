import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import commonStore from '../components/common/common-store.js';//引入全局store对象
import pageOneStore from '../components/page-one/page-one-store.js';//引入第一个页面的store对象

export default new vuex.Store({
    modules: {
        common: commonStore,
        pageOne:pageOneStore
    }
})