import Controller from '../controllers';

const recipesController = Controller.recipes;
const recipesReviewsController = Controller.recipeReviews;

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the More Recipes API!',
  }));

  app.post('/api/recipes', recipesController.create);
  app.put('/api/recipes/:recipeId', recipesController.update);
  app.delete('/api/recipes/:recipeId', recipesController.delete);
  app.get('/api/recipes', recipesController.list);

  app.post('/api/recipes/:recipeId/reviews', recipesReviewsController.create);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/recipes/:recipeId/reviews', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
};
