import { DataTypes } from 'sequelize'

import DB from './bootstrap'

const ResponseModel = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  field_id: {
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

  response: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

const table = DB.define('responses', ResponseModel)
table.sync()
export default table
