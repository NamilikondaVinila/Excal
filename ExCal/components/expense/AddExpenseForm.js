import React, { useState } from 'react';

const AddExpenseForm = ({expenses, setExpenses}) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleDateChange = (e) => setDate(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const addExpense = async()=>{
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const resp = await fetch(`${baseUrl}/api/expense/add`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            "token" : localStorage.getItem('token')
        },
        body: JSON.stringify({date,description,amount})
    })

    const res = await resp.json();
    return res;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addExpense();
    console.log(res);
    if(res.success){
        setExpenses(expenses => [...expenses, res.data])
        setDate('');
        setDescription('');
        setAmount('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={date}
            onChange={handleDateChange}
            max={today} // Set max attribute to today's date
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount (Rs.)
          </label>
          <input
            type="number"
            id="amount"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
