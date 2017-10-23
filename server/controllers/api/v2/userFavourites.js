import models from '../../../models/';

const { User, Recipe, UserFavourite } = models;

export default {
  list(req, res) {
    return User
      .find({
        where: {
          userId: req.params.userId,
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
          return res.status(404).json({
            statusCode: 404,
            error: true,
            message: 'User Not Found',
          });
        }
        return res.status(200).json({
          statusCode: 200,
          data: user
        });
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error: true,
        message: error
      }));
  },

  create(req, res) {
    return UserFavourite
      .create({
        recipeId: req.body.recipeId,
        userId: req.decoded.id
      })
      .then(userFavourite => res.status(201).json({
        statusCode: 201,
        message: 'The recipe listed below has been added to your favourites',
        data: userFavourite
      }))
      .catch(error => res.status(400).json({
        statusCode: 400,
        error: true,
        message: error
      }));
  },

  update(req, res) {
    if (req.params.userId !== req.decoded.id) {
      return res.status(403).json({
        statusCode: 403,
        error: true,
        message: 'You cannot alter records that do not belong to you.',
      });
    }

    return UserFavourite
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        },
      })
      .then((userFavourite) => {
        if (!userFavourite) {
          return res.status(404).json({
            statusCode: 404,
            error: true,
            message: 'User does not have that recipe as a favourite',
          });
        }

        return userFavourite
          .update({
            recipeId: req.params.recipeId
          })
          .then(updatedUserFavourite => res.status(200).json({
            statusCode: 200,
            message: 'Your changes were accepted and your favourite recipe changed.',
            data: updatedUserFavourite
          }));
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error: true,
        message: error
      }));
  },

  delete(req, res) {
    if (req.params.userId !== req.decoded.id) {
      return res.status(403).json({
        statusCode: 403,
        error: true,
        message: 'You cannot alter records that do not belong to you.',
      });
    }

    return UserFavourite
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        },
      })
      .then((userFavourite) => {
        if (!userFavourite) {
          return res.status(404).json({
            statusCode: 404,
            error: true,
            message: 'User does not have that recipe as a favourite',
          });
        }
        if (req.decoded.id !== userFavourite.userId) {
          return res.status(403).json({
            statusCode: 403,
            error: true,
            message: 'You are not allowed to alter records that do not belong to you',
          });
        }

        return userFavourite
          .destroy()
          .then(deletedUserFavourite => res.status(200).json({
            statusCode: 200,
            message: 'The recipe listed below has been removed from your favourites',
            data: deletedUserFavourite
          }));
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error: true,
        message: error
      }));
  },

};

