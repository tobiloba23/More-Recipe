import validator from 'validatorjs';
import models from '../../../models/';

const { Recipe } = models;

export default {
  list(req, res) {
    let returnData;
    let offset = 0;
    let count = 50;

    return Recipe
      .findAll()
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
    const rules = {
      title: 'required|string'
    };

    const isValid = new validator(req.body, rules);
    if (isValid.fails()) {
      return res.json({ error: isValid.errors.all() });
    }

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
    const rules = {
      title: 'required|string'
    };

    const isValid = new validator(req.body, rules);
    if (isValid.fails()) {
      return res.json({ error: isValid.errors.all() });
    }

    return Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }

        return recipe
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedRecipe => res.status(200).send(updatedRecipe))
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
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }

        return recipe
          .destroy()
          .then(deletedRecipe => res.status(200).send('The recipe listed below has just been deleted'.concat(deletedRecipe)))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
