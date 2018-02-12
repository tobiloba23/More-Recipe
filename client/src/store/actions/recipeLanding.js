import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const fetchLatestRecipesStart = () => {
  return {
    type: actionTypes.FETCH_LATEST_RECIPES_START
  };
};

export const fetchLatestRecipesSuccess = (latestRecipes, isAuthenticated) => {
  return {
    type: actionTypes.FETCH_LATEST_RECIPES_SUCCESS,
    latestRecipes,
    isAuthenticated
  };
};

export const fetchLatestRecipesFailed = (error) => {
  return {
    type: actionTypes.FETCH_LATEST_RECIPES_FAILED,
    error
  };
};

export const fetchLatestRecipes = () => {
  return dispatch => {
    dispatch(fetchLatestRecipesStart());
    const options = localStorage.getItem('token') ? {
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    } : {};
    axios.get('/recipes?sort=createdAt&order=desc', options)
      .then(response => {
        let latestRecipes = [];
        console.log(response);
        for (let key in response.data.data) {
          latestRecipes.push({
              ...response.data.data[key],
              id: key
          })
        }
        const isAuthenticated = localStorage.getItem('token') ? true : false;
        dispatch(fetchLatestRecipesSuccess(latestRecipes, isAuthenticated));
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchLatestRecipesFailed(error.response ? error.response.data.error : error));
      });
  };
};

export const nextOuterCarousel = () => {
  return {
    type: actionTypes.NEXT_OUTER_CAROUSEL
  };
};

export const prevOuterCarousel = () => {
  return {
    type: actionTypes.PREV_OUTER_CAROUSEL
  };
};

export const nextInnerCarousel = () => {
  return {
    type: actionTypes.NEXT_INNER_CAROUSEL
  };
};

export const prevInnerCarousel = () => {
  return {
    type: actionTypes.PREV_INNER_CAROUSEL
  };
};

export const goToCarouselIndex = () => {
  return {
    type: actionTypes.GOTO_CAROUSEL_INDEX
  };
};

export const fetchPopularRecipesStart = () => {
  return {
    type: actionTypes.FETCH_POPULAR_RECIPES_START
  };
};

export const fetchPopularRecipesSuccess = (popularRecipes, isAuthenticated) => {
  return {
    type: actionTypes.FETCH_POPULAR_RECIPES_SUCCESS,
    popularRecipes,
    isAuthenticated
  };
};

export const fetchPopularRecipesFailed = (error) => {
  return {
    type: actionTypes.FETCH_POPULAR_RECIPES_FAILED,
    error
  };
};

export const fetchPopularRecipes = () => {
  return dispatch => {
    dispatch(fetchPopularRecipesStart());
    const options = localStorage.getItem('token') ? {
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    } : {};
    axios.get('/recipes?sort=upvotes&order=desc&count=3&withReviews=true', options)
      .then(response => {
        let popularRecipes = [];
        console.log(response);
        for (let key in response.data.data) {
          popularRecipes.push({
              ...response.data.data[key],
              id: key
          })
        }
        const isAuthenticated = localStorage.getItem('token') ? true : false;
        dispatch(fetchPopularRecipesSuccess(popularRecipes, isAuthenticated));
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchPopularRecipesFailed(error.response ? error.response.data.error : error));
      });
  };
};

export const displayVoteOnActiveRecipe = (recipeIndex, votedUp) => {
  return {
    type: actionTypes.DISPLAY_VOTE_ON_ACTIVE_RECIPE,
    activeRecipe: recipeIndex,
    votedUp
  };
};

export const registerVoteOnServerSuccess = () => {
  return {
    type: actionTypes.REGISTER_VOTE_ON_SERVER_SUCCESS,
  };
};

export const registerVoteOnServerFailed = (error) => {
  return {
    type: actionTypes.REGISTER_VOTE_ON_SERVER_FAILED,
    error
  };
};

export const vote = (recipeId, recipeIndex, votedUp) => {
  return dispatch => {
    dispatch(displayVoteOnActiveRecipe(recipeIndex, votedUp));
    const options = localStorage.getItem('token') ? {
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    } : {};
    const review = {
      vote: votedUp
    }
    axios.post(`/recipes/${recipeId}/reviews`, review, options)
      .then((response) => {
        console.log(response);
        dispatch(registerVoteOnServerSuccess());
      })
      .catch(error => {
        console.log(error);
        dispatch(registerVoteOnServerFailed(error.response ? error.response.data.error : error));
      });
  };
};
