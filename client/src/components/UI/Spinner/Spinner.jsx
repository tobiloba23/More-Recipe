import React from 'react';
import PropTypes from 'prop-types';
import classes from './Spinner.css';

const spinner = props =>
  (<div className={props.gold ? classes.LoaderGold : classes.Loader}>Loading...</div>);

spinner.propTypes = {
  gold: PropTypes.bool,
};

spinner.defaultProps = {
  gold: null,
};

export default spinner;
