/// <reference types="vite/client" />

// category options type
interface optionType {
    value: string;
    label: string
  }


interface ExpenseType {
  id: string;
  category:string;
  description: string;
  amount: string;
  date: Date
}

interface IncomeType {
  amount: string
  source:string;
  id: string;
  date: Date
}