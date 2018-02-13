import React from 'react';

import SectionTitle from '../../UI/SectionTitle/SectionTitle';
import RecipeCards from '../../UI/RecipeCards/RecipeCards';
import Spinner from '../../../components/UI/Spinner/Spinner';

const recipesList = (props) => {
  return (
    <div className="layerText mb-2">
      <SectionTitle id="recipesList" destination="favourites" title="Latest Recipe Uploads" />
      {
        props.items ? 
          <RecipeCards
            isAuthenticated={props.isAuthenticated}
            items={props.items}
            vote={props.vote}
          />
        : <Spinner />
      }
    </div>
  );
};

export default recipesList;