const dotenv = require('dotenv');

dotenv.config();

const configurations = Object.freeze({
  DATABASE_NAME: process.env.DATABASE_NAME,
  PORT: process.env.PORT,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  DIALECT: process.env.DIALECT,
  OPERATORSALIASES: process.env.OPERATORSALIASES,
  SECRET: process.env.SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  FACEBOOK_AUTH_URL: process.env.FACEBOOK_AUTH_URL,
  GOOGLE_AUTH_URL: process.env.GOOGLE_AUTH_URL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  JWTSECRETKEY: process.env.JWTSECRETKEY,
  ACTIVATION_URL: process.env.ACTIVATION_URL
});

const dbEnvConfigs = {
  development: {
    username: configurations.USERNAME,
    password: configurations.PASSWORD,
    database: configurations.DATABASE_NAME,
    host: configurations.HOST,
    dialect: configurations.DIALECT,
    operatorsAliases: configurations.OPERATORSALIASES
  },
  test: {
    username: configurations.USERNAME,
    password: configurations.PASSWORD,
    database: configurations.DATABASE_NAME,
    host: configurations.HOST,
    dialect: configurations.DIALECT,
    operatorsAliases: configurations.OPERATORSALIASES
  },
  production: {
    username: configurations.USERNAME,
    password: configurations.PASSWORD,
    database: configurations.DATABASE_NAME,
    host: configurations.HOST,
    dialect: configurations.DIALECT,
    operatorsAliases: configurations.OPERATORSALIASES
  }
};

export { configurations, dbEnvConfigs };
