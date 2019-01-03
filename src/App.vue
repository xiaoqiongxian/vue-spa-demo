<template>
    <div class="appContainer">
    	<div class="header">
    		<app-header></app-header>
    	</div>
    	<div class="mainContainer">
    		<div class="mainLeft">
	    		<app-left-menu></app-left-menu>
	    	</div>
	    	<div class="mainRight">
	    		<router-view></router-view>
	    	</div>
    	</div>
    </div>
</template>

<script>
	import i18n from "~/i18n/i18n.js";
	import AppHeader from './components/app-header.vue';
	import AppLeftMenu from './components/app-left-menu.vue';
	import AppFooter from './components/app-footer.vue';

	/**
	* 换肤功能函数
	* common.css为默认主题下公共样式文件
	* common-blue.css为蓝色（以蓝色为例，可以是其他任三何颜色）主题下公共样式文件
	* index.css为默认主题下element-ui组件样式文件，备注：element-ui组件样式从node_module>element-ui>lib>
	* theme-chalk下拷贝出，同时要将该目录下的fonts文件夹一起拷贝出来。
	* index-blue.css为蓝色（以蓝色为例，可以是其他任何颜色）主题下element-ui组件样式文件，备注：可参考element-ui官网将主题
	* 颜色修改后生成对应主题下的index.css文件，然后拷贝出修改文件名为index-blue.css
	*/
	let styleDefault1 = () => {
		return require.ensure([],() => {
			require("./style/common.scss");
		})
	}
	let styleDefault2 = () => {
		return require.ensure([],() => {
			require("./style/index.css");
		})
	}

	let styleBlue1 = () => {
		return require.ensure([],() => {
			require("./style/common_blue.scss");
		})
	}
	let styleBlue2 = () => {
		return require.ensure([],() => {
			require("./style/index_blue.css");
		})
	}

	/**
	* true可以是任何判断当前主题的条件，
	* 例如将主题颜色放到session中，if(localStorage.getItem("skinColor") === "default")
	*/
	if(localStorage.getItem("themeColor") && localStorage.getItem("themeColor") === "blue"){
		styleBlue1();
		styleBlue2();
	}else{
		styleDefault1();
		styleDefault2();	
	}

	export default{
		mixins:[i18n],
		data(){
			return {

			}
		},
		components:{
			"app-header":AppHeader,
			"app-left-menu":AppLeftMenu,
			"app-footer":AppFooter
		},
		created:function(){
        	this.getAuthData();
        },
		mounted:function(){

		},
		methods:{
			//获取权限并初始化
			getAuthData(){
				let _self = this;
				_self.$ajax.getAuth('/api/auth')
	            .then((response) => {
	                if(response.code === "success"){
	                  	this.$store.commit('initPermission',response.data);
	                }else{
	                  _self.$notify.error({
	                    title: _self.t("vueDemo.common.fail"),
	                    message: _self.t("vueDemo.common.getFail")
	                  });
	                }
	            },(error) => {
	              _self.$notify.error({
	                title: _self.t("vueDemo.common.fail"),
	                message: _self.t("vueDemo.common.getFail")
	              });
	            })
	            .catch(function (error) {
	                _self.$notify.error({
	                    title: _self.t("vueDemo.common.fail"),
	                    message: _self.t("vueDemo.common.getFail")
	                });
	            });
			}
		}
	}
</script>

<style>
	@import "./style/font-awesome.min.css";
</style>
