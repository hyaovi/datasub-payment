const express = require('express');
const validatePayment = require('../../middleware/validate.payment');

const PaymentModel = require('../../models/payment.model');
const router = express.Router();

const example = {
  CardNumber: '0000000000000000',
  ExpDate: '04/2022',
  Cvv: '123',
  Amount: 100,
};

// service
const createPayment = async (paymentData) => {
  const payment = new PaymentModel(paymentData);
  return await payment.save();
};




// routes
router.get('/', async (req, res) => {
  return res.send({
    msg: 'payment endpoint',
    example,
  });
});

router.post('/', validatePayment, async (req, res) => {
  try {
    const paymentRecord = await createPayment(req.body);
    const {id, Amount} = paymentRecord;
    return res.send({ RequestId:id, Amount });
  } catch (error) {
    return res.send({ msg: 'some went wrong', error });
  }
});

module.exports = router;
