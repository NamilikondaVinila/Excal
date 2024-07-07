import React, { useEffect, useState } from 'react';
import ExpenseCard from './ExpenseCard';
import MonthlyCard from './MonthlyCard';
import Modal from './Modal'; // Import your Modal component

const ViewExpenses = ({ expenses, setExpenses }) => {
  const [selectedOption, setSelectedOption] = useState('monthly');
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [totalDailyAmount, setTotalDailyAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal
  const [currentExpense, setCurrentExpense] = useState(null); // State to store the current expense being edited
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Sort expenses in descending order based on date (latest first)
    const sortedExpensesTemp = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedExpenses(sortedExpensesTemp);

    // Calculate total amount spent till date for 'daily' option
    const dailyAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    setTotalDailyAmount(dailyAmount);
  }, [expenses]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleUpdateExpense = async(updatedExpense) => {
    const { id, date, description, amount } = updatedExpense;
    // Call your API to update the expense here
    // For demonstration purposes, just update the state directly
    console.log(updatedExpense);
    const resp = await fetch(`${baseUrl}/api/expense/update`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({ id, date, description, amount })
    })

    const res = await resp.json();
    console.log(res);
    if(res.success){
      const updatedExpenses = expenses.map((expense) => (expense._id === id ? { ...expense, date, description, amount } : expense));
      setExpenses(updatedExpenses);
      setIsModalOpen(false); // Close the modal after updating
      // Optionally, show a success message here
    }
    
  };

  const handleDeleteExpense = async (id) => {
    // Handle delete logic here
    const resp = await fetch(`${baseUrl}/api/expense/delete`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify({id})
    })

    const res = await resp.json();
    if(res.success){
      const updatedExpenses = expenses.filter(expense => expense._id !== id);
      setExpenses(updatedExpenses);
    }
  };

  const openModal = (expense) => {
    console.log(expense);
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const renderExpenses = () => {
    switch (selectedOption) {
      case 'monthly':
        return renderMonthlyExpenses();
      case 'daily':
        return renderDailyExpenses();
      default:
        return null;
    }
  };

  const renderMonthlyExpenses = () => {
    // Logic to group expenses by month and display them
    const uniqueMonthYears = Array.from(
      new Set(
        sortedExpenses.map((expense) =>
          new Date(expense.date).toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
          })
        )
      )
    );

    return uniqueMonthYears.map((monthYear) => (
      <MonthlyCard
        key={monthYear}
        expenses={sortedExpenses}
        monthYear={monthYear}
        onUpdate={(updatedExpense) => handleUpdateExpense(updatedExpense)}
        onDelete={(id) => handleDeleteExpense(id)}
        openModal={(expense) => openModal(expense)}
      />
    ));
  };

  const renderDailyExpenses = () => {
    // Logic to display expenses datewise
    return (
      <div>
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-2">Total Amount Spent Till Date</h2>
          <p className="text-gray-600">Rs. {totalDailyAmount.toFixed(2)}</p>
        </div>
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            onUpdate={(updatedExpense) => handleUpdateExpense(updatedExpense)}
            onDelete={(id) => handleDeleteExpense(id)}
            onEdit={(expense) => openModal(expense)} // Pass the expense to open the modal for editing
          />
        ))}
      </div>
    );
  };

  return (
    <div className="m-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg pl-10 pt-8 font-semibold">View Expenses</h2>
        <div className="flex space-x-4 pr-10 pt-8">
          <button
            className={`px-4 py-2 rounded-md ${selectedOption === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleOptionChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-md ${selectedOption === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleOptionChange('daily')}
          >
            Daily
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {renderExpenses()}
      </div>
      {/* Modal component */}
      {isModalOpen && currentExpense._id && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} expense={currentExpense} onUpdate={handleUpdateExpense} />}
    </div>
  );
};

export default ViewExpenses;
