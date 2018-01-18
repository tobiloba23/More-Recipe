import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';
import RecipeCards from '../RecipeCards/RecipeCards';

const recipesList = (props) => {
  return (
    <div className="layerText mb-2">
      <SectionTitle id="recipesList" destination="favourites" title="Latest Recipe Uploads" />
      <RecipeCards items={props.items} upvote={props.upvote} downvote={props.downvote}/>
    </div>
  );
};

export default recipesList;