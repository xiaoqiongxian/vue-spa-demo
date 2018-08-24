import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import VueRouter from "vue-router";
import routers from "./router.js";
import componentLocaleEn from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import i18n from "./i18n/index.js";
import localeEn from "./i18n/lang/en.js";
import commonUtil from "./util/util.js";
import service from "./service/service.js";
import validateExtend from "./validate/validate-extend.js";

Vue.use(VueRouter);
//全局引用公共方法不需要再在每个模块import公共方法js
Vue.use(commonUtil);
Vue.use(service);
Vue.use(validateExtend);

//国际化方法，获取浏览器语言如果为英文，加载英文对应的资源串
let language = localStorage.getItem("language");
//let language = "en";
if(language.indexOf("en") > -1){
	Vue.use(ElementUI,{componentLocaleEn});
	i18n.use(localeEn);
	locale.use(componentLocaleEn);
}else{
	Vue.use(ElementUI);
}

let router = new VueRouter({
	routes:routers.routers
});

new Vue({
	el:"#app",
	router:router,
	render:h => h(App),
	data:{
		Bus:new Vue()
	}
})