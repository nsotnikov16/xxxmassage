<script setup>
import Time from "../svg/Time.vue";
import RoomMasters from "./RoomMasters.vue";
import RoomProgramms from "./RoomProgramms.vue";
</script>

<template>
    <div class="room__spoiler-bottom">
        <div class="room__bottom">
            <RoomMasters :salonId="salonId" :roomId="room.id" />
            <RoomProgramms :salonId="salonId" :room="room" />
            <div class="room__block" id="time">
                <div class="room__block-name">
                    <Time />
                    <b>Запустить таймер:</b>
                </div>
                <div class="form-check form-switch ms-3 mb-0">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="status"
                        :checked="status"
                        :disabled="disabled"
                        @input="changeStatus"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
    name: "RoomBottom",
    props: ["room", "salonId"],
    data() {
        return {
            status: false,
            disabled: false,
        };
    },
    methods: {
        ...mapActions(["updateStatusRoom"]),
        ...mapMutations(["setModalSettings"]),
        async changeStatus(e) {
            this.disabled = true;

            const result = await this.updateStatusRoom({
                roomId: this.room.id,
                status: Number(!this.status),
            });

            if (result?.error) {
                this.setModalSettings({
                    show: true,
                    title: result.error,
                    fields: [],
                    btnSave: false,
                    btnClose: { title: "Закрыть" },
                });

                this.status = this.status;
            }

            this.disabled = false;
        },
    },
    created() {
        this.status = Boolean(this.room.status);
    },
    updated() {
        this.status = Boolean(this.room.status);
    }
};
</script>

<style lang="scss" scoped>
#time {
    margin-top: 70px;
    display: flex;

    .form-switch {
        min-height: 0;
    }
}
</style>
