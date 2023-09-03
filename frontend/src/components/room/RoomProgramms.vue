<script setup>
import Programm from "../svg/Programm.vue";
import Multiselect from "vue-multiselect";
</script>

<template>
  <div class="room__block">
    <div class="room__block-name">
      <Programm />
      <b>Программа:</b>
    </div>
    <div class="room__select">
      <multiselect
        v-model="value"
        :multiple="false"
        deselect-label="Удалить"
        track-by="name"
        label="name"
        placeholder="Выберите программу"
        :options="options"
        :searchable="true"
        selectLabel=""
        selectedLabel="Выбрано"
        :show-labels="true"
        @select="changeProgramm"
        @remove="(val) => changeProgramm(val, 'delete')"
      >
        <template #noResult> Поиск не дал результатов </template>
      </multiselect>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RoomProgramms",
  props: ["salonId", "room"],
  data() {
    return {
      value: {},
    };
  },
  computed: {
    ...mapGetters(["getEntityBySalonId"]),
    options() {
      return this.getEntityBySalonId(this.salonId, "programms");
    },
  },
  methods: {
    ...mapActions(["updateProgrammInRoom", "setModalSettings"]),
    updateValue() {
      try {
        this.value = this.options.filter((m) => m.id == this.room.programm_id);
      } catch (error) {
        this.value = [];
      }
    },
    async changeProgramm(val, type) {
      this.disabled = true;
      const result = await this.updateProgrammInRoom({
        roomId: this.room.id,
        programm: type == "delete" ? 0 : val.id,
      });

      if (result?.error) {
        this.setModalSettings({
          show: true,
          title: result.error,
          fields: [],
          btnSave: false,
          btnClose: { title: "Закрыть" },
        });

        if (type == "delete") {
          this.value = this.value.push(val);
        } else {
          this.value = {};
        }
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
