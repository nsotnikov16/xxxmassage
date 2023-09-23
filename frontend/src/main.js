import 'bootstrap/scss/bootstrap.scss';
import 'vue-multiselect/dist/vue-multiselect.css';
import './assets/scss/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios';
//import Meta from 'vue-meta';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

(async () => {
    const vue = createApp(App).use(store).use(router);
    await store.dispatch('getUser');
    vue.mount('#app')
})()

