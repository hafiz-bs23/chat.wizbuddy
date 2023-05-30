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
        <div class="me-3 text-center">
            <img src="../assets/ai.png"
                 class=" mr-1" alt="Sharon Lessman" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">{{ time }}</div>
        </div>
        <div v-html="message" class="d-flex align-items-center flex-shrink-1 rounded py-2 px-4 ml-3 rounded-3 text-white" style="background-color: #7eaacd;">
        </div>
    </div>
</template>

<script>
export default {
    name: "MessageItem",
    props:['type','time','message']
}
</script>

<style scoped>

</style>