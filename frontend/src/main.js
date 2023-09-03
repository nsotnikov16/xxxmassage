import 'bootstrap/scss/bootstrap.scss';
import 'vue-multiselect/dist/vue-multiselect.css';
import './assets/scss/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
