<template>
  <div class="form-group mb-2">
    <label v-if="params.label" class="mb-2">{{ params.label }} <span v-if="params.required" class="required text-danger">*</span></label>
    <multiselect
      v-model="value"
      :multiple="true"
      deselect-label="Удалить"
      track-by="name"
      label="name"
      :placeholder="params.placeholder"
      :options="options"
      :searchable="true"
      selectLabel="Выберите из списка"
      selectedLabel="Выбрано"
      open-direction="bottom"
      @change="$emit('input', {index, value})"
      @select="$emit('input', {index, value})"
      @remove="$emit('input', {index, value})"
      :disabled="loading"
      :allowEmpty="!params.required"
    >
      <template #noResult>
          Поиск не дал результатов
      </template>
    </multiselect>
  </div>
</template>

<script setup>
import Multiselect from "vue-multiselect";
</script>
<script>
export default {
  name: "ModalMultiSelect",
  props: ["params", 'index', 'loading'],
  emits: ['input'],
  data() {
    return {
      value: this.params.value ?? [],
      options: this.params.options ?? [],
    };
  },
};
</script>

<style></style>
