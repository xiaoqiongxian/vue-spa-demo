import axios from "axios";
import config from "config";

const $ajax = axios.create({
	//开发环境下给所有请求url前面加上/dev,方便代理匹配
	baseURL:config.baseURL 
});

$ajax.interceptors.response.use(data =>{
	if(data){
		let header = data.headers;
		let response = data.data;
		if(response && header){
			if(header.sessionstatus === "timeout") {
				window.top.logout();
			}else{
				if(response.code){
					switch(response.code){
						case "401":
						console.log("401");
						break;
						default:
						return data.data;
					}
				}else{
					return data.data;
					console.log("maybe get file");
				}
			}
		}else{
			console.log("request error");
		}
	}else{
		console.log("request error");
	}
},(error) => {
	if(error.__CANCEL__){
		return Promise.reject(error);
	}else{
		if(error.response){
			switch(error.response.status){
				case 401:
					console.log("401");
					break;
				case 404:
					console.log("404");
					break;
				default:
					break;
			}
		}else{
			console.log("request error maybe 302 etc")
		}

		return Promise.reject(error.response)
	}
});

export default{
	install:function(vue){
		vue.prototype.$ajax = this;
	},

	/**
	* getList 获取列表数据示例方法
	* @param {String} url 请求地址
	* @param {String} name 查询参数，例如搜索name为xxx的数据
	*/
	getList(url,name){
		return $ajax.get(`${url}?name=${name}`)
	},

	/**
	* addList 新增列表数据示例方法
	* @param {String} url 请求地址
	* @param formData 表单数据
	*/
	addList(url,formData){
		return $ajax.post(`${url}`,formData);
	},

	/**
	* getWeather 获取天气数据
	* @param {String} url
	*/
	getWeather(url){
		return $ajax.get(`${url}`)
	},

	CancelToken:$ajax.CancelToken

}