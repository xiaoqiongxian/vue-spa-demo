<template>
    <div class="header-container">
        <ul class="header-nav">
            <li v-for="item in headerNavList" :class="item.status" @click="changeLeft(item.value)">{{item.text}}</li>
        </ul>
        <div class="header-right">
        <span>
            <el-select v-model="language" 
            size="mini" 
            :placeholder="t('vueDemo.label.changeLanguage')"
            class="language-select" 
            @change="switchLanguage">
                <el-option
                v-for="item in languageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </span>
        <span>
            <el-select v-model="theme" 
            size="mini" 
            :placeholder="t('vueDemo.label.changeTheme')" 
            class="theme-select" 
            @change="switchTheme">
                <el-option
                v-for="item in themeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </span>
        </div>
    </div>
</template>

<script>  
    import $ from "jquery";
    import i18n from "~/i18n/i18n.js";

    export default {
        mixins:[i18n],
        data() {
            return {
                headerNavList:[
                    {text:this.t("vueDemo.nav.frontend"),value:"frontend",status:"active"},
                    {text:this.t("vueDemo.nav.backend"),value:"backend",status:""}
                ],
                languageOptions:[
                    {value: 'zh',label: this.t("vueDemo.label.chinese")},
                    {value: 'en',label: 'English'}
                ],
                language:"",
                themeOptions:[
                    {value: 'purple',label: this.t("vueDemo.label.purple")},
                    {value: 'blue',label: this.t("vueDemo.label.blue")}
                ],
                theme:""
            }
        },
        mounted:function(){

        },
        methods:  {
            changeLeft: function(flag) {
                var _self = this
                var selectedNav = flag;
                _self.headerNavList.map((nav)=>{
                    if(nav.value === selectedNav){
                        nav.status = "active";
                    }else{
                         nav.status = "";
                    }
                })
                this.$store.commit('changeLeftMenu',selectedNav);
            },
            switchLanguage(){
                localStorage.setItem("language",this.language);
                location.reload();
            },
            switchTheme(){
                localStorage.setItem("themeColor",this.theme);
                location.reload();
            }
        }

    }
</script>

<style scoped>
    .header-container{
        height: 100%;
        display:flex;
    }

    .header-nav{
        flex:1;
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: center;
    }

    .header-nav li{
        margin: 20px;
        list-style: none;
        cursor: pointer
    }

    .header-nav li.active{
        cursor: default;
    }
    
    .header-right{
        flex:1;
        text-align: right;
        padding: 17px 50px 0 0;
    }
    .language-select{
        width: 140px;
    }
    .theme-select{
        width: 140px;
    }
</style>