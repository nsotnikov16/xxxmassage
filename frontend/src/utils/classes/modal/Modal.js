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

    /**
     * Метод вызова модального окна для создания новой сущности
     * @param {function} callback - функция при успешном запросе
     */
    setModalCreate(callback) {
        const params = {
            show: true,
            title: this.title.create,
            fields: this.getFields(),
            btnSave: this.btnSave.create,
            btnClose: this.btnClose.create,
            submit: this.submitCreate.bind(this, callback),
        };
        this.setSettingsStore(params);
    }

    async submitCreate(callback) {
        const data = this.getDataModal();
        const response = await this.store.dispatch(this.actions.create, data);
        this.reset({ title: response.error ?? this.titleSuccess.create })
        if (typeof callback === 'function' && !response.error) callback(response);
    }

    /**
     * Метод вызова модального окна для редактирования сущности
     * @param {function} callback - функция при успешном запросе
     */
    setModalEdit(entity) {
        const params = {
            show: true,
            title: this.title.edit,
            fields: this.getFields(entity),
            btnSave: this.btnSave.edit,
            btnClose: this.btnClose.edit,
            submit: this.submitEdit.bind(this, entity, callback),
        };
        this.setSettingsStore(params);
    }

    async submitEdit(entity, callback) {
        const data = this.getDataModal();
        const response = await this.store.dispatch(this.actions.edit, {
            id: entity.id,
            data,
        });
        this.reset({ title: response.error ?? this.titleSuccess.edit })
        if (typeof callback === 'function' && !response.error) callback();
    }

    /**
     * Метод вызова модального окна для удаления сущности
     * @param {function} callback - функция при успешном запросе
     */
    setModalDelete(entity, callback) {
        const params = {
            show: true,
            title: this.title.delete,
            fields: [],
            btnSave: this.btnSave.delete,
            btnClose: this.btnClose.delete,
            submit: this.submitDelete.bind(this, entity.id, callback)
        };
        this.setSettingsStore(params);
    }

    async submitDelete(id, callback) {
        const response = await this.store.dispatch(this.actions.delete, id);
        this.reset({ title: response.error ?? this.titleSuccess.delete })
        if (typeof callback === 'function' && !response.error) callback();
    }

    getFields() {
        return [];
    }

    /**
     * Метод сброса настроек модального окна
     * @param {object} settings
     */
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

    /**
     * Обновление настроек модального окна
     * @param {object} settings
     */
    setSettingsStore(settings) {
        this.store.dispatch('setModalSettings', settings);
    }

    /**
     * Метод возврата информации о заполненных полях в модальном окне
     * @returns {object}
     */
    getDataModal() {
        return this.store.getters.getDataModal;
    }
}
