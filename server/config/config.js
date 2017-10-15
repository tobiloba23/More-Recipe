module.exports = {
  development: {

  },
  test: {
    username: 'tobi',
    password: 'password',
    database: 'more_recipes_test',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
