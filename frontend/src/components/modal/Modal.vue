<template>
    <div>
        <div
            :class="['modal fade', modal.show ? 'show' : '']"
            id="modal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            v-if="modal.show"
        >
            <form class="modal-dialog" @submit.prevent="submit">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            {{ modal.title }}
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            @click="close"
                        ></button>
                    </div>
                    <ModalBody
                        v-if="modal.fields.length"
                        :fields_props="modal.fields"
                        :loading="loading"
                        :errors="errors"
                    />
                    <div
                        v-if="modal.btnClose || modal.btnSave"
                        class="modal-footer"
                    >
                        <ButtonClose
                            v-if="modal.btnClose"
                            :title="modal.btnClose.title"
                            @click="close"
                        />
                        <ButtonSave
                            v-if="modal.btnSave"
                            :title="modal.btnSave.title"
                            :loading="loading"
                        />
                    </div>
                </div>
            </form>
        </div>
        <div :class="`fade modal-backdrop ${modal.show ? 'show' : ''}`"></div>
    </div>
</template>

<script setup>
import ModalBody from "./ModalBody.vue";
import ButtonSave from "./buttons/ButtonSave.vue";
import ButtonClose from "./buttons/ButtonClose.vue";
import {getErrorsValidateForm} from '@/utils/functions';
</script>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "Modal",
    data() {
        return {
            loading: false,
            errors: ''
        };
    },
    computed: {
        ...mapState({ modal: (s) => s.app.modal }),
    },
    methods: {
        ...mapActions(["setModalSettings"]),
        close() {
            this.setModalSettings({ show: false });
            this.errors = [];
        },
        async submit() {
            this.loading = true;
            if (this.validiteForm()) {
                await this.modal.submit();
            }
            this.loading = false;
        },
        validiteForm() {
            this.errors = getErrorsValidateForm(this.modal.fields);
            if (this.errors.length) return false;
            return true;
        }
    },
    mounted() {
        const onClickOutside = (e) => {
            this.modal.show && e.target.className == "modal fade show"
                ? this.close()
                : "";
        };
        document.addEventListener("click", onClickOutside);
    },
};
</script>

<style lang="scss">
.modal {
    &.show {
        opacity: 1;
        display: block;
    }
}

.modal-backdrop {
    z-index: -100;
    visibility: hidden;
    transition: opacity 0.15s linear;
    &.show {
        z-index: 1050;
        visibility: visible;
    }
}
</style>
