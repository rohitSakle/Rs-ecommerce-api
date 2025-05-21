const { DB_USER_NAME, DB_USER_PASSWORD = null, DB_NAME, DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_USER_NAME,
    password: DB_USER_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: DB_USER_NAME,
    password: DB_USER_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: DB_USER_NAME,
    password: DB_USER_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
};
