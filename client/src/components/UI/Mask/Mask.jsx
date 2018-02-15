import React from 'react';
import { Container, View } from 'mdbreact';
import PropTypes from 'prop-types';

const mask = props => (
  <View id="intro" className={props.backImage}>
    <Container fluid className="rgba-stylish-strong z-depth-1 full-bg-image d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      {props.children}
    </Container>
  </View>
);

mask.propTypes = {
  children: PropTypes.node.isRequired,
  backImage: PropTypes.string.isRequired,
};

export default mask;
