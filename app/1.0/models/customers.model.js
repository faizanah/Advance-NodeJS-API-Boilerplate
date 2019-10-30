const Joi = require('joi');
const verifyEmail = Joi.object().keys({
    email: Joi.string().email().required()
}).unknown(true);
const emailVerificationResponse = Joi.object().keys({
    customerID: Joi.string().min(4).max(5).required(),
    status: Joi.string().valid("Active", "Block", "Deceased").required(),
    createdOn: Joi.date().iso()
})


const createCustomerResponse = Joi.object().keys({
    customerID: Joi.string().min(4).max(5).required(),
    status: Joi.string().valid("Active", "Block", "Deceased").required()
})

const createCustomerRequest = Joi.object({
    customer: Joi.object()
        .keys({
            fullName: Joi.string().min(5).max(30).required(),
            title: Joi.string().valid('Mr.', 'Mrs.').required(),
            gender: Joi.string().valid('M', 'F', 'O').required(),
            nationality: Joi.string().max(30),
            dob: Joi.string().max(30),
            emailAdd: Joi.string().email().required(),
            identityDoc: Joi.array().items(Joi.object()
                .keys({
                    type: Joi.string().valid('ID Card', 'Passport'),
                    IDN: Joi.string().min(10).max(20).required(),
                    issueDate: Joi.date().iso(),
                    expiryDate: Joi.date().iso()
                })
            ),
            contactDetails: Joi.array().items(Joi.object()
                .keys({
                    type: Joi.string().valid("EMAIL", "MOBILE", "PHONE", "FAX"),
                    detail: Joi.string().max(30)
                })
            )

        })

}).unknown(true);


module.exports = {
    emailVerificationResponse: emailVerificationResponse,
    verifyEmail: verifyEmail,
    createCustomerResponse: createCustomerResponse,
    createCustomerRequest: createCustomerRequest


};