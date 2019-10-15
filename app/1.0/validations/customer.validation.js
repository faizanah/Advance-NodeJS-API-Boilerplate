import Validator from '../../../utilities/helpers/validator.helper';
import CustomerSchema from './../models/customers.model'

class CustomerValidation {
    static emailVerify() {
        return Validator.params(CustomerSchema.verifyEmail);
    }
    static createCustomerValidator() {
        return Validator.body(CustomerSchema.createCustomerRequest);
    }
}

export default CustomerValidation;
