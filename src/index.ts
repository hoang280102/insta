import express from 'express'
import databaseService from './services/database.service'
import userRouter from './routes/user.routes'

const app = express()

const port = process.env.PORT

databaseService.connect()

app.use(express.json())

app.use('/users', userRouter)
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
