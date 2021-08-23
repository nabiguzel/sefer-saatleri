const CatchError = require('../utils/catchError');

const handleErrors = (err, req, res, next) => {
    console.log('====================================');
    console.log('err: ', err);
    console.log('====================================');

    if (err && err.error instanceof CatchError) {
        err = err.error;
    }


    let errors = [];
    if (err.error && err.error && err.error.name) {
        switch (err.error.name) {
            case "MissingRequires":
                err.message = err.message;
                err.error.fields.forEach(element => {
                    errors.push({
                        field: element,
                        message: `Missing required '${element.toLowerCase()}' field.`,
                    });
                });
                break;
            default:
                break;
        }
    }


    return res.status(err.code || 500).json({
        status: err.code || 500,
        message: ((err && err.message) || err || translate("Internal server error.")),
        errors
    });
}

module.exports = handleErrors;