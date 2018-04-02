import PropTypes from 'prop-types';

const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPassword) {
    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

const timeSince = (createdAt) => {
  const time = createdAt ? (Date.now() - new Date(createdAt.replace(' ', 'T'))) / 86400000 : 0;
  return (1 / (24 * 60)) > time && time >= 0
    ? `${Math.floor(time * 24 * 60 * 60)} secs ago`
    : (2 / (24 * 60)) > time && time >= (1 / (24 * 60))
      ? `${Math.floor(time * 24 * 60)} min ago`
      : (1 / 24) > time && time >= (2 / (24 * 60))
        ? `${Math.floor(time * 24 * 60)} mins ago`
        : (1 / 24) <= time && time < (2 / 24)
          ? `${Math.floor(time * 24)} hour ago`
          : (2 / 24) <= time && time < 1
            ? `${Math.floor(time * 24)} hours ago`
            : time >= 1 && time < 2
              ? `${Math.floor(time)} day ago`
              : `${Math.floor(time)} days ago`;
};

export {
  checkValidity,
  timeSince,
};
