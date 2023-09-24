<script setup>
import Container from "./Container.vue";
import ButtonsCard from "./ButtonsCard.vue";
</script>

<template>
    <Container
        btnText="Добавить мастера"
        :loading="loading"
        :error="error"
        :errorCondition="!masters.length"
        errorDefault="Мастерицы отсутствуют"
        @setModalCreate="setModalCreate"
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
                    @setModalDelete="setModalDelete(master)"
                    @setModalEdit="setModalEdit(master)"
                />
            </div>
        </div>
    </Container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { createSalonsArr } from "@/utils/functions";
export default {
    name: "AdminMasters",
    data() {
        return {
            loading: false,
            error: false,
        };
    },
    computed: {
        ...mapState({
            masters: (s) => s.admin.masters,
            salons: (s) => s.admin.salons,
        }),
        ...mapGetters(["getDataModal"]),
    },
    methods: {
        ...mapActions([
            "setModalSettings",
            "getAdminMasters",
            "createAdminMaster",
            "updateAdminMaster",
            "deleteAdminMaster",
            "getAdminSalons",
        ]),

        setModalEdit(master) {
            const params = {
                show: true,
                title: "Редактировать мастера " + master.name,
                fields: this.getFields(master),
                btnSave: { title: "Сохранить" },
                btnClose: { title: "Закрыть" },
                submit: async () => {
                    const data = this.getDataModal;
                    const response = await this.updateAdminMaster({
                        id: master.id,
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
                title: "Добавить мастера",
                fields: this.getFields(),
                btnSave: { title: "Добавить" },
                btnClose: { title: "Закрыть" },
                submit: async () => {
                    const data = this.getDataModal;
                    const response = await this.createAdminMaster(data);
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
                title: `Вы уверены что хотите удалить мастера ${name}?`,
                fields: [],
                btnSave: { title: "Да" },
                btnClose: { title: "Нет" },
                submit: async () => {
                    const response = await this.deleteAdminMaster(id);
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
        getFields(master) {
            return [
                {
                    sort: 1,
                    type: "text",
                    name: "name",
                    label: "Имя",
                    value: master ? master.name : "",
                    placeholder: "Введите имя",
                    required: true,
                },
                {
                    sort: 2,
                    type: "textarea",
                    name: "description",
                    label: "Описание",
                    value: master ? master.description : "",
                    placeholder: "Введите описание",
                },
                {
                    sort: 3,
                    type: "multiselect",
                    name: "salons",
                    label: "Привязка к салонам",
                    value:
                        master && master.salons
                            ? createSalonsArr(master.salons)
                            : [],
                    options: createSalonsArr(this.salons),
                    required: true,
                },
            ];
        },
    },
    async created() {
        if (!this.masters.length) {
            this.loading = true;
            let result = await this.getAdminMasters();
            if (result?.error) {
                this.error = result.error;
            }
            this.loading = false;
        }
    },
};
</script>

<style></style>
