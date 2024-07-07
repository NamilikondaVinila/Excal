"use client"
import AddExpenseForm from "@/components/expense/AddExpenseForm";
import ViewExpenses from "@/components/expense/ViewExpenses";
import { useEffect, useState } from "react";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  
  useEffect(()=>{
    const init = async()=>{
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const resp = await fetch(`${baseUrl}/api/expense/get`,{
        method:'POST',
        headers: {
          'token':localStorage.getItem('token')
        }
      })

      const res = await resp.json();
      if(res.success){
        setExpenses(res.expenses);
      }
    }

    init();
  },[])

  return (
    <div>
      <AddExpenseForm setExpenses={setExpenses} expenses={expenses}/>
      <ViewExpenses setExpenses={setExpenses} expenses={expenses} />
    </div>
  );
}
