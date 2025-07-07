'use client'

import { useState, useEffect } from 'react'
import { Search, Shield, TrendingUp, Users, CheckCircle, AlertTriangle } from 'lucide-react'

export default function Home() {
  const [address, setAddress] = useState('')
  const [isAnimated, setIsAnimated] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address) return
    // router.push(`/scan/${address}`)
    console.log('Scanning:', address)
  }

  useEffect(() => {
    setIsAnimated(true)
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Sécurité avancée",
      description: "Détection des risques et vulnérabilités",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      title: "Analyse en temps réel",
      description: "Données actualisées en permanence",
      color: "text-green-400"
    },
    {
      icon: Users,
      title: "Interface intuitive",
      description: "Résultats clairs et compréhensibles",
      color: "text-purple-400"
    }
  ]

  const stats = [
    { value: "50K+", label: "Wallets analysés" },
    { value: "99.9%", label: "Précision" },
    { value: "24/7", label: "Disponibilité" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className={`text-center mb-12 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            Wallet Health Check
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Analysez la santé de votre portefeuille Ethereum en quelques secondes. 
            Découvrez vos tokens, autorisations et optimisez votre sécurité.
          </p>
        </div>

        <div className={`w-full max-w-2xl mb-16 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="Entrez une adresse Ethereum ou ENS (ex: vitalik.eth)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-6 py-4 pr-32 text-lg rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 placeholder-gray-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e)
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={!address}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-400 flex flex-wrap gap-2">
              <button
                onClick={() => setAddress('vitalik.eth')}
                className="px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                vitalik.eth
              </button>
              <button
                onClick={() => setAddress('0x...')}
                className="px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                0x...
              </button>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-4xl transition-all duration-1000 delay-600 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 ${currentFeature === index ? 'ring-2 ring-yellow-500/50 bg-white/10' : ''}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-white/10 to-white/5 flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-3 gap-8 w-full max-w-2xl transition-all duration-1000 delay-900 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={`mt-12 flex items-center gap-4 text-sm text-gray-400 transition-all duration-1000 delay-1200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Sécurisé</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>Données vérifiées</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span>Analyse en temps réel</span>
          </div>
        </div>
      </main>

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