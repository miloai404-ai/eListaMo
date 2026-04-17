import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiggyBank, Plus, ArrowLeft, Calendar, Peso } from 'lucide-react';
import { db } from '../lib/supabase';

interface BaonEntry {
  id?: string;
  date: string;
  amount: number;
  description: string;
  category: 'allowance' | 'expense' | 'savings';
  subcategory?: string;
}

const BaonMode = () => {
  const [entries, setEntries] = useState<BaonEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState<BaonEntry>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    description: '',
    category: 'expense'
  });

  const [stats, setStats] = useState({
    totalAllowance: 0,
    totalExpenses: 0,
    savings: 0
  });

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [entries]);

  const loadEntries = async () => {
    try {
      const { data, error } = await db.baon.getAll();
      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.log('Demo mode - using local storage');
      const localEntries = localStorage.getItem('baonEntries');
      if (localEntries) {
        setEntries(JSON.parse(localEntries));
      }
    }
  };

  const calculateStats = () => {
    const allowance = entries.filter(e => e.category === 'allowance').reduce((sum, e) => sum + e.amount, 0);
    const expenses = entries.filter(e => e.category === 'expense').reduce((sum, e) => sum + e.amount, 0);
    const savings = allowance - expenses;
    
    setStats({ totalAllowance: allowance, totalExpenses: expenses, savings });
  };

  const addEntry = async () => {
    try {
      const entryToAdd = { ...newEntry, id: Date.now().toString() };
      
      // Try Supabase first, fallback to localStorage
      try {
        await db.baon.create(entryToAdd);
      } catch {
        const updatedEntries = [...entries, entryToAdd];
        localStorage.setItem('baonEntries', JSON.stringify(updatedEntries));
        setEntries(updatedEntries);
      }
      
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        amount: 0,
        description: '',
        category: 'expense'
      });
      setShowAddForm(false);
      loadEntries();
    } catch (error) {
      console.error('Failed to add entry:', error);
    }
  };

  const expenseCategories = [
    'Pagkain', 'Transpo', 'School Supplies', 'Snacks', 'Drinks', 'Projects', 'Emergency', 'Others'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-orange-600 hover:text-orange-800">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-orange-800 flex items-center">
                <PiggyBank className="w-8 h-8 mr-3" />
                Baon Mode
              </h1>
              <p className="text-orange-600">Track your daily allowance and expenses</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Baon</h3>
            <p className="text-2xl font-bold text-green-600">₱{stats.totalAllowance.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Gastos</h3>
            <p className="text-2xl font-bold text-red-600">₱{stats.totalExpenses.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Natira</h3>
            <p className={`text-2xl font-bold ${stats.savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₱{stats.savings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Add Entry Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Add New Entry</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry({...newEntry, category: e.target.value as 'allowance' | 'expense'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="allowance">Baon Received</option>
                    <option value="expense">Gastos</option>
                  </select>
                </div>
                
                {newEntry.category === 'expense' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Expense Type</label>
                    <select
                      value={newEntry.subcategory || ''}
                      onChange={(e) => setNewEntry({...newEntry, subcategory: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select category...</option>
                      {expenseCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1">Amount (₱)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newEntry.amount}
                    onChange={(e) => setNewEntry({...newEntry, amount: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input
                    type="text"
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="What did you buy?"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={addEntry}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {entries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <PiggyBank className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No entries yet. Start tracking your baon!</p>
              </div>
            ) : (
              entries.slice().reverse().map((entry) => (
                <div key={entry.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{entry.date}</span>
                      {entry.subcategory && (
                        <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                          {entry.subcategory}
                        </span>
                      )}
                    </div>
                    <p className="font-medium">{entry.description || 'No description'}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      entry.category === 'allowance' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.category === 'allowance' ? '+' : '-'}₱{entry.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">{entry.category}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-orange-100 rounded-lg p-6">
          <h3 className="font-semibold text-orange-800 mb-3">💡 Baon Tips for Students:</h3>
          <ul className="text-orange-700 space-y-1 text-sm">
            <li>• Track every peso to see where your money goes</li>
            <li>• Set a daily budget and stick to it</li>
            <li>• Try to save at least 10% of your baon</li>
            <li>• Cook at home when possible - mas tipid!</li>
            <li>• Use the "Needs vs Wants" rule before buying</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BaonMode;