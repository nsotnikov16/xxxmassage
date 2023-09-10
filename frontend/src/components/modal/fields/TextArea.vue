<template>
  <div class="form-group mb-2">
    <label v-if="params.label" class="mb-2" :for="id">{{ params.label }} <span v-if="params.required" class="required text-danger">*</span></label>
    <textarea
      class="form-control"
      :id="id"
      v-model="value"
      rows="3"
      :placeholder="params.placeholder"
      @input="$emit('input', { index, value })"
      :disabled="loading"
    ></textarea>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {id} from '@/utils/functions';
export default {
  props: ["params", "index", 'loading'],
  emits: ["input"],
  data() {
    return {
      value: this.params.value ?? "",
      id: id(),
    };
  },
  computed: mapState({ fields: (s) => s.app.modal.fields }),
  methods: {
    ...mapActions(["setModalFieldValue"]),
    input() {
      this.setModalFieldValue({ index: this.index, value: this.value });
    },
  },
};
</script>

<style></style>
