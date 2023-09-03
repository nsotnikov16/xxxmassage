import programms from "./programms";
import salons from "./salons";
import masters from "./masters";
import rooms from "./rooms";

export default {
    state: {
        salons: [],
        programms: [],
        masters: [],
        rooms: [],
    },
    getters: {
    },
    mutations: {
        setAdminModalSettings(state, params) {
            state.modal = { ...state.modal, ...params }
        },
        ...salons.mutations,
        ...programms.mutations,
        ...masters.mutations,
        ...rooms.mutations
    },
    actions: {
        setAdminModalSettings({ commit }, params) {
            commit('setAdminModalSettings', params);
        },
        ...salons.actions,
        ...programms.actions,
        ...masters.actions,
        ...rooms.actions
    },
}