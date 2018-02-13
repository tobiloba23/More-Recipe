import React from 'react';
import { Fa } from 'mdbreact';

const maskLink = (props) => {
  return (
    <a href={props.mailto ? `mailto:${props.mailto}` : `https://${props.linkto}`} style={{margin: '0px 2px'}}>
      <Fa className={props.faIconName} style={{fontSize: "2em", color: props.color}}></Fa>
    </a>
  );
}

export default maskLink;
