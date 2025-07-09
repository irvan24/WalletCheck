import express from 'express'
import { getWalletInfo } from '../services/web3api.js'
import { calculateRiskScore } from '../utils/riskScore.js'

const router = express.Router()

router.get('/:address', async (req, res) => {
  const { address } = req.params

  try {
    const data = await getWalletInfo(address)
    const riskScore = calculateRiskScore(data)

    res.json({ ...data, riskScore })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de l’analyse du portefeuille' })
  }
})

export default router
