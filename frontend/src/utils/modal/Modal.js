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

    setModalEdit(entity) {

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
        this.store.dispatch('setModalSettings', params);
    }

    setModalDelete(entity) {

    }

    async submitCreate() {
        const data = this.store.getters.getDataModal;
        const response = await this.store.dispatch(this.actions.create, data);
        if (response.error) {
            this.store.dispatch('setModalSettings', {
                title: response.error,
            });
        } else {
            this.store.dispatch('setModalSettings', {
                title: this.titleSuccess.create,
            });
        }
        this.store.dispatch('setModalSettings', { fields: [], btnSave: false });
    }

    submitEdit() {

    }

    submitDelete() {

    }

    getFields() {

    }


}
