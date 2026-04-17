import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Wallet, TrendingUp, Users, PiggyBank } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import './index.css'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-8 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          eListaMo
        </h1>
        <p className="text-blue-600 text-lg">
          Shared Personal Ledger & Inflation Insights for Every Filipino
        </p>
        <p className="text-sm text-blue-500 mt-2">
          PdP Tech - Petsa de Peligro System Tech
        </p>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-12">
        {/* Welcome Card */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Kumusta! Welcome to eListaMo
          </h2>
          <p className="text-gray-600 mb-6">
            Your digital lista for tracking expenses, utang, and seeing how inflation affects your budget.
          </p>
          
          <div className="space-y-3">
            <a href="/login" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors block text-center">
              Mag-login
            </a>
            <a href="/login" className="w-full border border-blue-300 hover:border-blue-400 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors block text-center">
              Mag-signup
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <Wallet className="text-blue-500 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Personal Ledger</h3>
            </div>
            <p className="text-gray-600">
              Track your Pagkain, Transpo, Bills, Baon, and all your expenses in one place.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-orange-500 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Inflation Dashboard</h3>
            </div>
            <p className="text-gray-600">
              See how price hikes affect your spending. Get alerts like "Ang gastos mo sa Pagkain ay tumaas ng 28%".
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <PiggyBank className="text-green-500 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Utang Tracker</h3>
            </div>
            <p className="text-gray-600">
              Manage your "Utang Ko" and "Utang Nila" - digitize your traditional lista system.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <Users className="text-purple-500 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Family Wallet</h3>
            </div>
            <p className="text-gray-600">
              Share expenses with your pamilya. Generate invite codes for household budget management.
            </p>
          </div>
        </div>

        {/* Baon Mode Highlight */}
        <div className="max-w-2xl mx-auto mt-8 bg-gradient-to-r from-orange-400 to-blue-400 rounded-xl p-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Baon Mode</h3>
          <p className="text-orange-100">
            Perfect for students! Track your daily allowance and see your savings grow.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-blue-500 text-sm">
          <p>Building financial resilience for every Filipino family</p>
          <p className="mt-1">SDG 1: No Poverty • SDG 10: Reduced Inequalities • SDG 4: Quality Education</p>
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