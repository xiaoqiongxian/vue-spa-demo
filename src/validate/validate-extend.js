import {t} from "~/i18n/index.js";

export default{
	install(vue){
		vue.prototype.validateExtend = this;
	},

	/**
	* checkEnglish 校验英文字符
	* @param rule 检验规则
	* @param value 校验值
	* @return callback 回调函数
	*/
	checkEnglish(rule,value,callback){
		if(!value){
			callback();
		}else{
			let reg = /^[\x20-\x7e]*$/;
			if(reg.test(value)){
				callback();
			}else{
				callback(new Error(t("vueDemo.validateTip.needEnglish")))
			}
		}
	}
}