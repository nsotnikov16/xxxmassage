<script setup>
import Dollar from "../svg/Dollar.vue";
import Person from "../svg/Person.vue";
import Programm from "../svg/Programm.vue";
import Time from "../svg/Time.vue";
import Arrow from "../svg/Arrow.vue";
</script>

<template>
    <div class="room__spoiler-top" @click="$emit('click')">
        <div v-if="isFree">Свободна</div>
        <div v-if="programm && programm.price">
            <Dollar />
            <span>{{ programm.price.toLocaleString("ru-RU") }} ₽</span>
        </div>
        <div v-if="programm">
            <Programm />
            <span>{{ programmFullName }}</span>
        </div>
        <div v-if="mastersString">
            <Person />
            <span>{{ mastersString }}</span>
        </div>
        <div v-if="timeStart">
            <Time />
            <span>{{ timeStart }}</span>
        </div>
        <div v-if="timeEnd">
            <Time />
            <span>{{ timeEnd }}</span>
        </div>
        <Arrow class="room__arrow" />
    </div>
</template>

<script>
export default {
    name: "RoomTop",
    props: ["programm", "masters", "timeStart", "timeEnd"],
    emits: ["click"],
    computed: {
        programmFullName() {
            if (!this.programm) return;
            let time;
            if (this.programm.time) time = "(" + this.programm.time + ")";
            return `${this.programm.name} ${time ?? ""}`;
        },
        mastersString() {
            if (this.masters.length) {
                const names = this.masters.map((m) => m.name);
                return names.join("/");
            }
            return false;
        },
        isFree() {
            return (
                !this.programm &&
                !this.mastersString &&
                !this.timeStart &&
                !this.timeEnd
            );
        },
    },
};
</script>
