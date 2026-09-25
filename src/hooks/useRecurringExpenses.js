import { useState, useEffect, useCallback } from "react";
import { getRecurringExpenses } from "../services/expenseApi";

function useRecurringExpenses(authLoading, token) {
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRecurringExpenses = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await getRecurringExpenses();
      setRecurringExpenses(data ?? []);
    } catch (error) {
      console.error("Failed to load recurring expenses", error);
      setRecurringExpenses([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setRecurringExpenses([]);
      setLoading(false);
      setError(null);
      return;
    }

    if (authLoading) return;

    loadRecurringExpenses();
  }, [loadRecurringExpenses, authLoading, token]);

  return {
    recurringExpenses,
    loading,
    error,
    loadRecurringExpenses,
  };
}

export default useRecurringExpenses;
