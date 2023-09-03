import { apiAdminUrl } from "@/utils/constants";
import { handleError } from "@/utils/functions";
import axios from "axios";

export default {
    mutations: {
        setAdminRooms(state, data) {
            state.rooms = [...state.rooms, ...data]
        },
        updateAdminRoom(state, data) {
            const index = state.rooms.findIndex(s => s.id == data.id);
            if (index == -1) return;
            state.rooms[index] = data;
        },
        deleteAdminRoom(state, id) {
            state.rooms = state.rooms.filter(s => s.id != id);
        }
    },
    actions: {
        async getAdminRooms({ commit }) {
            try {
                const response = await axios.get(`${apiAdminUrl}/rooms`);
                commit('setAdminRooms', response.data);
            } catch (error) {
                return handleError(error);
            }
        },
        async updateAdminRoom({ commit }, {id, data}) {
            try {
                const response = await axios.put(`${apiAdminUrl}/rooms/${id}`, data)
                commit('updateAdminRoom', response.data);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async createAdminRoom({ commit }, data) {
            try {
                const response = await axios.post(`${apiAdminUrl}/rooms`, data)
                commit('setAdminRooms', [response.data]);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async deleteAdminRoom({ commit }, id) {
            try {
                const response = await axios.delete(`${apiAdminUrl}/rooms/${id}`);
                commit('deleteAdminRoom', response.data.id);
                return response.data;
            } catch (error) {
                return handleError(error);
            }
        }
    }
}