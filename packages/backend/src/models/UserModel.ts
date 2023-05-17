import { DataTypes } from 'sequelize'

import DB from './bootstrap'

const UserModel = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  type: {
    type: DataTypes.STRING,
    allowNull: true
  }
}

const table = DB.define('users', UserModel)
table.sync()
export default table
