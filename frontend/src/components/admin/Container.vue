<script setup>
import Loader from "../Loader.vue";
</script>

<template>
    <div className="col-lg-10">
        <div class="px-4 d-flex justify-content-end m-lg-0 mt-3">
            <button class="btn btn-primary" @click="$emit('setModalCreate')">
                {{ btnText }}
            </button>
        </div>
        <div className="row px-lg-4">
            <Loader v-if="loading || loadingSalons" />
            <h4 v-if="errorCondition && !loading && !loadingSalons" class="text-danger">
                {{ error ? error : errorDefault }}
            </h4>
            <slot v-if="salons.length"></slot>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "ContainerAdmin",
    props: ["btnText", "loading", "errorCondition", "error", "errorDefault"],
    emits: ["setModalCreate"],
    data() {
        return {
            loadingSalons: false,
            errorSalons: false,
        };
    },
    methods: {},
    computed: mapState({ salons: (s) => s.admin.salons }),
    methods: mapActions(["getAdminSalons"]),
    components: { Loader },
    async created() {
        if (!this.salons.length) {
            this.loadingSalons = true;
            const result = await this.getAdminSalons();
            if (result?.error) {
                this.errorSalons = result.error;
            }
            this.loadingSalons = false;
        }
    },
};
</script>

<style></style>
