import React, { useState } from 'react';
import { BarChart3, Plus, User, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UtangEntry {
  id: string;
  type: 'utang_ko' | 'utang_nila';
  person: string;
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'paid';
}

const UtangTracker = () => {
  const [utangEntries, setUtangEntries] = useState<UtangEntry[]>([
    {
      id: '1',
      type: 'utang_ko',
      person: 'Juan',
      amount: 500,
      description: 'Lunch kahapon',
      date: '2026-04-16',
      status: 'pending'
    },
    {
      id: '2',
      type: 'utang_nila',
      person: 'Maria',
      amount: 200,
      description: 'Load para sa project',
      date: '2026-04-15',
      status: 'pending'
    },
    {
      id: '3',
      type: 'utang_ko',
      person: 'Pedro', 
      amount: 1000,
      description: 'Emergency fund',
      date: '2026-04-10',
      status: 'paid'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: 'utang_ko' as 'utang_ko' | 'utang_nila',
    person: '',
    amount: '',
    description: ''
  });

  const utangKo = utangEntries.filter(e => e.type === 'utang_ko' && e.status === 'pending')
    .reduce((sum, entry) => sum + entry.amount, 0);
  
  const utangNila = utangEntries.filter(e => e.type === 'utang_nila' && e.status === 'pending')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const handleAddUtang = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.person || !newEntry.amount || !newEntry.description) return;

    const entry: UtangEntry = {
      id: Date.now().toString(),
      type: newEntry.type,
      person: newEntry.person,
      amount: parseFloat(newEntry.amount),
      description: newEntry.description,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setUtangEntries([entry, ...utangEntries]);
    setNewEntry({
      type: 'utang_ko',
      person: '',
      amount: '',
      description: ''
    });
    setShowAddForm(false);
  };

  const markAsPaid = (id: string) => {
    setUtangEntries(entries => 
      entries.map(entry => 
        entry.id === id ? { ...entry, status: 'paid' as const } : entry
      )
    );
  };

  const pendingEntries = utangEntries.filter(e => e.status === 'pending');
  const paidEntries = utangEntries.filter(e => e.status === 'paid');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-red-600 hover:text-red-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-red-800">Utang Tracker</h1>
                <p className="text-red-600">Manage your debts and credits</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Utang
          </button>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Utang Ko (I Owe)</h3>
            <p className="text-3xl font-bold text-red-600">₱{utangKo}</p>
            <p className="text-sm text-gray-600 mt-1">
              {utangEntries.filter(e => e.type === 'utang_ko' && e.status === 'pending').length} pending
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Utang Nila (They Owe)</h3>
            <p className="text-3xl font-bold text-green-600">₱{utangNila}</p>
            <p className="text-sm text-gray-600 mt-1">
              {utangEntries.filter(e => e.type === 'utang_nila' && e.status === 'pending').length} pending
            </p>
          </div>
        </div>

        {/* Add Utang Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Add New Utang</h2>
              <form onSubmit={handleAddUtang} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={newEntry.type}
                    onChange={(e) => setNewEntry({...newEntry, type: e.target.value as 'utang_ko' | 'utang_nila'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="utang_ko">Utang Ko (I owe them)</option>
                    <option value="utang_nila">Utang Nila (They owe me)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Person
                  </label>
                  <input
                    type="text"
                    value={newEntry.person}
                    onChange={(e) => setNewEntry({...newEntry, person: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Enter person's name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₱)
                  </label>
                  <input
                    type="number"
                    value={newEntry.amount}
                    onChange={(e) => setNewEntry({...newEntry, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
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
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="What was it for?"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Add Utang
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

        {/* Pending Utang */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Pending Utang</h2>
          </div>
          <div className="p-6">
            {pendingEntries.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Walang pending utang! 🎉</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingEntries.map((entry) => (
                  <div key={entry.id} className={`p-4 border rounded-lg ${
                    entry.type === 'utang_ko' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-800">{entry.person}</p>
                          <p className="text-sm text-gray-600">{entry.description}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(entry.date).toLocaleDateString('en-PH')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${
                          entry.type === 'utang_ko' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          ₱{entry.amount}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {entry.type === 'utang_ko' ? 'You owe' : 'They owe'}
                        </p>
                        <button
                          onClick={() => markAsPaid(entry.id)}
                          className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-gray-700"
                        >
                          Mark as Paid
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Paid Utang History */}
        {paidEntries.length > 0 && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Paid History</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {paidEntries.map((entry) => (
                  <div key={entry.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-800">{entry.person}</p>
                          <p className="text-sm text-gray-600">{entry.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-600">₱{entry.amount}</p>
                        <p className="text-xs text-green-600">✓ Paid</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtangTracker;