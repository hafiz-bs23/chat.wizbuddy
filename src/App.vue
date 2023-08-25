<script>
import BasePlate from './components/BasePlate.vue'

import axios from "axios";
import Error404 from "@/components/Error404.vue";
import UserAuthentication from "@/components/UserAuthentication.vue";
import About from "@/components/About.vue";
export default {
    name: 'App',
    data (){
        return{
            title: 'Let\'s be serious from title',
            isLive: true,
            isAuthorized: false,
            pulseCheckUrl: 'https://bs-employee-management.herokuapp.com/ping',
            type: '',
            historyClass: '',
            accountDropdownClass: 'd-none',
        }
    },
    methods:{
        getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        pulseCheck(){
            var tokenCookie = this.getCookie('token')
            if (tokenCookie === null){
                this.isAuthorized = false;
            }else{
                axios.post(this.pulseCheckUrl,'',{
                    headers:{
                        'authorization': tokenCookie
                    }
                }).then(response => {
                    this.isAuthorized = true;
                }).catch(error =>{
                    this.isAuthorized = false;
                })
            }
        },
        changeModalType(type){
            this.type = type;
        },
        toggleHistory(){
            if(this.historyClass === 'wiz-history-hidden'){
                this.historyClass = '';
            }else{
                this.historyClass = 'wiz-history-hidden'
            }
        },
        toggleAccountDropdown(){
            if(this.accountDropdownClass === 'd-none'){
                this.accountDropdownClass = '';
            }else{
                this.accountDropdownClass = 'd-none'
            }
        }
    },
    components:{
        About,
        UserAuthentication,
        Error404,
        BasePlate
    },
    mounted(){
        if(window.innerWidth  <= 991){
            this.historyClass = 'wiz-history-hidden';
        }
        this.pulseCheck();
        this.accountDropdownClass = 'd-none'
        setInterval(() =>{
            if (this.isAuthorized)
                this.pulseCheck();
        },10 * 1000);
    }
}
</script>

<template>
    <header class="wiz-header" v-if="isAuthorized && isLive">
        <div class="wiz-header__left">
            <button class="btn" @click="toggleHistory()" id="wiz-history-toggle"><i><font-awesome-icon icon="fa-solid fa-bars" /></i></button>
            <h4 class="wiz-header__title"> <img src="./assets/ai.png" alt="">WizzBuddy <span
                    class="wiz-header__badge">আসেন! আসেন! দেইখা যান, আমারে জিগায়া যান</span></h4>
        </div>
        <div class="wiz-header__right">
            <a data-bs-toggle="modal" data-bs-target="#about" class="wiz-header__right__link">
                <i @click="changeModalType('about')" class="me-3 fs-3"><font-awesome-icon icon="fa-solid fa-circle-info" /></i>
                <i @click="changeModalType('howToAsk')" class="me-3 fs-3"><font-awesome-icon icon="fa-regular fa-circle-question" /></i>
            </a>
            <about :modalType="type"></about>
            <a href="#" @click="toggleAccountDropdown()" class="wiz-header__right__link user-icon">
                <i><font-awesome-icon icon="fa-solid fa-circle-user" /></i>
            </a>
            <div class="wiz-header__user-dropdown" :class="accountDropdownClass">
                <a href="" class="log-out"><i><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /></i> Log Out</a>
            </div>
        </div>
    </header>
    <main class="wiz-body" :class="historyClass">
        <template v-if="isAuthorized && isLive">
            <BasePlate @updateAuthStatus="this.isAuthorized = $event"/>
        </template>
        <div v-else-if="!isAuthorized" class="container p-0">
            <UserAuthentication @updateAuthStatus="this.isAuthorized = $event"/>
        </div>
        <div v-if="isAuthorized && !isLive" class="container p-0">
            <Error404 />
        </div>
      </main>
</template>

<style scoped>
</style>
