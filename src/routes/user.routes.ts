import { Router } from 'express'
import { loginUserController, registerUserController } from '~/controllers/user.controller'
import { LoginValidation, RegisterValidation } from '~/middlewares/user.middleware'
import { handlerError } from '~/utils/handler'
const userRouter = Router()

userRouter.post('/register', RegisterValidation, handlerError(registerUserController))
userRouter.post('/login', LoginValidation, handlerError(loginUserController))

export default userRouter
