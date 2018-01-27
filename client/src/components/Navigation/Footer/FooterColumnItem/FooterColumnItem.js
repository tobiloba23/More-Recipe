import React from 'react';
import { Col } from 'mdbreact';

import Aux from '../../../../hoc/Aux/Aux';

const footerColumnItem = ( props ) => {
  return (
    <Aux>
      <Col md="3">
        <p className="column-title">
          <strong>{props.title}</strong>
        </p>
        <ul>
        </ul>
      </Col>
      <hr className="w-100 clearfix d-md-none" />
    </Aux>
  );
};

export default footerColumnItem;
