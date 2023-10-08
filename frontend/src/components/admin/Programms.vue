<script setup>
import Container from "./Container.vue";
import ButtonsCard from "./ButtonsCard.vue";
import ModalProgramm from "@/utils/modal/ModalProgramm";
const modal = new ModalProgramm();
</script>

<template>
    <Container
        btnText="Добавить программу"
        :loading="loading"
        :error="error"
        :errorCondition="!programms.length"
        errorDefault="Программы отсутствуют"
        @setModalCreate="() => modal.setModalCreate()"
    >
        <div className="p-3" v-for="programm in programms" :key="programm.id">
            <div
                className="d-flex flex-column flex-lg-row p-3 justify-content-between rounded border border-gray"
            >
                <div
                    className="d-flex align-items-center flex-wrap mb-3 m-lg-0"
                >
                    <h5 className="mb-0 me-3">
                        {{ programm.name }}
                        {{ programm.time ? `(${programm.time})` : "" }}
                    </h5>
                    <p v-if="programm.salons.length" class="mb-0 me-3">
                        {{ programm.salons.map((s) => s.name).join(", ") }}
                    </p>
                    <b class="text-danger me-3" v-if="programm.price >= 0"
                        >{{ programm.price }} руб.</b
                    >
                </div>
                <ButtonsCard
                    @setModalDelete="() => modal.setModalDelete(programm)"
                    @setModalEdit="() => modal.setModalEdit(programm)"
                />
            </div>
        </div>
    </Container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "AdminProgramms",
    data() {
        return {
            loading: false,
            error: false,
        };
    },
    computed: {
        ...mapState({
            programms: (s) => s.admin.programms,
            salons: (s) => s.admin.salons,
        }),
    },
    methods: {
        ...mapActions(["getAdminProgramms", "getAdminSalons"]),
    },
    async mounted() {
        if (!this.programms.length) {
            this.loading = true;
            let result = await this.getAdminProgramms();
            if (result?.error) {
                this.error = result.error;
            }
            this.loading = false;
        }
    },
};
</script>

<style></style>
