import React from 'react';
import { Footer, Row, Container } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

import FooterColumnItem from './FooterColumnItem/FooterColumnItem';
import classes from './FooterComponent.css'

// const scrollToDestination = (destination) => {
//   scroller.scrollTo( destination, {
//     duration: 1800,
//     delay: 0,
//     smooth: 'easeInOutQuart'
//   });
// }
// onClick={() => scrollToDestination('intro')} 

const footerComponent = (props) => {
  return (
    <Footer className="page-footer center-on-small-only " style={{backgroundColor: 'white'}}>
      <Container fluid className="bodyColor">
        {/* <!--Footer Links--> */}
        <Container fluid  className="white-text" opacity={0.8}>
          <Row className="wow fadeIn" data-wow-delay="0.2s" style={{animationName: 'none', visibility: 'visible'}}>
            <FooterColumnItem title='USEFUL LINKS' />
            <FooterColumnItem title='SECTION 1' />
            <FooterColumnItem title='SECTION 2' />
            <FooterColumnItem title='SECTION 3' />
          </Row>
        </Container>
        {/* <!--/.Footer Links--> */}
        {/* <!--Call to action--> */}
        <div className="call-to-action wow fadeIn" data-wow-delay="0.2s" style={{animationName: 'none', visibility: 'visible'}}>
          <ul>
          </ul>
        </div>
        {/* <!--/.Call to action--> */}
        <hr />
        <div className="navbarColor">
          {/* <!--Copyright--> */}
          <div className="footer-copyright wow fadeIn" data-wow-delay="0.2s" style={{animationName: 'none', visibility: 'visible'}}>
            <Container id="copyright" fluid>
              © 2017 Copyright:
                <a href="https://toad-inc.com"> Toad-Inc.com </a>
                <Link 
                  id="toTopButton" 
                  to="intro"
                  smooth={'easeInOutQuart'}
                  duration={1800}
                  className={`${classes.toTopButton} layerColor btn btn-secondary-outline btn-sm`} 
                  role="button">
                    &uarr;
                </Link>
            </Container>
          </div>
          {/* <!--/.Copyright--> */}
        </div>
      </Container>
    </Footer>
  );
};

export default footerComponent;
