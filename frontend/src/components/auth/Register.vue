<template>
    <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal">Регистрация</h1>

        <div class="form-floating mb-2">
            <input
                type="text"
                class="form-control"
                id="regName"
                placeholder="Иван"
                required
                v-model="name"
            />
            <label for="regName">Ваше имя</label>
        </div>
        <div class="form-floating mb-2">
            <input
                type="email"
                class="form-control"
                id="regEmail"
                placeholder="name@example.com"
                required
                v-model="email"
            />
            <label for="regEmail">Электронная почта</label>
        </div>
        <div class="form-floating mb-2">
            <input
                type="password"
                class="form-control"
                id="regPswd"
                placeholder=""
                required
                v-model="password"
            />
            <label for="regPswd">Пароль</label>
        </div>
        <div class="form-floating">
            <input
                type="password"
                class="form-control"
                id="regPswdConfirmation"
                placeholder=""
                required
                v-model="password_confirmation"
            />
            <label for="regPswd">Подтвердите пароль</label>
        </div>
        <p class="mt-2">
            Уже зарегистрированы?
            <router-link :to="{ name: 'auth-login' }"
                >Авторизоваться</router-link
            >
        </p>
        <button class="btn btn-primary w-100 py-2 mt-2" type="submit">
            {{ buttonText }}
        </button>
    </form>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
    name: "Register",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            disabled: false,
            buttonText: "Зарегистрироваться",
        };
    },
    methods: {
        ...mapMutations(["setModalSettings"]),
        ...mapActions(["register"]),
        async submit() {
            try {

                if (this.password.length < 8) {
                    throw new Error('Пароль должен содержать не менее 8 символов');
                }

                if (this.password != this.password_confirmation) {
                    throw new Error("Подтвержденный пароль не совпадает");
                }

                this.disabled = true;
                this.buttonText = "Загрузка...";
                const result = await this.register({
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    name: this.name,
                });
                if (!result || result.error)
                    throw new Error(result.error ?? "Ошибка регистрации");
            } catch (error) {
                this.setModalSettings({
                    show: true,
                    title: error.message,
                    btnSave: false,
                    btnClose: {
                        title: "Закрыть",
                    },
                    submit: () => {},
                });
            } finally {
                this.disabled = false;
                this.buttonText = "Войти";
            }
        },
    },
};
</script>

<style></style>
