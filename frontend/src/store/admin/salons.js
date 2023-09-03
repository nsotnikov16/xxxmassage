import { apiAdminUrl } from "@/utils/constants";
import { handleError } from "@/utils/functions";
import axios from "axios";

export default {
    mutations: {
        setAdminSalons(state, data) {
            state.salons = [...state.salons, ...data]
        },
        updateAdminSalon(state, data) {
            const index = state.salons.findIndex(s => s.id == data.id);
            if (index == -1) return;
            state.salons[index] = data;
        },
        deleteAdminSalon(state, id) {
            state.salons = state.salons.filter(s => s.id != id);
        }
    },
    actions: {
        async getAdminSalons({ commit }) {
            try {
                const response = await axios.get(`${apiAdminUrl}/salons`);
                commit('setAdminSalons', response.data);
            } catch (error) {
                return handleError(error);
            }
        },
        async updateAdminSalon({ commit }, { id, data }) {
            try {
                const response = await axios.put(`${apiAdminUrl}/salons/${id}`, data)
                commit('updateAdminSalon', response.data);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async createAdminSalon({ commit }, data) {
            try {
                const response = await axios.post(`${apiAdminUrl}/salons`, data)
                commit('setAdminSalons', [response.data]);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async deleteAdminSalon({ commit }, id) {
            try {
                const response = await axios.delete(`${apiAdminUrl}/salons/${id}`);
                commit('deleteAdminSalon', response.data.id);
                return response.data
            } catch (error) {
                return handleError(error);
            }
        }
    }
}