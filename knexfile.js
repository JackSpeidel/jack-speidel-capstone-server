// Update with your config settings.
const dotenv = require('dotenv')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : process.env.HOST,
      port : process.env.PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : 'TBD'
    }
  }

};
