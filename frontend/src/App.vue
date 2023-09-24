<template>
    <div class="page">
        <Header />
        <router-view />
        <Modal />
    </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Modal from "@/components/modal/Modal.vue";
import {protectedRoute} from '@/utils/functions'
</script>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
    data: () => {
        return {};
    },
    computed: {
        ...mapState({
            socket: (s) => s.app.socket,
            appId: (s) => s.app.appId,
        }),
        ...mapGetters(['isAuthorized'])
    },
    methods: {
        ...mapMutations(["setSalons"]),
        ...mapActions(['getUser'])
    },
    async created() {
        this.socket.on("update-state", (json) => {
            const data = JSON.parse(json);
            if (data.appId === this.appId || !this.isAuthorized) return;
            this.setSalons({ salons: data.salons });
        });
    },
};
</script>
