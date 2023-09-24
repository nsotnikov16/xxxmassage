<script setup>
import Container from "./Container.vue";
import ButtonsCard from "./ButtonsCard.vue";
</script>

<template>
    <Container
        btnText="Добавить салон"
        :errorCondition="!salons.length"
        errorDefault="Салоны отсутствуют"
        @setModalCreate="setModalCreate"
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
                    @setModalDelete="setModalDelete(salon)"
                    @setModalEdit="setModalEdit(salon)"
                />
            </div>
        </div>
    </Container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
    name: "AdminSalons",
    computed: {
        ...mapState({ salons: (s) => s.admin.salons }),
        ...mapGetters(["getDataModal"]),
    },
    methods: {
        ...mapActions([
            "setModalSettings",
            "getAdminSalons",
            "deleteAdminSalon",
            "updateAdminSalon",
            "createAdminSalon",
        ]),
        setModalEdit(salon) {
            const params = {
                show: true,
                title: "Редактировать салон " + salon.name,
                fields: this.getFields(salon),
                btnSave: { title: "Сохранить" },
                btnClose: { title: "Закрыть" },
                submit: async () => {
                    const data = this.getDataModal;
                    const response = await this.updateAdminSalon({
                        id: salon.id,
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
                title: "Добавить салон",
                fields: this.getFields(),
                btnSave: { title: "Добавить" },
                btnClose: { title: "Закрыть" },
                submit: async () => {
                    const data = this.getDataModal;
                    const response = await this.createAdminSalon(data);
                    if (response.error) {
                        this.setModalSettings({
                            title: response.error,
                        });
                    } else {
                        this.setModalSettings({
                            title: "Салон добавлен успешно!",
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
                title: `Вы уверены что хотите удалить салон ${name}?`,
                fields: [],
                btnSave: { title: "Да" },
                btnClose: { title: "Нет" },
                submit: async () => {
                    const response = await this.deleteAdminSalon(id);
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
        getFields(salon) {
            return [
                {
                    sort: 1,
                    type: "text",
                    name: "name",
                    label: "Название салона",
                    value: salon ? salon.name : "",
                    placeholder: "Введите название",
                    required: true,
                },
                {
                    sort: 2,
                    type: "textarea",
                    name: "description",
                    label: "Описание салона",
                    value: salon ? salon.description : "",
                    placeholder: "Введите описание",
                },
            ];
        },
    },
};
</script>

<style></style>
