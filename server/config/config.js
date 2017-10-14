export default {
  development: {
    username: 'TOBI',
    password: process.env.DB_DEV_PASSWORD,
    database: 'more_recipes_dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: process.env.DB_TEST_PASSWORD,
    database: 'more_recipes_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
