import React from 'react';
import { NavbarNav, NavbarToggler, NavItem, Dropdown, /* DropdownToggle, */ DropdownMenu, DropdownItem, Container, FormInline, Collapse, Media } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';

const collapsibleNavbar = (props) => {
  const authenticationLink = (
    <NavItem>
      <NavLink
        to={props.isAuthenticated ? '/' : '/signin'}
        onClick={props.isAuthenticated ? props.logout : null}
        className="btn btn-outline-white float-right buttonsColor"
        style={{ minWidth: '165px', padding: '13px' }}
      >
        {props.isAuthenticated ? 'Log-out' : 'Sign-in/Register'}
        <i className={`fa fa-${props.isAuthenticated ? 'sign-out' : 'sign-in'} ml-2`} />
      </NavLink>
    </NavItem>
  );
  const userProfileLink = !props.isAuthenticated ? null : (
    <Aux>
      <NavItem className="my-auto mx-auto navItemBorder" style={{ paddingTop: '8px' }}>
        <NavLink to="/Profile">
          <Media left className="waves-light my-2 justify-content-center mx-auto">
            <img style={{ borderRadius: '20px', maxHeight: '40px', maxWidth: '40px' }} src={props.imageUrl} alt="User" />
          </Media>
        </NavLink>
      </NavItem>
      <NavItem className="my-auto mx-auto navItemBorder" style={{ paddingTop: '8px' }}>
        <NavLink to="/Profile">
          <div>{props.userName}</div>
        </NavLink>
      </NavItem>
    </Aux>
  );

  return (
    <div>
      <nav id="navbar" className="navbar navbar-expand-lg navbar-dark fixed-top">
        <Container>
          {/* <!-- Navbar brand
              <NavbarBrand>
                <NavLink><a href="#"></a></NavLink>
              </NavbarBrand>--> */}
          <NavbarToggler onClick={props.toggleNavClicked} />
          <Collapse isOpen={props.navbarOpen} navbar>
            <NavbarNav style={{ width: '100%' }}>
              <NavItem className="my-auto navItemBorder">
                <NavLink id="Home" to="/Home">Home</NavLink>
              </NavItem>
              <Dropdown isOpen={props.dropdownOpen} toggle={props.toggleDDclicked}>
                {/* <DropdownToggle caret className={`z-depth-0`}>
                  <i className="fa fa-user mr-1" aria-hidden="true"></i>
                </DropdownToggle> */}
                <DropdownMenu>
                  <DropdownItem href="#">View personal info</DropdownItem>
                  <DropdownItem href="#">Add a recipe</DropdownItem>
                  <DropdownItem href="#">Create a catalouge</DropdownItem>
                  <DropdownItem href="#">Your activities</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem className="my-auto resizableElement">
                {/* <!-- Search form --> */}
                <FormInline action="/recipes">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </FormInline>
              </NavItem>
              {userProfileLink}
              {authenticationLink}
            </NavbarNav>
          </Collapse>
        </Container>
      </nav>
    </div>
  );
};

collapsibleNavbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  imageUrl: PropTypes.string,
  logout: PropTypes.func.isRequired,
  toggleNavClicked: PropTypes.func.isRequired,
  navbarOpen: PropTypes.bool.isRequired,
  toggleDDclicked: PropTypes.func.isRequired,
  dropdownOpen: PropTypes.bool.isRequired,
};

collapsibleNavbar.defaultProps = {
  imageUrl: null,
  userName: null,
};

export default collapsibleNavbar;
