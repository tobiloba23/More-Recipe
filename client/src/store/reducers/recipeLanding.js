/* eslint no-nested-ternary: "off" */
import update from 'react-addons-update';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  latestRecipes: null,
  carouselRecipes: null,
  loadingLatest: false,
  loadingPopular: false,
  error: false,
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REVIEW:
      return {
        ...state,
        latestRecipes: {
          ...state.latestRecipes,
          [action.recipeName]: {
            ...state.latestRecipes[action.recipeName],
            recipeReviews: {
              [action.numOfReviews]: action.review,
            },
          },
        },
      };
    case actionTypes.REMOVE_REVIEW:
      return {
        ...state,
        latestRecipes: {
          ...state.latestRecipes,
          [action.recipeName]: {
            ...state.latestRecipes[action.recipeName],
            recipeReviews: {
              [action.numOfReviews]: null,
            },
          },
        },
      };
    case actionTypes.DISPLAY_VOTE_ON_ACTIVE_RECIPE:
      return update(state, {
        latestRecipes: {
          [action.activeRecipe]: {
            upvotes: {
              $set:
                action.votedUp && !state.latestRecipes[action.activeRecipe].currentUserHasUpVoted
                  ? state.latestRecipes[action.activeRecipe].upvotes + 1
                  : (
                    (!action.votedUp &&
                    state.latestRecipes[action.activeRecipe].currentUserHasUpVoted)
                    || (action.votedUp
                    && state.latestRecipes[action.activeRecipe].currentUserHasUpVoted)
                      ? state.latestRecipes[action.activeRecipe].upvotes - 1 :
                      state.latestRecipes[action.activeRecipe].upvotes
                  ),
            },
            currentUserHasUpVoted: {
              $set:
                action.votedUp && !state.latestRecipes[action.activeRecipe].currentUserHasUpVoted
                  ? true
                  : (
                    (!action.votedUp
                    && state.latestRecipes[action.activeRecipe].currentUserHasUpVoted)
                    || (action.votedUp
                    && state.latestRecipes[action.activeRecipe].currentUserHasUpVoted)
                      ? false
                      : state.latestRecipes[action.activeRecipe].currentUserHasUpVoted
                  ),
            },
            downvotes: {
              $set:
                !action.votedUp && !state.latestRecipes[action.activeRecipe].currentUserHasDownVoted
                  ? state.latestRecipes[action.activeRecipe].downvotes + 1
                  : (
                    (action.votedUp
                    && state.latestRecipes[action.activeRecipe].currentUserHasDownVoted)
                    || (!action.votedUp
                    && state.latestRecipes[action.activeRecipe].currentUserHasDownVoted)
                      ? state.latestRecipes[action.activeRecipe].downvotes - 1
                      : state.latestRecipes[action.activeRecipe].downvotes
                  ),
            },
            currentUserHasDownVoted: {
              $set:
                !action.votedUp && !state.latestRecipes[action.activeRecipe].currentUserHasDownVoted
                  ? true
                  : (
                    (action.votedUp
                    && state.latestRecipes[action.activeRecipe].currentUserHasDownVoted)
                    || (!action.votedUp
                    && state.latestRecipes[action.activeRecipe].currentUserHasDownVoted)
                      ? false :
                      state.latestRecipes[action.activeRecipe].currentUserHasDownVoted
                  ),
            },
          },
        },
      });
    case actionTypes.REGISTER_VOTE_ON_SERVER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.REGISTER_VOTE_ON_SERVER_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.FETCH_LATEST_RECIPES_START:
      return {
        ...state,
        loadingLatest: true,
      };
    case actionTypes.FETCH_LATEST_RECIPES_SUCCESS:
      return {
        ...state,
        latestRecipes: action.latestRecipes,
        loadingLatest: false,
        isAuthenticated: action.isAuthenticated,
      };
    case actionTypes.FETCH_LATEST_RECIPES_FAILED:
      return {
        ...state,
        loadingLatest: false,
        error: true,
      };
    case actionTypes.FETCH_POPULAR_RECIPES_START:
      return {
        ...state,
        loadingPopular: true,
      };
    case actionTypes.FETCH_POPULAR_RECIPES_SUCCESS:
      return {
        ...state,
        carouselRecipes: {
          maxLength: 3,
          activeRecipe: 0,
          popularRecipes: [
            {
              id: 0,
              activeReview: 0,
              maxLength: action.popularRecipes[0].recipeReviews.length,
              altText: 'Slide 1',
              caption: 'Slide 1',
              title: action.popularRecipes[0].title,
              descriptionSumm: action.popularRecipes[0].description,
              image: action.popularRecipes[0].imageUrl,
              recipeReviews: action.popularRecipes[0].recipeReviews,
            },
            {
              id: 1,
              activeReview: 0,
              maxLength: action.popularRecipes[1].recipeReviews.length,
              altText: 'Slide 2',
              caption: 'Slide 2',
              title: action.popularRecipes[1].title,
              descriptionSumm: action.popularRecipes[1].description,
              image: action.popularRecipes[1].imageUrl,
              recipeReviews: action.popularRecipes[1].recipeReviews,
            },
            {
              id: 2,
              activeReview: 0,
              maxLength: action.popularRecipes[2].recipeReviews.length,
              altText: 'Slide 3',
              caption: 'Slide 3',
              title: action.popularRecipes[2].title,
              descriptionSumm: action.popularRecipes[2].description,
              image: action.popularRecipes[2].imageUrl,
              recipeReviews: action.popularRecipes[2].recipeReviews,
            },
          ],
        },
        loadingPopular: false,
      };
    case actionTypes.FETCH_POPULAR_RECIPES_FAILED:
      return {
        ...state,
        loadingPopular: false,
        error: true,
      };
    case actionTypes.NEXT_OUTER_CAROUSEL:
      return {
        ...state,
        carouselRecipes: state.carouselRecipes
          ? {
            ...state.carouselRecipes,
            activeRecipe:
              (state.carouselRecipes.activeRecipe + 1 > state.carouselRecipes.maxLength - 1) ?
                0 : state.carouselRecipes.activeRecipe + 1,
          }
          : null,
      };
    case actionTypes.PREV_OUTER_CAROUSEL:
      return {
        ...state,
        carouselRecipes: state.carouselRecipes
          ? {
            ...state.carouselRecipes,
            activeRecipe:
              (state.carouselRecipes.activeRecipe - 1 < 0) ?
                state.carouselRecipes.maxLength - 1 : state.carouselRecipes.activeRecipe - 1,
          }
          : null,
      };
    case actionTypes.NEXT_INNER_CAROUSEL:
      return update(state, {
        carouselRecipes: state.carouselRecipes
          ? {
            popularRecipes: {
              [state.carouselRecipes.activeRecipe]: {
                activeReview: {
                  $set: (
                    state.carouselRecipes.popularRecipes[
                      state.carouselRecipes.activeRecipe
                    ].activeReview
                    >
                    state.carouselRecipes.popularRecipes[
                      state.carouselRecipes.activeRecipe
                    ].maxLength - 2)
                    ? 0 :
                    state.carouselRecipes.popularRecipes[
                      state.carouselRecipes.activeRecipe
                    ].activeReview + 1,
                },
              },
            },
          }
          : null,
      });
    case actionTypes.PREV_INNER_CAROUSEL:
      return update(state, {
        carouselRecipes: state.carouselRecipes
          ? {
            popularRecipes: {
              [state.carouselRecipes.activeRecipe]: {
                activeReview: {
                  $set: (
                    state.carouselRecipes.popularRecipes[
                      state.carouselRecipes.activeRecipe
                    ].activeReview < 0)
                    ?
                    state.carouselRecipes.popularRecipes[
                      state.carouselRecipes.activeRecipe
                    ].maxLength - 1
                    :
                    state.carouselRecipes.popularRecipes[
                      state.carouselRecipes.activeRecipe
                    ].activeReview - 1,
                },
              },
            },
          }
          : null,
      });
    case actionTypes.GOTO_CAROUSEL_INDEX:
      return {
        ...state,
        carouselRecipes: state.carouselRecipes
          ? {
            ...state.carouselRecipes,
            popularRecipes: {
            },
          }
          : null,
      };
    default:
      return state;
  }
};

export default reducer;
