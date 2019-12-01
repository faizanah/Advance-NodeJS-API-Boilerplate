import CustomerController from '../controllers/customers.controller';
import CustomerValidator from '../validations/customer.validation';

export default router => {
  router.post(
    '/customer/email/:customer_email/1.0',
    CustomerValidator.validate('email'),
    CustomerController.validateEmail
  );
};
