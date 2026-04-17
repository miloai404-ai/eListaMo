import React, { useState } from 'react';
import { Wallet, Plus, TrendingUp, ShoppingCart, Car, Home, Coffee, ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Expense {
  id: string;
  category: 'pagkain' | 'transpo' | 'bills' | 'shopping' | 'others';
  amount: number;
  description: string;
  date: string;
}

interface Income {
  id: string;
  source: string;
  amount: number;
  date: string;
}

const PersonalLedger = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      category: 'pagkain',
      amount: 250,
      description: 'Lunch sa Jollibee',
      date: '2026-04-17'
    },
    {
      id: '2', 
      category: 'transpo',
      amount: 50,
      description: 'Jeepney pauwi',
      date: '2026-04-17'
    },
    {
      id: '3',
      category: 'bills',
      amount: 1500,
      description: 'Internet bill',
      date: '2026-04-16'
    }
  ]);

  const [income, setIncome] = useState<Income[]>([
    {
      id: '1',
      source: 'Allowance from parents',
      amount: 2000,
      date: '2026-04-15'
    },
    {
      id: '2',
      source: 'Part-time work',
      amount: 1500,
      date: '2026-04-10'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<'expense' | 'income'>('expense');
  const [newExpense, setNewExpense] = useState({
    category: 'pagkain' as Expense['category'],
    amount: '',
    description: ''
  });
  const [newIncome, setNewIncome] = useState({
    source: '',
    amount: ''
  });

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const categoryIcons = {
    pagkain: Coffee,
    transpo: Car,
    bills: Home,
    shopping: ShoppingCart,
    others: Wallet
  };

  const categoryColors = {
    pagkain: 'text-orange-500',
    transpo: 'text-blue-500',
    bills: 'text-red-500',
    shopping: 'text-purple-500',
    others: 'text-gray-500'
  };

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.description) return;

    const expense: Expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      date: new Date().toISOString().split('T')[0]
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({ category: 'pagkain', amount: '', description: '' });
    setShowAddForm(false);
  };

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncome.amount || !newIncome.source) return;

    const incomeItem: Income = {
      id: Date.now().toString(),
      source: newIncome.source,
      amount: parseFloat(newIncome.amount),
      date: new Date().toISOString().split('T')[0]
    };

    setIncome([incomeItem, ...income]);
    setNewIncome({ source: '', amount: '' });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-blue-800">Personal Ledger</h1>
                <p className="text-blue-600">Track your income and expenses</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setFormType('income'); setShowAddForm(true); }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Income
            </button>
            <button
              onClick={() => { setFormType('expense'); setShowAddForm(true); }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Expense
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Income</p>
                <p className="text-2xl font-bold text-green-600">₱{totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">₱{totalExpenses.toLocaleString()}</p>
              </div>
              <Wallet className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Balance</p>
                <p className={`text-2xl font-bold ${
                  balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ₱{balance.toLocaleString()}
                </p>
              </div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                balance >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {balance >= 0 ? '⬆' : '⬇'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Expenses by Category</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(expensesByCategory).map(([category, amount]) => {
                    const Icon = categoryIcons[category as keyof typeof categoryIcons];
                    const colorClass = categoryColors[category as keyof typeof categoryColors];
                    const percentage = (amount / totalExpenses) * 100;
                    
                    return (
                      <div key={category} className="flex items-center">
                        <Icon className={`h-5 w-5 ${colorClass} mr-3`} />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {category}
                            </span>
                            <span className="text-sm text-gray-600">
                              ₱{amount.toLocaleString()} ({percentage.toFixed(0)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Quick Tips</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 text-sm text-gray-600">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">Filipino Budgeting Tip</p>
                  <p>Follow the 50-30-20 rule: 50% needs, 30% wants, 20% savings</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800">Track Daily</p>
                  <p>Record expenses immediately para hindi mo makalimutan</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-medium text-yellow-800">Emergency Fund</p>
                  <p>Save 3-6 months worth of expenses for emergencies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">
                Add New {formType === 'expense' ? 'Expense' : 'Income'}
              </h2>
              
              {formType === 'expense' ? (
                <form onSubmit={handleAddExpense} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({...newExpense, category: e.target.value as Expense['category']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pagkain">Pagkain (Food)</option>
                      <option value="transpo">Transpo (Transportation)</option>
                      <option value="bills">Bills (Utilities)</option>
                      <option value="shopping">Shopping</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₱)
                    </label>
                    <input
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="What did you spend on?"
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                    >
                      Add Expense
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAddIncome} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source
                    </label>
                    <input
                      type="text"
                      value={newIncome.source}
                      onChange={(e) => setNewIncome({...newIncome, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Salary, Allowance, Side hustle"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₱)
                    </label>
                    <input
                      type="number"
                      value={newIncome.amount}
                      onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                    >
                      Add Income
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Expenses */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Recent Expenses</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {expenses.slice(0, 5).map((expense) => {
                  const Icon = categoryIcons[expense.category];
                  const colorClass = categoryColors[expense.category];
                  
                  return (
                    <div key={expense.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon className={`h-5 w-5 ${colorClass} mr-3`} />
                        <div>
                          <p className="font-medium text-gray-800">{expense.description}</p>
                          <p className="text-sm text-gray-600 capitalize">{expense.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">-₱{expense.amount}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(expense.date).toLocaleDateString('en-PH')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Income */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Recent Income</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {income.slice(0, 5).map((incomeItem) => (
                  <div key={incomeItem.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">{incomeItem.source}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+₱{incomeItem.amount.toLocaleString()}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(incomeItem.date).toLocaleDateString('en-PH')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLedger;