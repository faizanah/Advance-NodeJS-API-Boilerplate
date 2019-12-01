import CustomerService from '../services/customer.service';
import Api from '../../../lib/api';

class CustomersController {
  static async getByEmailID(request, response, next) {
    try {
      const result = CustomerService.getByEmail();
      Api.ok(request, response, result);
    } catch (err) {
      next(err);
    }
  }
}
export default CustomersController;
