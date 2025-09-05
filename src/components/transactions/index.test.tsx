import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionHistory } from ".";

describe("transaction history", () => {
  test("the expenses tab should be shown by default", async() => {
    render(<TransactionHistory />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = await screen.findByRole("table", { name: "Expenses" });

    expect(expensesTable).toBeInTheDocument();
    expect(screen.getByText("-€20.25")).toBeInTheDocument();
  });

  test("changing between the expenses and income tabs should show different transactions", async() => {
    render(<TransactionHistory />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();

    expect(screen.getByText("-€20.25")).toBeInTheDocument();

    fireEvent.click(incomeTabTrigger);

    const incomeTable = await screen.findByRole("table", { name: "Income" });

    expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
    expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
    expect(incomeTable).toBeInTheDocument();

    expect(screen.queryByText("-€20.25")).not.toBeInTheDocument();
  });
});
