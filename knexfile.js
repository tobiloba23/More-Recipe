// Update with your config settings.

module.exports = {

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL.concat('?ssl=true'),
    migrations: {
      directory: './server/migrations'
    },
    useNullAsDefault: true
  }

};
