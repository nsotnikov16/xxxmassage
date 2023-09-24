<template>
    <div class="d-flex align-items-center">
        <button
            @click="$emit('setModalEdit')"
            title="Изменить"
            class="btn btn-success"
        >
            Изменить
        </button>
        <button
            @click="$emit('setModalDelete')"
            title="Удалить"
            class="btn btn-danger ms-1"
        >
            Удалить
        </button>
    </div>
</template>

<script>
export default {
    name: 'ButtonsCardAdmin',
    emits: ['setModalEdit', 'setModalDelete']
};
</script>

<style></style>
