<template>
    <h1 class="h3 mb-3 text-success fw-bold">WizBuddy</h1>
    <div class="card">
        <div class="row g-0">
            <div class="col-12 col-lg-5 col-xl-3 border-end">
                <div class="py-2 px-4 border-bottom d-none d-lg-block">
                    <div class="d-flex align-items-center py-1">
                        <div class="position-relative">
                            <img src="../assets/history.png"
                                 class=" me-1" alt="Sharon Lessman" width="40" height="40">
                        </div>
                        <div class="flex-grow-1 pl-3">
                            <strong>Chat History</strong>
                        </div>
                    </div>
                </div>
                <div class="chat-history px-1 d-none d-md-block">
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <HistoryItem v-for="history in histories" :type="history.type" :q="history.q"/>
                        </div>
                    </div>
                </div>
                <hr class="d-block d-lg-none mt-1 mb-0">
            </div>
            <div class="col-12 col-lg-7 col-xl-9">
                <div class="py-2 px-4 border-bottom d-none d-lg-block">
                    <div class="d-flex align-items-center py-1">
                        <div class="position-relative">
                            <img src="../assets/ai.png"
                                 class=" me-1" alt="Sharon Lessman" width="40" height="40">
                        </div>
                        <div class="flex-grow-1 pl-3">
                            <strong>WizBuddy</strong>
                            <div v-if="botStatus == 'Online'" class="text-muted small"> <span class="badge rounded-pill bg-success">{{ botStatus }}</span></div>
                            <div v-if="botStatus != 'Online'" class="text-muted small" style="min-height: 21px;"> <Transition><span v-show="blink" class="badge rounded-pill bg-info">{{ botStatus }} </span></Transition></div>
                        </div>
                        <div>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#howTo" class="btn btn-outline-success me-2">How to Ask</button>
                            <modal/>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#about" class="btn btn-outline-primary">About</button>
                            <About />
                        </div>
                    </div>
                </div>
                <div class="position-relative">
                    <div class="chat-messages p-4">
                        <MessageItem v-for="message in messages" :type="message.type" :message="message.message" :time="message.time" />
                    </div>
                </div>
                <div class="flex-grow-0 py-3 px-4 border-top">
                    <form @submit.prevent="processQuery">
                        <div class="input-group">
                            <div class="container">
                                <div class="row">
                                    <div class="col-1 text-center px-0">
                                        <img v-if="selectedValue == 'contractInformation'" src="../assets/information.png" class=" mr-1" alt="Sharon Lessman" width="40" height="40">
                                        <img v-if="selectedValue == 'employeeInformation'" src="../assets/skill.png" class=" mr-1" alt="Sharon Lessman" width="40" height="40">
                                        <img v-if="selectedValue == 'bsInfo'" src="../assets/bslogo.png" class=" mr-1" alt="Sharon Lessman" width="40" height="40">
                                    </div>
                                    <div class="col-3">
                                        <select class="form-select" v-model="selectedValue">
                                            <option v-for="option in options" :value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-7">
                                        <input v-model="query" type="text" class="form-control" placeholder="Type your message" :disabled="botStatus == 'Query is processing'">
                                    </div>
                                    <div class="col-1">
                                        <button type="submit" class="btn btn-success" :disabled="botStatus == 'Query is processing'">Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import MessageItem from "@/components/MessageItem.vue";
import HistoryItem from "@/components/HistoryItem.vue";

import axios from "axios";
import {bottom} from "@popperjs/core";
import modal from "@/components/modal.vue";
import About from "@/components/About.vue";


export default {
    name: "BasePlate",
    data() {
        return{
            selectedValue: 'bsInfo',
            query: '',
            options:[
                { text: 'Contact Information', value: 'contractInformation'},
                { text: 'Employee Information', value: 'employeeInformation'},
                { text: 'Brain Station 23', value: 'bsInfo'},
            ],
            messages: [],
            histories: [],
            botStatus: 'Online',
            blink: true,
            timer: null
        }

    },
    methods:{
        processQuery(){
            this.botStatus = "Query is processing"
            this.histories.push({
                'type': this.selectedValue,
                'q': this.query
            })
            this.messages.push({
                'type': 'chat-message-right',
                'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                'message': this.query
            })
            var selector = 'other/'
            if(this.selectedValue === 'contractInformation' ) selector = 'einfo/'
            if(this.selectedValue === 'employeeInformation' ) selector = 'ecv/'
            axios
                .get('https://wizbuddy.herokuapp.com/'+ selector + this.query)
                .then(response => {
                    this.messages.push(
                        {
                            'type': 'chat-message-left',
                            'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                            'message': response.data.message.replace('\n', '<br>')
                        }
                    )
                    this.botStatus = 'Online'
                })
                .catch(error => {
                    this.messages.push(
                        {
                            'type': 'chat-message-left',
                            'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                            'message': "Sorry for My Poor Server. It can't handle too much load. Please try again."
                        }
                    )
                    this.botStatus = 'Online'
                })
            this.query = ''
        },
    },
    components:{
        About,
        MessageItem, HistoryItem, modal
    },
    mounted() {
        this.botStatus = "Query is processing"
        axios
            .get('https://wizbuddy.herokuapp.com/')
            .then(response => {
                this.messages.push(
                    {
                        'type': 'chat-message-left',
                        'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                        'message': response.data.message
                    }
                )
                this.botStatus = 'Online'
            })
            .catch(error=> {
                console.log(error)
                this.botStatus = 'Online'
            })
        this.timer = setInterval(() =>{
            this.blink = !this.blink
        },300)
    },
    beforeUnmount() {
        clearInterval(this.timer)
    }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>