import path from 'path';
import fs from 'fs';
import Sequelize from 'sequelize';
import config from '../config/config.json';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];
const db = {};
let sequelize;

if (configEnv.use_env_variable) {
  sequelize = new Sequelize(process.env[configEnv.use_env_variable]);
} else {
  sequelize =
new Sequelize(configEnv.database, configEnv.username, configEnv.password, configEnv);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// // models
// db.user = require('./user.js')(sequelize, Sequelize);
// db.recipe = require('./recipe.js')(sequelize, Sequelize);
// db.catalogue = require('./catalogue.js')(sequelize, Sequelize);
// db.recipeReview = require('./recipeReview.js')(sequelize, Sequelize);
// db.catalogueReview = require('./catalogueReview.js')(sequelize, Sequelize);

// // Relations
// db.user.hasMany(db.recipe);
// db.user.hasMany(db.recipesReview);
// db.user.hasMany(db.catalogue);
// db.user.hasMany(db.catalogueReview);
// db.recipe.belongsTo(db.user);
// db.recipe.hasMany(db.recipeReview);
// db.recipesReview.belongsTo(db.user);
// db.recipesReview.belongsTo(db.recipe);
// db.catalogue.belongsTo(db.user);
// db.catalogue.hasMany(db.catalogueReview);
// db.catalogueReview.belongsTo(db.user);
// db.catalogueReview.belongsTo(db.catalogue);

// db.recipe.hasMany(db.catalogue, { through: 'recipeCatalogues' });
// db.catalogue.hasMany(db.recipe, { through: 'recipeCatalogues' });

// db.user.hasMany(db.favourites, { through: 'userFavourites' });
// db.favourites.hasMany(db.user, { through: 'userFavourites' });

// db.user.hasMany(db.roles, { through: 'userRoles' });
// db.roles.hasMany(db.user, { through: 'userRoles' });

export default db;
