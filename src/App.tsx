import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Wallet, TrendingUp, Users, PiggyBank, Heart, Star, ArrowRight } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import './index.css'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-manila-50 via-sampaguita-50 to-lawin-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-manila-200 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-sampaguita-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-lawin-200 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <header className="relative px-6 py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-manila-500 to-sampaguita-500 rounded-full mb-6 shadow-lg">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-manila-600 via-sampaguita-600 to-lawin-600 bg-clip-text text-transparent mb-4">
          eListaMo
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-2 font-medium">
          Shared Personal Ledger & Inflation Insights
        </p>
        <p className="text-lg text-gray-600 mb-1">
          Para sa bawat pamilyang Pilipino
        </p>
        <div className="flex items-center justify-center gap-2 text-manila-600">
          <Star className="w-4 h-4" />
          <span className="text-sm font-medium">PdP Tech - Petsa de Peligro System Tech</span>
          <Star className="w-4 h-4" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-6 pb-16">
        {/* Hero Welcome Card */}
        <div className="max-w-lg mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Kumusta! 👋
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Welcome to your digital <span className="font-semibold text-manila-600">lista</span> for tracking expenses, utang, at makikita mo kung paano nakakaapekto ang inflation sa inyong budget.
              </p>
            </div>
            
            <div className="space-y-4">
              <a href="/login" className="group w-full bg-gradient-to-r from-manila-500 to-sampaguita-500 hover:from-manila-600 hover:to-sampaguita-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                <span>Mag-login</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/login" className="w-full border-2 border-manila-300 hover:border-manila-400 text-manila-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-manila-50 group">
                <span>Mag-signup</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Mga Features na Makakatulong sa Inyo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {/* Personal Ledger */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-manila-400 to-manila-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Wallet className="text-white w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800">Personal Ledger</h4>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                I-track ang inyong <span className="font-semibold text-manila-600">Pagkain, Transpo, Bills, Baon</span>, at lahat ng gastos sa isang lugar lang.
              </p>
            </div>

            {/* Inflation Dashboard */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <TrendingUp className="text-white w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800">Inflation Insights</h4>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Makita kung paano nakakaapekto ang price hikes sa inyong gastos. May alerts pa tulad ng <span className="font-semibold text-orange-600">"Ang gastos mo sa Pagkain ay tumaas ng 28%"</span>.
              </p>
            </div>

            {/* Utang Tracker */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <PiggyBank className="text-white w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800">Utang Tracker</h4>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                I-manage ang inyong <span className="font-semibold text-emerald-600">"Utang Ko"</span> at <span className="font-semibold text-emerald-600">"Utang Nila"</span> - digital na version ng traditional lista system.
              </p>
            </div>

            {/* Family Wallet */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Users className="text-white w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800">Family Wallet</h4>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Mag-share ng gastos kasama ang inyong <span className="font-semibold text-purple-600">pamilya</span>. May invite codes pa para sa household budget management.
              </p>
            </div>
          </div>

          {/* Baon Mode Highlight */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-sampaguita-400 via-manila-400 to-lawin-400 rounded-3xl p-8 text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Baon Mode 🎒</h3>
                <p className="text-xl md:text-2xl text-white/90 mb-6">
                  Perfect para sa mga estudyante! Track niyo ang daily allowance at makita kung paano tumutubo ang inyong savings.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-lg font-semibold">
                  <Star className="w-5 h-5" />
                  <span>Student-friendly features</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SDG Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Sustainable Development Goals</h4>
            <p className="text-lg text-gray-600 mb-6">
              Building financial resilience for every Filipino family
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-4 py-2 rounded-full font-medium">
                SDG 1: No Poverty
              </span>
              <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full font-medium">
                SDG 4: Quality Education
              </span>
              <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-4 py-2 rounded-full font-medium">
                SDG 10: Reduced Inequalities
              </span>
            </div>
          </div>
        </div>
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