import CustomerSchema from './../models/customers.model';
import Validator from '../../../utilities/helpers/validator.helper';

class CustomerMapper {
    static custInquiryResponseMapper(data) {
        return Validator.validate(data, CustomerSchema.emailVerificationResponse);

    }
    static createCustResponseMapper(data) {
        return Validator.validate(data, CustomerSchema.createCustomerResponse);
    }
}

export default CustomerMapper;