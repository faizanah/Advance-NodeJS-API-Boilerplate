class CustomerService {
  static async getByEmail() {
    const response = {
      customerID: '1245',
      status: 'Active',
      createdOn: new Date(),
      others: {}
    };
    return response;
  }
}

export default CustomerService;
