import fetch from 'node-fetch'
import 'dotenv/config'

const ETHERSCAN_BASE = 'https://api.etherscan.io/api'
const API_KEY = process.env.ETHERSCAN_API_KEY

function weiToEth(wei) {
  return parseFloat(wei) / 1e18
}

function getRiskScore(transactions) {
  // Basé sur le nombre de tx, présence de contrats, etc. (logique simple ici)
  if (transactions.length > 100) return 'low'
  if (transactions.length > 10) return 'medium'
  return 'high'
}

export async function getWalletInfo(address) {
    try {
      // Fetch ETH balance
      const balanceRes = await fetch(`${ETHERSCAN_BASE}?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`)
      const balanceData = await balanceRes.json()
      const ethBalance = parseFloat(balanceData.result) / 1e18
  
      // Fetch transactions
      const txRes = await fetch(`${ETHERSCAN_BASE}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${API_KEY}`)
      const txData = await txRes.json()
      const transactions = txData.result.slice(0, 10)
  
      const tokens = [
        {
          symbol: 'ETH',
          name: 'Ethereum',
          balance: ethBalance,
          value: ethBalance * 3000,
          change: 1.2
        }
      ]
  
      const approvals = [
        {
          protocol: 'Uniswap',
          token: 'USDC',
          risk: 'high',
          amount: 'Unlimited',
          lastUsed: '2025-07-08'
        }
      ]
  
      const activities = transactions.map((tx) => ({
        type: tx.from.toLowerCase() === address.toLowerCase() ? 'send' : 'receive',
        amount: (parseFloat(tx.value) / 1e18).toFixed(4),
        token: 'ETH',
        time: new Date(tx.timeStamp * 1000).toLocaleDateString()
      }))
  
      return {
        address,
        healthScore: 80,
        totalValue: tokens.reduce((acc, t) => acc + t.value, 0),
        totalTokens: tokens.length,
        tokens,
        approvals,
        activeApprovals: approvals.length,
        riskApprovals: approvals.filter(a => a.risk === 'high').length,
        riskLevel: 'medium',
        lastActivity: new Date(transactions[0]?.timeStamp * 1000).toLocaleDateString(),
        activities
      }
  
    } catch (err) {
      console.error("Erreur getWalletInfo", err)
      throw err
    }
  }
  