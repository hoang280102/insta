import bcrypt from 'bcrypt'

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const saltRound = 10
    bcrypt.genSalt(saltRound, (err, salt) => {
      if (err) reject(err)
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  })
}
