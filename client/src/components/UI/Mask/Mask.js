import React from 'react';
import { Container, View } from 'mdbreact';

const mask = (props) => {
  return (
    <View id="intro" className={props.backImage}>
      <Container fluid className="rgba-stylish-strong z-depth-1 full-bg-image d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
        {props.children}
      </Container>
    </View>
  );
};

export default mask;
