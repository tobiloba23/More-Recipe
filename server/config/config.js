import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: 'TOBI',
    password: null,
    database: 'more_recipes_dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'TOBI',
    password: null,
    database: 'more_recipes_dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
