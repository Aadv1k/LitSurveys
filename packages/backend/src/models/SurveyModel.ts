import { DataTypes } from 'sequelize'

import DB from './bootstrap'

const SurveyModel = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false
  },

  maxResposnes: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

const table = DB.define('surveys', SurveyModel)
table.sync();
export default table;
