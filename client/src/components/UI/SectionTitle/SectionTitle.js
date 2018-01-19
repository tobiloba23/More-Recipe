import React from 'react';

import { Link } from 'react-scroll';

const sectionTitle = ( props ) => {
  return (
    <div className="text-center">
      <h2 id={props.id} className="mb-2 font-weight-bold">
        {props.title}
        <Link to={props.destination} offset={-70} className="layerColor btn btn-secondary-outline btn-sm" role="button" smooth={'easeInOutQuart'} duration={600} >&darr;</Link>
      </h2>
    </div>
  );
};

export default sectionTitle;
