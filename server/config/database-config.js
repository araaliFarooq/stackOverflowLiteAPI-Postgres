import Sequelize from 'sequelize';
import { configurations } from './index';

const { DATABASE_NAME, USERNAME, PASSWORD } = configurations;

export default new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
