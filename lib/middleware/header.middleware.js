import Joi from 'joi';
import Validate from '../../utilities/helpers/validator.helper';

class HeaderMiddleware {
  static AUTHORIZE() {
    const schema = Joi.object().keys({
      'x-transid': Joi.string()
        .max(46)
        .required(),
      'x-transparentid': Joi.string().max(46),
      'x-requestorlang': Joi.string().length(46),
      'content-type': Joi.string()
        .valid('application/json')
        .required()
    });
    return Validate.headers(schema);
  }
}
export default HeaderMiddleware;
