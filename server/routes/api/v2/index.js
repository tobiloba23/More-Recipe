import express from 'express';
import Controller from '../../../controllers';

const router = express.Router();
const recipesController = Controller.recipesApiv2;
// const recipesReviewsController = Controller.recipeReviewsApiv2;
const usersController = Controller.usersApiv2;
const userFavouritesController = Controller.userFavouritesApiv2;


// Recipe actions
router.route('/recipes').get(recipesController.list);
//   .post(recipesController.create);
// router.route('/recipes/:recipeId/')
//   // .get(recipesController.listOne)
//   .put(recipesController.update)
//   .delete(recipesController.delete);

// router.route('/recipes/:Id/reviews')
//   // .get(recipesReviewsController.list)
//   .post(recipesReviewsController.create);
// // router.route('/recipes/:Id/reviews/:reviewId')
// //   .get(recipesReviewsController.listOne)
// //   .put(recipesReviewsController.update)
// //   .delete(recipesReviewsController.delete);


// Authentication
router.route('/users/register').post(usersController.signup);
router.route('/users/login').post(usersController.login);
router.route('/users').get(usersController.list);


// User Favourites
router.route('/userFavourites').get(userFavouritesController.list);

// // For any other request method on todo items, we're going to return "Method Not Allowed"
// router.route('/recipes/:Id/reviews').all((req, res) =>
//   res.status(405).send({
//     message: 'Method Not Allowed',
//   }));

export default router;
