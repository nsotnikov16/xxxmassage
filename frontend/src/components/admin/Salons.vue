<script setup>
import Container from "./Container.vue";
import ButtonsCard from "./ButtonsCard.vue";
import ModalSalon from "@/utils/classes/modal/ModalSalon";
const modal = new ModalSalon();
</script>

<template>
    <Container
        btnText="Добавить салон"
        :errorCondition="!salons.length"
        errorDefault="Салоны отсутствуют"
        @setModalCreate="() => modal.setModalCreate()"
    >
        <div className="p-3" v-for="salon in salons" :key="salon.id">
            <div
                className="d-flex flex-column flex-lg-row p-3 justify-content-between rounded border border-gray"
            >
                <div
                    className="d-flex align-items-center flex-wrap mb-3 m-lg-0"
                >
                    <h5 className="mb-0 me-3">{{ salon.name }}</h5>
                    <p v-if="salon.description" className="mb-0">
                        {{ salon.description }}
                    </p>
                </div>
                <ButtonsCard
                    @setModalDelete="() => modal.setModalDelete(salon)"
                    @setModalEdit="() => modal.setModalEdit(salon)"
                />
            </div>
        </div>
    </Container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "AdminSalons",
    computed: mapState({ salons: (s) => s.admin.salons }),
    methods: mapActions(["getAdminSalons"]),
};
</script>

<style></style>
