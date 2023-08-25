<template>
    <div class="wiz-body__history">
        <h6>History</h6>
        <ul id="wiz-message-section" class="wiz-body__history__list d-flex flex-column-reverse justify-content-end">
            <HistoryItem v-for="history in histories" :q="history.q" :callMethod="processQueryfromHistory"/>
        </ul>
        <div class="wiz-body__history__clear">
            <button @click="clearHistory" class="btn btn-danger"><i><font-awesome-icon icon="fa-regular fa-trash-can" /></i> Clear History</button>
        </div>
    </div>
    <div class="wiz-body__chat">
        <div class="wiz-body__chat__cont">
            <div class="wiz-body__chat__inner">
                <ul class="wiz-body__chat__conversation">
                    <MessageItem v-for="message in messages" :type="message.type" :message="message.message" :time="message.time" />
                </ul>
                <div v-show="queryInProgress" class="half light message-type-effect mx-auto">
                    <div class="typing">
                        <span v-for="i in 5" class="circle bouncing"></span>
                    </div>
                </div>
                <div class="wiz-body__chat__suggestion">
                    <ul>
                        <li v-for="(item, index) in suggestions">
                            <a href="#" class="btn" @click="suggestionsToQuestion(item.question)">
                                {{ item.question}}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="wiz-body__chat__ask">
                    <div class="wiz-body__chat__question">
                        <div class="wiz-body__chat__question__image">
                            <img src="../assets/bslogo.png" alt="">
                        </div>
                        <form @submit.prevent="processQuery" class="wiz-body__chat__question__form">
                            <input class="form-control"
                                   v-model="query"
                                   type="text"
                                   name=""
                                   id=""
                                   placeholder="Ask your question here..."
                                   :disabled="queryInProgress">
                            <button class="btn" type="submit" :disabled="queryInProgress">
                                <i>
                                    <font-awesome-icon icon="fa-regular fa-paper-plane" />
                                </i>
                            </button>
                        </form>
                    </div>
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
import {v4 as uuid4} from 'uuid';


export default {
    name: "BasePlate",
    data() {
        return{
            selectedValue: 'bsInfo',
            query: '',
            messages: [],
            histories: [],
            suggestions: [],
            queryInProgress: false,
            blink: true,
            timer: null,
            haveHistory: false,
        }

    },
    methods:{
        processQuery(){
            this.queryInProgress = true;
            this.histories.push({
                'q': this.query
            })
            if(this.histories.length > 0){
                this.haveHistory = true;
            }
            this.messages.push({
                'type': 'question',
                'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                'message': this.query
            })
            var selector = 'other/'
            axios
                .get('https://wizbuddy.herokuapp.com/'+ selector + this.query)
                .then(response => {
                    this.messages.push(
                        {
                            'type': 'response',
                            'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                            'message': response.data.message.replace('\n', '<br>')
                        }
                    )
                    this.queryInProgress = false;
                })
                .catch(error => {
                    this.messages.push(
                        {
                            'type': 'response',
                            'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                            'message': "Sorry for My Poor Server. It can't handle too much load. Please try again."
                        }
                    )
                    this.queryInProgress = false
                })
            this.query = ''
        },
        processQueryfromHistory(q){
            this.query = q;
        },
        clearHistory(){
            this.histories = [];
            this.haveHistory = false;
        },
        logoutUser(){
          this.delete_cookie();
            this.$emit('updateAuthStatus', false)
        },
        delete_cookie() {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },
        suggestionsToQuestion(question){
            this.query = question;
        }
    },
    components:{
        About,
        MessageItem, HistoryItem, modal
    },
    mounted() {
        this.queryInProgress = true;
        this.haveHistory = false;
        this.suggestions.push({'question': "Tell me about Brain Station 23."});
        this.suggestions.push({'question': "Code of conduct for Brain Station 23"});
        this.suggestions.push({'question': "Brief about the leave policy"});
        axios
            .get('https://wizbuddy.herokuapp.com/')
            .then(response => {
                this.messages.push(
                    {
                        'type': 'response',
                        'time': new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                        'message': response.data.message
                    }
                )
                this.queryInProgress = false;
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
</style>