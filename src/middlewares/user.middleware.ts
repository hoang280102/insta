import { checkSchema } from 'express-validator'
import { message } from '~/constants/message'
import databaseService from '~/services/database.service'
import userService from '~/services/user.service'
import { validation } from '~/utils/validation'

export const RegisterValidation = validation(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        isEmail: {
          errorMessage: message.IS_EMAIL
        },
        trim: true,
        isString: {
          errorMessage: message.IS_STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            const checkEmail = await userService.checkEmailExist(value)
            if (checkEmail) {
              throw new Error('Email already exists')
            }
            return true
          }
        }
      },
      sdt: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        isLength: {
          options: {
            min: 10,
            max: 11
          },
          errorMessage: 'IS Length must be greater than 10 characters and less than 11 characters'
        },
        trim: true,
        isString: {
          errorMessage: message.IS_STRING
        }
      },
      fullName: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        isLength: {
          options: {
            min: 6,
            max: 30
          },
          errorMessage: 'IS Length must be greater than 6 characters and less than 30 characters'
        },
        isString: {
          errorMessage: message.IS_STRING
        }
      },
      username: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        isLength: {
          options: {
            min: 6,
            max: 30
          },
          errorMessage: 'IS Length must be greater than 6 characters and less than 30 characters'
        },
        trim: true,
        isString: {
          errorMessage: message.IS_STRING
        }
      },
      password: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        trim: true,
        isString: {
          errorMessage: message.IS_STRING
        },
        isStrongPassword: {
          errorMessage: message.IS_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        trim: true,
        isString: {
          errorMessage: message.IS_STRING
        },
        isStrongPassword: {
          errorMessage: message.IS_STRONG
        },
        custom: {
          options: async (value: string, { req }) => {
            if (value != req.body.password) {
              throw new Error('confirm password is different from password')
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const LoginValidation = validation(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: message.IS_EMAIL
        },
        trim: true,
        isString: {
          errorMessage: message.IS_STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            try {
              const user = await databaseService.users.findOne({ email: value })
              if (!user) {
                throw new Error('User not already exists')
              }
              req.user = user
            } catch (error) {
              throw new Error()
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        trim: true,
        isString: {
          errorMessage: message.IS_STRING
        },
        isStrongPassword: {
          errorMessage: message.IS_STRONG
        }
      }
    },
    ['body']
  )
)
