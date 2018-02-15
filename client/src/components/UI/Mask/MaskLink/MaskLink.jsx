import React from 'react';
import { Fa } from 'mdbreact';
import PropTypes from 'prop-types';

const maskLink = props => (
  <a href={props.mailto ? `mailto:${props.mailto}` : `https://${props.linkto}`} style={{ margin: '0px 2px' }}>
    <Fa className={props.faIconName} style={{ fontSize: '2em', color: props.color }} />
  </a>
);

maskLink.propTypes = {
  mailto: PropTypes.string,
  linkto: PropTypes.string,
  faIconName: PropTypes.string,
  color: PropTypes.string,
};

maskLink.defaultProps = {
  mailto: null,
  linkto: null,
  faIconName: null,
  color: null,
};

export default maskLink;
