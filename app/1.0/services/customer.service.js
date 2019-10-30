class CustomerService {
    constructor() { }
    getByEmail() {
        let response = { customerID: '1245', status: 'Active', createdOn: new Date(), others: {} };
        return response;
    }
}

export default new CustomerService();
