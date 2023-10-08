import Modal from './Modal';
import { createSalonsArr } from '../functions';

class ModalProgramm extends Modal {

    title = {
        create: 'Добавить программу',
        edit: 'Редактировать программу ',
        delete: 'Вы уверены что хотите удалить программу?'
    }

    actions = {
        create: 'createAdminProgramm',
        edit: 'updateAdminProgramm',
        delete: 'deleteAdminProgramm',
    }

    setModalEdit(programm) {
        this.title.edit = "Редактировать программу " + programm.name
        super.setModalEdit(programm);
    }

    setModalDelete(programm) {
        this.title.delete = `Вы уверены что хотите удалить программу ${programm.name}?`
        super.setModalDelete(programm);
    }

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
                options: createSalonsArr(this.store.state.admin.salons),
                required: true,
            },
        ];
    }
}

export default ModalProgramm;
