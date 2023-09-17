<script setup>
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import Forgot from "../components/auth/Forgot.vue";
</script>

<template>
    <div class="d-flex align-items-center py-4">
        <main class="form-signin w-100 m-auto">
            <Login v-if="$route.name == 'auth-login'" />
            <Register v-if="$route.name == 'auth-register'" />
            <Forgot v-if="$route.name == 'auth-forgot'" />
        </main>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.name);
    },
};
</script>
