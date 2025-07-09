"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Shield,
  Database,
  CheckCircle,
  Activity,
  Zap,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const address = searchParams.get("address");

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/wallet/${address}`);
        const data = await res.json();
        setWalletData(data);
        localStorage.setItem("walletData", JSON.stringify(data))
        console.log("✅ Wallet data:", data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };

    fetchData();
  }, [address]);

  
  const steps = [
    { icon: Search, text: "Recherche de l'adresse", color: "text-blue-400" },
    {
      icon: Database,
      text: "Récupération des données",
      color: "text-green-400",
    },
    {
      icon: Shield,
      text: "Analyse des autorisations",
      color: "text-yellow-400",
    },
    {
      icon: Activity,
      text: "Évaluation des risques",
      color: "text-orange-400",
    },
    {
      icon: CheckCircle,
      text: "Finalisation du rapport",
      color: "text-purple-400",
    },
  ];

  useEffect(() => {
    setPulseAnimation(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8 + 3);
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepIndex = Math.floor((progress / 100) * steps.length);
    setCurrentStep(Math.min(stepIndex, steps.length - 1));
  }, [progress]);

  useEffect(() => {
    if (progress >= 100 && address) {
      const timeout = setTimeout(() => {
        router.push(`/scan/${address}`);
      }, 1000); // délai de 1 seconde après 100%

      return () => clearTimeout(timeout);
    }
  }, [progress, address, router]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center mb-12">
          <div className="relative mb-8 inline-block">
            <div className="relative w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <CurrentIcon className="w-12 h-12 text-white transition-all duration-500" />
            </div>

            <div className="absolute inset-0 w-24 h-24 border-2 border-transparent border-t-yellow-400 border-r-yellow-400 rounded-2xl animate-spin"></div>

            <div className="absolute inset-0 w-40 h-40 -m-8">
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
                const radius = 45;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <div
                    key={i}
                    className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
                      i <= (progress / 100) * 8
                        ? "bg-yellow-400 shadow-lg"
                        : "bg-gray-600"
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            Analyse en cours
          </h1>

          <p
            className={`text-xl transition-all duration-500 ${steps[currentStep].color}`}
          >
            {steps[currentStep].text}
          </p>
        </div>

        <div className="w-full max-w-2xl mb-8">
          <div className="relative w-full h-4 bg-white/10 backdrop-blur-md rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-3xl font-bold text-yellow-400">
              {progress}%
            </span>
            <span className="text-gray-400 ml-2">complété</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 w-full max-w-4xl">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={index}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-500 ${
                  isActive
                    ? "bg-white/10 backdrop-blur-md scale-105"
                    : "bg-white/5"
                } ${isCompleted ? "opacity-60" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : isCompleted
                      ? "bg-green-500"
                      : "bg-gray-600"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <StepIcon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs text-center transition-all duration-300 leading-tight ${
                    isActive ? step.color : "text-gray-400"
                  }`}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Loading tips */}
        <div className="text-center max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300">Le saviez-vous ?</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-blue-400 font-semibold">Tokens ERC-20</span>
              <br />
              Analyse de tous vos tokens
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-green-400 font-semibold">
                Autorisations
              </span>
              <br />
              Vérification des permissions
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <span className="text-purple-400 font-semibold">Sécurité</span>
              <br />
              Détection des risques
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
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
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
