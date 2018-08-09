<template>
    <div class="leftMenuContainer">  
        <li v-for="(item,key) in menuList">
            <span class="first-nav-item">{{item.name}}</span>
            <ul @click="selectLeftNav(data.name)" 
                :class="selectedLeftNav===data.name?'active':''" 
                class="second-nav-group" 
                v-for="(data,index) in item.menulist">
                <li>
                    <a :href="data.url" class=''>{{data.name}}</a>
                </li>
            </ul>
        </li>
    </div> 
</template>

<script>
    import i18n from "~/i18n/i18n.js";

    export default {
        mixins:[i18n],
        data() {
            return {
                selectedLeftNav:"javascript",
                menuList:[
                            { "id": "M1", "name": this.t("vueDemo.nav.base"), "url": "", "menulist":
                                [
                                    { "id": "M11", "name": "javascript", "url": "#/pageOne", "menulist":""},
                                    { "id": "M12", "name": "HTML5", "url": "#/pageTwo", "menulist": "" },
                                    { "id": "M13", "name": "CSS3", "url": "", "menulist": "" }
                                ]
                            },
                            { "id": "M2", "name": this.t("vueDemo.nav.forward"), "url": "", "menulist": 
                                [
                                    { "id": "M21", "name": "vue.js", "url": "", "menulist":""},
                                    { "id": "M22", "name": "react.js", "url": "", "menulist": "" },
                                    { "id": "M23", "name": "angular.js", "url": "", "menulist": "" }
                                ]
                            }
                       ],
                menu:
                    {
                        "frontend":
                        [
                            { "id": "M1", "name": this.t("vueDemo.nav.base"), "url": "", "menulist":
                                [
                                    { "id": "M11", "name": "javascript", "url": "#/pageOne", "menulist":""},
                                    { "id": "M12", "name": "HTML5", "url": "#/pageTwo", "menulist": "" },
                                    { "id": "M13", "name": "CSS3", "url": "", "menulist": "" }
                                ]
                            },
                            { "id": "M2", "name": this.t("vueDemo.nav.forward"), "url": "", "menulist": 
                                [
                                    { "id": "M21", "name": "vue.js", "url": "", "menulist":""},
                                    { "id": "M22", "name": "react.js", "url": "", "menulist": "" },
                                    { "id": "M23", "name": "angular.js", "url": "", "menulist": "" }
                                ]
                            }
                       ],
                    
                        "backend":
                        [
                             { "id": "M4", "name": this.t("vueDemo.nav.base"), "url": "", "menulist":
                                 [
                                      { "id": "M41", "name": "node.js", "url": "#/pageThree", "menulist":""},
                                      { "id": "M42", "name": "java", "url": "", "menulist": "" },
                                      { "id": "M43", "name": "python", "url": "", "menulist": "" }
                                 ]
                             }
                       ]
                    }  
            }
        },
        created(){
            let _self = this;
            this.$root.Bus.$on("changeLeftMenu",data => {
                _self.menuList = _self.menu[data];
                this.selectedLeftNav = _self.menu[data][0]["menulist"][0]["name"];
                window.location.href = window.location.href.split("#/")[0]+_self.menu[data][0]["menulist"][0]["url"];
            });
        },
        watch: {
            
        },
        methods:  { 
            selectLeftNav(selected){
              this.selectedLeftNav = selected;
            }
        }
    }
</script>

<style scoped>
    .leftMenuContainer ul{
        list-style: none; 
        margin-top: 10px;
    }
    .leftMenuContainer li{
        list-style: none; 
    }
    .leftMenuContainer a{
        text-decoration: none;
        margin-left: 60px;
    }
    .first-nav-item{
        padding-left: 20px;
    }
    .second-nav-group{
        padding: 9px 0 10px 0;
    }
</style>