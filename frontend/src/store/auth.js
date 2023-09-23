
import router from "@/router";
import { apiUrl, url } from "@/utils/constants";
import { handleError } from "@/utils/functions";
import axios from "axios";

export default {
    state: {
        user: {
            id: "",
            email: "",
            name: '',
        },
    },
    getters: {
        isAuthorized(state) {
            return state.user.email;
        }
    },
    mutations: {
        setUser(state, data) {
            if (data) state.user = data;
        }
    },
    actions: {
        async getUser({ commit }) {
            try {
                const response = await axios.get(`${apiUrl}/user`);
                commit('setUser', response.data);
            } catch (error) {
                return handleError(error)
            }
        },
        async login({ commit }, { email, password }) {
            try {
                await axios.get(`${url}/sanctum/csrf-cookie/`);
                if (!email || !password) throw new Error('Не заполнены все обязательные поля');
                const response = await axios.post(`${apiUrl}/login`, { email, password })
                if (response.data.email) {
                    commit('setUser', response.data)
                    router.push({ name: 'home' });
                    return true;
                }
            } catch (error) {
                return handleError(error)
            }
        },
        async register({ commit }, { name, email, password, password_confirmation }) {
            try {
                if (!name || !email || !password || !password_confirmation) throw new Error('Не заполнены все обязательные поля');
                const response = await axios.post(`${apiUrl}/register`, { email, password, name, password_confirmation })
                if (response.data.email) {
                    commit('setUser', response.data)
                    router.push({ name: 'home' });
                    return true;
                }
            } catch (error) {
                return handleError(error)
            }
        },
        async logout({ commit }) {
            try {
                await axios.post(`${apiUrl}/logout`)
                commit('setUser', {});
                router.push({ name: 'auth' })
            } catch (error) {
                return handleError(error)
            }
        }
    },
}
