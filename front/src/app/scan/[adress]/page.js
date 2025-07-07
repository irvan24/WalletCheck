'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import LoadingPage from '../../..'

export default function ScanResultPage() {
  const { address } = useParams()
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState([])
  const [approvals, setApprovals] = useState([])
  const [score, setScore] = useState(null)

  // ⚠️ Simule des données (à remplacer par API plus tard)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTokens([
        { symbol: 'ETH', name: 'Ethereum', balance: 1.23 },
        { symbol: 'USDC', name: 'USD Coin', balance: 750 },
      ])

      setApprovals([
        { spender: 'Uniswap Router', token: 'USDC' },
        { spender: 'UnknownContract.xyz', token: 'DAI' },
      ])

      setScore(6) // score fictif
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [address])

  if (loading) return <LoadingPage />

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-2">📊 Résultats pour :</h1>
      <p className="text-yellow-400 mb-6 break-all">{address}</p>

      {/* Score */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧠 Score de sécurité :</h2>
        <div className={`text-3xl font-bold ${score >= 7 ? 'text-red-500' : score >= 4 ? 'text-yellow-400' : 'text-green-400'}`}>
          {score}/10
        </div>
      </div>

      {/* Tokens */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">💰 Tokens possédés :</h2>
        <ul className="space-y-2">
          {tokens.map((token, i) => (
            <li key={i} className="bg-gray-800 px-4 py-2 rounded">
              {token.name} ({token.symbol}) — {token.balance}
            </li>
          ))}
        </ul>
      </div>

      {/* Approvals */}
      <div>
        <h2 className="text-xl font-semibold mb-2">🔐 Approvals actifs :</h2>
        <ul className="space-y-2">
          {approvals.map((item, i) => (
            <li key={i} className="bg-gray-800 px-4 py-2 rounded">
              {item.spender} peut utiliser <strong>{item.token}</strong>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
