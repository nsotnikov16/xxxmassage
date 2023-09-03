
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