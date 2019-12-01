import Joi from 'joi';
import Validator from '../../../utilities/helpers/validator.helper';

const schema = {
  email: Joi.string()
    .email()
    .lowercase()
    .required()
};

const CustomerValidation = {
  validate: type => {
    switch (type) {
      case 'email': {
        const validation = Joi.object()
          .keys({
            customer_email: schema.email
          })
          .unknown(true);
        return Validator.params(validation);
      }
      default:
        return false;
    }
  }
};
export default CustomerValidation;
