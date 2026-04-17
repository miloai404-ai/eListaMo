import React, { useState } from 'react';
import { PiggyBank, Plus, Calendar, Coins, TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BaonEntry {
  id: string;
  date: string;
  amount: number;
  spent: number;
  remaining: number;
  note?: string;
}

const BaonMode = () => {
  const [baonEntries, setBaonEntries] = useState<BaonEntry[]>([
    {
      id: '1',
      date: '2026-04-17',
      amount: 150,
      spent: 120,
      remaining: 30,
      note: 'Lunch sa school'
    },
    {
      id: '2', 
      date: '2026-04-16',
      amount: 150,
      spent: 140,
      remaining: 10,
      note: 'Naubos sa merienda'
    }
  ]);

  const [newAmount, setNewAmount] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const totalBaon = baonEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const totalSpent = baonEntries.reduce((sum, entry) => sum + entry.spent, 0);
  const totalRemaining = baonEntries.reduce((sum, entry) => sum + entry.remaining, 0);
  const averageSpending = totalSpent / baonEntries.length;

  const handleAddBaon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmount) return;

    const newEntry: BaonEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(newAmount),
      spent: 0,
      remaining: parseFloat(newAmount),
      note: newNote
    };

    setBaonEntries([newEntry, ...baonEntries]);
    setNewAmount('');
    setNewNote('');
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-yellow-600 hover:text-yellow-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <PiggyBank className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-yellow-800">Baon Mode</h1>
                <p className="text-yellow-600">Track your daily allowance</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Baon
          </button>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Baon</p>
                <p className="text-2xl font-bold text-green-600">₱{totalBaon}</p>
              </div>
              <Coins className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">₱{totalSpent}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Remaining</p>
                <p className="text-2xl font-bold text-blue-600">₱{totalRemaining}</p>
              </div>
              <PiggyBank className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg/Day</p>
                <p className="text-2xl font-bold text-purple-600">₱{averageSpending.toFixed(0)}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Add Baon Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Add New Baon</h2>
              <form onSubmit={handleAddBaon} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₱)
                  </label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g., Baon for Friday"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                  >
                    Add Baon
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
            </div>
          </div>
        )}

        {/* Baon History */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Baon History</h2>
          </div>
          <div className="p-6">
            {baonEntries.length === 0 ? (
              <div className="text-center py-8">
                <PiggyBank className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No baon entries yet. Add your first baon!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {baonEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {new Date(entry.date).toLocaleDateString('en-PH')}
                        </p>
                        {entry.note && (
                          <p className="text-sm text-gray-600">{entry.note}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">₱{entry.amount}</p>
                      <p className="text-sm text-gray-600">
                        Spent: ₱{entry.spent} | Left: ₱{entry.remaining}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-3">💡 Baon Tips</h3>
          <ul className="space-y-2 text-yellow-100">
            <li>• Set a daily budget and stick to it</li>
            <li>• Bring water from home to save on drinks</li>
            <li>• Look for affordable pero masarap na karinderias</li>
            <li>• Save leftover baon for emergency situations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BaonMode;