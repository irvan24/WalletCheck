import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import walletRoutes from './routes/wallet.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/api/wallet', walletRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
