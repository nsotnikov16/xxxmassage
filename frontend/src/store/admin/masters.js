import { apiAdminUrl } from "@/utils/constants";
import { handleError } from "@/utils/functions";
import axios from "axios";

export default {
    mutations: {
        setAdminMasters(state, data) {
            state.masters = [...state.masters, ...data]
        },
        updateAdminMaster(state, data) {
            const index = state.masters.findIndex(s => s.id == data.id);
            if (index == -1) return;
            state.masters[index] = data;
        },
        deleteAdminMaster(state, id) {
            state.masters = state.masters.filter(s => s.id != id);
        }
    },
    actions: {
        async getAdminMasters({ commit }) {
            try {
                const response = await axios.get(`${apiAdminUrl}/masters`);
                commit('setAdminMasters', response.data);
            } catch (error) {
                return handleError(error);
            }
        },
        async updateAdminMaster({ commit }, {id, data}) {
            try {
                const response = await axios.put(`${apiAdminUrl}/masters/${id}`, data)
                commit('updateAdminMaster', response.data);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async createAdminMaster({ commit }, data) {
            try {
                const response = await axios.post(`${apiAdminUrl}/masters`, data)
                commit('setAdminMasters', [response.data]);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async deleteAdminMaster({ commit }, id) {
            try {
                const response = await axios.delete(`${apiAdminUrl}/masters/${id}`);
                commit('deleteAdminMaster', response.data.id);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        }
    }
}