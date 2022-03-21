import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { formatExpDate, sanitizeInput, validateExpDate } from '../utils';

function Payment() {
  const formatOptions = {
    cardNumber: {
      maxLength: 16,
    },
    cvv: {
      maxLength: 3,
    },
    amount: {
      maxLength: Infinity,
    },
    expDate: {
      maxLength: 6,
    },
  };
  const initialInputState = {
    cardNumber: '',
    amount: '',
    cvv: '',
    expDate: '',
  };
  const initialvalidationState = {
    cardNumber: false,
    amount: false,
    cvv: false,
    expDate: false,
  };
  const initialResponse = {
    isSuccess: undefined,
    isError: undefined,
    msg: '',
  };
  const [userInputs, setUserInputs] = useState(initialInputState);
  const [userIsInvalid, setIsInvalid] = useState(initialvalidationState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(initialResponse);

  useEffect(() => {
    const isInValid = Object.values(userIsInvalid).includes(true);
    const isAnyEmpty = Object.values(userInputs).some((value) => {
      return value.length == 0;
    });
    setIsFormValid(!isInValid && !isAnyEmpty);
  }, [userIsInvalid]);

  // input handler
  const handleChange = ({ target: { value, name } }) => {
    let sanitizedValue = sanitizeInput(value, formatOptions[name].maxLength);
    if (name === 'expDate') {
      // format expiration date
      const oldValue = userInputs.expDate;
      sanitizedValue = formatExpDate(sanitizedValue, oldValue);
    }
    setUserInputs((prevState) => ({ ...prevState, [name]: sanitizedValue }));
  };
  // validation
  const handleValidation = ({ target: { name } }) => {
    let value = userInputs[name];
    let maxLength = formatOptions[name].maxLength;
    let isInValid = false;
    if (name === 'expDate') {
      // isInValid = value.length && value.replace('/', '').length !== maxLength ;
      isInValid = value.length && !validateExpDate(value);
    } else if (name === 'amount') {
      isInValid = value.length && parseInt(value) == 0;
    } else {
      isInValid = value.length && value.length !== maxLength;
    }
    setIsInvalid((prevState) => ({ ...prevState, [name]: !!isInValid }));
  };
  const resetResponse = () => {
    setResponse(initialResponse);
  };

  const onSubmit = async (event) => {
    try {
      setIsSubmitting(true);
      event.preventDefault();
      const formData = {
        Amount: Number(userInputs.amount),
        CardNumber: userInputs.cardNumber,
        Cvv: userInputs.cvv,
        ExpDate: userInputs.expDate,
      };
      // work response
      const res = await axios.post('/api/payment', formData);
      setResponse({ isSuccess: true, msg: res.data, isError: false });
      // reset form
      setUserInputs(initialInputState);
      setIsInvalid(initialvalidationState);
    } catch (error) {
      let errorMsg;
      if (error.response) errorMsg = error.response.data.msg;
      else {
        errorMsg = 'Something went wrong';
      }
      setResponse({ isSuccess: false, msg: errorMsg, isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6 col-lg-5 col-xl-4 rounded-3 p-4'>
        <h1 className='h4 text-center mb-4 fw-bold text-secondary'>Payment</h1>

        <Form onSubmit={onSubmit} >
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type='text'
              placeholder='100'
              pattern='[0-9]*'
              name='amount'
              className=''
              onChange={handleChange}
              value={userInputs.amount}
              onBlur={handleValidation}
              isInvalid={userIsInvalid.amount}
            />
            <Form.Control.Feedback type='invalid'>
              Enter a correct amount.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='cardInput'>
            <Form.Label>Card number</Form.Label>
            <Form.Control
              type='text'
              className=''
              name='cardNumber'
              pattern='[0-9]*'
              placeholder='0000 0000 0000 0000'
              onChange={handleChange}
              onBlur={handleValidation}
              value={userInputs.cardNumber}
              isInvalid={userIsInvalid.cardNumber}
            />
            <Form.Text muted>eg: 4525111935870678</Form.Text>
            <Form.Control.Feedback type='invalid'>
              Your card number is incomplete or invalid.
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Form.Group
              className='mb-3'
              controlId='formBasicEmail'
              as={Col}
              sm='6'>
              <Form.Label>Expiration Date </Form.Label>
              <Form.Control
                type='text'
                className=''
                placeholder='05/2023'
                name='expDate'
                onChange={handleChange}
                onBlur={handleValidation}
                value={userInputs.expDate}
                isInvalid={userIsInvalid.expDate}
              />
              <Form.Control.Feedback type='invalid'>
                Your card's expiration date is incomplete or invalid.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='formBasicEmail'
              as={Col}
              sm='6'>
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type='text'
                placeholder='023'
                className=''
                name='cvv'
                onChange={handleChange}
                onBlur={handleValidation}
                value={userInputs.cvv}
                isInvalid={userIsInvalid.cvv}
              />
              <Form.Control.Feedback type='invalid'>
                Your card's security code is incomplete.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className='d-grid gap-2 mb-4'>
            <Button variant='primary' type='submit' disabled={!isFormValid}>
              {isSubmitting && (
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'></span>
              )}
             Оплатить
            </Button>
            </div>

            {response.isError && (
              <div
                className='alert alert-danger alert-dismissible fade show'
                role='alert'>
                <small>{response.msg}</small>
                <button
                  onClick={resetResponse}
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='alert'
                  aria-label='Close'></button>
              </div>
            )}
            {response.isSuccess && (
              <div
                className='alert alert-success alert-dismissible fade show'
                role='alert'>
                <div className="mb-3">Transaction successful ☑</div>
                {Object.entries(response.msg).map(([key,value])=>{
                  return <div key={key}><strong>{key}:</strong> {value} </div>
                })}
                <button
                  onClick={resetResponse}
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='alert'
                  aria-label='Close'></button>
              </div>
            )}
        </Form>
      </div>
    </div>
  );
}

export default Payment;
