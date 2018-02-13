import React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselCaption, CarouselInner, Col } from 'mdbreact';

const carouselComponent = (props) => {

  const slides = props.items.map((item, idx) => {
    return (
      <CarouselItem key={idx} itemId={idx} className="relative">
        <div className="view hm-black-light">
          <img className="d-block w-100" style={{maxHeight: '300px', minHeight: '300px'}} src={props.image ? props.image : item.image} alt={item.alt} />
          <div className="mask"></div>
        </div>
        <CarouselCaption className="centerElementYInRelative" >
          <h4 className="h4-responsive">
            {props.arrayDepth === 1 ? 
              props.title ? 
                props.title :
                item.title : 
              props.arrayDepth === 2 ?
                  item.comment :
                null
            }
          </h4>
          <p>
            {props.arrayDepth === 1 ? 
              props.descriptionSumm ? 
                props.descriptionSumm :
                item.descriptionSumm : 
              props.arrayDepth === 2 ?
                  `- ${item.User.userName}` :
                null
            }
          </p>
        </CarouselCaption>
      </CarouselItem>
    );
  });

  return (
    <Col lg="4" xs="11" className="mx-auto">
      <Carousel
        activeItem={props.activeItem}
        next={props.nextA}
        className={`z-depth-4 section-box`}
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

export default carouselComponent;
