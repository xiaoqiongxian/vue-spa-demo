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
    import {mapState} from 'vuex';
    import i18n from "~/i18n/i18n.js";

    export default {
        mixins:[i18n],
        data() {
            return {

            }
        },
        computed:{
            ...mapState({
                selectedLeftNav: state => state.common.selectedLeftNav,
                menuList: state => state.common.menuList,
                menu: state => state.common.menu
            })
        },
        methods:  {
            selectLeftNav(selected){
              this.$store.commit('selectedLeftNav',selected);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .leftMenuContainer{
        ul{
            list-style: none; 
            margin-top: 10px;
        }
        li{
            list-style: none; 
        }
        a{
            text-decoration: none;
            margin-left: 60px;
        }
    }
    .first-nav-item{
        padding-left: 20px;
    }
    .second-nav-group{
        padding: 9px 0 10px 0;
    }
</style>