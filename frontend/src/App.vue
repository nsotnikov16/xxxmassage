<template>
  <div class="page">
    <Header />
    <router-view />
    <Modal />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Modal from "@/components/modal/Modal.vue";
</script>

<script>
export default {
  data: () => {
    return {};
  },
};
</script>
