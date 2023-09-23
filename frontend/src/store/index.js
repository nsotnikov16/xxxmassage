import { createStore } from 'vuex'
import admin from './admin/main';
import app from './app';
import auth from './auth';

const store = createStore({
    modules: {
        admin,
        app,
        auth
    },
})

//await store.dispatch('getUser');
export default store;
