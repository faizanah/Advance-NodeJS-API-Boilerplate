import CustomerService from '../services/customer.service';
import Api from '../../../lib/api'
class CustomersController {

    constructor() { }

    getByEmailID(request, response) {
        try {
            let result = CustomerService.getByEmail();
            Api.ok(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }
    createCustomer(request, response) {
        try {
            let result = CustomerService.createCustomer(request, response);
            Api.ok(request, response, result);
        } catch (err) {
            Api.serverError(request, response, err);
        }
    }
}
export default new CustomersController();