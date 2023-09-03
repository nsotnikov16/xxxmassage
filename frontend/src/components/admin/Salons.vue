<template>
  <div className="col-10">
    <div class="px-4 d-flex justify-content-end">
      <button class="btn btn-primary" @click="setModalCreate">
        Добавить салон
      </button>
    </div>

    <div className="row px-4">
      <h4 v-if="loading">Загрзука...</h4>
      <h4 v-if="!salons.length && !loading" class="text-danger">
        {{ error ? error : "Салоны отсутствуют" }}
      </h4>
      <div className="p-3" v-for="salon in salons" :key="salon.id">
        <div
          className="d-flex p-3 justify-content-between rounded border border-gray"
        >
          <div className="d-flex align-items-center">
            <h5 className="m-0">{{ salon.name }}</h5>
            <p v-if="salon.description" className="mb-0 ms-3">
              {{ salon.description }}
            </p>
          </div>
          <div class="d-flex align-items-center">
            <button
              @click="setModalEdit(salon)"
              title="Изменить"
              class="btn btn-success"
            >
              Изменить
            </button>
            <button
              @click="setModalDelete(salon)"
              title="Удалить"
              class="btn btn-danger ms-1"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "AdminSalons",
  data() {
    return {
      loading: false,
      error: false,
    };
  },
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
          const response = await this.updateAdminSalon({ id: salon.id, data });
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
            value: salon ? salon.name : '',
            placeholder: "Введите название",
          },
          {
            sort: 2,
            type: "textarea",
            name: "description",
            label: "Описание салона",
            value: salon ? salon.description : '',
            placeholder: "Введите описание",
          },
        ]
    }
  },
  async created() {
    if (!this.salons.length) {
      this.loading = true;
      const result = await this.getAdminSalons();
      if (result?.error) {
        this.error = result.error;
      }
      this.loading = false;
    }
  },
};
</script>

<style></style>
