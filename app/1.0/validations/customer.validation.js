import Joi from 'joi'
import Api from '../../../lib/api'
import CustomerSchema from './../models/customers.model'

class CustomerValidation {
    static emailVerify() {
        return (req, res, next) => {
            const { error } = Joi.validate(req.params, CustomerSchema.verifyEmail, { abortEarly: false });
            const valid = error == null;
            if (valid) {
                next();
            } else {
                const { details } = error;

                const message = details.map(i => i.message);
                console.log(message)
                Api.badRequest(req, res, message)
            }
        }
    }

    static emailVerificationResponse(data, schema) {
        const { error, value } = Joi.validate(data, schema, { abortEarly: false });
        if (!error) {
            return value;
        } else {
            const { details } = error;
            const message = details.map(i => i.message);
            throw message;
        }

    }
    static createCustomerValidator() {
        return (req, res, next) => {
            const { error } = Joi.validate(req.body, CustomerSchema.createCustomerSchema, { abortEarly: false });
            const valid = error == null;
            if (valid) {
                next();
            } else {
                const { details } = error;

                const message = details.map(i => i.message);
                console.log(message)
                Api.badRequest(req, res, message)
            }
        }
    }
}

export default CustomerValidation