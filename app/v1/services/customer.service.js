class CustomerService {
    constructor(){}
    getByEmail() {
        let responseFromCore = { customerID: '1245', status: 'Active/Block/Deceased', createdOn: new Date()};
        return responseFromCore;
    }
}

export default new CustomerService();