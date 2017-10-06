import models from '../../../models/';

const { Recipe, RecipeReview } = models;

export default {
  list(req, res) {
    return Recipe
      .find({
        where: {
          recipeId: req.params.recipeId,
        },
        include: [{
          model: RecipeReview,
          as: 'recipeReviews',
        }],
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send(error));
  },

  listOne(req, res) {
    return Recipe
      .findById(req.params.recepeReviewId)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(403).send(error));
  },

  create(req, res) {
    return RecipeReview
      .create({
        comment: req.body.comment,
        vote: req.body.vote,
        recipeId: req.params.recipeId,
        userId: req.body.userId
      })
      .then(recipeReview => res.status(201).send(recipeReview))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return RecipeReview
      .find({
        where: {
          recipeReviewId: req.params.recipeReviewId,
          recipeId: req.params.recipeId,
        },
      })
      .then((recipeReview) => {
        if (!recipeReview) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return recipeReview
          .update({
            comment: req.body.comment || recipeReview.comment,
            vote: req.body.vote || recipeReview.vote,
          })
          .then(updatedRecipeReview => res.status(200).send(updatedRecipeReview))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return RecipeReview
      .find({
        where: {
          recipeReviewId: req.params.recipeReviewId,
          recipeId: req.params.recipeId,
        },
      })
      .then((recipeReview) => {
        if (!recipeReview) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return recipeReview
          .destroy()
          .then(updatedRecipeReview => res.status(200).send(updatedRecipeReview))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
