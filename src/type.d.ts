import { Request } from 'express'
import { Users } from './models/schemas/user.schemas'

declare module 'express' {
  export interface Request {
    user?: Users
  }
}
