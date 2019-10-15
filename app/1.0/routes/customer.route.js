import customerController from '../controllers/customers.controller'
import CustomerValidator from './../validations/customer.validation'
module.exports = (router) => {
    router.get('/customers/:email/1.0', CustomerValidator.emailVerify(), customerController.getByEmailID);
    router.post('/customers/1.0', CustomerValidator.createCustomerValidator(), customerController.createCustomer);
}