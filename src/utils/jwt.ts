import jwt, { SignOptions } from 'jsonwebtoken'
export const createToken = ({
  payload,
  secretKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | object | Buffer
  secretKey: string
  options: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) reject(err)
      resolve(token as string)
    })
  })
}
