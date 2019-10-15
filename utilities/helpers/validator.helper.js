import Joi from 'joi';
import Api from '../../lib/api';
function validate(req, res, body, schemas, next) {
    const { error } = Joi.validate(body, schemas, { abortEarly: false });
    const valid = error == null;
    if (valid) {
        next();
    } else {
        const { details } = error;
        const message = details.map(i => i.message);
        console.log(message);
        Api.badRequest(req, res, message)
    }
}
const ValidatorHelper = {

    params: (schemas) => {
        return (req, res, next) => {
            return validate(req, res, req.params, schemas, next);
        }
    },
    headers: (schemas) => {
        return (req, res, next) => {
            return validate(req, res, req.headers, schemas, next);
        }
    },
    body: (schemas) => {
        return (req, res, next) => {
            return validate(req, res, req.body, schemas, next);
        }
    },
    query: (schemas) => {
        return (req, res, next) => {
            return validate(req, res, req.query, schemas, next);
        }
    },
    validate: (data, schema) => {
        const { error, value } = Joi.validate(data, schema, { abortEarly: false, stripUnknown: true });
        if (!error) {
            return value;
        } else {
            const { details } = error;
            const message = details.map(i => i.message);
            throw message;
        }
    }
}
export default ValidatorHelper;