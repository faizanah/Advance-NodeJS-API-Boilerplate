import Joi from 'joi';
import Validate from '../../utilities/helpers/validator.helper';

export default class HeaderMiddleware {
  static AUTHORIZE() {
    const schema = Joi.object().keys({
      'x-trans-id': Joi.string()
        .max(46)
        .required(),
      'x-transparent-id': Joi.string().max(46),
      'x-request-or-lang': Joi.string().length(46),
      'content-type': Joi.string()
        .valid('application/json')
        .required()
    });
    return Validate.headers(schema);
  }
}
