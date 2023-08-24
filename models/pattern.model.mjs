import { sequelize, Sequelize, DataTypes } from "./index.mjs";

const PatternModel = sequelize.define(
  "pattern",
  {
    id: {
      type: DataTypes.BIGINT(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    format: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default PatternModel;
