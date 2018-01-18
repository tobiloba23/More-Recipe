import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import CollapsibleNavbar from '../../components/Navigation/Navbar/CollapsibleNavbar';
import FooterComponent from '../../components/Navigation/Footer/FooterComponent';

class Layout extends Component {
  state = {
    dropdownOpen: false,
    navbarOpen: false
  };

  toggleNavHandler = () => {
    this.setState((prevState) => {
      return {
        navbarOpen: !prevState.navbarOpen
      };
    });
  };

  toggleDDHandler = () => {
    this.setState((prevState) => {
      return {
        dropdownOpen: !prevState.dropdownOpen
      };
    });
  };

  handleScroll = (event) => {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
      // $('#navbar')[0].classList.add('navbarColor');
      if (window.screen.width > 500) document.getElementById('navbar').setAttribute('style', 'visibility: visible');
      document.getElementById('navbar').classList.add('navbarColor');
    } else {
      if (window.screen.width > 500) document.getElementById('navbar').setAttribute('style', 'visibility: visible');
      document.getElementById('navbar').classList.remove('navbarColor');
    }
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('toTopButton').style.display = 'block';
    } else {
        document.getElementById('toTopButton').style.display = 'none';
    };
  };

  mouseAtScreenTop = (event) => {
    if (window.screen.width > 500) {
      // Check if we are in the top area of the page.
      if (event.screenY > 400) {
        document.getElementById('navbar').setAttribute('style', 'visibility: hidden');
      } else {
        document.getElementById('navbar').setAttribute('style', 'visibility: visible');
      }
    }
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('mousemove', this.mouseAtScreenTop);
  };
  
  componentWillUnmount = () => {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('mousemove', this.mouseAtScreenTop);
  };

  render() {
    return (
      <Aux>
        <CollapsibleNavbar 
          toggleDDclicked={this.toggleDDHandler} 
          toggleNavClicked={this.toggleNavHandler}
          navbarOpen={this.state.navbarOpen}
          dropdownOpen={this.state.dropdownOpen} />
        <main>
            {this.props.children}
        </main>
        <FooterComponent />
      </Aux>
    );
  };
};

export default Layout;
