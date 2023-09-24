<script setup>
import Container from "./Container.vue";
import ButtonsCard from "./ButtonsCard.vue";
</script>

<template>
    <Container
        btnText="Добавить программу"
        :loading="loading"
        :error="error"
        :errorCondition="!programms.length"
        errorDefault="Программы отсутствуют"
        @setModalCreate="setModalCreate"
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
                    @setModalDelete="setModalDelete(programm)"
                    @setModalEdit="setModalEdit(programm)"
                />
            </div>
        </div>
    </Container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { createSalonsArr } from "@/utils/functions";
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
        ...mapGetters(["getDataModal"]),
    },
    methods: {
        ...mapActions([
            "setModalSettings",
            "getAdminProgramms",
            "createAdminProgramm",
            "updateAdminProgramm",
            "deleteAdminProgramm",
            "getAdminSalons",
        ]),

        setModalEdit(programm) {
            const params = {
                show: true,
                title: "Редактировать программу " + programm.name,
                fields: this.getFields(programm),
                btnSave: { title: "Сохранить" },
                btnClose: { title: "Закрыть" },
                submit: async () => {
                    const data = this.getDataModal;
                    const response = await this.updateAdminProgramm({
                        id: programm.id,
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
                title: "Добавить программу",
                fields: this.getFields(),
                btnSave: { title: "Добавить" },
                btnClose: { title: "Закрыть" },
                submit: async () => {
                    const data = this.getDataModal;
                    const response = await this.createAdminProgramm(data);
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
                title: `Вы уверены что хотите удалить программу ${name}?`,
                fields: [],
                btnSave: { title: "Да" },
                btnClose: { title: "Нет" },
                submit: async () => {
                    const response = await this.deleteAdminProgramm(id);
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
        getFields(programm) {
            return [
                {
                    sort: 1,
                    type: "text",
                    name: "name",
                    label: "Название программы",
                    value: programm ? programm.name : "",
                    placeholder: "Введите название",
                    required: true,
                },
                {
                    sort: 2,
                    type: "number",
                    name: "price",
                    label: "Цена",
                    value: programm ? programm.price : "",
                    placeholder: "Введите цену",
                    required: true,
                },
                {
                    sort: 3,
                    type: "number",
                    name: "time",
                    label: "Время (мин)",
                    value: programm ? programm.time : "",
                    placeholder: "Введите время (мин)",
                    required: true,
                },
                {
                    sort: 4,
                    type: "multiselect",
                    name: "salons",
                    placeholder: "Выберите из списка",
                    label: "Привязка к салонам",
                    value:
                        programm && programm.salons
                            ? createSalonsArr(programm.salons)
                            : [],
                    options: createSalonsArr(this.salons),
                    required: true,
                },
            ];
        },
    },
    async created() {
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
