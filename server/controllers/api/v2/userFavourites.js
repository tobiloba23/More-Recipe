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
          return res.status(404).send({
            statusCode: 404,
            message: 'User Not Found',
          });
        }
        return res.status(200).send({
          statusCode: 200,
          user
        });
      })
      .catch(error => res.status(400).send({
        statusCode: 400,
        error
      }));
  },

  create(req, res) {
    return UserFavourite
      .create({
        recipeId: req.body.recipeId,
        userId: req.decoded.id
      })
      .then(userFavourite => res.status(201).send({
        statusCode: 201,
        userFavourite
      }))
      .catch(error => res.status(400).send({
        statusCode: 400,
        error
      }));
  },

  update(req, res) {
    if (req.params.userId !== req.decoded.id) {
      return res.status(403).json({
        statusCode: 403,
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
          return res.status(404).send({
            statusCode: 404,
            message: 'User does not have that recipe as a favourite',
          });
        }

        return userFavourite
          .update({
            recipeId: req.params.recipeId
          })
          .then(updatedUserFavourite => res.status(200).send({
            statusCode: 200,
            updatedUserFavourite
          }));
      })
      .catch(error => res.status(400).send({
        statusCode: 400,
        error
      }));
  },

  delete(req, res) {
    if (req.params.userId !== req.decoded.id) {
      return res.status(403).json({
        statusCode: 403,
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
          return res.status(404).send({
            statusCode: 404,
            message: 'User does not have that recipe as a favourite',
          });
        }
        if (req.decoded.id !== userFavourite.userId) {
          return res.status(403).json({
            statusCode: 403,
            message: 'You are not allowed to alter records that do not belong to you',
          });
        }

        return userFavourite
          .destroy()
          .then(updatedUserFavourite => res.status(200).send({
            statusCode: 200,
            updatedUserFavourite
          }));
      })
      .catch(error => res.status(400).send(error));
  },

};

