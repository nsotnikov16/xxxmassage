<script setup>
import TotalInfo from "@/components/TotalInfo.vue";
import Salon from "@/components/Salon.vue";
import Loader from "@/components/Loader.vue";
</script>

<template>
    <div class="container">
        <h1>Мониторинг комнат</h1>
        <Loader v-if="loading"></Loader>
        <h2 v-if="!loading && (!salons || !salons.length)" class="text-danger">
            Салоны отсутствуют
        </h2>
        <div v-if="!loading && salons.length">
            <TotalInfo
                :roomsAll="roomsAll"
                :roomsBusy="roomsBusy"
                :mastersBusy="mastersBusy"
            />
            <Salon v-for="salon in salons" :key="salon.id" :salon="salon" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { protectedRoute } from "@/utils/functions";
export default {
    data() {
        return {
            loading: true,
        };
    },
    watch: {},
    computed: {
        ...mapState({
            salons: (s) => s.app.salons,
            socket: (s) => s.app.socket,
            appId: (s) => s.app.appId,
        }),
        ...mapGetters(["isAuthorized"]),
        roomsAll() {
            let rooms = 0;
            if (this.salons.length) {
                this.salons.forEach((salon) => {
                    if (salon.rooms.length) {
                        salon.rooms.forEach((room) => rooms++);
                    }
                });
            }
            return rooms;
        },
        roomsBusy() {
            let rooms = 0;
            if (this.salons.length) {
                this.salons.forEach((salon) => {
                    if (salon.rooms.length) {
                        salon.rooms.forEach((room) =>
                            room.status ? rooms++ : ""
                        );
                    }
                });
            }
            return rooms;
        },
        mastersBusy() {
            let masters = [];
            if (this.salons.length) {
                this.salons.forEach((salon) => {
                    if (salon.masters.length) {
                        salon.masters.forEach((m) => {
                            if (!masters.includes(m.id) && m.room_id) {
                                masters.push(m.id);
                            }
                        });
                    }
                });
            }
            return masters.length;
        },
        fromAdmin() {
            try {
                return this.$router.options.history.state.back.includes(
                    "/admin"
                );
            } catch (error) {
                return false;
            }
        },
    },
    methods: {
        ...mapActions(["getSalons", "getUser"]),
        ...mapMutations(['updateStateSocket'])
    },
    async created() {
        if (!protectedRoute(this.isAuthorized)) return;

        if (!this.salons.length || this.fromAdmin) {
            await this.getSalons();
        }
        this.loading = false;

        if (this.fromAdmin) this.updateStateSocket();
    },
};
</script>
