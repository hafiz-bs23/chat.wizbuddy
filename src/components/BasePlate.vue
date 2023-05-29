<template>
    <h1 class="h3 mb-3">WizBuddy</h1>
    <div class="card">
        <div class="row g-0">
            <div class="col-12 col-lg-5 col-xl-3 border-end">
                <div class="px-4 d-none d-md-block">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <h4 class="text-center pt-1 text-success">Chat History</h4>
                        </div>
                    </div>
                </div>
                <div class="px-4 d-none d-md-block">
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
                            <div class="text-muted small"><em>Looking for answers....</em></div>
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
                                        <img v-if="selectedValue == 'healthNBenefit'" src="../assets/medical-policy.png" class=" mr-1" alt="Sharon Lessman" width="40" height="40">
                                    </div>
                                    <div class="col-3">
                                        <select class="form-select" v-model="selectedValue">
                                            <option v-for="option in options" :value="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-7">
                                        <input v-model="query" type="text" class="form-control" placeholder="Type your message">
                                    </div>
                                    <div class="col-1">
                                        <button type="submit" class="btn btn-success">Send</button>
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


export default {
    name: "BasePlate",
    data() {
        return{
            selectedValue: 'contractInformation',
            botStatus: 'online',
            query: '',
            options:[
                { text: 'Contract Information', value: 'contractInformation'},
                { text: 'Employee Information', value: 'employeeInformation'},
                { text: 'Health Insurance Benefit', value: 'healthNBenefit'},
            ],
            messages: [],
            histories: []
        }

    },
    methods:{
        processQuery(){
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
                            'message': response.data.message
                        }
                    )
                })
                .catch(error => {
                    this.messages.push(
                        {
                            'type': 'chat-message-left',
                            'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                            'message': "Sorry for My Poor Server. It can't handle too much load. Please try again."
                        }
                    )
                })
            this.query = ''
        }
    },
    components:{
        MessageItem, HistoryItem
    },
    mounted() {
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
            })
            .catch(error=> {
                console.log(error)
            })
    }
}
</script>

<style scoped>

</style>