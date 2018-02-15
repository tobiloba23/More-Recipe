import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Aux from '../Aux/Aux';
import CollapsibleNavbar from '../../components/Navigation/Navbar/CollapsibleNavbar';
import FooterComponent from '../../components/Navigation/Footer/FooterComponent';

import * as actions from '../../store/actions/index';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.setPageHandler = this.setPageHandler.bind(this);
    this.toggleDDHandler = this.toggleDDHandler.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleNavHandler = this.toggleNavHandler.bind(this);
    this.state = {
      dropdownOpen: false,
      navbarOpen: false,
      page: 'Landing',
    };

    this.mouseAtScreenTop = (event) => {
      if (window.screen.width > 500) {
      // Check if we are in the top area of the page.
        if (event.screenY > 400) {
          document.getElementById('navbar').setAttribute('style', 'visibility: hidden');
        } else {
          document.getElementById('navbar').setAttribute('style', 'visibility: visible');
        }
      }
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('mousemove', this.mouseAtScreenTop);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('mousemove', this.mouseAtScreenTop);
  }

  setPageHandler(newPage) {
    this.setState({
      page: newPage,
    });

    const p1 = new Promise((resolve) => {
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
        100,
      );
    });
    p1.catch((reason) => {
      console.log(`Page is loading slowly due to: (${reason}.`);
    });
  }

  toggleDDHandler() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  handleScroll() {
    if (window.screen.width > 500) document.getElementById('navbar').setAttribute('style', 'visibility: visible');
    if (this.state.page === 'Landing') {
      const introHeight = document.getElementById('intro').getBoundingClientRect().height - 30;
      if (document.body.scrollTop > introHeight
        || document.documentElement.scrollTop > introHeight) {
        document.getElementById('navbar').classList.add('navbarColor');
      } else {
        document.getElementById('navbar').classList.remove('navbarColor');
      }
    }
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('toTopButton').style.display = 'block';
    } else {
      document.getElementById('toTopButton').style.display = 'none';
    }
  }

  toggleNavHandler() {
    this.setState(prevState => ({
      navbarOpen: !prevState.navbarOpen,
    }));
  }

  render() {
    const {
      children, isAuthenticated, userName, imageUrl, onLogout,
    } = this.props;

    const childrenWithProps = React.Children.map(
      children,
      child => React.cloneElement(child, { setPage: this.setPageHandler }),
    );

    return (
      <Aux>
        <CollapsibleNavbar
          toggleDDclicked={this.toggleDDHandler}
          toggleNavClicked={this.toggleNavHandler}
          navbarOpen={this.state.navbarOpen}
          dropdownOpen={this.state.dropdownOpen}
          isAuthenticated={isAuthenticated}
          userName={userName}
          imageUrl={imageUrl}
          logout={onLogout}
        />
        <main>
          {childrenWithProps}
        </main>
        <FooterComponent />
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  userName: PropTypes.string,
  imageUrl: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  userName: null,
  imageUrl: null,
};

const mapReduxStateToCompProps = state => ({
  isAuthenticated: state.auth.token !== null,
  userName: state.auth.userName,
  imageUrl: state.auth.imageUrl,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout()),
});

export default connect(mapReduxStateToCompProps, mapDispatchToProps)(Layout);

