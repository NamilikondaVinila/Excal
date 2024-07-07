import React, { useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const ExpenseCard = ({ expense, onUpdate, onDelete, onEdit }) => {
  const { date, description, amount } = expense;

  // Format the date to "dd-mm-yyyy" format
  const formattedDate = new Date(date).toLocaleDateString('en-GB');


  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{formattedDate}</p>
        <p className="text-lg font-semibold">{description}</p>
        <p className="text-gray-500">Amount: Rs. {amount}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={()=>onEdit(expense)}
        >
          <MdEdit />
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={() => onDelete(expense._id)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
