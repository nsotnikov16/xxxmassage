import Modal from './Modal';
import { createSalonsArr } from '@/utils/functions';

class ModalMaster extends Modal {

    title = {
        create: 'Добавить мастера',
        edit: 'Редактировать',
        delete: 'Вы уверены что хотите удалить?'
    }

    actions = {
        create: 'createAdminMaster',
        edit: 'updateAdminMaster',
        delete: 'deleteAdminMaster',
    }

    setModalEdit(master) {
        this.title.edit = "Редактировать мастера " + master.name
        super.setModalEdit(master);
    }

    setModalDelete(master) {
        this.title.delete = `Вы уверены что хотите удалить мастера ${master.name}?`
        super.setModalDelete(master);
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

    setModalCreateFromMonitoring() {
        const callback = (result) => {
            const salons = [...this.store.state.app.salons];
            result.salons.forEach(salon => {
                const findSalon = salons.find(({id}) => id == salon.id);
                if (findSalon) findSalon.masters.push(result);
            })
            this.store.commit('setSalons', salons);
            this.store.commit('updateStateSocket');
        }

        super.setModalCreate(callback);
    }
}

export default ModalMaster;
