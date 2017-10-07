// Update with your config settings.

module.exports = {

  development: {
    username: 'TOBI',
    password: null,
    database: 'more_recipes_dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL.concat('?ssl=true'),
    migrations: {
      directory: './server/migrations/knex_migrations'
    },
    useNullAsDefault: true
  }

};
