<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Salons from "@/components/admin/Salons.vue";
import Programms from "@/components/admin/Programms.vue";
import Masters from "@/components/admin/Masters.vue";
import Rooms from "@/components/admin/Rooms.vue";
</script>
<template>
  <div class="container">
    <div className="row pt-2">
      <Sidebar />
      <Salons v-if="$route.name == 'admin-salons'" />
      <Programms v-if="$route.name == 'admin-programms'" />
      <Masters v-if="$route.name == 'admin-masters'" />
      <Rooms v-if="$route.name == 'admin-rooms'" />
    </div>
  </div>
</template>