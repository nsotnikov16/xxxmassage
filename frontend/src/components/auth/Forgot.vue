<template>
    <form>
        <h1 class="h3 mb-3 fw-normal">Восстановление пароля</h1>

        <div class="form-floating mb-2">
            <input
                type="email"
                class="form-control"
                id="forgotEmail"
                placeholder="name@example.com"
            />
            <label for="forgotInput">Электронная почта</label>
        </div>

        <button class="btn btn-primary w-100 py-2 mt-2" type="submit">
            Отправить
        </button>

        <router-link
            class="btn btn-secondary w-100 py-2 mt-4"
            :to="{ name: 'auth-login' }"
        >
            Авторизоваться
        </router-link>

        <router-link
            class="btn btn-secondary w-100 py-2 mt-2"
            :to="{ name: 'auth-register' }"
        >
            Зарегистрироваться
        </router-link>
    </form>
</template>

<script>
export default {};
</script>

<style></style>
