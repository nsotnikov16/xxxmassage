class MyError extends Error {
    constructor(message, code) {
        super();
        this.code = code
    }

    getDefaultError() {
        return 'Произошла какая-то ошибка!'
    }
}

export default MyError;