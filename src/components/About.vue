<template>
    <div class="modal fade" id="about" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div v-if="modalType === 'about'" class="modal-content">
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
                <div class="modal-footer mx-auto">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Thanks!</button>
                </div>
            </div>
            <div v-if="modalType === 'howToAsk'" class="modal-content">
                <div class="modal-header mx-auto">
                    <h5 class="modal-title text-success" id="staticBackdropLabel">How to Ask</h5>
                </div>
                <div class="modal-body">
                    <img src="../assets/ai.png" class="d-block mx-auto my-2" alt="Sharon Lessman" width="60" height="60">
                    <p class="text-center">
                        Hello there. I am your <b class="text-success">wizBuddy!</b> - an Artificial Intelligence Language Model. I am here to assist you with your questions. Feel free to aks me what you need to know.
                        I am trained on <b class="text-success">Brain Station 23</b> Organizational and Employee Data from authentic datasource.
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </symbol>
                    </svg>
                    <div class="alert alert-warning d-flex align-items-center justify-content-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div class="text-center">
                            Since I am still learning, I may produce inaccurate information.
                        </div>
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    </div>
                    <p class="text-center fw-bold text-success">Currently I can assist you with the following Information</p>
                    <ul style="list-style: none">
                        <li class="my-2 text-center"> <img src="../assets/information.png" class="d-block mx-auto" alt="Sharon Lessman" width="20" height="20"> <span class="fw-semibold text-primary">Contact Information</span> Of anyone in Brain Station 23.</li>
                        <li class="my-2 text-center"> <img src="../assets/skill.png" class="d-block mx-auto" alt="Sharon Lessman" width="20" height="20"> Any sort of <span class="fw-semibold text-primary">information and queries about individual employee</span> of Brain Station 23</li>
                        <li class="my-2 text-center"> <img src="../assets/bslogo.png" class="d-block mx-auto" alt="Sharon Lessman" width="20" height="20">Information about <span class="fw-semibold text-primary">Brain Station 23, Leave Policy, SBU Information, Certification Reimbursement, Code of Conduct, Device Requisition, Employee Hierarchy, Medical Benefits, Overtime Policy and information related to Provident Fund and Loan.</span></li>
                    </ul>
                </div>
                <div class="modal-footer mx-auto">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Best of Luck!</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "About",
    props:['modalType']
}
</script>

<style scoped>

</style>