import React from 'react';
import { Col } from 'mdbreact';
import PropTypes from 'prop-types';

import Aux from '../../../../hoc/Aux/Aux';

const footerColumnItem = props => (
  <Aux>
    <Col md="3">
      <p className="column-title">
        <strong>{props.title}</strong>
      </p>
      <ul />
    </Col>
    <hr className="w-100 clearfix d-md-none" />
  </Aux>
);

footerColumnItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default footerColumnItem;
