import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Plus, ArrowLeft, User, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { db } from '../lib/supabase';

interface UtangEntry {
  id?: string;
  type: 'utang_ko' | 'utang_nila'; // I owe someone vs Someone owes me
  person_name: string;
  amount: number;
  description: string;
  date_created: string;
  due_date?: string;
  status: 'pending' | 'paid' | 'overdue';
  payment_history?: { amount: number; date: string; note?: string }[];
}

const UtangTracker = () => {
  const [utangEntries, setUtangEntries] = useState<UtangEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'utang_ko' | 'utang_nila'>('utang_ko');
  const [newEntry, setNewEntry] = useState<UtangEntry>({
    type: 'utang_ko',
    person_name: '',
    amount: 0,
    description: '',
    date_created: new Date().toISOString().split('T')[0],
    status: 'pending'
  });

  const [stats, setStats] = useState({
    totalUtangKo: 0,
    totalUtangNila: 0,
    overdueCount: 0
  });

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [utangEntries]);

  const loadEntries = async () => {
    try {
      const { data, error } = await db.utang.getAll();
      if (error) throw error;
      setUtangEntries(data || []);
    } catch (error) {
      console.log('Demo mode - using local storage');
      const localEntries = localStorage.getItem('utangEntries');
      if (localEntries) {
        setUtangEntries(JSON.parse(localEntries));
      }
    }
  };

  const calculateStats = () => {
    const utangKo = utangEntries.filter(e => e.type === 'utang_ko' && e.status === 'pending')
      .reduce((sum, e) => sum + e.amount, 0);
    const utangNila = utangEntries.filter(e => e.type === 'utang_nila' && e.status === 'pending')
      .reduce((sum, e) => sum + e.amount, 0);
    const overdue = utangEntries.filter(e => 
      e.status === 'pending' && e.due_date && new Date(e.due_date) < new Date()
    ).length;
    
    setStats({ totalUtangKo: utangKo, totalUtangNila: utangNila, overdueCount: overdue });
  };

  const addEntry = async () => {
    try {
      const entryToAdd = { ...newEntry, id: Date.now().toString() };
      
      try {
        await db.utang.create(entryToAdd);
      } catch {
        const updatedEntries = [...utangEntries, entryToAdd];
        localStorage.setItem('utangEntries', JSON.stringify(updatedEntries));
        setUtangEntries(updatedEntries);
      }
      
      setNewEntry({
        type: 'utang_ko',
        person_name: '',
        amount: 0,
        description: '',
        date_created: new Date().toISOString().split('T')[0],
        status: 'pending'
      });
      setShowAddForm(false);
      loadEntries();
    } catch (error) {
      console.error('Failed to add entry:', error);
    }
  };

  const markAsPaid = async (id: string) => {
    try {
      const updatedEntries = utangEntries.map(entry => 
        entry.id === id ? { ...entry, status: 'paid' as const } : entry
      );
      
      try {
        await db.utang.update(id, { status: 'paid' });
      } catch {
        localStorage.setItem('utangEntries', JSON.stringify(updatedEntries));
      }
      
      setUtangEntries(updatedEntries);
    } catch (error) {
      console.error('Failed to update entry:', error);
    }
  };

  const filteredEntries = utangEntries.filter(entry => entry.type === activeTab);

  const getStatusColor = (entry: UtangEntry) => {
    if (entry.status === 'paid') return 'text-green-600';
    if (entry.status === 'overdue' || (entry.due_date && new Date(entry.due_date) < new Date())) {
      return 'text-red-600';
    }
    return 'text-yellow-600';
  };

  const getStatusIcon = (entry: UtangEntry) => {
    if (entry.status === 'paid') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (entry.status === 'overdue' || (entry.due_date && new Date(entry.due_date) < new Date())) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    return <Clock className="w-5 h-5 text-yellow-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-red-600 hover:text-red-800">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-red-800 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3" />
                Utang Tracker
              </h1>
              <p className="text-red-600">Manage your debts and credits</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Utang
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Utang Ko (I Owe)</h3>
            <p className="text-2xl font-bold text-red-600">₱{stats.totalUtangKo.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Money I need to pay</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Utang Nila (They Owe)</h3>
            <p className="text-2xl font-bold text-green-600">₱{stats.totalUtangNila.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Money owed to me</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Overdue</h3>
            <p className="text-2xl font-bold text-orange-600">{stats.overdueCount}</p>
            <p className="text-sm text-gray-600">Past due date</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('utang_ko')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'utang_ko' 
                  ? 'border-b-2 border-red-500 text-red-600 bg-red-50' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Utang Ko ({utangEntries.filter(e => e.type === 'utang_ko' && e.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('utang_nila')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'utang_nila' 
                  ? 'border-b-2 border-green-500 text-green-600 bg-green-50' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Utang Nila ({utangEntries.filter(e => e.type === 'utang_nila' && e.status === 'pending').length})
            </button>
          </div>
        </div>

        {/* Add Entry Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Add New Utang Entry</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={newEntry.type}
                    onChange={(e) => setNewEntry({...newEntry, type: e.target.value as 'utang_ko' | 'utang_nila'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="utang_ko">Utang Ko (I owe someone)</option>
                    <option value="utang_nila">Utang Nila (Someone owes me)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Person's Name</label>
                  <input
                    type="text"
                    value={newEntry.person_name}
                    onChange={(e) => setNewEntry({...newEntry, person_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                
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
                    placeholder="Lunch money, groceries, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date (Optional)</label>
                  <input
                    type="date"
                    value={newEntry.due_date || ''}
                    onChange={(e) => setNewEntry({...newEntry, due_date: e.target.value || undefined})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="divide-y divide-gray-200">
            {filteredEntries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No {activeTab === 'utang_ko' ? 'debts' : 'credits'} recorded yet.</p>
                <p className="text-sm">Start tracking your {activeTab === 'utang_ko' ? 'utang' : 'pinahiram'}!</p>
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <div key={entry.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-8 h-8 text-gray-400 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{entry.person_name}</h3>
                        <p className="text-gray-600">{entry.description}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Created: {entry.date_created}</span>
                          {entry.due_date && (
                            <span className="ml-3">• Due: {entry.due_date}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-2">
                        {getStatusIcon(entry)}
                        <span className={`ml-2 font-bold text-xl ${getStatusColor(entry)}`}>
                          ₱{entry.amount.toLocaleString()}
                        </span>
                      </div>
                      {entry.status === 'pending' && (
                        <button
                          onClick={() => markAsPaid(entry.id!)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-red-100 rounded-lg p-6">
          <h3 className="font-semibold text-red-800 mb-3">💡 Utang Management Tips:</h3>
          <ul className="text-red-700 space-y-1 text-sm">
            <li>• Always set a due date to avoid misunderstandings</li>
            <li>• Keep track of both "utang ko" and "utang nila" for clarity</li>
            <li>• Pay debts on time to maintain good relationships</li>
            <li>• Be polite but firm when collecting money owed to you</li>
            <li>• Consider putting agreements in writing for large amounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UtangTracker;