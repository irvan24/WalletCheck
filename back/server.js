import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import walletRoutes from './routes/wallet.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/wallet', walletRoutes)

// Health check (optionnel)
app.get('/', (req, res) => {
  res.send('API WalletCheck is running.')
})

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`)
})
