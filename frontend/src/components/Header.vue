
<script setup>
import LogoVue from "./svg/Logo.vue";
import HeaderNavigation from './HeaderNavigation.vue';
</script>

<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between"
      >
        <router-link :to="{name: 'home'}"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <LogoVue />
        </router-link>
        <HeaderNavigation/>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
header {
  background: #7952b3;
}
</style>
