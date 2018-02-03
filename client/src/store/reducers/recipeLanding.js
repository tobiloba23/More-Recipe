import update from 'react-addons-update';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  latestRecipes: null,
  loading: false,
  error: false,
  isAuthenticated: false
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
              [action.numOfReviews]: action.review
            }
          }
        }
      };
    case actionTypes.REMOVE_REVIEW:
      return {
        ...state,
        latestRecipes: {
          ...state.latestRecipes,
          [action.recipeName]: {
            ...state.latestRecipes[action.recipeName],
            recipeReviews: {
              [action.numOfReviews]: null
            }
          }
        }
      };
      case actionTypes.DISPLAY_VOTE_ON_ACTIVE_RECIPE:
        return update(state, {
          latestRecipes: {
            [action.activeRecipe]: {
              upvotes: {$set: 
                action.votedUp && !state.latestRecipes[action.activeRecipe].currentUserHasUpVoted
                ? state.latestRecipes[action.activeRecipe].upvotes + 1 : 
                  (!action.votedUp && state.latestRecipes[action.activeRecipe].currentUserHasUpVoted)
                  || (action.votedUp && state.latestRecipes[action.activeRecipe].currentUserHasUpVoted)
                  ? state.latestRecipes[action.activeRecipe].upvotes - 1 : 
                    state.latestRecipes[action.activeRecipe].upvotes
              },
              currentUserHasUpVoted: {$set:
                action.votedUp && !state.latestRecipes[action.activeRecipe].currentUserHasUpVoted
                ? true : 
                  (!action.votedUp && state.latestRecipes[action.activeRecipe].currentUserHasUpVoted)
                  || (action.votedUp && state.latestRecipes[action.activeRecipe].currentUserHasUpVoted)
                  ? false : 
                    state.latestRecipes[action.activeRecipe].currentUserHasUpVoted
              },
              downvotes: {$set:
                !action.votedUp && !state.latestRecipes[action.activeRecipe].currentUserHasDownVoted
                ? state.latestRecipes[action.activeRecipe].downvotes + 1 : 
                  (action.votedUp && state.latestRecipes[action.activeRecipe].currentUserHasDownVoted)
                  || (!action.votedUp && state.latestRecipes[action.activeRecipe].currentUserHasDownVoted)
                  ? state.latestRecipes[action.activeRecipe].downvotes - 1 : 
                    state.latestRecipes[action.activeRecipe].downvotes
              },
              currentUserHasDownVoted: {$set:
                !action.votedUp && !state.latestRecipes[action.activeRecipe].currentUserHasDownVoted
                ? true : 
                  (action.votedUp && state.latestRecipes[action.activeRecipe].currentUserHasDownVoted)
                  || (!action.votedUp && state.latestRecipes[action.activeRecipe].currentUserHasDownVoted)
                  ? false : 
                    state.latestRecipes[action.activeRecipe].currentUserHasDownVoted
              },
            }
          }
        });
    case actionTypes.REGISTER_VOTE_ON_SERVER_SUCCESS:
      return {
        ...state
      };
    case actionTypes.REGISTER_VOTE_ON_SERVER_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.FETCH_LATEST_RECIPES_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_LATEST_RECIPES_SUCCESS:
      return {
        ...state,
        latestRecipes: action.latestRecipes,
        loading: false,
        isAuthenticated: action.isAuthenticated
      };
    case actionTypes.FETCH_LATEST_RECIPES_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
