import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import money from 'v-money3'


createApp(App).use(
    router, 
    VueAxios, 
    axios, 
    Vuelidate, 
    VueMask,
    money
).mount('#app')