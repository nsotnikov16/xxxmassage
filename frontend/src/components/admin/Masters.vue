<template>
  <div className="col-10">
    <div class="px-4 d-flex justify-content-end">
      <button class="btn btn-primary" @click="setModalCreate">
        Добавить мастера
      </button>
    </div>

    <div className="row px-4">
      <h4 v-if="loading">Загрзука...</h4>
      <h4 v-if="!masters.length && !loading" class="text-danger">
        {{ error ? error : "Мастерицы отсутствуют" }}
      </h4>
      <div className="p-3" v-for="master in masters" :key="master.id">
        <div
          className="d-flex p-3 justify-content-between rounded border border-gray"
        >
          <div className="d-flex align-items-center">
            <h5 className="m-0">{{ master.name }}</h5>
            <p v-if="master.salons.length" class="mb-0 ms-3">
              {{ master.salons.map((s) => s.name).join(", ") }}
            </p>
            <small v-if="master.description" class="mb-0 ms-3 lh-1">({{ master.description }})</small>
          </div>
          <div class="d-flex align-items-center">
            <button
              @click="setModalEdit(master)"
              title="Изменить"
              class="btn btn-success"
            >
              Изменить
            </button>
            <button
              @click="setModalDelete(master)"
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
import { mapActions, mapState, mapGetters } from "vuex";
import { createSalonsArr } from "@/utils/functions";
export default {
  name: "Adminmasters",
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
          value: master && master.salons ? createSalonsArr(master.salons) : [],
          options: createSalonsArr(this.salons),
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
      if (!this.salons.length) {
        result = await this.getAdminSalons();
        if (result?.error) {
          this.error = result.error;
        }
      }
      this.loading = false;
    }
  },
};
</script>

<style></style>
