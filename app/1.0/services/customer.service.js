import CustomerValidator from './../validations/customer.validation'
import CustomerMapper from './../mappers/customer.mapper';

class CustomerService {
    constructor() { }
    getByEmail() {
        let responseFromCore = { customerID: '1245', status: 'Active', createdOn: new Date(), others : {} };
        const response = CustomerMapper.custInquiryResponseMapper(responseFromCore)
        return response;
    }
    createCustomer(req, res) {
        let responseFromCore = { customerID: '1245', status: 'Active', createdOn: new Date() };
        const response = CustomerMapper.createCustResponseMapper(responseFromCore)
        return response;
    }
}

export default new CustomerService();