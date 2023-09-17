<template>
    <form>
        <h1 class="h3 mb-3 fw-normal">Регистрация</h1>

        <div class="form-floating mb-2">
            <input
                type="text"
                class="form-control"
                id="regName"
                placeholder="Иван"
            />
            <label for="regName">Ваше имя</label>
        </div>
        <div class="form-floating mb-2">
            <input
                type="email"
                class="form-control"
                id="regEmail"
                placeholder="name@example.com"
            />
            <label for="regEmail">Электронная почта</label>
        </div>
        <div class="form-floating mb-2">
            <input
                type="password"
                class="form-control"
                id="regPswd"
                placeholder=""
            />
            <label for="regPswd">Пароль</label>
        </div>
        <div class="form-floating">
            <input
                type="password"
                class="form-control"
                id="regPswdConfirmation"
                placeholder=""
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
            Зарегистрироваться
        </button>
    </form>
</template>

<script>
export default {
    name: "Register",
};
</script>

<style></style>
