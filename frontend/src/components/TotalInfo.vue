<template>
  <ul class="mt-4 mb-5">
    <li>Всего комнат: {{ roomsAll }}</li>
    <li>Комнат занято: {{ roomsBusy }} ({{ percent }}%)</li>
    <li>Мастеров занято: {{ mastersBusy }}</li>
  </ul>
</template>

<script>
export default {
  name: "TotalInfo",
  props: ["roomsAll", "roomsBusy", "mastersBusy"],
  computed: {
    percent() {
      let percent = (this.roomsBusy / this.roomsAll) * 100;
      if (!Number.isInteger(percent)) percent = percent.toFixed(2);
      return percent;
    },
  },
};
</script>

<style></style>
