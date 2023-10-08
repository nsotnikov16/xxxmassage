import Modal from './Modal';
import { createSalonsArr } from '@/utils/functions';

class ModalRoom extends Modal {

    title = {
        create: 'Добавить комнату',
        edit: 'Редактировать комнату',
        delete: 'Вы уверены что хотите удалить комнату?'
    }

    actions = {
        create: 'createAdminRoom',
        edit: 'updateAdminRoom',
        delete: 'deleteAdminRoom',
    }

    setModalEdit(room) {
        this.title.edit = "Редактировать комнату " + room.name
        super.setModalEdit(room);
    }

    setModalDelete(room) {
        this.title.delete = `Вы уверены что хотите удалить комнату ${room.name}?`
        super.setModalDelete(room);
    }

    getFields(room) {
        return [
            {
                sort: 1,
                type: "text",
                name: "name",
                label: "Название",
                value: room ? room.name : "",
                placeholder: "Введите название",
                required: true,
            },
            {
                sort: 2,
                type: "select",
                name: "salon",
                placeholder: "Выберите из списка",
                label: "Салон",
                value:
                    room && room.salon
                        ? { name: room.salon.name, value: room.salon.id }
                        : {},
                options: createSalonsArr(this.store.state.admin.salons),
                required: true,
            },
        ];
    }
}

export default ModalRoom;
