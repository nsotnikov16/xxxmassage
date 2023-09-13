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
import { mapMutations, mapState } from "vuex";
export default {
    data: () => {
        return {};
    },
    computed: {
        ...mapState({ socket: (s) => s.app.socket }),
        ...mapMutations(["setAllInfo"]),
    },
    created() {
        console.log(this.setAllInfo)
        this.socket.on("update-state", (json) => {
            if (this.setAllInfo) {
                this.setAllInfo(JSON.parse(json));
            }

        });
    },
};
</script>
