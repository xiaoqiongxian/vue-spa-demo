import i18n from "~/i18n/index.js";
import localeEn from "~/i18n/lang/en.js";

//store里的i18n方法要单独调用
let language = localStorage.getItem("language");
if(language && language.indexOf("en") > -1){
    i18n.use(localeEn);
}

export default {
    state:{
        //权限
        permissionPageOneAdd:false,
        permissionPageOneEdit:false,
        permissionPageOneDelete:false,
        //左侧导航
        selectedLeftNav:"javascript",
        menuList:
        [
            { "id": "M1", "name": i18n.t("vueDemo.nav.base"), "url": "", "menulist":
                [
                    { "id": "M11", "name": "javascript", "url": "#/pageOne", "menulist":""},
                    { "id": "M12", "name": "HTML5", "url": "#/pageTwo", "menulist": "" },
                    { "id": "M13", "name": "CSS3", "url": "", "menulist": "" }
                ]
            },
            { "id": "M2", "name": i18n.t("vueDemo.nav.forward"), "url": "", "menulist":
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
                { "id": "M1", "name": i18n.t("vueDemo.nav.base"), "url": "", "menulist":
                    [
                        { "id": "M11", "name": "javascript", "url": "#/pageOne", "menulist":""},
                        { "id": "M12", "name": "HTML5", "url": "#/pageTwo", "menulist": "" },
                        { "id": "M13", "name": "CSS3", "url": "", "menulist": "" }
                    ]
                },
                { "id": "M2", "name": i18n.t("vueDemo.nav.forward"), "url": "", "menulist": 
                    [
                        { "id": "M21", "name": "vue.js", "url": "", "menulist":""},
                        { "id": "M22", "name": "react.js", "url": "", "menulist": "" },
                        { "id": "M23", "name": "angular.js", "url": "", "menulist": "" }
                    ]
                }
           ],
        
            "backend":
            [
                 { "id": "M4", "name": i18n.t("vueDemo.nav.base"), "url": "", "menulist":
                     [
                          { "id": "M41", "name": "node.js", "url": "#/pageThree", "menulist":""},
                          { "id": "M42", "name": "java", "url": "", "menulist": "" },
                          { "id": "M43", "name": "python", "url": "", "menulist": "" }
                     ]
                 }
           ]
        }  
    },
    mutations:{
        //更新权限配置
        initPermission(state,permissionObj){
            state.permissionPageOneAdd = permissionObj.pageOneAdd;
            state.permissionPageOneEdit = permissionObj.pageOneEdit;
            state.permissionPageOneDelete = permissionObj.pageOneDelete;
        },
        //更新左侧导航
        changeLeftMenu(state,selectedNav){
            state.menuList = state.menu[selectedNav];
            state.selectedLeftNav = state.menu[selectedNav][0]["menulist"][0]["name"];
            window.location.href = window.location.href.split("#/")[0]+state.menu[selectedNav][0]["menulist"][0]["url"];
        },
        //更新左侧选中导航
        selectedLeftNav(state,selected){
            state.selectedLeftNav = selected;
        }
    }
}