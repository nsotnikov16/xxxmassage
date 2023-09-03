<template>
  <button type="submit" class="btn btn-primary" :disabled="loading">
    <span
      class="spinner-border spinner-border-sm me-1"
      role="status"
      aria-hidden="true"
      v-if="loading"
    ></span>
    <span class="sr-only"> {{ title }}</span>
  </button>
</template>

<script>
export default {
  name: "ModalButtonSave",
  props: ["loading", "title"],
};
</script>
