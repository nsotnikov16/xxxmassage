<script setup>
import Container from "./Container.vue";
import ButtonsCard from "./ButtonsCard.vue";
import ModalRoom from "@/utils/classes/modal/ModalRoom";
const modal = new ModalRoom();
</script>

<template>
    <Container
        btnText="Добавить комнату"
        :loading="loading"
        :error="error"
        :errorCondition="!rooms.length"
        errorDefault="Комнаты отсутствуют"
        @setModalCreate="() => modal.setModalCreate()"
    >
        <div className="p-3" v-for="room in rooms" :key="room.id">
            <div
                className="d-flex flex-column flex-lg-row p-3 justify-content-between rounded border border-gray"
            >
                <div
                    className="d-flex align-items-center flex-wrap mb-3 m-lg-0"
                >
                    <h5 className="mb-0 me-3">{{ room.name }}</h5>
                    <p v-if="room.salon" class="mb-0 me-3">
                        {{ room.salon.name }}
                    </p>
                </div>
                <ButtonsCard
                    @setModalDelete="() => modal.setModalDelete(room)"
                    @setModalEdit="() => modal.setModalEdit(room)"
                />
            </div>
        </div>
    </Container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Adminrooms",
    data() {
        return {
            loading: false,
            error: false,
        };
    },
    computed: mapState({
        rooms: (s) => s.admin.rooms,
        salons: (s) => s.admin.salons,
    }),
    methods: mapActions(["getAdminRooms", "getAdminSalons"]),
    async mounted() {
        if (!this.rooms.length) {
            this.loading = true;
            let result = await this.getAdminRooms();
            if (result?.error) {
                this.error = result.error;
            }
            this.loading = false;
        }
    },
};
</script>

<style></style>
