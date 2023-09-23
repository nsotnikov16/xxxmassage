
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
        async getUser({commit}) {
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
                commit('setUser', response.data)
            } catch (error) {
                return handleError(error)
            }
        }
    },
}