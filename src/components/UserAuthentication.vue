<template>
    <div class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="../assets/ai.png"
                         class=" me-1 d-block" alt="Sharon Lessman" width="60" height="60">
                    <div class="modal-title text-success">
                        WizzBuddy
                    </div>
                </div>
                <div class="modal-body">
                    <div v-if="showError" class="alert alert-danger" role="alert">
                        {{ errorMessage }}
                    </div>
                    <div v-if="showSuccess" class="alert alert-success" role="alert">
                        {{ successMessage }}
                    </div>
                    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li @click="showLogin" class="nav-item" role="presentation">
                            <a :class="loginActive" class="nav-link" id="tab-login" data-mdb-toggle="pill" role="tab"
                               aria-controls="pills-login" :aria-selected="formType == 'login'">Login</a>
                        </li>
                        <li @click="showRegistration" class="nav-item" role="presentation">
                            <a :class="registrationActive" class="nav-link" id="tab-register" data-mdb-toggle="pill" role="tab"
                               aria-controls="pills-register" :aria-selected="formType == 'registration'">Register</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div :class="loginActive" class="tab-pane fade show " id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                            <form @submit.prevent="processLogin" method="post">
                                <div class="form-outline mb-4">
                                    <input v-on:input="resetAlert" type="email" id="loginName" class="form-control" v-model="loginUserEmail"/>
                                    <label class="form-label" for="loginName">Email</label>
                                </div>
                                <div class="form-outline mb-4">
                                    <input v-on:input="resetAlert" type="password" id="loginPassword" class="form-control" v-model="loginUserPassword"/>
                                    <label class="form-label" for="loginPassword">Password</label>
                                </div>

                                <button type="submit" class="btn btn-success btn-block mb-4">Sign in</button>
                                <div class="text-center">
                                    <p>Not a member? <span class="text-success">Register first.</span></p>
                                </div>
                            </form>
                        </div>
                        <div :class="registrationActive" class="tab-pane fade show" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                            <form @submit.prevent="processRegistration" method="POST">
                                <div class="form-outline mb-4">
                                    <input v-on:input="resetAlert" type="email" id="registerEmail" class="form-control" v-model="registerUserEmail" />
                                    <label class="form-label" for="registerEmail">Email</label>
                                </div>
                                <div class="form-outline mb-4">
                                    <input v-on:input="resetAlert" type="password" id="registerPassword" class="form-control" v-model="registerUserPassword"/>
                                    <label class="form-label" for="registerPassword">Password</label>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="password" id="registerRepeatPassword" class="form-control" v-model="registerUserRePassword"/>
                                    <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                                </div>
                                <button type="submit" class="btn btn-success btn-block mb-3">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "UserAuthentication",
    data(){
        return{
            formType: "login",
            loginActive: 'active',
            registrationActive: "",
            showError: false,
            showSuccess: false,
            errorMessage: '',
            successMessage: '',
            loginUserEmail: '',
            loginUserPassword: '',
            registerUserEmail: '',
            registerUserPassword: '',
            registerUserRePassword: '',
            authLoginEndPoint:'https://bs-employee-management.herokuapp.com/login',
            authSignupEndPoint:'https://bs-employee-management.herokuapp.com/signup',
            isAuthorized: false
        }
    },
    methods: {
        showRegistration() {
            this.resetAlert()
            this.formType = 'registration'
            this.loginActive = ''
            this.registrationActive = 'active'
        },
        showLogin() {
            this.resetAlert()
            this.formType = 'login'
            this.loginActive = 'active'
            this.registrationActive = ''
        },
        processLogin() {
            var userInput = {
                'email': this.loginUserEmail,
                'password': this.loginUserPassword
            }
            axios.post(this.authLoginEndPoint, userInput)
                .then(response => {
                    if (response.status == 200 && response.data.token != null) {
                        this.isAuthorized = true;
                        this.showSuccess = true;
                        this.successMessage = "Congratulations! You got a new Buddy!"
                        this.setCookie('token', response.data.token);
                        this.resetLoginFields();
                        setTimeout(() => {
                            this.$emit('updateAuthStatus', this.isAuthorized)
                        }, 1000);
                    } else {
                        this.isAuthorized = false;
                        this.showError = true;
                        this.errorMessage = "Invalid Credentials"
                    }
                })
                .catch(error => {
                    this.isAuthorized = false;
                    this.showError = true;
                    this.errorMessage = "Invalid Credentials"
                });
        },
        processRegistration() {
            if (this.registerUserEmail === '' || this.registerUserPassword === '' || this.registerUserRePassword === '') {
                this.showError = true;
                this.errorMessage = "Please provide required data for each field"
            } else if (this.registerUserPassword !== this.registerUserRePassword) {
                this.showError = true;
                this.errorMessage = "Password do not match!"
            } else {
                var newUserInput = {
                    'email': this.registerUserEmail,
                    'password': this.registerUserPassword
                }
                axios.post(this.authSignupEndPoint, newUserInput)
                    .then(response => {
                        if (response.status === 200 && response.data.status_code !== 400) {
                            this.isAuthorized = true;
                            this.showSuccess = true;
                            this.successMessage = "User registration successful. Please login now."
                            this.resetRegistrationFields();
                            setTimeout(() => {
                                this.showLogin()
                            }, 1000);
                        } else {
                            this.showError = true;
                            this.errorMessage = "Can't create user now! You should use company email id and correct information"
                        }
                    })
                    .catch(error => {
                        this.showError = true;
                        this.errorMessage = "Can't create user now! You should use company email id and correct information"
                    })
            }
        },
        resetAlert() {
            this.showError = false;
            this.showSuccess = false;
        },
        resetLoginFields() {
            this.loginUserEmail = '';
            this.loginUserPassword = '';
        },
        resetRegistrationFields() {
            this.registerUserEmail = '';
            this.registerUserPassword = '';
            this.registerUserRePassword = '';
        },
        setCookie(name, value) {
            var expires = "";
            var date = new Date();
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }
    }
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
.nav-item{
    cursor: pointer;
}
</style>
