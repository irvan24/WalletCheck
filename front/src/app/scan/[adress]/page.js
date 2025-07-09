'use client'

import { useState, useEffect } from 'react'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Coins,
  Key,
  Activity,
  Eye,
  Copy,
  ExternalLink,
  ArrowLeft,
  Zap,
  Lock,
  Unlock,
  Calendar,
  DollarSign,
  BarChart3,
  AlertCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function WalletResultsPage() {
    const [activeTab, setActiveTab] = useState('overview')
    const [copiedAddress, setCopiedAddress] = useState(false)
    const [isAnimated, setIsAnimated] = useState(false)
    const [walletData, setWalletData] = useState(null)
    const router = useRouter()
  
    useEffect(() => {
      const storedData = localStorage.getItem('walletData')
      if (!storedData) {
        router.push('/')
        return
      }
      setWalletData(JSON.parse(storedData))
      console.log(walletData);
      setIsAnimated(true)
    }, [router])
  
    if (!walletData) return null
  
    const copyAddress = () => {
      navigator.clipboard.writeText(walletData.address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    }
  
    const getHealthColor = (score) => {
      if (score >= 80) return 'text-green-400'
      if (score >= 60) return 'text-yellow-400'
      return 'text-red-400'
    }
  
    const getHealthBgColor = (score) => {
      if (score >= 80) return 'bg-green-500'
      if (score >= 60) return 'bg-yellow-500'
      return 'bg-red-500'
    }
  
    const getRiskColor = (risk) => {
      switch (risk) {
        case 'high': return 'text-red-400 bg-red-500/20'
        case 'medium': return 'text-yellow-400 bg-yellow-500/20'
        case 'low': return 'text-green-400 bg-green-500/20'
        default: return 'text-gray-400 bg-gray-500/20'
      }
    }
     
    const handleBack = () => {
        router.push("/")
    }
  
    const formatAddress = (address) => {
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Analyse du Wallet
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-gray-300">{walletData.ensName}</span>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg">
                  <span className="text-sm font-mono">{formatAddress(walletData.address)}</span>
                  <button 
                    onClick={copyAddress}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedAddress ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Health Score */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Score de santé</div>
                <div className={`text-3xl font-bold ${getHealthColor(walletData.healthScore)}`}>
                  {walletData.healthScore}/100
                </div>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-700"/>
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="30" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    fill="none" 
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - walletData.healthScore / 100)}`}
                    className={getHealthColor(walletData.healthScore)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className={`w-8 h-8 ${getHealthColor(walletData.healthScore)}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
            ${walletData.totalValue?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-gray-400">Valeur totale</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">{walletData.totalTokens}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{walletData.totalTokens}</div>
            <div className="text-sm text-gray-400">Types de tokens</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Key className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-yellow-400">{walletData.activeApprovals}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{walletData.activeApprovals}</div>
            <div className="text-sm text-gray-400">Autorisations actives</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-red-400">{walletData.riskApprovals}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{walletData.riskApprovals}</div>
            <div className="text-sm text-gray-400">Risques détectés</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className={`mb-8 transition-all duration-1000 delay-600 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-2">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'tokens', label: 'Tokens', icon: Coins },
              { id: 'approvals', label: 'Autorisations', icon: Key },
              { id: 'activity', label: 'Activité', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`transition-all duration-1000 delay-900 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Risk Assessment */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  Évaluation des risques
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Autorisations risquées</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm">
                      {walletData.riskApprovals} détectées
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Dernière activité</span>
                    <span className="text-gray-400">{walletData.lastActivity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Niveau de risque</span>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm">
                      {walletData.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Tokens */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-blue-400" />
                  Top tokens
                </h3>
                <div className="space-y-3">
                {walletData.tokens?.map((token, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {token.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold">{token.symbol}</div>
                          <div className="text-xs text-gray-400">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${token.value.toLocaleString()}</div>
                        <div className={`text-xs ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {token.change >= 0 ? '+' : ''}{token.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Coins className="w-5 h-5 text-blue-400" />
                Portfolio de tokens
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4">Token</th>
                      <th className="text-right py-3 px-4">Balance</th>
                      <th className="text-right py-3 px-4">Valeur</th>
                      <th className="text-right py-3 px-4">24h %</th>
                    </tr>
                  </thead>
                  <tbody>
                  {walletData.tokens?.map((token, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                              {token.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold">{token.symbol}</div>
                              <div className="text-sm text-gray-400">{token.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4">
                          <div className="font-semibold">{token.balance.toLocaleString()}</div>
                        </td>
                        <td className="text-right py-4 px-4">
                          <div className="font-semibold">${token.value.toLocaleString()}</div>
                        </td>
                        <td className="text-right py-4 px-4">
                          <div className={`font-semibold ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {token.change >= 0 ? '+' : ''}{token.change}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Key className="w-5 h-5 text-yellow-400" />
                Autorisations actives
              </h3>
              <div className="space-y-4">
              {walletData.approvals?.map((approval, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <Key className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{approval.protocol}</div>
                          <div className="text-sm text-gray-400">{approval.token}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-lg text-xs ${getRiskColor(approval.risk)}`}>
                          {approval.risk === 'high' ? 'Risque élevé' : 
                           approval.risk === 'medium' ? 'Risque modéré' : 'Faible risque'}
                        </span>
                        <button className="text-red-400 hover:text-red-300">
                          <Unlock className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Montant autorisé:</span>
                        <span className="ml-2 font-semibold">{approval.amount}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Dernière utilisation:</span>
                        <span className="ml-2 font-semibold">{approval.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Activité récente
              </h3>
              <div className="space-y-4">
              {walletData.activities?.map((activity, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'send' ? 'bg-red-500/20 text-red-400' :
                          activity.type === 'receive' ? 'bg-green-500/20 text-green-400' :
                          activity.type === 'swap' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {activity.type === 'send' ? <TrendingDown className="w-5 h-5" /> :
                           activity.type === 'receive' ? <TrendingUp className="w-5 h-5" /> :
                           activity.type === 'swap' ? <Zap className="w-5 h-5" /> :
                           <Lock className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-semibold capitalize">{activity.type}</div>
                          <div className="text-sm text-gray-400">{activity.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{activity.amount} {activity.token}</div>
                        <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Voir transaction
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}