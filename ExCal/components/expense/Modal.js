import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, expense, onUpdate }) => {
  // Check if expense is valid before setting initial state
  const initialDate = expense ? new Date(expense.date).toISOString().split('T')[0] : '';
  const initialDescription = expense ? expense.description : '';
  const initialAmount = expense ? expense.amount : '';

  const [newDate, setNewDate] = useState(initialDate);
  const [newDescription, setNewDescription] = useState(initialDescription);
  const [newAmount, setNewAmount] = useState(initialAmount);

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const handleUpdateExpense = () => {
    const updatedExpense = {
      id: expense._id,
      date: newDate,
      description: newDescription,
      amount: newAmount,
    };
    onUpdate(updatedExpense);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Expense</h2>
        <form onSubmit={handleUpdateExpense}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" id="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" value={newDate} onChange={(e) => setNewDate(e.target.value)} max={today} required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" id="description" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (Rs.)</label>
            <input type="number" id="amount" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} required />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded">Update Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
