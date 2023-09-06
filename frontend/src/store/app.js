
import { defaultModalParams } from "@/utils/constants";
import { createDataModal } from "@/utils/functions";
import { apiUrl } from "@/utils/constants";
import { handleError } from "@/utils/functions";
import axios from "axios";

export default {
    state: {
        modal: { ...defaultModalParams },
        salons: [],
    },
    getters: {
        getDataModal(state) {
            return createDataModal(state.modal.fields);
        },
        getEntityBySalonId: (state) => (salonId, entity) => {
            const salon = state.salons.find(salon => salon.id == salonId);

            if (salon && salon[entity]) {
                if (entity == 'programms') return salon[entity].map(p => ({ ...p, ...p.time ? { name: p.name + ' (' + p.time + ')' } : '' }))
                return salon[entity];
            }
            return [];
        },
        getInfoRoom: (state) => (salonId, roomId) => {
            const salon = state.salons.find(s => s.id == salonId);
            if (salon) {
                const room = salon.rooms.find(r => r.id == roomId);
                if (room) return room;
            }
            return {};
        }
    },
    mutations: {
        setModalSettings(state, params) {
            state.modal = { ...state.modal, ...params }
        },
        setModalFieldValue(state, params) {
            state.modal.fields[params.index].value = params.value
        },
        setModalFields(state, params) {
            state.modal.fields = params;
        },
        setAllInfo(state, data) {
            if (data.salons) state.salons = data.salons;
            if (data.masters) state.masters = data.masters;
            if (data.programms) state.programms = data.programms;
        },
        updateRoomForMasters(state, master) {
            state.salons.forEach(s => {
                s.masters.forEach(m => {
                    if (m.id == master.id) {
                        m.room_id = master.room_id
                    }
                })
            })
        },
        updateProgrammInRoom(state, room) {
            const findSalon = state.salons.find(s => s.id == room.salon_id);
            if (findSalon) {
                const findRoom = findSalon.rooms.find(r => r.id == room.id);
                if (findRoom) findRoom.programm_id = room.programm_id;
            }
        },
        updateStatusRoom(state, room) {
            const findSalon = state.salons.find(s => s.id == room.salon_id);
            if (findSalon) {
                const findRoom = findSalon.rooms.find(r => r.id == room.id);
                if (findRoom) {
                    findRoom.time_start = room.time_start
                    findRoom.status = room.status;
                }
            }
        }
    },
    actions: {
        setModalSettings({ commit }, params) {
            commit('setModalSettings', params);
        },
        setModalFieldValue({ commit }, params) {
            commit('setModalFieldValue', params);
        },
        setModalFields({ commit }, params) {
            commit('setModalFields', params);
        },
        async getAllInfo({ commit }) {
            try {
                const response = await axios.get(`${apiUrl}/all`);
                commit('setAllInfo', response.data);
            } catch (error) {
                return handleError(error);
            }
        },
        async updateRoomForMaster({ commit }, { roomId, masterId, type }) {
            try {
                const response = await axios.patch(`${apiUrl}/masters/${masterId}/updateRoom/${roomId}`, { type });
                commit('updateRoomForMasters', response.data);
            } catch (error) {
                return handleError(error);
            }
        },
        async updateProgrammInRoom({ commit }, { roomId, programm }) {
            try {
                const response = await axios.patch(`${apiUrl}/rooms/${roomId}/updateProgramm`, { programm })
                commit('updateProgrammInRoom', response.data);
            } catch (error) {
                return handleError(error);
            }
        },
        async updateStatusRoom({ commit }, { roomId, status }) {
            try {
                const response = await axios.patch(`${apiUrl}/rooms/${roomId}/updateStatus`, { status })
                commit('updateStatusRoom', response.data);
            } catch (error) {
                return handleError(error);
            }
        }
    },
}
