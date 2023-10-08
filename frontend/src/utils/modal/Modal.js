import { useStore } from "vuex";

export default class Modal {

    title = {
        create: 'Добавить мастера',
        edit: 'Редактировать',
        delete: 'Вы уверены что хотите удалить?',
    }

    titleSuccess = {
        create: 'Добавлено успешно!',
        edit: 'Успешно обновлено!',
        delete: 'Успешно удалено!'
    }

    btnSave = {
        create: { title: 'Добавить' },
        edit: { title: 'Сохранить' },
        delete: { title: 'Да' }
    }

    btnClose = {
        create: { title: 'Закрыть' },
        edit: { title: 'Закрыть' },
        delete: { title: 'Нет' }
    }

    actions = {
        create: '',
        edit: '',
        delete: ''
    }

    store = useStore();

    constructor(settings) {
        this.setVarsFromParams(settings);
    }

    setModalCreate() {
        const params = {
            show: true,
            title: this.title.create,
            fields: this.getFields(),
            btnSave: this.btnSave.create,
            btnClose: this.btnClose.create,
            submit: this.submitCreate.bind(this),
        };
        this.setSettingsStore(params);
    }

    async submitCreate() {
        const data = this.store.getters.getDataModal;
        const response = await this.store.dispatch(this.actions.create, data);
        this.reset({ title: response.error ?? this.titleSuccess.create })
    }

    setModalEdit(entity) {
        const params = {
            show: true,
            title: this.title.edit,
            fields: this.getFields(entity),
            btnSave: this.btnSave.edit,
            btnClose: this.btnClose.edit,
            submit: this.submitEdit.bind(this),
        };
        this.setSettingsStore(params);
    }

    async submitEdit(entity) {
        const data = this.getDataModal;
        const response = await this.store.dispatch(this.actions.edit, {
            id: entity.id,
            data,
        });
        this.reset({ title: response.error ?? this.titleSuccess.edit })
    }

    setModalDelete(entity) {
        const params = {
            show: true,
            title: this.title.delete,
            fields: [],
            btnSave: this.btnSave.delete,
            btnClose: this.btnClose.delete,
            submit: this.submitDelete.bind(this, entity.id)
        };
        this.setSettingsStore(params);
    }

    async submitDelete(id) {
        const response = await this.store.dispatch(this.actions.delete, id);
        this.reset({ title: response.error ?? this.titleSuccess.delete })
    }

    getFields() {
        return [];
    }

    reset(settings = {}) {
        this.setSettingsStore({
            fields: [],
            btnSave: false,
            btnClose: { title: 'Закрыть' },
            title: '',
            submit: () => { },
            ...settings
        })
    }

    setVarsFromParams(settings) {
        if (typeof settings === 'object') {
            Object.entries(settings).forEach(([key, value]) => this[key] = value);
        }
    }

    setSettingsStore(settings) {
        this.store.dispatch('setModalSettings', settings);
    }
}
