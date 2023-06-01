<template>
    <div class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span class="text-center text-danger fw-bold">
                            404 Wiz Down
                        </span>
                      </h5>
                </div>
                <div class="modal-body">
                    <img src="../assets/chatbot.png" class="d-block mx-auto my-2 not-found" alt="Sharon Lessman" width="150" height="150">
                    <p>Sorry your buddy is Down deu to credit shortage.</p>
                    <img src="../assets/no-credit-card.png" class="d-block mx-auto my-2 no-credit" alt="Sharon Lessman" width="50" height="50">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Error404"
}
</script>

<style scoped>
.modal-content{
    text-align: center;
}
.modal-header{
    align-self: center;
}
@keyframes blink {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
img.no-credit {
    animation: blink 1s;
    animation-iteration-count: infinite;
}
img.not-found:hover {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;

    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
}

@keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>