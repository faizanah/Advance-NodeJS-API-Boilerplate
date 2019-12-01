import customerController from '../controllers/customers.controller';

export default router => {
  router.get('/customer/:email/1.0', customerController.getByEmailID);
};
