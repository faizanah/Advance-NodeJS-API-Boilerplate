import customerController from '../controllers/customers.controller';
module.exports = (router) => {
	router.get('/customer/:email/1.0', customerController.getByEmailID);
};