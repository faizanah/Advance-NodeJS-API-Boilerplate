import customerController from '../controllers/customers.controller'
module.exports = (router) => {
    router.get('/customers/:email/1.0', customerController.getByEmailID);
}