import express from 'express';
// import Controller from '../../controllers';

const router = express.Router();
// const recipesController = Controller.recipes;
// const recipesReviewsController = Controller.recipeReviews;
// const usersController = Controller.usersApi;

router.route('/').get((req, res) => res.status(200).send({
  message: 'Welcome to the More Recipes APP!',
}));

// router.route('/recipes')
//   .get(recipesController.list);
// router.route('/recipes/:recipeId/')
//   .get(recipesController.listOne);

// router.route('/recipes/:recipeId/reviews')
//   .get(recipesReviewsController.list)
// router.route('/recipes/:recipeId/reviews/:reviewId')
//   .get(recipesReviewsController.listOne)


// Authentication
// router.route('/users/register')
//   .get(usersController.register);
// router.route('/users/login')
//   .get(usersController.login);


export default router;
