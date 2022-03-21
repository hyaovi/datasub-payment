const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = Schema(
  {
    CardNumber: {
      type: String,
      required: true,
    },
    ExpDate: {
      type: String,
      required: true,
    },
    Cvv: {
      type: String,
      required: true,
    },
    Amount: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const PaymentModel = mongoose.model('payment', paymentSchema);

module.exports = PaymentModel;
