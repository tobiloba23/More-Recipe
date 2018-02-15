import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux/Aux';
import Mask from '../../components/UI/Mask/Mask';
import LandingMask from '../../components/RecipeLanding/LandingMask/LandingMask';
import JoinUs from '../../components/RecipeLanding/JoinUs/JoinUs';
import PopularRecipes from '../../components/RecipeLanding/PopularRecipes/PopularRecipes';
import RecipesList from '../../components/RecipeLanding/RecipesList/RecipesList';

import classes from '../../components/UI/Mask/Mask.css';
import * as actions from '../../store/actions/index';

let carousel = null;

class RecipeLanding extends Component {
  constructor(props) {
    super(props);
    props.setPage('Landing');
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.nextInnerCarousel = this.nextInnerCarousel.bind(this);
    this.prevInnerCarousel = this.prevInnerCarousel.bind(this);
    this.vote = this.prev.bind(this);
  }

  componentDidMount() {
    this.props.onFetchLatestRecipes();
    this.props.onFetchPopularRecipes();
  }

  componentWillUnmount() {
    carousel = null;
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

  vote(index, upVote) {
    const id = this.props.latestRecipes[index].recipeId;
    this.props.onVoteRecipe(id, index, upVote);
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
    return (
      <Aux>
        <div className="mb-2">
          <Mask backImage={classes.intro} className="mb-2">
            <LandingMask />
          </Mask>
        </div>
        <RecipesList
          items={this.props.latestRecipes}
          isAuthenticated={this.props.isAuthenticated}
          vote={this.vote}
        />
        {carousel}
        <JoinUs />
      </Aux>
    );
  }
}

RecipeLanding.propTypes = {
  // eslint-disable-next-line
  carouselRecipes: PropTypes.object,
  latestRecipes: PropTypes.arrayOf(PropTypes.object),
  // loadingLatest: PropTypes.bool.isRequired,
  // loadingPopular: PropTypes.bool.isRequired,
  // error: PropTypes.bool.isRequired,
  setPage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onFetchLatestRecipes: PropTypes.func.isRequired,
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
};

const mapReduxStateToCompProps = state => ({
  latestRecipes: state.recipeLanding.latestRecipes,
  carouselRecipes: state.recipeLanding.carouselRecipes,
  error: state.recipeLanding.error,
  loadingLatest: state.recipeLanding.loadingLatest,
  loadingPopular: state.recipeLanding.loadingPopular,
  isAuthenticated: state.recipeLanding.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  onFetchLatestRecipes: () => dispatch(actions.fetchLatestRecipes()),
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
