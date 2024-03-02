import { ReqBodyRegister } from '~/models/requestUser'
import databaseService from './database.service'
import { hashPassword } from '~/utils/bcrypt'
import { Users } from '~/models/schemas/user.schemas'
import { ObjectId } from 'mongodb'
import { createToken } from '~/utils/jwt'
import 'dotenv/config'

class UserService {
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  private signAccessToken(user_id: string) {
    return createToken({
      payload: {
        user_id
      },
      secretKey: process.env.SECRET_KEY_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.EXPIRESIN_ACCESS_TOKEN as string
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return createToken({
      payload: {
        user_id
      },
      secretKey: process.env.SECRET_KEY_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.EXPIRESIN_REFRESH_TOKEN as string
      }
    })
  }
  private async signAccessAndRefreshToken(user_id: string) {
    return await Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async regiester(payload: ReqBodyRegister) {
    const _id = new ObjectId()
    const user_id = _id.toString()
    await databaseService.users.insertOne(
      new Users({
        ...payload,
        _id,
        password: await hashPassword(payload.password)
      })
    )
    const [token] = await this.signAccessAndRefreshToken(user_id)
    const [access_token, refresh_token] = token
    return { access_token, refresh_token }
  }
  async login(user_id: string) {
    const token = await this.signAccessAndRefreshToken(user_id)
    const [access_token, refresh_token] = token
    return { access_token, refresh_token }
  }
}

const userService = new UserService()
export default userService
