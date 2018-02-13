import React from 'react';
import { View, Container, Row } from 'mdbreact';

import LinkingCarousels from '../../UI/CarouselComponent/LinkingCarousels';
import SectionTitle from '../../UI/SectionTitle/SectionTitle';
import Spinner from '../../../components/UI/Spinner/Spinner';

const popularRecipes = (props) => {
  return (
    <div className="layerText">
      <SectionTitle id="favourites" destination="joinComm" title="Most Popular Recipes" />
      {
        props.items ? 
          <View id="favView" className="buttonsColor infoViewHeight d-flex mb-2">
            <Container className="justify-content-center align-self-center">
              <Row>
                <LinkingCarousels items={props.items} activeItem={props.activeItem} next={props.next} prev={props.prev} goToIndex={props.goToIndex} nextInnerCarousel={props.nextInnerCarousel} prevInnerCarousel={props.prevInnerCarousel} />
              </Row>
            </Container>
          </View>
        : <Spinner gold />
      }
    </div>
  );
};

export default popularRecipes;
