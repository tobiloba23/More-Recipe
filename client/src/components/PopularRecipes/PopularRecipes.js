import React from 'react';
import { View, Container, Row } from 'mdbreact';

import LinkingCarousels from '../CarouselComponent/LinkingCarousels';
import SectionTitle from '../SectionTitle/SectionTitle';

const popularRecipes = (props) => {
  return (
    <div className="layerText">
      <SectionTitle id="favourites" destination="joinComm" title="Most Popular Recipes" />
      <View id="favView" className="bodyColor infoViewHeight d-flex mb-2">
        <Container className="justify-content-center align-self-center">
          <Row>
            <LinkingCarousels items={props.items} activeItem={props.activeItem} next={props.next} prev={props.prev} goToIndex={props.goToIndex} nextInnerCarousel={props.nextInnerCarousel} prevInnerCarousel={props.prevInnerCarousel} />
          </Row>
        </Container>
      </View>
    </div>
  );
};

export default popularRecipes;
