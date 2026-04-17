import React from 'react'
import { Wallet, TrendingUp, Users, PiggyBank } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-manila-50 to-sampaguita-100">
      {/* Header */}
      <header className="px-6 py-8 text-center">
        <h1 className="text-4xl font-bold text-manila-800 mb-2">
          eListaMo
        </h1>
        <p className="text-manila-600 text-lg">
          Shared Personal Ledger & Inflation Insights for Every Filipino
        </p>
        <p className="text-sm text-manila-500 mt-2">
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
            <button className="w-full bg-manila-500 hover:bg-manila-600 text-white font-medium py-3 rounded-lg transition-colors">
              Mag-login
            </button>
            <button className="w-full border border-manila-300 hover:border-manila-400 text-manila-700 font-medium py-3 rounded-lg transition-colors">
              Mag-signup
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <Wallet className="text-manila-500 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Personal Ledger</h3>
            </div>
            <p className="text-gray-600">
              Track your Pagkain, Transpo, Bills, Baon, and all your expenses in one place.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-sampaguita-500 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Inflation Dashboard</h3>
            </div>
            <p className="text-gray-600">
              See how price hikes affect your spending. Get alerts like "Ang gastos mo sa Pagkain ay tumaas ng 28%".
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <PiggyBank className="text-lawin-500 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Utang Tracker</h3>
            </div>
            <p className="text-gray-600">
              Manage your "Utang Ko" and "Utang Nila" - digitize your traditional lista system.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <Users className="text-manila-500 w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Family Wallet</h3>
            </div>
            <p className="text-gray-600">
              Share expenses with your pamilya. Generate invite codes for household budget management.
            </p>
          </div>
        </div>

        {/* Baon Mode Highlight */}
        <div className="max-w-2xl mx-auto mt-8 bg-gradient-to-r from-sampaguita-400 to-manila-400 rounded-xl p-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Baon Mode</h3>
          <p className="text-sampaguita-100">
            Perfect for students! Track your daily allowance and see your savings grow.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-manila-500 text-sm">
          <p>Building financial resilience for every Filipino family</p>
          <p className="mt-1">SDG 1: No Poverty • SDG 10: Reduced Inequalities • SDG 4: Quality Education</p>
        </footer>
      </main>
    </div>
  )
}

export default App