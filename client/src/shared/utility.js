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

const recipeCarouselPropType = {
  altText: PropTypes.string,
  title: PropTypes.string,
  descriptionSumm: PropTypes.string,
  image: PropTypes.string,
};

const recipeCardPropType = {
  title: PropTypes.string,
  description: PropTypes.string,
  ownerImage: PropTypes.string,
  owner: PropTypes.string,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  instructions: PropTypes.string,
};

export {
  checkValidity,
  recipeCarouselPropType,
  recipeCardPropType,
};
