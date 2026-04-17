import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Wallet, PiggyBank, TrendingUp, Users } from 'lucide-react'
import Dashboard from './components/Dashboard'
import BaonMode from './components/BaonMode'
import UtangTracker from './components/UtangTracker'
import InflationDashboard from './components/InflationDashboard'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 p-2 rounded-cute">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">
                  eListaMo
                </h1>
                <p className="text-sm text-neutral-600">
                  🇵🇭 Filipino Finance Tracker
                </p>
              </div>
            </div>
            <div className="text-sm text-neutral-500">
              Cute but Powerful! ✨
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Navigation />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/baon" element={<BaonMode />} />
            <Route path="/utang" element={<UtangTracker />} />
            <Route path="/inflation" element={<InflationDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App