<template>
  <div class="form-group mb-2">
    <label v-if="params.label" class="mb-2">{{ params.label }} <span v-if="params.required" class="required text-danger">*</span></label>
    <multiselect
      v-model="value"
      deselect-label="Удалить"
      track-by="name"
      label="name"
      :placeholder="params.placeholder"
      :options="options"
      :searchable="true"
      :selectLabel="params.placeholder"
      selectedLabel="Выбрано"
      :disabled="loading"
      @change="$emit('input', { index, value })"
      @select="$emit('input', { index, value })"
    >
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
