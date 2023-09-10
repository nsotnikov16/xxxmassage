<script setup>
import RoomTop from "./room/RoomTop.vue";
import RoomBottom from "./room/RoomBottom.vue";
</script>

<template>
    <div class="room mb-4">
        <p class="h5 mb-3">{{ room.name }}</p>
        <div :class="['room__spoiler', isOpen ? 'room__spoiler_open' : '']">
            <RoomTop
                :programm="programm"
                :masters="mastersRoom"
                :timeStart="timeStart"
                :timeEnd="timeEnd"
                @click="toggleSpoiler"
            />
            <RoomBottom :salonId="salonId" :room="room" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getFormatTime } from "@/utils/functions";
export default {
    name: "Room",
    props: ["room", "masters", "programms", "salonId"],
    data() {
        return {
            isOpen: false,
            intervalStart: null,
            timeStart: false,
            timeEnd: false,
        };
    },
    watch: {
        status() {
            this.setIntervalTimerStart();
        },
        programm(val) {
            if (!val) this.timeEnd = false;
        },
    },
    computed: {
        ...mapGetters(["getInfoRoom"]),
        programm() {
            return this.programms.find((p) => p.id == this.room.programm_id);
        },
        mastersRoom() {
            return this.masters.filter((m) => m.room_id == this.room.id);
        },
        status() {
            return this.getInfoRoom(this.salonId, this.room.id).status;
        },
    },
    methods: {
        toggleSpoiler() {
            this.isOpen = !this.isOpen;
        },
        setTimeStart(timeStart) {
            const date1 = new Date(`${timeStart} GMT+0000`);
            const date2 = new Date();
            const diffMs = date2 - date1;
            this.timeStart = getFormatTime(diffMs);
        },
        setTimeEnd(timeStart) {
            if (!this.programm || !this.programm.time) return;
            const timeProgramm = Number(this.programm.time) * 60 * 1000;
            if (!timeProgramm) return;
            const date1 = new Date(`${timeStart} GMT+0000`).getTime();
            const date2 = new Date().getTime();
            const diffMs = timeProgramm - (date2 - date1) + 1000;
            if (diffMs <= 0) return this.timeEnd = '';
            this.timeEnd = getFormatTime(diffMs);
        },
        setIntervalTimerStart() {
            clearInterval(this.intervalStart);
            this.timeStart = false;
            this.timeEnd = false;
            const room = this.getInfoRoom(this.salonId, this.room.id);

            if (room.status) {
                this.intervalStart = setInterval(() => {
                    this.setTimeStart(room.time_start);
                    this.setTimeEnd(room.time_start);
                }, 1000);
            }
        },
    },
    unmounted() {
        this.setIntervalTimerStart();
    },
    updated() {},
    created() {
        this.setIntervalTimerStart();
    },
};
</script>

<style></style>
