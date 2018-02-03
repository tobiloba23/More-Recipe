import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Mask from '../../components/UI/Mask/Mask';
import LandingMask from '../../components/RecipeLanding/LandingMask/LandingMask';
import JoinUs from '../../components/RecipeLanding/JoinUs/JoinUs';
import PopularRecipes from '../../components/RecipeLanding/PopularRecipes/PopularRecipes';
import RecipesList from '../../components/RecipeLanding/RecipesList/RecipesList';
import pasta from '../../assets/images/background.png';
import poundedYam from '../../assets/images/pounded_yam.jpg';
import bbqWings from '../../assets/images/wings-bbq.jpg';
import transparent from '../../assets/images/asfalt-light.png';
import rickBanks from '../../assets/images/Reekado-Banks.jpg';

import classes from '../../components/UI/Mask/Mask.css';
import * as actions from '../../store/actions/index';

class RecipeLanding extends Component {
  componentDidMount() {
    this.props.onFetchLatestRecipes();
  };

  constructor(props) {
    super(props);
    props.setPage('Landing');
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.nextInnerCarousel = this.nextInnerCarousel.bind(this);
    this.prevInnerCarousel = this.prevInnerCarousel.bind(this);
    this.state = {
      maxLength: 3,
      activeRecipe: 0,
      popularRecipes: [
        {
          id: 0,
          activeReview: 0,
          maxLength: 3,
          title: 'BBQ Wings',
          descriptionSumm: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum.',
          recipeReviews: [
            {
              id: 0,
              image: transparent,
              review: '"The chicken wings Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- Rickie'
            },
            {
              id: 1,
              image: transparent,
              review: '"The chicken wings Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- papikay'
            },
            {
              id: 2,
              image: transparent,
              review: '"The chicken wings Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- GraciousJane'
            }
          ],
          image: bbqWings,
          altText: 'Slide 1',
          caption: 'Slide 1',
        },
        {
          id: 1,
          activeReview: 0,
          maxLength: 3,
          title: 'Pasta',
          descriptionSumm: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum.',
          recipeReviews: [
            {
              id: 0,
              image: transparent,
              review: '"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- Michaelangelo'
            },
            {
              id: 1,
              image: transparent,
              review: '"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- Dominiq'
            },
            {
              id: 2,
              image: transparent,
              review: '"The pasta Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- Juwon'
            }
          ],
          image: pasta,
          altText: 'Slide 2',
          caption: 'Slide 2'
        },
        {
          id: 2,
          activeReview: 0,
          maxLength: 3,
          title: 'Pounded Yam',
          descriptionSumm: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia sit dolorem autem qui possimus ex voluptate, voluptatibus iste unde numquam illum.',
          recipeReviews: [
            {
              id: 0,
              image: transparent,
              review: '"The pounded yam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- Anuoluwa'
            },
            {
              id: 1,
              image: transparent,
              review: '"The pounded yam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- Adams49'
            },
            {
              id: 2,
              image: transparent,
              review: '"The pounded yam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum mollitia ex voluptate, voluptatibus iste unde numquam illum, molestiae reprehenderit, eligendi. Illum quod esse voluptatibus."',
              reviewer: '- BabaCash'
            }
          ],
          image: poundedYam,
          altText: 'Slide 3',
          caption: 'Slide 3'
        }
      ]
    };
  };

  next = () => {
    const nextItem = this.state.activeRecipe + 1;
    if (nextItem > this.state.maxLength - 1) {
      this.setState({ activeRecipe: 0 });
    } else {
      this.setState({ activeRecipe: nextItem });
    };
  };

  prev = () => {
    const prevItem = this.state.activeRecipe - 1;
    if (prevItem < 0) {
      this.setState({ activeRecipe: this.state.maxLength - 1 });
    } else {
      this.setState({ activeRecipe: prevItem });
    };
  };

  nextInnerCarousel = () => {
    this.setState(prevState => {
      let newState = prevState;
      if (newState.popularRecipes[this.state.activeRecipe].activeReview > this.state.popularRecipes[this.state.activeRecipe].maxLength - 2) {
        newState.popularRecipes[this.state.activeRecipe].activeReview = 0;
        return newState;
      } else {
        newState.popularRecipes[this.state.activeRecipe].activeReview++;
        return newState;
      }
    });
  };

  prevInnerCarousel = () => {
    this.setState(prevState => {
      let newState = prevState;
      if (newState.popularRecipes[this.state.activeRecipe].activeReview < 0) {
        newState.popularRecipes[this.state.activeRecipe].activeReview = this.state.popularRecipes[this.state.activeRecipe].maxLength - 1;
        return newState;
      } else {
        newState.popularRecipes[this.state.activeRecipe].activeReview--;
        return newState;
      }
    });
  };

  goToIndex = (item) => {
    if (this.state.activeRecipe !== item) {
      this.setState({
        activeRecipe: item
      });
    };
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
          items={this.state.popularRecipes}
          activeItem={this.state.activeRecipe}
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
    error: state.recipeLanding.error,
    loading: state.recipeLanding.loading,
    isAuthenticated: state.recipeLanding.isAuthenticated
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLatestRecipes: () => dispatch(actions.fetchLatestRecipes()),
    onVoteRecipe: (recipeId, recipeIndex, upVote) => dispatch(actions.vote(recipeId, recipeIndex, upVote))
  }
}

export default connect(mapReduxStateToCompProps, mapDispatchToProps)((RecipeLanding));
