import useAppContext from "../providers/useAppContext";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

import { formatCurrency } from "../utils/formatters";

function RecurringPage() {
  const { recurring } = useAppContext();

  if (recurring.loading) {
    return <LoadingState message="Loading recurring expenses..." />;
  }

  if (recurring.error) {
    return (
      <ErrorState
        message={recurring.error}
        onRetry={recurring.loadRecurringExpenses}
      />
    );
  }

  return (
    <section className="recurring-page">
      <header className="recurring-page-header">
        <h2>Recurring Expenses</h2>
        <p>Manage your recurring expense schedules.</p>
      </header>

      {recurring.recurringExpenses.length === 0 ? (
        <div className="recurring-empty-state">
          <p>No recurring expenses found.</p>{" "}
        </div>
      ) : (
        <div className="recurring-content">
          <div className="recurring-list">
            {recurring.recurringExpenses.map((expense) => (
              <article className="recurring-card" key={expense.id}>
                <div className="recurring-card-header">
                  <h3>{expense.title}</h3>
                  <span className="recurring-frequency">
                    {expense.recurring}
                  </span>
                </div>

                <div className="recurring-details">
                  <div className="recurring-detail">
                    <span>Amount</span>{" "}
                    <strong>{formatCurrency(expense.amount || 0)}</strong>
                  </div>

                  <div className="recurring-detail">
                    <span>Category</span>
                    <strong>{expense.category}</strong>
                  </div>

                  <div className="recurring-detail">
                    <span>Start Date</span> <strong>{expense.date}</strong>
                  </div>

                  <div className="recurring-detail">
                    <span>Last Generated</span>
                    <strong>
                      {expense.lastGeneratedDate || "Not generated yet"}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
export default RecurringPage;
