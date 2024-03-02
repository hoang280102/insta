// const { MongoClient, ServerApiVersion } = require('mongodb');
import 'dotenv/config'
import { Collection, Db, MongoClient } from 'mongodb'
import { Users } from '~/models/schemas/user.schemas'
const username = process.env.DATABASE_USERNAME

const password = process.env.PASSWORD_USERNAME

const uri = `mongodb+srv://${username}:${password}@instagram.pm9xazv.mongodb.net/?retryWrites=true&w=majority&appName=instagram`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DATABSE_COLLECTION)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }
  get users(): Collection<Users> {
    return this.db.collection(process.env.COLLECTION_USER as string)
  }
}

const databaseService = new DatabaseService()

export default databaseService
