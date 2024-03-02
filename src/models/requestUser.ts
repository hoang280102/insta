export interface ReqBodyRegister {
  email: string
  sdt: string
  fullName: string
  username: string
  password: string
}
export interface ReqBodyLogin {
  email?: string
  sdt?: string
  username?: string
  password: string
}
