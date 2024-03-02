import { ObjectId } from 'mongodb'

interface UserType {
  _id?: ObjectId
  email: string
  sdt?: string
  fullName: string
  username: string
  password: string
}
export class Users {
  _id?: ObjectId
  email: string
  sdt?: string
  fullName: string
  username: string
  password: string
  constructor(user: UserType) {
    this._id = user._id || new ObjectId()
    this.email = user.email
    this.sdt = user.sdt || ' '
    this.fullName = user.fullName
    this.username = user.username
    this.password = user.password
  }
}
