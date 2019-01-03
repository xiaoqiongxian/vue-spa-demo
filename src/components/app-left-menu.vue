<template>
    <div class="leftMenuContainer">  
        <li v-for="(item,key) in menuList" 
            :key="item.id">
            <span class="first-nav-item">{{item.name}}</span>
            <ul @click="selectLeftNav(data.name)" 
                :class="selectedLeftNav === data.name ? 'active' : ''" 
                class="second-nav-group" 
                v-for="(data,index) in item.menulist"
                :key="item.id">
                <li>
                    <a :href="data.url">{{data.name}}</a>
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
                selectedLeftNav: state => state.app.selectedLeftNav,
                menuList: state => state.app.menuList,
                menu: state => state.app.menu
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