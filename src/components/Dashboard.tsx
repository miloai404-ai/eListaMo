import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, Users, PiggyBank, BarChart3, User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-filipino-blue mb-2">eListaMo</h1>
          <p className="text-gray-600">Shared Personal Ledger & Inflation Insights for Every Filipino</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Ledger */}
          <Link to="/ledger" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Wallet className="h-8 w-8 text-filipino-blue mr-3" />
              <h2 className="text-xl font-semibold">Personal Ledger</h2>
            </div>
            <p className="text-gray-600">Track your income, expenses, and savings with Filipino categories</p>
          </Link>

          {/* Baon Mode */}
          <Link to="/baon" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <PiggyBank className="h-8 w-8 text-filipino-yellow mr-3" />
              <h2 className="text-xl font-semibold">Baon Mode</h2>
            </div>
            <p className="text-gray-600">Daily allowance tracking for students</p>
          </Link>

          {/* Utang Tracker */}
          <Link to="/utang" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-8 w-8 text-filipino-red mr-3" />
              <h2 className="text-xl font-semibold">Utang Tracker</h2>
            </div>
            <p className="text-gray-600">Manage debts and track payments</p>
          </Link>

          {/* Inflation Dashboard */}
          <Link to="/inflation" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-xl font-semibold">Inflation Insights</h2>
            </div>
            <p className="text-gray-600">Track price changes and spending patterns</p>
          </Link>

          {/* Shared Wallet */}
          <Link to="/shared" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-green-500 mr-3" />
              <h2 className="text-xl font-semibold">Family Wallet</h2>
            </div>
            <p className="text-gray-600">Shared household budget management</p>
          </Link>

          {/* Profile */}
          <Link to="/profile" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <User className="h-8 w-8 text-purple-500 mr-3" />
              <h2 className="text-xl font-semibold">Profile</h2>
            </div>
            <p className="text-gray-600">Manage your account and preferences</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;