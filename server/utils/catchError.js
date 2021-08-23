class CatchError {
    constructor(code, message, error = null) {
        this.code = code;
        this.message = message;
        this.error = error;
    }

    static badRequest(msg, error = null) {
        return new CatchError(400, msg, error);
    }

    static missingRequires(params, msg = null) {
        var error = {
            name: "MissingRequires",
            fields: params.filter(p => typeof p==="string"),
        };
        console.log('====================================');
        console.log('params: ', params);
        console.log('error: ', error);
        console.log('====================================');
        return new CatchError(400, msg || "Missing some required fields.", error);
    }

    static authFailed(msg) {
        return new CatchError(401, msg);
    }

    static forbidden(msg) {
        return new CatchError(403, msg);
    }

    static notFound(msg) {
        return new CatchError(404, msg);
    }

    static internal(msg, error = null) {
        return new CatchError(500, msg, error);
    }

}

module.exports = CatchError;