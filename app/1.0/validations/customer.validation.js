import Validator from '../../../utilities/helpers/validator.helper';

class CustomerValidation {
    static emailVerify() {
        // return Validator.params(CustomerSchema.verifyEmail);
    }
    static createCustomerValidator() {
        // return Validator.body(CustomerSchema.createCustomerRequest);
    }
}

export default CustomerValidation;
