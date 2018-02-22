import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import CarouselComponent from './CarouselComponent';
import transparent from '../../../assets/images/asfalt-light.png';

const linkingCarousels = props => (
  <Aux>
    <CarouselComponent
      arrayDepth={1}
      image={transparent}
      datainterval={9000}
      items={props.items}
      activeItem={props.activeItem}
      nextA={props.next}
      next={props.next}
      prev={props.prev}
      goToIndex={props.goToIndex}
    />
    <CarouselComponent
      arrayDepth={1}
      title=" "
      descriptionSumm=" "
      datainterval={9000}
      items={props.items}
      activeItem={props.activeItem}
      nextA={() => null}
      next={props.next}
      prev={props.prev}
      goToIndex={props.goToIndex}
    />
    <CarouselComponent
      arrayDepth={2}
      datainterval={3000}
      items={props.items[props.activeItem].recipeReviews}
      activeItem={props.items[props.activeItem].activeReview}
      nextA={props.nextInnerCarousel}
      next={props.nextInnerCarousel}
      prev={props.prevInnerCarousel}
      goToIndex={props.goToIndexInnerCarousel}
    />
  </Aux>
);

linkingCarousels.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  activeItem: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  nextInnerCarousel: PropTypes.func.isRequired,
  prevInnerCarousel: PropTypes.func.isRequired,
  goToIndex: PropTypes.func.isRequired,
  goToIndexInnerCarousel: PropTypes.func,
};

linkingCarousels.defaultProps = {
  items: null,
  goToIndexInnerCarousel: null,
};

export default linkingCarousels;
