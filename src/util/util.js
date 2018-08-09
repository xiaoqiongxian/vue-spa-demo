export default{
	//引用vue
	install(vue){
		vue.prototype.commonUtil = this;
	},

	//公共方法示例，在其他组建中使用this.commonUtil.test()引用该方法
	test(param){
		alert(param);
	}
}