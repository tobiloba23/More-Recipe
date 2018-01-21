import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import CollapsibleNavbar from '../../components/Navigation/Navbar/CollapsibleNavbar';
import FooterComponent from '../../components/Navigation/Footer/FooterComponent';

import * as actions from '../../store/actions/index';

class Layout extends Component {
  state = {
    dropdownOpen: false,
    navbarOpen: false,
    page: 'Landing'
  };

  setPageHandler = (newPage) => {
    this.setState({
      page: newPage
    });

    let p1 = new Promise(
      (resolve, reject) => {
        window.setTimeout(
          () => {
            const changeNavColor = () => {
              if (this.state.page === 'Landing' || 'Auth') {
                document.getElementById('navbar').classList.remove('navbarColor');
              } else {
                document.getElementById('navbar').classList.add('navbarColor');
              }
            };
            resolve(changeNavColor());
          }, 
          100
        );
      }
    );
    p1.catch(
      // Log the rejection reason
      (reason) => {
        console.log('Page is loading slowly due to: (' + reason + '.');
      }
    );
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
    if (window.screen.width > 500) document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    if (this.state.page === 'Landing') {
      const introHeight = document.getElementById('intro').getBoundingClientRect().height - 30;
      if (document.body.scrollTop > introHeight || document.documentElement.scrollTop > introHeight) {
        document.getElementById('navbar').classList.add('navbarColor');
      } else {
        document.getElementById('navbar').classList.remove('navbarColor');
      }
    };
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
    const { children } = this.props;

    var childrenWithProps = React.Children.map(children,
      child => React.cloneElement(child, { setPage: this.setPageHandler })
    );

    return (
      <Aux>
        <CollapsibleNavbar
          toggleDDclicked={this.toggleDDHandler}
          toggleNavClicked={this.toggleNavHandler}
          navbarOpen={this.state.navbarOpen}
          dropdownOpen={this.state.dropdownOpen}
          isAuthenticated={this.props.isAuthenticated}
          logout={this.props.onLogout}
        />
        <main>
          {childrenWithProps}
        </main>
        <FooterComponent />
      </Aux>
    );
  };
};

const mapReduxStateToCompProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(mapReduxStateToCompProps, mapDispatchToProps)(Layout);

