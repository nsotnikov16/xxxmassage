import Modal from './Modal';

class ModalSalon extends Modal {

    title = {
        create: 'Добавить салон',
        edit: 'Редактировать салон',
        delete: 'Вы уверены что хотите удалить салон?'
    }

    actions = {
        create: 'createAdminSalon',
        edit: 'updateAdminSalon',
        delete: 'deleteAdminSalon',
    }

    setModalEdit(room) {
        this.title.edit = "Редактировать салон " + room.name
        super.setModalEdit(room);
    }

    setModalDelete(room) {
        this.title.delete = `Вы уверены что хотите удалить салон ${room.name}?`
        super.setModalDelete(room);
    }

    getFields(salon) {
        return [
            {
                sort: 1,
                type: "text",
                name: "name",
                label: "Название салона",
                value: salon ? salon.name : "",
                placeholder: "Введите название",
                required: true,
            },
            {
                sort: 2,
                type: "textarea",
                name: "description",
                label: "Описание салона",
                value: salon ? salon.description : "",
                placeholder: "Введите описание",
            },
        ];
    }
}

export default ModalSalon;
