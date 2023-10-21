<script setup>
import Container from "./Container.vue";
import ButtonsCard from "./ButtonsCard.vue";
import ModalMaster from "@/utils/classes/modal/ModalMaster";
const modal = new ModalMaster();
</script>

<template>
    <Container
        btnText="Добавить мастера"
        :loading="loading"
        :error="error"
        :errorCondition="!masters.length"
        errorDefault="Мастера отсутствуют"
        @setModalCreate="() => modal.setModalCreate()"
    >
        <div className="p-3" v-for="master in masters" :key="master.id">
            <div
                class="d-flex flex-column flex-lg-row p-3 justify-content-between rounded border border-gray"
            >
                <div class="d-flex align-items-center flex-wrap mb-3 m-lg-0">
                    <h5 class="me-3 mb-0">{{ master.name }}</h5>
                    <p v-if="master.salons.length" class="mb-0 me-3">
                        {{ master.salons.map((s) => s.name).join(", ") }}
                    </p>
                    <small v-if="master.description" class="mb-0 me-3 lh-1"
                        >({{ master.description }})</small
                    >
                </div>
                <ButtonsCard
                    @setModalDelete="() => modal.setModalDelete(master)"
                    @setModalEdit="() => modal.setModalEdit(master)"
                />
            </div>
        </div>
    </Container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "AdminMasters",
    data() {
        return {
            loading: false,
            error: false,
        };
    },
    computed: mapState({
        masters: (s) => s.admin.masters,
        salons: (s) => s.admin.salons,
    }),
    methods: mapActions(["getAdminMasters", "getAdminSalons"]),
    async mounted() {
        this.loading = true;
        let result = await this.getAdminMasters();
        if (result?.error) {
            this.error = result.error;
        }
        this.loading = false;
    },
};
</script>

<style></style>
