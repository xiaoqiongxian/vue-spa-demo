<template>
    <div>
        <el-button type="primary" @click="test" size="medium">test</el-button>
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

