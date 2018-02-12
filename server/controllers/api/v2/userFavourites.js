import dotenv from 'dotenv';
import models from '../../../models/';

dotenv.config();

const { User, Recipe, UserFavourite } = models;
const dberror = process.env.DB_ERROR;

export default {
  list(req, res) {
    User
      .find({
        where: {
          userName: req.params.userName,
        },
        attributes: ['userName'],
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
      .catch(serverError => res.status(500).json({
        error: {
          message: `${dberror} find the user on the datadase`,
          serverError
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
      .catch(serverError => res.status(500).json({
        error: {
          message: `${dberror} create a favourite recipe on the datadase`,
          serverError
        }
      }));
  },

  update(req, res) {
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
            .catch(serverError => res.status(500).json({
              error: {
                message: `${dberror} update the user's favourites on the datadase`,
                serverError
              }
            }));
        }
      })
      .catch(serverError => res.status(500).json({
        error: {
          message: `${dberror} find the user's favourites on the datadase`,
          serverError
        }
      }));
  },

  delete(req, res) {
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
            .destroy()
            .then(deletedUserFavourite => res.status(200).json({
              message: 'The recipe listed below has been removed from your favourites',
              data: deletedUserFavourite
            }))
            .catch(serverError => res.status(500).json({
              error: {
                message: `${dberror} delete the recipe from the user's favourites on the datadase`,
                serverError
              }
            }));
        }
      })
      .catch(serverError => res.status(500).json({
        error: {
          message: `${dberror} update the user's favourites on the datadase`,
          serverError
        }
      }));
  },
};
