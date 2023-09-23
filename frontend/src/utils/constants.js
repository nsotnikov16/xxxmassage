export const apiAdminUrl = process.env.NODE_ENV == 'production' ? '/api/admin' : 'http://localhost:8000/api/admin';
export const apiUrl = process.env.NODE_ENV == 'production' ? '/api' : 'http://localhost:8000/api';
export const url = process.env.NODE_ENV == 'production' ? '' : 'http://localhost:8000'
export const defaultErrorApi = 'Произошла какая-то ошибка!';

export const defaultModalParams = {
    show: false,
    title: 'Редактировать',
    fields: [
        // Input Text
        // {
        //     sort: 1,
        //     type: 'text',
        //     name: 'name',
        //     label: 'Название салона',
        //     value: 'Значение',
        //     placeholder: 'Введите значение',
        // },

        // TextArea
        // {
        //     sort: 2,
        //     type: 'textarea',
        //     name: 'description',
        //     label: 'Описание салона',
        //     value: 'г. Сургут',
        //     placeholder: 'Введите описание',
        // },

        // Select
        // {
        //     sort: 3,
        //     type: 'select',
        //     label: 'Привязка к салону',
        //     value: { name: 'Лорд', value: 35 },
        //     options: [
        //         { name: 'Лорд', value: 35 },
        //         { name: 'Joy', value: 36 },
        //     ],
        //     placeholder: 'Привязка к салону',
        // },

        // Select
        // {
        //     sort: 4,
        //     type: 'multiselect',
        //     name: 'salons',
        //     label: 'Привязка к салонам',
        //     value: [{ name: 'Лорд', value: 35 }],
        //     options: [
        //         { name: 'Лорд', value: 35 },
        //         { name: 'Joy', value: 36 },
        //     ],
        //     placeholder: 'Привязка к салонам',
        // },

    ],
    btnSave: {
        title: 'Сохранить'
    },
    btnClose: {
        title: 'Закрыть'
    },
    submit: () => {

    }
};
