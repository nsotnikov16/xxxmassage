import { createStore } from 'vuex'
import admin from './admin/main';
import app from './app';

export default createStore({
  modules: {
    admin,
    app,
  },
})
