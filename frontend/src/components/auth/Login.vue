<template>
    <form>
        <h1 class="h3 mb-3 fw-normal">Авторизация</h1>

        <div class="form-floating mb-2">
            <input
                type="email"
                class="form-control"
                id="loginEmail"
                placeholder="name@example.com"
            />
            <label for="loginEmail">Электронная почта</label>
        </div>
        <div class="form-floating mb-2">
            <input
                type="password"
                class="form-control"
                id="loginPswd"
                placeholder=""
            />
            <label for="loginPswd">Пароль</label>
        </div>
        <div>
            <router-link :to="{ name: 'auth-forgot' }"
                >Забыли пароль?</router-link
            >
        </div>

        <button class="btn btn-primary w-100 py-2 mt-2" type="submit">
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
export default {
    name: "Login",
};
</script>

<style></style>
