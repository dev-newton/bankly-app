import { useMemo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Transaction as TransactionType } from "../../../types";
import { Transaction } from "./item";
import { useTransactions } from "../../hooks/useTransactions";
import { Loading } from "../loading";
import Error from "../error";
import "./index.css";

const isExpense = (transaction: TransactionType) => transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

const Expenses = ({ items }: { items: TransactionType[] }) => {
  return (
    <table aria-label="Expenses">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

const Income = ({ items }: { items: TransactionType[] }) => {
  return (
    <table aria-label="Income">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((transaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

export const TransactionHistory = () => {
  const { transactions, isLoading, error, refetch } = useTransactions();

  // derive once (memo is optional unless the list is big)
  const expenses = useMemo(() => transactions.filter(isExpense), [transactions]);
  const income = useMemo(() => transactions.filter(isIncome), [transactions]);

  return (
    <>
      <h1 className="align-left">Transaction History</h1>
      {error && (
        <Error
          message="Couldn’t load transactions."
          reason={error.message}
          onHandleError={() => refetch()}
          handleErrorLabel="Try Again"
        />
      )}

      {!error && <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        {isLoading ? <Loading /> : <>
          <Tabs.Content className="TabsContent" value="expenses">
            {expenses.length ? <Expenses items={expenses} /> : <p>No expenses.</p>}

          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="income">
            {income.length ? <Income items={income} /> : <p>No income.</p>}
          </Tabs.Content>
        </>}
      </Tabs.Root>}
    </>
  );
};
