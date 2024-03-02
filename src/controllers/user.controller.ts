import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { message } from '~/constants/message'
import { ReqBodyLogin, ReqBodyRegister } from '~/models/requestUser'
import { Users } from '~/models/schemas/user.schemas'
import userService from '~/services/user.service'
export const registerUserController = async (req: Request<ParamsDictionary, any, ReqBodyRegister>, res: Response) => {
  const result = await userService.regiester(req.body)
  return res.status(200).json({ message: message.REGISTER_SUCCESS, result })
}

export const loginUserController = async (req: Request<ParamsDictionary, any, ReqBodyLogin>, res: Response) => {
  const user = req.user as Users
  // console.log(user)
  // res.json({ user })
  const { _id } = user
  const user_id = _id?.toString() as string
  // console.log(user_id)
  const result = await userService.login(user_id)
  return res.status(200).json({ message: 'login success', result })
}
