import UserModel from '../models/UserModel'
import { User, UserType } from '@litsurvey/common'

export default class {
  public static async getUserByEmail(email: string): Promise<User | null> {
    const foundUser = await UserModel.findOne({ where: { email: email } })
    if (!foundUser) {
      return null
    }
    return foundUser.toJSON() as User
  }

  public static async getUserByUsername(
    username: string
  ): Promise<User | null> {
    const foundUser = await UserModel.findOne({ where: { username: username } })
    if (!foundUser) {
      return null
    }
    return foundUser.toJSON() as User
  }

  public static async getUserById(
    id: string
  ): Promise<User | null> {
    const foundUser = await UserModel.findOne({ where: { id: id } })
    if (!foundUser) {
      return null
    }
    return foundUser.toJSON() as User
  }

  public static async createUser(user: User): Promise<User> {
    const createdUser = await UserModel.create({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      type: user.type
    })
    return createdUser.toJSON() as User
  }

  public static async updateUser(user: User): Promise<User | null> {
    const updatedUser = await UserModel.update(
      {
        username: user.username,
        email: user.email,
        password: user.password,
        type: user.type || UserType.surveyee
      },
      { where: { id: user.id } }
    )

    if (updatedUser[0] === 0) {
      return null
    }

    const updatedUserData = await UserModel.findByPk(user.id)

    return updatedUserData?.toJSON() as User
  }

  public static async deleteUserById(id: string): Promise<boolean> {
    const deletedUserCount = await UserModel.destroy({ where: { id } })

    if (deletedUserCount === 0) {
      return false
    }

    return true
  }
}
