import React from 'react';
import { View, Container, Row } from 'mdbreact';
import PropTypes from 'prop-types';

import LinkingCarousels from '../../UI/CarouselComponent/LinkingCarousels';
import SectionTitle from '../../UI/SectionTitle/SectionTitle';
import Spinner from '../../../components/UI/Spinner/Spinner';

const popularRecipes = props => (
  <div className="layerText">
    <SectionTitle id="favourites" destination="joinComm" title="Most Popular Recipes" />
    {
        props.items ?
          <View id="favView" className="buttonsColor infoViewHeight d-flex mb-2">
            <Container className="justify-content-center align-self-center">
              <Row>
                <LinkingCarousels
                  items={props.items}
                  activeItem={props.activeItem}
                  next={props.next}
                  prev={props.prev}
                  goToIndex={props.goToIndex}
                  nextInnerCarousel={props.nextInnerCarousel}
                  prevInnerCarousel={props.prevInnerCarousel}
                />
              </Row>
            </Container>
          </View>
        : <Spinner gold />
      }
  </div>
);

popularRecipes.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  activeItem: PropTypes.number,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  nextInnerCarousel: PropTypes.func.isRequired,
  prevInnerCarousel: PropTypes.func.isRequired,
  goToIndex: PropTypes.func.isRequired,
};

popularRecipes.defaultProps = {
  items: null,
  activeItem: null,
};

export default popularRecipes;
