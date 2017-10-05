import models from '../../../models/';

const { Recipe } = models;

export default {
  list(req, res) {
    // let returnData;
    // let offset = 0;
    // let count = 500;

    // if (req.query && req.query.offset) {
    //   offset = parseInt(req.query.offset, 10);
    // }

    // if (req.query && req.query.count) {
    //   count = parseInt(req.query.count, 10);
    // }

    // if (Recipe) returnData = Recipe.slice(offset, offset + count);

    // if (req.query && req.query.sort) {
    //   if (req.query.order && req.query.order === 'asc') {
    //     returnData.sort((a, b) => a.upvotes - b.upvotes);
    //   } else if (req.query.order && req.query.order === 'desc') {
    //     returnData.sort((a, b) => b.upvotes - a.upvotes);
    //   } else {
    //     res.status(404).send('Not Found: Order of sorting does not exist.');
    //   }
    // }


    // return Recipe
    //   .all({
    //     include: [{
    //       model: RecipeReview,
    //       as: 'recipeReviews',
    //     }, {
    //       model: Recipe,
    //       as: 'recipes',
    //     }, {
    //       model: RecipeCatalogue,
    //       as: 'recipeCatalogues',
    //     }, {
    //       model: CatalogueReview,
    //       as: 'catalogueReviews',
    //     }, {
    //       model: RecipeFavourites,
    //       as: 'RecipeFavourites',
    //     }, {
    //       model: RecipeRoles,
    //       as: 'RecipeRoles',
    //     }, {

    //     }]
    //   })

    return Recipe
    //   .all()
      .sequelize.query('SELECT "id", "title", "description", "instructions", "upvotes", "downvotes", "created_at", "updated_at", "userId" FROM "Recipes" AS "Recipe";')
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send(error));
  }
};
