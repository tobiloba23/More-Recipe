import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const fetchLatestRecipesStart = () => ({
  type: actionTypes.FETCH_LATEST_RECIPES_START,
});

export const fetchLatestRecipesSuccess = (latestRecipes, isAuthenticated) => ({
  type: actionTypes.FETCH_LATEST_RECIPES_SUCCESS,
  latestRecipes,
  isAuthenticated,
});

export const fetchLatestRecipesFailed = error => ({
  type: actionTypes.FETCH_LATEST_RECIPES_FAILED,
  error,
});

export const fetchLatestRecipes = () => (dispatch) => {
  dispatch(fetchLatestRecipesStart());
  const options = localStorage.getItem('token') ? {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  } : {};
  axios.get('/recipes?sort=createdAt&order=desc', options)
    .then((response) => {
      const latestRecipes = [];
      console.log(response);
      Object.keys(response.data.data).forEach((key) => {
        latestRecipes.push({
          ...response.data.data[key],
          id: key,
        });
      });
      const isAuthenticated = !!localStorage.getItem('token');
      dispatch(fetchLatestRecipesSuccess(latestRecipes, isAuthenticated));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchLatestRecipesFailed(error.response ? error.response.data.error : error));
    });
};

export const nextOuterCarousel = () => ({
  type: actionTypes.NEXT_OUTER_CAROUSEL,
});

export const prevOuterCarousel = () => ({
  type: actionTypes.PREV_OUTER_CAROUSEL,
});

export const nextInnerCarousel = () => ({
  type: actionTypes.NEXT_INNER_CAROUSEL,
});

export const prevInnerCarousel = () => ({
  type: actionTypes.PREV_INNER_CAROUSEL,
});

export const goToCarouselIndex = () => ({
  type: actionTypes.GOTO_CAROUSEL_INDEX,
});

export const fetchPopularRecipesStart = () => ({
  type: actionTypes.FETCH_POPULAR_RECIPES_START,
});

export const fetchPopularRecipesSuccess = (popularRecipes, isAuthenticated) => ({
  type: actionTypes.FETCH_POPULAR_RECIPES_SUCCESS,
  popularRecipes,
  isAuthenticated,
});

export const fetchPopularRecipesFailed = error => ({
  type: actionTypes.FETCH_POPULAR_RECIPES_FAILED,
  error,
});

export const fetchPopularRecipes = () => (dispatch) => {
  dispatch(fetchPopularRecipesStart());
  const options = localStorage.getItem('token') ? {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  } : {};
  axios.get('/recipes?sort=upvotes&order=desc&count=3&withReviews=true', options)
    .then((response) => {
      const popularRecipes = [];
      console.log(response);
      Object.keys(response.data.data).forEach((key) => {
        popularRecipes.push({
          ...response.data.data[key],
          id: key,
        });
      });
      const isAuthenticated = !!localStorage.getItem('token');
      dispatch(fetchPopularRecipesSuccess(popularRecipes, isAuthenticated));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchPopularRecipesFailed(error.response ? error.response.data.error : error));
    });
};

export const displayVoteOnActiveRecipe = (recipeIndex, votedUp) => ({
  type: actionTypes.DISPLAY_VOTE_ON_ACTIVE_RECIPE,
  activeRecipe: recipeIndex,
  votedUp,
});

export const registerVoteOnServerSuccess = () => ({
  type: actionTypes.REGISTER_VOTE_ON_SERVER_SUCCESS,
});

export const registerVoteOnServerFailed = error => ({
  type: actionTypes.REGISTER_VOTE_ON_SERVER_FAILED,
  error,
});

export const vote = (recipeId, recipeIndex, votedUp) => (dispatch) => {
  dispatch(displayVoteOnActiveRecipe(recipeIndex, votedUp));
  const options = localStorage.getItem('token') ? {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  } : {};
  const review = {
    vote: votedUp,
  };
  axios.post(`/recipes/${recipeId}/reviews`, review, options)
    .then((response) => {
      console.log(response);
      dispatch(registerVoteOnServerSuccess());
    })
    .catch((error) => {
      console.log(error);
      dispatch(registerVoteOnServerFailed(error.response ? error.response.data.error : error));
    });
};
