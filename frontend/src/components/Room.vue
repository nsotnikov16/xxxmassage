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
                :timeStart="0"
                @click="toggleSpoiler"
            />
            <RoomBottom :salonId="salonId" :room="room" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Room",
    props: ["room", "masters", "programms", "salonId"],
    data() {
        return {
            isOpen: false,
        };
    },
    computed: {
        programm() {
            return this.programms.find((p) => p.id == this.room.programm_id);
        },
        mastersRoom() {
            return this.masters.filter((m) => m.room_id == this.room.id);
        },
        timeStart() {
        //
        },
    },
    methods: {
        toggleSpoiler() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>

<style></style>
