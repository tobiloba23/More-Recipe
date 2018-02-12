import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Mask from '../../components/UI/Mask/Mask';
import LandingMask from '../../components/RecipeLanding/LandingMask/LandingMask';
import JoinUs from '../../components/RecipeLanding/JoinUs/JoinUs';
import PopularRecipes from '../../components/RecipeLanding/PopularRecipes/PopularRecipes';
import RecipesList from '../../components/RecipeLanding/RecipesList/RecipesList';

import classes from '../../components/UI/Mask/Mask.css';
import * as actions from '../../store/actions/index';

class RecipeLanding extends Component {
  componentDidMount() {
    this.props.onFetchLatestRecipes();
    this.props.onFetchPopularRecipes();
  };

  constructor(props) {
    super(props);
    props.setPage('Landing');
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.nextInnerCarousel = this.nextInnerCarousel.bind(this);
    this.prevInnerCarousel = this.prevInnerCarousel.bind(this);
  };

  next = () => {
    this.props.onNext();
  };

  prev = () => {
    this.props.onPrev();
  };

  nextInnerCarousel = () => {
    this.props.onNextInnerCarousel();
  };

  prevInnerCarousel = () => {
    this.props.onPrevInnerCarousel();
  };

  goToIndex = (item) => {
    this.props.onGoToIndex();
  };

  vote = (index, upVote) => {
    const id = this.props.latestRecipes[index].recipeId;
    this.props.onVoteRecipe(id, index, upVote);
  };

  render() {
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
        <PopularRecipes
          items={this.props.carouselRecipes ? this.props.carouselRecipes.popularRecipes : ''}
          activeItem={this.props.carouselRecipes ? this.props.carouselRecipes.activeRecipe : ''}
          next={this.next}
          prev={this.prev}
          goToIndex={this.goToIndex}
          nextInnerCarousel={this.nextInnerCarousel}
          prevInnerCarousel={this.prevInnerCarousel}
        />
        <JoinUs />
      </Aux>
    );
  }
};

const mapReduxStateToCompProps = state => {
  return {
    latestRecipes: state.recipeLanding.latestRecipes,
    carouselRecipes: state.recipeLanding.carouselRecipes,
    error: state.recipeLanding.error,
    loadingLatest: state.recipeLanding.loadingLatest,
    loadingPopular: state.recipeLanding.loadingPopular,
    isAuthenticated: state.recipeLanding.isAuthenticated
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLatestRecipes: () => dispatch(actions.fetchLatestRecipes()),
    onFetchPopularRecipes: () => dispatch(actions.fetchPopularRecipes()),
    onVoteRecipe: (recipeId, recipeIndex, upVote) => dispatch(actions.vote(recipeId, recipeIndex, upVote)),
    onNext: () => dispatch(actions.nextOuterCarousel()),
    onPrev: () => dispatch(actions.prevOuterCarousel()),
    onNextInnerCarousel: () => dispatch(actions.nextInnerCarousel()),
    onPrevInnerCarousel: () => dispatch(actions.prevInnerCarousel()),
    onGoToIndex: (item) => dispatch(actions.goToCarouselIndex())
  }
}

export default connect(mapReduxStateToCompProps, mapDispatchToProps)((RecipeLanding));
