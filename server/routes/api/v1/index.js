import express from 'express';
import Controller from '../../../controllers';

const router = express.Router();
const recipesController = Controller.recipesApiv1;
const recipesReviewsController = Controller.recipeReviewsApiv1;
// const usersController = Controller.usersApi;


router.route('/recipes')
  .get(recipesController.list)
  .post(recipesController.create);
router.route('/recipes/:recipeId/')
  // .get(recipesController.listOne)
  .put(recipesController.update)
  .delete(recipesController.delete);

router.route('/recipes/:recipeId/reviews')
  // .get(recipesReviewsController.list)
  .post(recipesReviewsController.create);
// router.route('/recipes/:recipeId/reviews/:reviewId')
//   .get(recipesReviewsController.listOne)
//   .put(recipesReviewsController.update)
//   .delete(recipesReviewsController.delete);


// Authentication
// router.route('/users/register')
//   .post(usersController.register);
// router.route('/users/login')
//   .post(usersController.login);


// For any other request method on recipes, we're going to return "Method Not Allowed"
router.route('/recipes/:recipeId/reviews').all((req, res) =>
  res.status(405).send({
    statusCode: 405,
    error: true,
    message: 'Method Not Allowed',
  }));

export default router;
