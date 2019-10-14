import Joi from 'joi'
import Api from '../../../lib/api'
const schemas = { 
    emailID : Joi.string().email().required()
};
CustomerValidation = {
    emailVerify = () => {
        return (req, res, next) => {
            const { error } = Joi.validate(req.headers, schemas, { abortEarly: false });
            const valid = error == null;
            if (valid) {
                next();
            } else {
                const { details } = error;
                const message = details.map(i => i.message);
                Api.badRequest()
                res.status(422);
                res.locals.description = message;
                next();
            }
        }
    }
}