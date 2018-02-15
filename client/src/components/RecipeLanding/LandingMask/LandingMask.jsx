import React from 'react';
import { Row, Col, Container } from 'mdbreact';
import { Link } from 'react-scroll';

import MaskLink from '../../UI/Mask/MaskLink/MaskLink';

const landingMask = () => (
  <Row className="d-flex justify-content-center my-auto">
    <Col md="10" xs="12" className="text-center justify-content-center">
      <br />
      <br />
      {/* <!-- Heading --> */}
      <h1 className="justify-content-center d-flex z-depth-5 maxFontXXS2" style={{ maxHeight: '50%', height: '250px' }}>
        <svg height="250px" width="500px" fill="#fba100" className={'maxFontXXS2} justify-content-center'}>
          <path id="curve" style={{ visibility: 'hidden' }} d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
          <text>
            <textPath alignmentBaseline="top" xlinkHref="#curve" className="maxFontXXS2" style={{ fontSize: '3.8rem', fontFamily: 'Cookie, cursive' }}>
              { 'More than just Recipes!...' }
            </textPath>
          </text>
        </svg>
      </h1>
      {/* <!-- Description --> */}
      <Row
        className="my-4 display-4 layerColor"
        style={{
          fontSize: '3em',
          fontFamily: 'Kaushan Script, cursive',
          opacity: 0.8,
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }}
      >
        <Container className="maxFontMD maxFontSM2 maxFontXXS1 maxFontXS">
          {'Welcome to the land of recipes, where food enthusiasts come together '}
          {'to share ideas and connect.'}
        </Container>
      </Row>
      <a className="btn btn-outline-white buttonsColor">Catalogues
        <i className="fa fa-book ml-1" />
      </a>
      <Row>
        {/* <!-- Social Icon  --> */}
        <Col md="4" className="icon-bar mx-auto">
          <MaskLink faIconName="fa-facebook" linkto="facebook.com" color="rgb(4, 157, 228)" />
          <MaskLink faIconName="fa-twitter" linkto="twitter.com" color="rgb(4, 101, 228)" />
          <MaskLink faIconName="fa-pinterest" linkto="pinterest.com" color="hsl(2, 94%, 50%)" />
          <MaskLink faIconName="fa-instagram" linkto="instagram.com" color="#8D1F73" />
          <MaskLink faIconName="fa-envelope" mailto="contact@more-recipes.com" color="#ffffff" />
        </Col>
        <br />
        <br />
        <br />
      </Row>
      <Link
        to="recipesList"
        offset={-70}
        className="layerColor btn btn-secondary-outline btn-sm"
        role="button"
        smooth="easeInOutQuart"
        duration={600}
      >&darr;
      </Link>
    </Col>
  </Row>
);

export default landingMask;
