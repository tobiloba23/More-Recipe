import models from '../../../models/';

const { User, Recipe, UserFavourite } = models;
const dberror = 'Something went wrong querying the database. Failure occured while attempting to ';

export default {
  list(req, res) {
    User
      .find({
        where: {
          userId: req.decoded.id,
        },
        attributes: ['userId', 'userName'],
        include: [{
          model: UserFavourite,
          as: 'userFavourites',
          include: [{
            model: Recipe
          }]
        }],
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            error: {
              message: 'User Not Found',
            }
          });
        } else {
          res.status(200).json({
            data: user
          });
        }
      })
      .catch(() => res.status(500).json({
        error: {
          message: `${dberror}find the user on the datadase`
        }
      }));
  },

  create(req, res) {
    UserFavourite
      .create({
        recipeId: req.body.recipeId,
        userId: req.decoded.id
      })
      .then(userFavourite => res.status(201).json({
        message: 'The recipe listed below has been added to your favourites',
        data: userFavourite
      }))
      .catch(() => res.status(500).json({
        error: {
          message: `${dberror}create a favourite recipe on the datadase`
        }
      }));
  },

  update(req, res) {
    if (req.params.userId !== req.decoded.id) {
      res.status(403).json({
        error: {
          message: 'You cannot alter records that do not belong to you.',
        }
      });
    } else {
      UserFavourite
        .find({
          where: {
            recipeId: req.params.recipeId,
            userId: req.decoded.id
          },
        })
        .then((userFavourite) => {
          if (!userFavourite) {
            res.status(404).json({
              error: {
                message: 'User does not have that recipe as a favourite',
              }
            });
          } else {
            userFavourite
              .update({
                recipeId: req.params.recipeId
              })
              .then(updatedUserFavourite => res.status(200).json({
                message: 'Your changes were accepted and your favourite recipe changed.',
                data: updatedUserFavourite
              }))
              .catch(() => res.status(500).json({
                error: {
                  message: `${dberror}update the user's favourites on the datadase`
                }
              }));
          }
        })
        .catch(() => res.status(500).json({
          error: {
            message: `${dberror}find the user's favourites on the datadase`
          }
        }));
    }
  },

  delete(req, res) {
    if (req.params.userId !== req.decoded.id) {
      res.status(403).json({
        error: {
          message: 'You cannot alter records that do not belong to you.',
        }
      });
    } else {
      UserFavourite
        .find({
          where: {
            recipeId: req.params.recipeId,
            userId: req.decoded.id
          },
        })
        .then((userFavourite) => {
          if (!userFavourite) {
            res.status(404).json({
              error: {
                message: 'User does not have that recipe as a favourite',
              }
            });
          } else if (req.decoded.id !== userFavourite.userId) {
            res.status(403).json({
              error: {
                message: 'You are not allowed to alter records that do not belong to you',
              }
            });
          } else {
            userFavourite
              .destroy()
              .then(deletedUserFavourite => res.status(200).json({
                message: 'The recipe listed below has been removed from your favourites',
                data: deletedUserFavourite
              }))
              .catch(() => res.status(500).json({
                error: {
                  message: `${dberror}delete the recipe from the user's favourite on the datadase`
                }
              }));
          }
        })
        .catch(() => res.status(500).json({
          error: {
            message: `${dberror}update the user's favourites on the datadase`
          }
        }));
    }
  },
};
