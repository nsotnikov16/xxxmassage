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
</script>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    data: () => {
        return {};
    },
    computed: {
        ...mapState({ socket: (s) => s.app.socket, appId: (s) => s.app.appId }),
    },
    methods: {
        ...mapMutations(["setAllInfo"]),
    },
    created() {
        this.socket.on("update-state", (json) => {
            const data = JSON.parse(json);
            if (data.appId === this.appId) return;
            this.setAllInfo({salons: data.salons});
        });
    },
};
</script>
