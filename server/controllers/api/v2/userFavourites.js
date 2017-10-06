import models from '../../../models/';

const { User, UserFavourite } = models;

export default {
  list(req, res) {
    return User
      .find({
        where: {
          userId: req.params.userId,
        },
        include: [{
          model: UserFavourite,
          as: 'userFavourites',
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return UserFavourite
      .create({
        recipeId: req.body.recipeId,
        userId: req.params.userId
      })
      .then(userFavourite => res.status(201).send(userFavourite))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return UserFavourite
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.params.userId
        },
      })
      .then((userFavourite) => {
        if (!userFavourite) {
          return res.status(404).send({
            message: 'User dos not have that recipe as a favourite',
          });
        }

        return userFavourite
          .update({
            recipeId: req.params.recipeId
          })
          .then(updatedUserFavourite => res.status(200).send(updatedUserFavourite))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return UserFavourite
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.params.userId
        },
      })
      .then((userFavourite) => {
        if (!userFavourite) {
          return res.status(404).send({
            message: 'User dos not have that recipe as a favourite',
          });
        }

        return userFavourite
          .delete()
          .then(updatedUserFavourite => res.status(200).send(updatedUserFavourite))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};

