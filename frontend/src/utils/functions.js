
export const handleError = (error) => {
    try {
        return { error: error.response.data.message };
    } catch (error) {
        return { error: error.message }
    }
}

export const createDataModal = (fields) => {
    try {
        const data = {};
        fields.forEach((field) => {
            if (typeof field.value == 'undefined') return;
            switch (field.type) {
                case "select":
                    data[field.name] = field.value.value;
                    break;
                case "multiselect":
                    data[field.name] = field.value.map((item) => item.value);
                    break;
                default:
                    data[field.name] = field.value;
                    break;
            }
        });
        return data;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export const createSalonsArr = (salons) => {
    if (!salons || !salons.length) return [];
    return salons.map((s) => ({ name: s.name, value: s.id }));
}

export const id = () => {
    return new Date().getTime() + Math.ceil(Math.random() * 1000000).toString()
}

export const getFormatTime = (diffMs) => {
    const diffHours = Math.floor(diffMs / 3600000);
    const diffMinutes = Math.floor((diffMs % 3600000) / 60000);
    const diffSeconds = Math.floor((diffMs % 60000) / 1000);
    let formattedDiff = diffHours
        ? diffHours.toString().padStart(2, "0") + ":"
        : "";

    formattedDiff += `${diffMinutes
        .toString()
        .padStart(2, "0")}:${diffSeconds.toString().padStart(2, "0")}`;
    return formattedDiff;
}

export const getErrorsValidateForm = (fields) => {
    const errors = [];
    if (fields && fields.length) {
        fields.forEach(field => {
            if (field.required && !(field.value.value || field.value.length || (field.value > 0))) {
                errors.push(`Не заполнено обязательное поле "${field.label}"`);
            }
            if (typeof field.value == 'string') {
                if (field.value.length < field.minlength) {
                    errors.push(`
                        Минимальное количество символов в поле "${field.label}" должно составлять - ${field.minlength}
                    `);
                }
                if (field.value.length > field.minlength) {
                    errors.push(`
                        Максимальное количество символов в поле "${field.label}" должно составлять - ${field.minlength}
                    `);
                }
            }
        })
    }
    return errors;
}
