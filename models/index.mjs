import dbConfig from "../config/db.config.js";

import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },

  timezone: "+07:00",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export { db, sequelize, Sequelize, DataTypes };
