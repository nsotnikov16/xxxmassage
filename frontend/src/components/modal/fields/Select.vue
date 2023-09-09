<template>
  <div class="form-group mb-2">
    <label v-if="params.label" class="mb-2">{{ params.label }}</label>
    <multiselect
      v-model="value"
      deselect-label="Удалить"
      track-by="name"
      label="name"
      :placeholder="params.placeholder"
      :options="options"
      :searchable="true"
      selectLabel="Выберите из списка"
      selectedLabel="Выбрано"
      :disabled="loading"
      @change="$emit('input', { index, value })"
      @select="$emit('input', { index, value })"
      :allowEmpty="!params.required"
    >
      <template v-slot:singleLabel="{ option }"> {{ option.name }}</template>
    </multiselect>
  </div>
</template>

<script setup>
import Multiselect from "vue-multiselect";
</script>
<script>
export default {
  name: "ModalSelect",
  props: ["params", "loading", "index"],
  emits: ["input"],
  data() {
    return {
      value: this.params.value ?? {},
      options: this.params.options ?? [],
    };
  },
};
</script>

<style></style>
