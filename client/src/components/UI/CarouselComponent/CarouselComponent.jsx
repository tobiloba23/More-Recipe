import React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselCaption, CarouselInner, Col } from 'mdbreact';
import PropTypes from 'prop-types';

const carouselComponent = (props) => {
  const slides = props.items.map((item, idx) => (
    <CarouselItem key={`${item.title}_${item.altText}`} itemId={idx} className="relative">
      <div className="view hm-black-light">
        <img className="d-block w-100" style={{ maxHeight: '300px', minHeight: '300px' }} src={props.image ? props.image : item.image} alt={item.alt} />
        <div className="mask" />
      </div>
      <CarouselCaption className="centerElementYInRelative" >
        <h4 className={`h4-responsive ${props.arrayDepth === 1 ? 'single' : 'multi'}`}>
          {
            props.arrayDepth === 1
            ? props.title
              ? props.title
              : item.title
            : props.arrayDepth === 2
              ? item.comment
              : null
          }
        </h4>
        <p className={`h4-responsive ${props.arrayDepth === 1 ? 'multi' : 'single'}`}>
          {
            props.arrayDepth === 1
            ? props.descriptionSumm
              ? props.descriptionSumm
              : item.descriptionSumm
            : props.arrayDepth === 2
              ? `- ${item.User.userName}`
              : null
          }
        </p>
      </CarouselCaption>
    </CarouselItem>
  ));

  return (
    <Col lg="4" xs="11" className="mx-auto">
      <Carousel
        activeItem={props.activeItem}
        next={props.nextA}
        className="z-depth-4 section-box"
        datainterval={props.datainterval}
      >
        <CarouselInner>
          {slides}
        </CarouselInner>
        <CarouselControl direction="prev" directionText="Previous" onClick={props.prev} />
        <CarouselControl direction="next" directionText="Next" onClick={props.next} />
      </Carousel>
    </Col>
  );
};

carouselComponent.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  activeItem: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  nextA: PropTypes.func.isRequired,
  descriptionSumm: PropTypes.string,
  arrayDepth: PropTypes.number.isRequired,
  datainterval: PropTypes.number.isRequired,
};

carouselComponent.defaultProps = {
  items: null,
  title: null,
  image: null,
  descriptionSumm: null,
};

export default carouselComponent;
