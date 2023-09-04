<script setup>
import TotalInfo from "@/components/TotalInfo.vue";
import Salon from "@/components/Salon.vue";
</script>

<template>
    <div class="container">
        <h1>Мониторинг комнат</h1>
        <TotalInfo
            :roomsAll="roomsAll"
            :roomsBusy="roomsBusy"
            :mastersBusy="mastersBusy"
        />
        <Salon v-for="salon in salons" :key="salon.id" :salon="salon" />
        <p v-if="loading" class="h3 text-primary">Получаем информацию...</p>
        <h2 v-if="!loading && (!salons || !salons.length)" class="text-danger">
            Салоны отсутствуют
        </h2>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapState({
            salons: (s) => s.app.salons,
        }),
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
    },
    methods: {
        ...mapActions(["getAllInfo"]),
    },
    async created() {
        if (!this.salons.length) {
            this.loading = true;
            await this.getAllInfo();
            this.loading = false;
        }
    },
};
</script>
