const joiDate = require('@joi/date');
const Joi = require('joi').extend(joiDate);

// payment validation schema

// const CardNumber = Joi.string().creditCard().required();

// Card Number validation: using a simplified validation schema for the sake of this demo
const CardNumber = Joi.string()
  .length(16)
  .pattern(/^[0-9]+$/)
  .required();
const Cvv = Joi.string()
  .length(3)
  .pattern(/^[0-9]+$/)
  .required();
const Amount = Joi.number().required();
const ExpDate = Joi.date().min('now').format('MM/YYYY').required();

const paymentSchema = Joi.object({
  CardNumber,
  Cvv,
  Amount,
  ExpDate,
});

module.exports = {
  paymentSchema,
  CardNumber,
  Cvv,
  Amount,
  ExpDate,
};
