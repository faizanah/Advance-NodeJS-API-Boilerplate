import Joi from 'joi'
import Validator from '../../../utilities/helpers/validator.helper';
const schemas = { 
    email: Joi.string().email().required()
};
const CustomerValidation = {
    emailVerify() {
        return Validator.params(schemas);
    }
}
export default CustomerValidation;
