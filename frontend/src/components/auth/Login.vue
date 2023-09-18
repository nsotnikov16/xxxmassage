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
            Войти
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
import { mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        return { email: "", password: "", disabled: false };
    },
    methods: {
        ...mapActions(["login"]),
        async submit() {
            console.log(this.email, this.password);
            try {
                this.disabled = true;
                const result = await this.login({
                    email: this.email,
                    password: this.password,
                });

            } catch (error) {
            } finally {
                this.disabled = false;
            }
        },
    },
};
</script>

<style></style>
