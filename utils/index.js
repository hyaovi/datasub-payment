import { ExpDate} from '../backend/validations';

export const sanitizeInput = (string, maxLength) => {
  return `${string}`.replace(/\D/g, '').substring(0, maxLength || Infinity);
};
export const validateExpDate = (expDate) => {
  const { error } = ExpDate.validate(expDate);
  return !error;
  // return /^(0[1-9]|1[0-2])\/?(20[2-5][2-9])$/.test(value);
};

export const validateCard = (cardNumber) => {
  const {  error } = ExpDate.validate(cardNumber);
  return !error;
};
export const formatExpDate = (str) => {
  return (
    str
      .replace(/(\d{2})/, '$1/')
      .replace(/(\d{2})/, '$1/')
      .replace(/(\d{4}) (\d{4})/, '$1/$2')
      .replace(/[^\d\/]|^[\/]*$/g, '' )
      .replace(/\/\//g, '/')
  );
};
