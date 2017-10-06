import models from '../../../models/';

const { Recipe } = models;

export default {
  list(req, res) {
    let returnData;
    let offset = 0;
    let count = 50;

    return Recipe
      .findAll()
      // .sequelize.query('SELECT "id", "title", "description", "instructions", "upvotes", "downvotes", "createdAt", "updatedAt", "userId" FROM "Recipes";')
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'No Recipe Found, please create one. Thank you.',
          });
        }

        if (req.query && req.query.offset) {
          offset = parseInt(req.query.offset, 10);
        }

        if (req.query && req.query.count) {
          count = parseInt(req.query.count, 10);
        }

        returnData = recipe.slice(offset, offset + count);

        if (req.query && req.query.sort) {
          if (req.query.sort === 'upvotes') {
            if (req.query.order && req.query.order === 'asc') {
              returnData.sort((a, b) => a.upvotes - b.upvotes);
            } else if (req.query.order && req.query.order === 'desc') {
              returnData.sort((a, b) => b.upvotes - a.upvotes);
            } else {
              res.status(404).send('Not Found: Order of sorting does not exist.');
            }
          }
          if (req.query.sort === 'downvotes') {
            if (req.query.order && req.query.order === 'asc') {
              returnData.sort((a, b) => a.downvotes - b.downvotes);
            } else if (req.query.order && req.query.order === 'desc') {
              returnData.sort((a, b) => b.downvotes - a.downvotes);
            } else {
              res.status(404).send('Not Found: Order of sorting does not exist.');
            }
          }
        }

        return res.status(200).send(returnData);
      })
      .catch(error => res.status(400).send(error));
  },

  listOne(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(403).send(error));
  },

  create(req, res) {
    return Recipe
      .create({
        title: req.body.title,
        description: req.body.description,
        instructions: req.body.instructions,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(403).send(error));
  },

  update(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      // .sequelize.query('SELECT "recipeId", "title", "description", "instructions", "upvotes", "downvotes", "createdAt", "updatedAt", "userId" FROM "Recipes" WHERE "id" LIKE \''.concat(req.params.recipeId, '\''))
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }

        return recipe
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Recipe
      .find({
        where: {
          recipeId: req.params.recipeId,
        }
      })
      // .sequelize.query('SELECT "recipeId", "title", "description", "instructions", "upvotes", "downvotes", "createdAt", "updatedAt", "userId" FROM "Recipes" WHERE "recipeId" LIKE \''.concat(req.params.recipeId, '\''))
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }

        return recipe
          .destroy()
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
