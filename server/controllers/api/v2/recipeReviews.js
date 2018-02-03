import models from '../../../models/';

const { Recipe, RecipeReview } = models;

const dberror = 'Something went wrong querying the database. Failure occured while attempting to ';

const list = (req, res) => Recipe
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
      res.status(404).json({
        error: {
          message: 'Recipe Not Found',
        }
      });
    } else {
      res.status(200).json({
        data: recipe
      });
    }
  })
  .catch(() => res.status(500).json({
    error: {
      message: `${dberror}find the reviews for the recipe on the datadase`
    }
  }));

const listOne = (req, res) => RecipeReview
  .findById(req.params.recepeReviewId)
  .then(recipe => res.status(201).json({
    data: recipe
  }))
  .catch(() => res.status(500).json({
    error: {
      message: `${dberror}find the review on the datadase`
    }
  }));

const update = (req, res) => {
  if (!req.body.comment && ((req.body.vote === null) || (req.body.vote === undefined))) {
    res.status(403).json({
      error: {
        message: 'User must vote or leave a comment'
      }
    });
  } else {
    Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            error: {
              message: 'Recipe Not Found',
            }
          });
        } else if ((req.body.vote || req.body.vote === false) && recipe.userId === req.decoded.id) {
          res.status(401).json({
            error: {
              message: 'You cannot vote on your own recipe',
            }
          });
        } else {
          RecipeReview
            .find({
              where: {
                recipeReviewId: req.params.reviewId
              },
            })
            .then((recipeReview) => {
              if (!req.params.reviewId) {
                RecipeReview
                  .find({
                    where: {
                      recipeId: req.params.recipeId,
                      userId: req.decoded.id,
                    },
                  }).then((recipeRev) => {
                    let upvotes, downvotes, { vote } = req.body;
                    if (recipeRev.vote === true) {
                      upvotes = recipe.upvotes - 1;
                      vote = (req.body.vote === 'true' || req.body.vote === true) ? null : vote;
                    } else upvotes = (req.body.vote === 'true' || req.body.vote === true) ? recipe.upvotes + 1 : recipe.upvotes;

                    if (recipeRev.vote === false) {
                      downvotes = recipe.downvotes - 1;
                      vote = (req.body.vote === 'false' || req.body.vote === false) ? null : vote;
                    } else downvotes = (req.body.vote === 'false' || req.body.vote === false) ? recipe.downvotes + 1 : recipe.downvotes;

                    recipe.update({ upvotes, downvotes })
                      .catch(() => res.status(500).json({
                        error: {
                          message: `${dberror}update the recipe on the datadase`
                        }
                      }));
                    recipeRev
                      .update({
                        vote,
                      })
                      .then((updatedRecipeReview) => {
                        res.status(200).json({
                          data: updatedRecipeReview
                        });
                      })
                      .catch(() => res.status(500).json({
                        error: {
                          message: `${dberror}update the review on the datadase`
                        }
                      }));
                  });
              } else if (!recipeReview) {
                res.status(404).json({
                  error: {
                    message: 'The review does not exist.',
                  }
                });
              } else {
                recipeReview
                  .update({
                    comment: req.body.comment || recipeReview.comment,
                    vote: req.body.vote || recipeReview.vote,
                  })
                  .then((updatedRecipeReview) => {
                    res.status(200).json({
                      data: updatedRecipeReview
                    });
                  })
                  .catch(() => res.status(500).json({
                    error: {
                      message: `${dberror}update the review on the datadase`
                    }
                  }));
              }
            })
            .catch(() => res.status(500).json({
              error: {
                message: `${dberror}find the review on the datadase`
              }
            }));
        }
      })
      .catch(() => res.status(500).json({
        error: {
          message: `${dberror}find the recipe on the datadase`
        }
      }));
  }
};

const create = (req, res) => {
  if (!req.body.comment && ((req.body.vote === null) || (req.body.vote === undefined))) {
    res.status(403).json({
      error: {
        message: 'User must vote or leave a comment'
      }
    });
  } else {
    RecipeReview
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.id,
        },
      })
      .then((recipeReview) => {
        if (!recipeReview ||
          (recipeReview && ((req.body.vote === null) || (req.body.vote === undefined)))) {
          Recipe
            .findById(req.params.recipeId)
            .then((recipe) => {
              if (!recipe) {
                res.status(404).json({
                  error: {
                    message: 'Recipe Not Found',
                  }
                });
              } else if ((req.body.vote || req.body.vote === false)
              && recipe.userId === req.decoded.id) {
                res.status(403).json({
                  error: {
                    message: 'You cannot vote on your own recipe'
                  },
                  userId: recipe.userId
                });
              } else {
                const upvotes = (req.body.vote === true || req.body.vote === 'true') ? recipe.upvotes + 1 : recipe.upvotes;
                const downvotes = (req.body.vote === false || req.body.vote === 'false') ? recipe.downvotes + 1 : recipe.downvotes;

                recipe
                  .update({ upvotes, downvotes });

                RecipeReview
                  .create({
                    comment: req.body.comment,
                    vote: req.body.vote,
                    recipeId: req.params.recipeId,
                    userId: req.decoded.id
                  })
                  .then(createdRecipeRev => res.status(201).json({
                    data: createdRecipeRev
                  }))
                  .catch(() => res.status(500).json({
                    error: {
                      message: `${dberror}create the review on the datadase`
                    }
                  }));
              }
            });
        } else {
          update(req, res);
        }
      })
      .catch(() => res.status(500).json({
        error: {
          message: `${dberror}check if the user has reviewed the recipe in the past`
        }
      }));
  }
};

const deleteReview = (req, res) =>
  RecipeReview.find({
    where: {
      recipeReviewId: req.params.recipeReviewId,
      recipeId: req.params.recipeId,
    },
  })
    .then((recipeReview) => {
      if (!recipeReview) {
        res.status(404).json({
          error: {
            message: 'Review Not Found',
          }
        });
      } else if (req.decoded.id !== recipeReview.userId) {
        res.status(401).json({
          error: {
            message: 'You are not authorized to delete this review',
          }
        });
      } else {
        recipeReview
          .destroy()
          .then(deletedRecipeReview => res.status(200).json({
            message: 'The review listed below has just been deleted',
            data: deletedRecipeReview
          }));
      }
    })
    .catch(() => res.status(500).json({
      error: {
        message: `${dberror}find the review on the datadase`
      }
    }));

export default {
  list,
  listOne,
  update,
  create,
  deleteReview
};
