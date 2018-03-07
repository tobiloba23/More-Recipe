import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from '../../UI/SectionTitle/SectionTitle';
import RecipeCards from '../../UI/RecipeCards/RecipeCards';
import Spinner from '../../../components/UI/Spinner/Spinner';

const recipesList = props => (
  <div className="layerText mb-2">
    <SectionTitle id="recipesList" destination="favourites" title="Latest Recipe Uploads" />
    {
      props.items
      ? <RecipeCards
        isAuthenticated={props.isAuthenticated}
        items={props.items}
        vote={props.vote}
        showDetail={props.showDetail}
      />
      : <Spinner />
    }
  </div>
);

recipesList.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  showDetail: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

recipesList.defaultProps = {
  items: null,
};

export default recipesList;
