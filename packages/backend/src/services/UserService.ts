import UserModel from '../models/UserModel'
//import { User, UserType } from '../../../common/types/user'


export enum UserType {
  surveyor = "surveyor",
  surveyee = "surveyee",
  any = "any"
}

export interface User {
  id: string,
  username: string,
  email: string,
  password: string,
  type: UserType
}

export default class {
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
      return null;
    }

    const updatedUserData = await UserModel.findByPk(user.id)

    return updatedUserData?.toJSON() as User
  }

  public static async deleteUserById(id: string): Promise<boolean> {
    const deletedUserCount = await UserModel.destroy({ where: { id } });

    if (deletedUserCount === 0) {
      return false;
    }

    return true;
  }
}

