import CustomerValidator from './../validations/customer.validation'
import CustomerSchema from './../models/customers.model'

class CustomerService {
    constructor() { }
    getByEmail() {
        let responseFromCore = { customerID: '1245', status: 'Active', createdOn: new Date() };
        const response = CustomerValidator.emailVerificationResponse(responseFromCore, CustomerSchema.emailVerificationResponse)
        return response;
    }
    createCustomer(req, res) {
        let responseFromCore = { customerID: '1245', status: 'Active', createdOn: new Date() };
        const response = CustomerValidator.emailVerificationResponse(responseFromCore, CustomerSchema.emailVerificationResponse)
        return response;
    }
}

export default new CustomerService();