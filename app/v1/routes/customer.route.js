import customerController from '../controllers/customers.controller'
module.exports = function(router){
    router.get('/', (req, res, next) => {
        res.json('This is customer service');
    });
    router.get('/customers/:email/1.0', customerController.getByEmailID);
}