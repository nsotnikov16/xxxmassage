<template>
  <div class="modal-body">
    <div v-for="(field, index) in fields" :key="index">
      <TextComponent
        v-if="['text', 'number', 'email'].includes(field.type)"
        :loading="loading"
        :params="field"
        :index="index"
        @input="input"
      />
      <TextAreaComponent
        v-if="field.type == 'textarea'"
        :loading="loading"
        :params="field"
        :index="index"
        @input="input"
      />
      <SelectComponent
        v-if="field.type == 'select'"
        :loading="loading"
        :params="field"
        :index="index"
        @input="input"
      />
      <MultiSelectComponent
        v-if="field.type == 'multiselect'"
        :loading="loading"
        :params="field"
        :index="index"
        @input="input"
      />
    </div>
  </div>
</template>

<script setup>
import TextComponent from "./fields/Text.vue";
import TextAreaComponent from "./fields/TextArea.vue";
import SelectComponent from "./fields/Select.vue";
import MultiSelectComponent from "./fields/MultiSelect.vue";
</script>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ModalBody",
  props: [ "loading", 'fields_props'],
  emits: ["submit"],

  computed: {
    ...mapState({ modal: (s) => s.app.modal }),
    fields() {
      return this.fields_props.sort(
        (a, b) => parseFloat(a.sort) - parseFloat(b.sort)
      );
    },
  },
  methods: {
    ...mapActions(["setModalFieldValue"]),
    input(params) {
      this.setModalFieldValue(params);
    },
  },
};
</script>

<style></style>
