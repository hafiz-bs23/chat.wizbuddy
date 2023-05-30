<template>
    <div class="modal fade" id="about" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header mx-auto">
                    <h5 class="modal-title text-success" id="staticBackdropLabel">About</h5>
                </div>
                <div class="modal-body">
                    <img src="../assets/ai.png" class="d-block mx-auto my-2" alt="Sharon Lessman" width="60" height="60">
                    <div class="text-center">
                        <p><span class="fw-bolder text-primary">Product:</span> wizBuddy!</p>
                        <p><span class="fw-bolder text-primary">Type:</span> Generative Representative Chat Bot</p>
                        <p><span class="fw-bolder text-primary">Model:</span> gpt-3.5-turbo, text-embedding-ada-002-v2</p>
                        <p><span class="fw-bolder text-primary">Technology:</span> Python, LangChain, FastAPI, VueJs</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Thanks!</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "About"
}
</script>

<style scoped>

</style>