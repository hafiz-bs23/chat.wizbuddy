<template>
    <li :class="type">
      <span class="cont">
          <img v-if="type === 'question'" src="../assets/brain.png" alt="">
          <img v-if="type === 'response'" src="../assets/ai.png" alt="">
          <span>{{ time }}</span>
      </span>
      <p v-html="displayMessage"></p>
    </li>
</template>

<script>
export default {
    name: "MessageItem",
    props:['type','time','message'],
    data(){
        return{
          index: 0,
          speed:10,
          displayMessage: "",
          stopMessage: false,
    }
    },
    methods:{
        typeWriter(){
            if( this.index < this.message.length ){
                this.displayMessage += this.message.charAt(this.index)
                this.index++;
                setTimeout(this.typeWriter,this.speed)
            }else{
                this.stopMessage = true;
            }
        }
    },
    mounted(){
        this.typeWriter()
    }
}
</script>

<style scoped>
</style>