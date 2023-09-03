<template>
  <button type="button" class="btn btn-secondary" @click="click">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "ModalButtonClose",
  emits: ["click"],
  props: ["title"],
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>
