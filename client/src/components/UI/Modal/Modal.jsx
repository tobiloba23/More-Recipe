import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'mdbreact';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class ModalExt extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <Modal isOpen={this.props.show} toggle={this.props.modalClosed} >
          {this.props.children}
        </Modal>
      </Aux>
    );
  }
}

ModalExt.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
  children: PropTypes.node,
};

ModalExt.defaultProps = {
  children: null,
};

export default ModalExt;
