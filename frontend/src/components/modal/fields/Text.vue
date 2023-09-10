<template>
  <div class="form-group mb-2">
    <label v-if="params.label" class="mb-2" :for="id">{{ params.label }} <span v-if="params.required" class="required text-danger">*</span></label>
    <input
      :type="params.type"
      class="form-control"
      :id="id"
      :placeholder="params.placeholder"
      v-model="value"
      @input="$emit('input', { index, value })"
      :disabled="loading"
    />
  </div>
</template>

<script>
import {id} from '@/utils/functions';
export default {
  props: ["params", "index", "loading"],
  emits: ["input"],
  data() {
    return {
      value: this.params.value ?? "",
      id: id(),
    };
  },
};
</script>

<style></style>
