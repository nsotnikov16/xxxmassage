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
                :timeStart="time"
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
            interval: null,
            time: false,
        };
    },
    watch: {
      /*   room() {
            if (this.room.status && !this.interval) {
                this.interval = setInterval(() => this.setTimerStart(), 1000);
            } else if (!this.room.status) {
                clearInterval(this.interval);
            }
        }, */
    },
    computed: {
        programm() {
            return this.programms.find((p) => p.id == this.room.programm_id);
        },
        mastersRoom() {
            return this.masters.filter((m) => m.room_id == this.room.id);
        },
    },
    methods: {
        toggleSpoiler() {
            this.isOpen = !this.isOpen;
        },
        setTimerStart() {
            const timeStart = this.room.time_start;

            // Создаем объекты Date для первой и второй даты
            const date1 = new Date(`${timeStart} GMT+0000`);
            const date2 = new Date();

            // Получаем разницу в миллисекундах между двумя датами
            const diffMs = date2 - date1;

            // Приводим разницу в миллисекундах к формату "чч:мм:сс"
            const diffHours = Math.floor(diffMs / 3600000);
            const diffMinutes = Math.floor((diffMs % 3600000) / 60000);
            const diffSeconds = Math.floor((diffMs % 60000) / 1000);

            // Форматируем разницу времени в формате "чч:мм:сс"
            const formattedDiff = `${diffHours
                .toString()
                .padStart(2, "0")}:${diffMinutes
                .toString()
                .padStart(2, "0")}:${diffSeconds.toString().padStart(2, "0")}`;
            this.time = formattedDiff;
        },
    },
    unmounted() {
        clearInterval(this.interval);
    },
    updated() {
        console.log(this.room.status)
    },
    created() {
        if (this.room.status) {
            this.interval = setInterval(() => this.setTimerStart(), 1000);
        }
    },
};
</script>

<style></style>
