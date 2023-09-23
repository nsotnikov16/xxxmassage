<template>
    <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal">Авторизация</h1>

        <div class="form-floating mb-2">
            <input
                type="email"
                class="form-control"
                id="loginEmail"
                placeholder="name@example.com"
                v-model="email"
                :disabled="disabled"
                required
            />
            <label for="loginEmail">Электронная почта</label>
        </div>
        <div class="form-floating mb-2">
            <input
                type="password"
                class="form-control"
                id="loginPswd"
                placeholder=""
                v-model="password"
                :disabled="disabled"
                required
            />
            <label for="loginPswd">Пароль</label>
        </div>
        <div>
            <router-link :to="{ name: 'auth-forgot' }"
                >Забыли пароль?</router-link
            >
        </div>

        <button
            class="btn btn-primary w-100 py-2 mt-2"
            type="submit"
            :disabled="disabled"
        >
            {{ buttonText }}
        </button>
        <router-link
            class="btn btn-secondary w-100 py-2 mt-4"
            :to="{ name: 'auth-register' }"
        >
            Зарегистрироваться
        </router-link>
    </form>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            disabled: false,
            buttonText: "Войти",
        };
    },
    methods: {
        ...mapMutations(["setModalSettings"]),
        ...mapActions(["login"]),
        async submit() {
            try {
                this.disabled = true;
                this.buttonText = 'Загрузка...'
                const result = await this.login({
                    email: this.email,
                    password: this.password,
                });
                if (!result || result.error)
                    throw new Error(result.error ?? "Ошибка авторизации");
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
                this.buttonText = 'Войти';
            }
        },
    },
};
</script>

<style></style>
