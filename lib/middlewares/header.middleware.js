import Joi from 'joi';
import  Api from '../api';
class HeaderMiddleware {
    
    constructor() {}

    static transIDSchema() {
        return Joi.object().keys({
            'x-transId': Joi.string().max(46).required(),
            'x-transParentId' : Joi.string().max(46),
            'x-requestorLang': Joi.string().max(46),
            'content-type': Joi.string().valid('application/json').required()
        });
    }

    static AUTHORIZE() {
        return (req, res, next) => {
            const { error } = Joi.validate(req.headers, this.transIDSchema().unknown(true), {abortEarly: false}); 
            const valid = error == null; 
            if (valid) { 
                next(); 
            } else { 
              const { details } = error; 
              const message = details.map(i => i.message)
              Api.unauthorized(req, res, message)
            }
        }
    }
    
}
export default HeaderMiddleware;