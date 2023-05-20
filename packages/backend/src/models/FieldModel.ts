import { DataTypes } from 'sequelize'

import DB from './bootstrap'

const FieldModel = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  survey_id: {
    type: DataTypes.STRING,
    allowNull: false
  },

  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false
  },

  question: {
    type: DataTypes.STRING,
    allowNull: false
  },

  response_options: {
    type: DataTypes.STRING,
    allowNull: true
  }
}

const table = DB.define('fields', FieldModel)
table.sync()
export default table
