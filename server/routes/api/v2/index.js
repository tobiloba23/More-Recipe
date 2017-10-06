import express from 'express';
import jwt from '../../../auth/local';
import Controller from '../../../controllers';

const router = express.Router();
const recipesController = Controller.recipesApiv2;
const recipesReviewsController = Controller.recipeReviewsApiv2;
const usersController = Controller.usersApiv2;
const userFavouritesController = Controller.userFavouritesApiv2;


router.route('/get-token').get((req, res) => {
  const token = jwt.sign(
    { foo: 'foo' },
    process.env.JWT_SEC_KEY, {
      expiresIn: 100 // expires in 24 hours
    }
  );
  res.send({ token });
});


// Recipe actions
router.route('/recipes')
  .get(recipesController.list)
  .post(jwt, recipesController.create);
router.route('/recipes/:recipeId/')
  .get(recipesController.listOne)
  .put(jwt, recipesController.update)
  .delete(jwt, recipesController.delete);

router.route('/recipes/:recipeId/reviews')
  .get(recipesReviewsController.list)
  .post(jwt, recipesReviewsController.create);
router.route('/recipes/:id/reviews/:reviewId')
  .get(recipesReviewsController.listOne)
  .put(jwt, recipesReviewsController.update)
  .delete(jwt, recipesReviewsController.delete);


// Authentication
router.route('/users/signup').post(usersController.signup);
router.route('/users/signin').post(usersController.signin);
router.route('/users').get(jwt, usersController.list);


// User Favourites
router.route('/users/:userId/recipes')
  .get(jwt, userFavouritesController.list)
  .post(jwt, userFavouritesController.create);

// // For any other request method on recipes, we're going to return "Method Not Allowed"
// router.route('/recipes/:id/reviews').all((req, res) =>
//   res.status(405).send({
//     message: 'Method Not Allowed',
//   }));

export default router;
