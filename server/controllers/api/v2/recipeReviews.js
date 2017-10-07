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
          return res.status(404).json({
            statusCode: 404,
            message: 'Recipe Not Found',
          });
        }
        return res.status(200).json({
          statusCode: 200,
          recipe
        });
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
  },

  listOne(req, res) {
    return Recipe
      .findById(req.params.recepeReviewId)
      .then(recipe => res.status(201).json({
        statusCode: 201,
        recipe
      }))
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
  },

  create(req, res) {
    if (!req.body.comment && !req.body.vote) {
      return res.status(403).json({
        statusCode: 403,
        error: 'User must vote or leave a comment'
      });
    }

    RecipeReview
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.id,
          vote: true
        },
      })
      .then((recipeReview) => {
        if (recipeReview) {
          return res.status(403).json({
            statusCode: 403,
            message: 'You have already upvoted this recipe',
            userId: recipeReview.userId
          });
        }
      });

    RecipeReview
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.id,
          vote: false
        },
      })
      .then((recipeReview) => {
        if (recipeReview) {
          return res.status(403).json({
            statusCode: 403,
            message: 'You have already downvoted this recipe',
            userId: recipeReview.userId
          });
        }
      });

    Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            statusCode: 404,
            message: 'Recipe Not Found',
          });
        }
        if (req.body.vote) {
          if (recipe.userId === req.decoded.id) {
            return res.status(403).json({
              statusCode: 403,
              message: 'You are cannot vote on your own recipe',
              userId: recipe.userId
            });
          }
        }

        const upvotes = (req.body.vote === 'true') ? recipe.upvotes + 1 : recipe.upvotes;
        const downvotes = (req.body.vote === 'false') ? recipe.downvotes + 1 : recipe.downvotes;

        return recipe
          .update({ upvotes, downvotes });
      });

    return RecipeReview
      .create({
        comment: req.body.comment,
        vote: req.body.vote,
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      })
      .then(recipeReview => res.status(201).json({
        statusCode: 201,
        recipeReview
      }))
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
  },

  update(req, res) {
    if (!req.body.coomment && !req.body.vote) {
      return res.status(403).json({
        statusCode: 403,
        error: 'User must vote or leave a comment'
      });
    }

    Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            statusCode: 404,
            message: 'Recipe Not Found',
          });
        }
        if (req.body.vote) {
          if (recipe.userId === req.decoded.id) {
            return res.status(401).json({
              statusCode: 401,
              message: 'You cannot vote on your own recipe',
            });
          }
        }

        const upvotes = (req.body.vote === 'true') ? recipe.upvotes + 1 : recipe.upvotes;
        const downvotes = (req.body.vote === 'false') ? recipe.downvotes + 1 : recipe.downvotes;

        return recipe
          .update({ upvotes, downvotes });
      });

    return RecipeReview
      .find({
        where: {
          recipeReviewId: req.params.recipeReviewId,
          recipeId: req.params.recipeId,
        },
      })
      .then((recipeReview) => {
        if (!recipeReview) {
          return res.status(404).json({
            statusCode: 404,
            message: 'You are not authorized to edit this review',
          });
        }
        if (req.decoded.id !== recipeReview.userId) {
          return res.status(401).json({
            statusCode: 401,
            message: 'Review Not Found',
          });
        }

        return recipeReview
          .update({
            comment: req.body.comment || recipeReview.comment,
            vote: req.body.vote || recipeReview.vote,
          })
          .then(updatedRecipeReview => res.status(200).json({
            statusCode: 200,
            updatedRecipeReview
          }));
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
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
          return res.status(404).json({
            statusCode: 404,
            message: 'Review Not Found',
          });
        }
        if (req.decoded.id !== recipeReview.userId) {
          return res.status(401).json({
            statusCode: 401,
            message: 'You are not authorized to delete this review',
          });
        }

        return recipeReview
          .destroy()
          .then(updatedRecipeReview => res.status(200).json({
            statusCode: 200,
            updatedRecipeReview
          }));
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
  },

};
