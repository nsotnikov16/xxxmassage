import Modal from './Modal';
import { createSalonsArr } from '../functions';

class ModalMaster extends Modal {

    title = {
        create: 'Добавить мастера',
        edit: 'Редактировать',
        delete: 'Вы уверены что хотите удалить?'
    }

    actions = {
        create: 'createAdminMaster'
    }

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
                options: createSalonsArr(this.store.state.admin.salons),
                required: true,
            },
        ];
    }
}

export default ModalMaster;
