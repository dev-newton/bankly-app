import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { Accounts } from "../accounts";
import { server } from "../../../vitest-setup";
import { TransactionHistory } from "../transactions";


test("Accounts: shows error when /api/accounts fails", async () => {
    server.use(
        http.get("/api/accounts", () =>
            HttpResponse.json({ message: "Failure" }, { status: 401 })
        )
    );

    render(<Accounts />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/couldn’t load accounts/i);
    expect(alert).toHaveTextContent(/401 unauthorized/i);
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
});

test("Transactions: shows error when /api/transactions fails", async () => {
    server.use(
        http.get("/api/transactions", () =>
            HttpResponse.json({ message: "Failure" }, { status: 404 })
        )
    );

    render(<TransactionHistory />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/couldn’t load transactions/i);
    expect(alert).toHaveTextContent(/404 not found/i);
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
});

