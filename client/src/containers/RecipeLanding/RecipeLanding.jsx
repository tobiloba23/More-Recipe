import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'mdbreact';

import Aux from '../../hoc/Aux/Aux';
import Mask from '../../components/UI/Mask/Mask';
import LandingMask from '../../components/RecipeLanding/LandingMask/LandingMask';
import JoinUs from '../../components/RecipeLanding/JoinUs/JoinUs';
import PopularRecipes from '../../components/RecipeLanding/PopularRecipes/PopularRecipes';
import RecipesList from '../../components/RecipeLanding/RecipesList/RecipesList';
import Modal from '../../components/UI/Modal/Modal';
import RecipeDetail from '../../components/RecipeLanding/RecipeDetail/RecipeDetail';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from '../../components/UI/Mask/Mask.css';
import * as actions from '../../store/actions/index';

let carousel = null;
let recipeDetail = null;
let seeMoreButton = null;

class RecipeLanding extends Component {
  constructor(props) {
    super(props);
    props.setPage('Landing');
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.nextInnerCarousel = this.nextInnerCarousel.bind(this);
    this.prevInnerCarousel = this.prevInnerCarousel.bind(this);
    this.vote = this.vote.bind(this);
    this.seeMoreLatestRecipes = this.seeMoreLatestRecipes.bind(this);
    this.showRecipeDetailHandler = this.showRecipeDetailHandler.bind(this);
    this.modalCloseHandler = this.modalCloseHandler.bind(this);
  }

  componentDidMount() {
    this.props.onFetchLatestRecipes();
    this.props.onFetchPopularRecipes();
  }

  componentWillUnmount() {
    carousel = null;
  }

  seeMoreLatestRecipes() {
    if (this.props.latestRecipes) {
      this.props.onFetchLatestRecipes(this.props.latestRecipes.length, this.props.latestRecipes);
    }
  }

  showRecipeDetailHandler(recipeId) {
    const prevModalRecipe = this.props.recipe;
    this.props.onFetchRecipeDetails(prevModalRecipe, recipeId);
  }

  modalCloseHandler() {
    this.props.onModalClose();
  }

  next() {
    if (carousel) this.props.onNext();
  }

  prev() {
    if (carousel) this.props.onPrev();
  }

  nextInnerCarousel() {
    if (carousel) this.props.onNextInnerCarousel();
  }

  prevInnerCarousel() {
    if (carousel) this.props.onPrevInnerCarousel();
  }

  goToIndex(item) {
    if (carousel) this.props.onGoToIndex(item);
  }

  vote(index = null, recipeId = null, upVote) {
    let idx = index;
    const id = recipeId || this.props.latestRecipes[index].recipeId;
    if (!index) {
      Object.keys(this.props.latestRecipes).forEach((key) => {
        if (this.props.latestRecipes[key].recipeId === recipeId) idx = key;
      });
    }
    this.props.onVoteRecipe(id, idx, upVote);
  }

  render() {
    carousel = (
      <PopularRecipes
        items={this.props.carouselRecipes ? this.props.carouselRecipes.popularRecipes : null}
        activeItem={this.props.carouselRecipes ? this.props.carouselRecipes.activeRecipe : null}
        next={this.next}
        prev={this.prev}
        goToIndex={this.goToIndex}
        nextInnerCarousel={this.nextInnerCarousel}
        prevInnerCarousel={this.prevInnerCarousel}
      />
    );
    recipeDetail = this.props.showRecipeDetail
      ? (
        <RecipeDetail
          recipe={this.props.recipe}
          toggle={this.modalCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
          vote={this.vote}
        />
      )
      : null;
    seeMoreButton = this.props.loadingLatest
      ? this.props.latestRecipes
        ? <Spinner />
        : null
      : (
        <NavLink
          onClick={() => this.seeMoreLatestRecipes()}
          className="btn btn-outline-white buttonsColor mb-2"
          style={{ minWidth: '90%', backgroundColor: '#c0bebe', color: '#3d3d3d' }}
        >-- See more --
        </NavLink>
      );
    return (
      <Aux>
        <div className="mb-2">
          <Mask backImage={classes.intro} className="mb-2">
            <LandingMask />
          </Mask>
        </div>
        <Modal
          show={this.props.showRecipeDetail}
          modalClosed={this.modalCloseHandler}
        >
          {recipeDetail}
        </Modal>
        <RecipesList
          items={this.props.latestRecipes}
          isAuthenticated={this.props.isAuthenticated}
          vote={this.vote}
          showDetail={this.showRecipeDetailHandler}
        />
        {seeMoreButton}
        {carousel}
        <JoinUs />
      </Aux>
    );
  }
}

RecipeLanding.propTypes = {
  carouselRecipes: PropTypes.objectOf(PropTypes.any),
  latestRecipes: PropTypes.arrayOf(PropTypes.object),
  loadingLatest: PropTypes.bool.isRequired,
  // loadingPopular: PropTypes.bool.isRequired,
  // error: PropTypes.bool.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any),
  showRecipeDetail: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onFetchLatestRecipes: PropTypes.func.isRequired,
  onFetchRecipeDetails: PropTypes.func.isRequired,
  onFetchPopularRecipes: PropTypes.func.isRequired,
  onVoteRecipe: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNextInnerCarousel: PropTypes.func.isRequired,
  onPrevInnerCarousel: PropTypes.func.isRequired,
  onGoToIndex: PropTypes.func.isRequired,
};

RecipeLanding.defaultProps = {
  carouselRecipes: null,
  latestRecipes: null,
  recipe: null,
};

const mapReduxStateToCompProps = state => ({
  latestRecipes: state.recipeLanding.latestRecipes,
  recipe: state.recipeLanding.recipe,
  carouselRecipes: state.recipeLanding.carouselRecipes,
  error: state.recipeLanding.error,
  loadingLatest: state.recipeLanding.loadingLatest,
  loadingPopular: state.recipeLanding.loadingPopular,
  isAuthenticated: state.recipeLanding.isAuthenticated,
  showRecipeDetail: state.recipeLanding.showRecipeDetail,
});

const mapDispatchToProps = dispatch => ({
  onFetchLatestRecipes: (offset = 0, recipes = null) =>
    dispatch(actions.fetchLatestRecipes(offset, recipes)),
  onFetchRecipeDetails: (prevModalRecipe, recipeId) =>
    dispatch(actions.fetchRecipeDetails(prevModalRecipe, recipeId)),
  onModalClose: () => dispatch(actions.closeModal()),
  onFetchPopularRecipes: () => dispatch(actions.fetchPopularRecipes()),
  onVoteRecipe: (
    recipeId,
    recipeIndex,
    upVote,
  ) => dispatch(actions.vote(recipeId, recipeIndex, upVote)),
  onNext: () => dispatch(actions.nextOuterCarousel()),
  onPrev: () => dispatch(actions.prevOuterCarousel()),
  onNextInnerCarousel: () => dispatch(actions.nextInnerCarousel()),
  onPrevInnerCarousel: () => dispatch(actions.prevInnerCarousel()),
  onGoToIndex: item => dispatch(actions.goToCarouselIndex(item)),
});

export default connect(mapReduxStateToCompProps, mapDispatchToProps)((RecipeLanding));
