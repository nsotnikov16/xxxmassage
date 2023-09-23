<template>
    <ul class="nav nav-pills justify-content-center">
        <li class="nav-item" v-if="isAuthorized">
            <router-link
                :to="{ name: 'home' }"
                class="nav-link"
                active-class="active"
                >Салоны</router-link
            >
        </li>
        <li v-if="isAuthorized">
            <router-link
                :to="{ name: 'admin' }"
                class="nav-link"
                active-class="active"
                >Администратор</router-link
            >
        </li>
        <li v-if="!isAuthorized">
            <router-link
                :to="{ name: 'auth' }"
                class="nav-link"
                active-class="active"
                >Авторизация</router-link
            >
        </li>
        <li v-else>
            <button @click="logout" class="nav-link">Выйти</button>
        </li>
        <!-- <li>
      <router-link to="/support" class="nav-link" active-class="active"
        >Техподдержка</router-link
      >
    </li> -->
    </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "HeaderNavigation",
    computed: mapGetters(["isAuthorized"]),
    methods: mapActions(['logout'])
};
</script>

<style lang="scss" scoped>
.nav-link {
    color: white;

    &.active {
        background-color: white;
        color: #7952b3;
    }
}
</style>
