<template>
    <div v-if="type == 'chat-message-right'" :class="type" class="pb-4">
            <div>
                <img src="../assets/man.png"
                     class="mr-1" alt="Chris Wood" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">{{ time }}</div>
            </div>
            <div class="d-flex align-items-center flex-shrink-1 rounded px-4 me-3" style="background-color: antiquewhite">
                {{ message }}
            </div>
        </div>
    <div v-if="type == 'chat-message-left'" class="chat-message-left pb-4">
        <div class="me-1 md-me-3 text-center">
            <img src="../assets/ai.png" class="mr-1" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">{{ time }}</div>
        </div>
        <div class="d-flex align-items-center flex-shrink-1 rounded py-2 px-4 ml-3 rounded-3 text-white" style="background-color: #7eaacd;">
            <div  id="messageItem">
                {{displayMessage}}<span v-if="!stopMessage" class="blink_me">|</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MessageItem",
    props:['type','time','message'],
    data(){
        return{
          index: 0,
          speed:50,
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
.blink_me {
    animation: blinker 1s linear infinite;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}
</style>