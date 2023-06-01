<script>
import BasePlate from './components/BasePlate.vue'

import axios from "axios";
import Error404 from "@/components/Error404.vue";
axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    data: {
        title: 'Article title',
        body:  'Article body content',
        userId: 1,
    }
})
export default {
    name: 'App',
    data (){
        return{
            title: 'Let\'s be serious from title',
            isLive: false,
        }
    },
    methods: {
        doMagic(){
            this.$refs.titleField.classList.add('clicked')
            var userInpur = this.$refs.titleField.value
            this.title = userInpur
        }
    },
    components:{
        Error404,
        BasePlate
    }
}
</script>

<template>
  <header>
  </header>
    <main class="content">
          <div v-if="isLive" class="container p-0">
              <BasePlate />
          </div>
        <div v-if="!isLive" class="container p-0">
            <Error404 />
        </div>
      </main>
</template>

<style scoped>
</style>
