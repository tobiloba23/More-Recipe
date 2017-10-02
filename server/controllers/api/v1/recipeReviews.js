import jsonfile from 'jsonfile';
import path from 'path';
import recipesData from '../../../models/recipes-data.json';

const dataDir = '../../../models/recipes-data.json';

export default {

  create(req, res) {
    let returnData = {};
    let itemExists = false;
    recipesData.forEach((recipe) => {
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        itemExists = true;
        req.body.id = (recipe
          .reviews[0]) ? 1 + recipesData.reduce(obj => Math.ax(obj.id)) : 1;
        if (!recipe.reviews) recipe.reviews = [];
        recipe.reviews.push(req.body);
        returnData = recipe;
      }
    });
    if (itemExists === false) {
      res.status(404).send('Not Found: The recipe with id: '.concat([req.params.recipeId, ' does not exist on record.']));
    }

    jsonfile.writeFile(path.join(__dirname, dataDir), recipesData, (err) => {
      if (err) res.status(403).send('Forbidden: Cannot access database. '.concat(err));
      else res.status(200).json(returnData);
    });
  }
};
