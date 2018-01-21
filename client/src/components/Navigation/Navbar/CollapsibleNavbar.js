import React from 'react';
import { NavbarNav, NavbarToggler, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, FormInline, Collapse } from 'mdbreact';
import { NavLink } from 'react-router-dom';

// import classes from '../../../hoc/Layout/Layout.css';

const collapsibleNavbar = ( props ) => {
  let authenticationLink = (
    <NavLink className={`btn btn-outline-white buttonsColor`} to="/signin">Sign in/Register
      <i className="fa fa-sign-in ml-2"></i>
    </NavLink>
  );
  if(props.isAuthenticated) {
    authenticationLink = (
      <NavLink onClick={props.logout} className={`btn btn-outline-white buttonsColor`} to="/">Log out
        <i className="fa fa-sign-out ml-2"></i>
      </NavLink>
    );
  }

  return (
    <div>
      <nav id="navbar" color="success" className="navbar navbar-expand-lg navbar-dark fixed-top">
        <Container>
          {/* <!-- Navbar brand  
              <NavbarBrand>
                <NavLink><a href="#"></a></NavLink>
              </NavbarBrand>-->*/}
          <NavbarToggler onClick={props.toggleNavClicked} />
          <Collapse isOpen={props.navbarOpen} navbar>
            <NavbarNav className="mr-auto">
              <NavItem className={`my-auto navItemBorder`}>
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
              <li className="my-auto">
                {/* <!-- Search form --> */}
                <FormInline action="/recipes">
                  <input style={{ width: 600 }} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </FormInline>
              </li>
            </NavbarNav>
            {authenticationLink}
          </Collapse>
        </Container>
      </nav>
    </div>
  );
};

export default collapsibleNavbar;
