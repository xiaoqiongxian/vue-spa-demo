export default {
    state:{
        showAdd:false,
        showEdit:false
    },
    mutations:{
    	/**
		* 这里的state对应着上面这个state
		* 另外mutations里的方法不区分模块，必须是全局唯一的，否则commit的时候回触发所有的同名方法
		*/
        pageOneShowAdd(state){
            state.showAdd = true;
            //还可以在这里执行其他的操作改变state
        },
        pageOneHideAdd(state){
        	state.showAdd = false;
        },
        pageOneShowEdit(state){
            state.showEdit = true;
        },
        pageOneHideEdit(state){
        	state.showEdit = false;
        }
    },
    actions:{
    	//这里的context和我们使用的$store拥有相同的对象和方法
        pageOneShowAdd(context){
            context.commit('pageOneShowAdd');
            //还可以在这里触发其他的mutations方法
        }
    }
}