<script setup>
import Room from "./Room.vue";
</script>

<template>
  <div class="salon">
    <h2 class="mb-3">Салон "{{ salon.name }}"</h2>
    <Room
      v-for="room in salon.rooms"
      :key="room.id"
      :room="room"
      :salonId="salon.id"
      :programms="salon.programms"
      :masters="salon.masters"
    />
  </div>
</template>

<script>
export default {
  name: "Salon",
  props: ["salon"],
};
</script>

<style></style>
