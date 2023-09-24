<script setup>
import Container from "./Container.vue";
import ButtonsCard from "./ButtonsCard.vue";
</script>

<template>
    <Container
        btnText="Добавить комнату"
        :loading="loading"
        :error="error"
        :errorCondition="!rooms.length"
        errorDefault="Комнаты отсутствуют"
        @setModalCreate="setModalCreate"
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
                    @setModalDelete="setModalDelete(room)"
                    @setModalEdit="setModalEdit(room)"
                />
            </div>
        </div>
    </Container>
</template>

<script>
import { createSalonsArr } from "@/utils/functions";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
    name: "Adminrooms",
    data() {
        return {
            loading: false,
            error: false,
        };
    },
    computed: {
        ...mapState({
            rooms: (s) => s.admin.rooms,
            salons: (s) => s.admin.salons,
        }),
        ...mapGetters(["getDataModal"]),
    },
    methods: {
        ...mapActions([
            "setModalSettings",
            "getAdminRooms",
            "createAdminRoom",
            "updateAdminRoom",
            "deleteAdminRoom",
            "getAdminSalons",
        ]),

        setModalEdit(room) {
            const params = {
                show: true,
                title: "Редактировать комнату " + room.name,
                fields: this.getFields(room),
                btnSave: { title: "Сохранить" },
                btnClose: { title: "Закрыть" },
                submit: async () => {
                    const data = this.getDataModal;
                    const response = await this.updateAdminRoom({
                        id: room.id,
                        data,
                    });
                    if (response.error) {
                        this.setModalSettings({
                            title: response.error,
                        });
                    } else {
                        this.setModalSettings({
                            title: "Успешно обновлено!",
                        });
                    }
                    this.setModalSettings({ fields: [], btnSave: false });
                },
            };
            this.setModalSettings(params);
        },

        setModalCreate() {
            const params = {
                show: true,
                title: "Добавить комнату",
                fields: this.getFields(),
                btnSave: { title: "Добавить" },
                btnClose: { title: "Закрыть" },
                submit: async () => {
                    const data = this.getDataModal;
                    const response = await this.createAdminRoom(data);
                    if (response.error) {
                        this.setModalSettings({
                            title: response.error,
                        });
                    } else {
                        this.setModalSettings({
                            title: "Добавлено успешно!",
                        });
                    }
                    this.setModalSettings({ fields: [], btnSave: false });
                },
            };
            this.setModalSettings(params);
        },

        setModalDelete({ name, id }) {
            const params = {
                show: true,
                title: `Вы уверены что хотите удалить комнату ${name}?`,
                fields: [],
                btnSave: { title: "Да" },
                btnClose: { title: "Нет" },
                submit: async () => {
                    const response = await this.deleteAdminRoom(id);
                    if (response.error) {
                        this.setModalSettings({
                            title: response.error,
                        });
                    } else {
                        this.setModalSettings({
                            title: "Успешно удалено!",
                        });
                    }
                    this.setModalSettings({
                        fields: [],
                        btnSave: false,
                        btnClose: { title: "Закрыть" },
                    });
                },
            };
            this.setModalSettings(params);
        },
        getFields(room) {
            return [
                {
                    sort: 1,
                    type: "text",
                    name: "name",
                    label: "Название",
                    value: room ? room.name : "",
                    placeholder: "Введите название",
                    required: true,
                },
                {
                    sort: 2,
                    type: "select",
                    name: "salon",
                    placeholder: "Выберите из списка",
                    label: "Салон",
                    value:
                        room && room.salon
                            ? { name: room.salon.name, value: room.salon.id }
                            : {},
                    options: createSalonsArr(this.salons),
                    required: true,
                },
            ];
        },
    },
    async created() {
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
