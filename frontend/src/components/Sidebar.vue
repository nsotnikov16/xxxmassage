<template>
    <div
        class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary col-lg-2 align-self-baseline"
    >
        <ul class="nav nav-pills flex-column mb-0">
            <li class="nav-item" v-for="(link, index) in links" :key="index">
                <router-link
                    :to="{ name: link.name }"
                    class="nav-link link-body-emphasis"
                    active-class="active"
                    :exact="link.exact"
                    >{{ link.text }}</router-link
                >
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            links: [
                { name: "admin-salons", text: "Салоны", exact: true },
                { name: "admin-rooms", text: "Комнаты" },
                { name: "admin-masters", text: "Мастера" },
                { name: "admin-programms", text: "Программы" },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.nav-link {
    color: black;
    &.active {
        background-color: #7952b3;
        &.link-body-emphasis {
            color: white !important;
        }
    }
}
</style>
