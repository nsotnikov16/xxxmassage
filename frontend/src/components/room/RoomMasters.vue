<script setup>
import Person from "../svg/Person.vue";
import Multiselect from "vue-multiselect";
</script>

<template>
    <div class="room__block">
        <div class="room__block-name">
            <Person />
            <b>Мастер:</b>
        </div>
        <div class="room__select">
            <multiselect
                v-model="value"
                :multiple="true"
                deselect-label="Удалить"
                track-by="name"
                label="name"
                placeholder="Выберите мастера"
                :options="options"
                :searchable="true"
                selectLabel=""
                selectedLabel="Выбрано"
                :close-on-select="false"
                @select="changeMaster"
                @remove="(val) => changeMaster(val, 'delete')"
                :disabled="disabled"
            >
                <template #noResult> Поиск не дал результатов </template>
            </multiselect>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "RoomMasters",
    props: ["salonId", "roomId"],
    data() {
        return {
            value: [],
            disabled: false,
        };
    },
    computed: {
        ...mapGetters(["getEntityBySalonId"]),
        options() {
            const options = this.getEntityBySalonId(this.salonId, "masters");
            this.updateValue(options);
            return options;
        },
    },
    watch: {
        options() {
            this.updateValue();
        },
    },
    methods: {
        ...mapActions(["updateRoomForMaster", "setModalSettings"]),
        updateValue() {
            try {
                this.value = this.options.filter(
                    (m) => m.room_id == this.roomId
                );
            } catch (error) {
                this.value = [];
            }
        },
        async changeMaster(master, type) {
            if (!type) type = "add";
            this.disabled = true;
            const result = await this.updateRoomForMaster({
                masterId: master.id,
                roomId: this.roomId,
                type,
            });

            if (result?.error) {
                this.setModalSettings({
                    show: true,
                    title: result.error,
                    fields: [],
                    btnSave: false,
                    btnClose: { title: "Закрыть" },
                });
                this.updateValue();
            }

            this.disabled = false;
        },
    },
    created() {
        this.updateValue();
    },
};
</script>

<style></style>
