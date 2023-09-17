import { createStore } from 'vuex'
import admin from './admin/main';
import app from './app';
import auth from './auth';

export default createStore({
  modules: {
    admin,
    app,
    auth
  },
})
