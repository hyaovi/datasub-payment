const { paymentSchema } = require('../validations');


const validatePayment = (req, res, next) => {
const { CardNumber, ExpDate, Cvv, Amount } = req.body;
const { error, value } = paymentSchema.validate({ CardNumber, ExpDate, Cvv, Amount });
if(error){
  const errorMessage = error.details.map((details) => details.message).join(', ');
  res.status(400).send({msg:errorMessage})
  next(error)
}
Object.assign(req, value)
return next()
};

module.exports = validatePayment