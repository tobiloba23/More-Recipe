import path from 'path';
import fs from 'fs';
import Sequelize from 'sequelize';
import config from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];
const db = {};
let sequelize;
console.log(configEnv);
console.log(configEnv.use_env_variable);
console.log(process.env.DATABASE_URL);
if (configEnv.use_env_variable) {
  sequelize = new Sequelize(configEnv.use_env_variable);
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


export default db;
