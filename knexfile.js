const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;
const { login } = require("./config");

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "op_dino_dev",
      username: login.username,
      password: login.password
    }
  },
  test: {
    connection: {
      database: "op_dino_test",
      username: login.username,
      password: login.password
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
