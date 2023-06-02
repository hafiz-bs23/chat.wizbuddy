<script>
import BasePlate from './components/BasePlate.vue'

import axios from "axios";
import Error404 from "@/components/Error404.vue";
import UserAuthentication from "@/components/UserAuthentication.vue";
export default {
    name: 'App',
    data (){
        return{
            title: 'Let\'s be serious from title',
            isLive: false,
            isAuthorized: false,
            pulseCheckUrl: 'https://bs-employee-management.herokuapp.com/ping'
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
        }
    },
    components:{
        UserAuthentication,
        Error404,
        BasePlate
    },
    mounted(){
        this.pulseCheck();
        setInterval(() =>{
            if (this.isAuthorized)
                this.pulseCheck();
        },10 * 1000);
    }
}
</script>

<template>
  <header>
  </header>
    <main class="content">
        <div v-if="isAuthorized && isLive" class="container p-0">
            <BasePlate @updateAuthStatus="this.isAuthorized = $event"/>
        </div>
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
