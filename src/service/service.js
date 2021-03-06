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

	/**s
	* getAuth 获取权限数据
	* @param {String} url 请求地址
	*/
	getAuth(url){
		return $ajax.get(url)
	},

	/**
	* getList 获取列表数据示例方法
	* @param {String} url 请求地址
	*/
	getList(url){
		return $ajax.get(url)
	},

	/**
	* addList 新增列表数据示例方法
	* @param {String} url 请求地址
	* @param formData 表单数据
	*/
	addList(url,formData){
		return $ajax.post(url,formData);
	},

	/**
	* updateList 修改列表数据示例方法
	* @param {String} url 请求地址
	* @param formData 表单数据
	*/
	updateList(url,formData){
		return $ajax.put(url,formData);
	},

	/**
	* deleteList 删除列表数据示例方法
	* @param {String} url 请求地址
	*/
	deleteList(url){
		return $ajax.delete(url);
	},

	/**
	* getWeather 获取天气数据
	* @param {String} url
	*/
	getWeather(url){
		return $ajax.get(url)
	},

	CancelToken:$ajax.CancelToken

}