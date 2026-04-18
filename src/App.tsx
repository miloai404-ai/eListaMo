import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Wallet, TrendingUp, Users, PiggyBank, Star, Shield, Zap } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import './index.css'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sampaguita-50 via-manila-50 to-lawin-50">
      {/* Header */}
      <header className="relative px-6 py-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-manila-500/10 to-sampaguita-500/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-r from-manila-500 to-sampaguita-500 p-4 rounded-2xl shadow-lg">
              <Wallet className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-manila-700 to-sampaguita-700 bg-clip-text text-transparent mb-4">
            eListaMo
          </h1>
          <p className="text-xl md:text-2xl text-manila-700 font-medium mb-2">
            Shared Personal Ledger & Inflation Insights
          </p>
          <p className="text-lg text-manila-600 mb-4">
            Para sa Bawat Pamilyang Pilipino 🇵🇭
          </p>
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-md">
            <Shield className="w-5 h-5 text-manila-500 mr-2" />
            <span className="text-manila-700 font-medium">PdP Tech - Petsa de Peligro System</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-16 relative">
        {/* Welcome Card */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-manila-500 to-sampaguita-500 rounded-2xl mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-manila-800 mb-2">
                Kumusta! Welcome to eListaMo
              </h2>
              <p className="text-manila-600 leading-relaxed">
                Your digital lista for tracking gastos, utang, and seeing how inflation affects your budget. Simple, secure, at gawa para sa Pinoy!
              </p>
            </div>
            
            <div className="space-y-4">
              <a 
                href="/login" 
                className="w-full bg-gradient-to-r from-manila-500 to-sampaguita-500 hover:from-manila-600 hover:to-sampaguita-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl block text-center"
              >
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Mag-login Ngayon
                </div>
              </a>
              <a 
                href="/login" 
                className="w-full border-2 border-manila-300 hover:border-manila-400 text-manila-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-manila-50 block text-center"
              >
                Mag-signup (Free!)
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-manila-800 mb-12">
            Mga Features na Makakatulong sa'yo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Personal Ledger */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-manila-500 to-manila-600 rounded-xl flex items-center justify-center mr-4">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-manila-800">Personal Ledger</h4>
              </div>
              <p className="text-manila-600 leading-relaxed mb-4">
                Track your <span className="font-semibold text-manila-700">Pagkain, Transpo, Bills, Baon</span>, and all your gastos in one organized place. May breakdown pa by category!
              </p>
              <div className="flex items-center text-sm text-manila-500">
                <Star className="w-4 h-4 mr-1" />
                Perfect for budgeting
              </div>
            </div>

            {/* Baon Mode */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-sampaguita-500 to-sampaguita-600 rounded-xl flex items-center justify-center mr-4">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-manila-800">Baon Mode</h4>
              </div>
              <p className="text-manila-600 leading-relaxed mb-4">
                Perfect for students! Track your daily <span className="font-semibold text-sampaguita-700">baon</span> and see your savings grow. May daily insights pa!
              </p>
              <div className="flex items-center text-sm text-manila-500">
                <Star className="w-4 h-4 mr-1" />
                Great for students
              </div>
            </div>

            {/* Utang Tracker */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-lawin-500 to-lawin-600 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-manila-800">Utang Tracker</h4>
              </div>
              <p className="text-manila-600 leading-relaxed mb-4">
                Manage your <span className="font-semibold text-lawin-700">"Utang Ko"</span> and <span className="font-semibold text-lawin-700">"Utang Nila"</span> - digitize your traditional lista system. No more forgotten debts!
              </p>
              <div className="flex items-center text-sm text-manila-500">
                <Star className="w-4 h-4 mr-1" />
                Never forget again
              </div>
            </div>

            {/* Family Wallet */}
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-manila-600 to-sampaguita-600 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-manila-800">Family Wallet</h4>
              </div>
              <p className="text-manila-600 leading-relaxed mb-4">
                Share expenses with your <span className="font-semibold text-manila-700">pamilya</span>. Generate invite codes for household budget management. Sama-sama kayo!
              </p>
              <div className="flex items-center text-sm text-manila-500">
                <Star className="w-4 h-4 mr-1" />
                Family-friendly
              </div>
            </div>
          </div>
        </div>

        {/* Inflation Dashboard Highlight */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-manila-500 via-sampaguita-500 to-lawin-500 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Inflation Dashboard
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              See how price hikes affect your spending. Get smart alerts like 
              <span className="font-semibold"> "Ang gastos mo sa Pagkain ay tumaas ng 28% this month!"</span>
            </p>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-medium">Real-time price monitoring</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 space-y-4">
          <p className="text-lg font-semibold text-manila-700">
            Building financial resilience for every Filipino family
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-manila-600">
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              SDG 1: No Poverty
            </span>
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              SDG 10: Reduced Inequalities
            </span>
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              SDG 4: Quality Education
            </span>
          </div>
        </footer>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App