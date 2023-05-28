<template>
    <div v-if="type == 'chat-message-right'" :class="type" class="pb-4">
        <div>
            <img src="../assets/man.png"
                 class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">{{ time }}</div>
        </div>
        <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
            {{ message }}
        </div>
    </div>
    <div v-if="type == 'chat-message-left'" class="chat-message-left pb-4">
        <div>
            <img src="../assets/ai.png"
                 class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">{{ time }}</div>
        </div>
        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            {{ message }}
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