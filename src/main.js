import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPhone, faBars, faCircleInfo, faCircleUser, faArrowRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import { faComment, faPaperPlane, faTrashCan, faCircleQuestion  } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
library.add(faPhone ,faTwitter, faMicrosoft, faComment, faPaperPlane, faBars, faTrashCan, faCircleInfo, faCircleQuestion, faCircleInfo, faCircleUser, faArrowRightFromBracket)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(VueAxios, axios).mount('#app')