<template>
    <div>
        <div>这是第二个页面</div>
        <el-button type="primary" @click="test" size="medium">测试公共方法</el-button>
    </div>
</template>
<script>
    import i18n from "~/i18n/i18n.js";
    
    export default{
        mixins:[i18n],
        data() {
            return {
               
            }
        },
        components:{

        },
        mounted:function(){

        },
        methods:{
            test(){
                this.commonUtil.test(this.t('vueDemo.common.addSuccess'));
            }
        }
    }
</script>

