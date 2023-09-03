import { apiAdminUrl } from "@/utils/constants";
import { handleError } from "@/utils/functions";
import axios from "axios";

export default {
    mutations: {
        setAdminProgramms(state, data) {
            state.programms = [...state.programms, ...data]
        },
        updateAdminProgramm(state, data) {
            const index = state.programms.findIndex(s => s.id == data.id);
            if (index == -1) return;
            state.programms[index] = data;
        },
        deleteAdminProgramm(state, id) {
            state.programms = state.programms.filter(s => s.id != id);
        }
    },
    actions: {
        async getAdminProgramms({ commit }) {
            try {
                const response = await axios.get(`${apiAdminUrl}/programms`);
                commit('setAdminProgramms', response.data);
            } catch (error) {
                return handleError(error);
            }
        },
        async updateAdminProgramm({ commit }, {id, data}) {
            try {
                const response = await axios.put(`${apiAdminUrl}/programms/${id}`, data)
                commit('updateAdminProgramm', response.data);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async createAdminProgramm({ commit }, data) {
            try {
                const response = await axios.post(`${apiAdminUrl}/programms`, data)
                commit('setAdminProgramms', [response.data]);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async deleteAdminProgramm({ commit }, id) {
            try {
                const response = await axios.delete(`${apiAdminUrl}/programms/${id}`);
                commit('deleteAdminProgramm', response.data.id);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        }
    }
}