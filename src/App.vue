<script>
import BasePlate from './components/BasePlate.vue'

import axios from "axios";
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
            title: 'Let\'s be serious from title'
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
        BasePlate
    }
}
</script>

<template>
  <header>
  </header>
    <main class="content">
          <div class="container p-0">
              <BasePlate />
          </div>
      </main>
</template>

<style scoped>
</style>
