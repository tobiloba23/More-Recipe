import jsonfile from 'jsonfile';
import path from 'path';
import recipesData from '../../models/dummyData/recipes-data.json';

const dataDir = '../../model/recipes-data.json';

export default {
  list(req, res) {
    let returnData;
    let offset = 0;
    let count = 500;

    if (req.query && req.query.offset) {
      offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
      count = parseInt(req.query.count, 10);
    }

    if (recipesData) returnData = recipesData.slice(offset, offset + count);

    if (req.query && req.query.sort) {
      if (req.query.order && req.query.order === 'asc') {
        returnData.sort((a, b) => a.upvotes - b.upvotes);
      } else if (req.query.order && req.query.order === 'desc') {
        returnData.sort((a, b) => b.upvotes - a.upvotes);
      } else {
        res.status(404).send('Not Found: Order of sorting does not exist.');
      }
    }

    res.status(200).json(returnData);
  },

  create(req, res) {
    req.body.id = 1 + recipesData.reduce(obj => Math.ax(obj.id));
    req.body.reviews = [];
    recipesData.push(req.body);

    jsonfile.writeFile(path.join(__dirname, dataDir), recipesData, (err) => {
      if (err) res.status(403).send('Forbidden: Cannot access database. '.concat(err));
      else res.status(200).json(req.body);
    });
  },

  update(req, res) {
    const recipeId = parseInt(req.params.recipeId, 10);
    let itemExists = false;
    recipesData.forEach((recipe) => {
      if (recipe.id === recipeId) {
        itemExists = true;
        req.body.id = recipe.id;
        req.body.reviews = recipe.reviews;
      }
    });
    if (itemExists === false) {
      res.status(404).send('Not Found: The recipe with id: '.concat([req.params.recipeId, ' does not exist on record.']));
    }

    jsonfile.writeFile(path.join(__dirname, dataDir), recipesData, (err) => {
      if (err) res.status(403).send('Forbidden: Cannot access database. '.concat(err));
      else res.status(200).json(req.body);
    });
  },

  delete(req, res) {
    let itemExists = false;
    recipesData.forEach((recipe, i) => {
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        itemExists = true;
        recipesData.splice(i, 1);
      }
    });
    if (itemExists === false) {
      res.status(404).send('Not Found: The recipe with id: '.concat([req.params.recipeId, ' does not exist on record.']));
    }

    jsonfile.writeFile(path.join(__dirname, dataDir), recipesData, (err) => {
      if (err) res.status(403).send('Forbidden: Cannot access database. '.concat(err));
      else res.status(200).json(recipesData);
    });
  }
};

