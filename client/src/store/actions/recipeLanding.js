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

export const fetchLatestRecipes = (offset = 0, recipes = null) => (dispatch) => {
  dispatch(fetchLatestRecipesStart());
  const options = localStorage.getItem('token') ? {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  } : {};
  axios.get(`/recipes?sort=createdAt&order=desc&offset=${offset}`, options)
    .then((response) => {
      const latestRecipes = recipes || [];
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

export const fetctRecipDetailssStart = () => ({
  type: actionTypes.FETCH_RECIPE_DETAILS_START,
});

export const fetchRecipeDetailsSuccess = (recipe, isAuthenticated) => ({
  type: actionTypes.FETCH_RECIPE_DETAILS_SUCCESS,
  recipe,
  isAuthenticated,
});

export const fetchRecipeDetailsFailed = error => ({
  type: actionTypes.FETCH_RECIPE_DETAILS_FAILED,
  error,
});

export const closeModal = () => ({
  type: actionTypes.CLOSE_DETAILS_MODAL,
});

export const fetchRecipeDetails = (prevModalRecipe, recipeId) => (dispatch) => {
  dispatch(fetctRecipDetailssStart());
  const isAuthenticated = !!localStorage.getItem('token');
  if (!(prevModalRecipe && prevModalRecipe.recipeId === recipeId)) {
    const options = localStorage.getItem('token') ? {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    } : {};
    axios.get(`/recipes/${recipeId}/reviews?sort=createdAt&order=desc`, options)
      .then((response) => {
        console.log(response);
        const recipe = response.data.data;
        dispatch(fetchRecipeDetailsSuccess(recipe, isAuthenticated));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchRecipeDetailsFailed(error.response ? error.response.data.error : error));
      });
  } else {
    dispatch(fetchRecipeDetailsSuccess(prevModalRecipe, isAuthenticated));
  }
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

export const registerReviewOnServerSuccess = () => ({
  type: actionTypes.REGISTER_REVIEW_ON_SERVER_SUCCESS,
});

export const updateRecipeReview = (recipeIndex, recipe) => ({
  type: actionTypes.UPDATE_RECIPE_REVIEW,
  activeRecipe: recipeIndex,
  recipe,
});

export const registerReviewOnServerFailed = error => ({
  type: actionTypes.REGISTER_REVIEW_ON_SERVER_FAILED,
  error,
});

export const vote = (recipeId, recipeIndex, votedUp, comment) => (dispatch) => {
  if (votedUp === true || votedUp === false) {
    dispatch(displayVoteOnActiveRecipe(recipeIndex, votedUp));
  }
  const options = localStorage.getItem('token') ? {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  } : {};
  const review = {
    vote: votedUp,
    comment,
  };
  axios.post(`/recipes/${recipeId}/reviews`, review, options)
    .then((response) => {
      console.log(response);
      dispatch(registerReviewOnServerSuccess());
      if (comment) dispatch(updateRecipeReview(recipeIndex, response.data.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(registerReviewOnServerFailed(error.response ? error.response.data.error : error));
    });
};
