import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Loading } from ".";
import { http, HttpResponse, delay } from "msw";
import { Accounts } from "../accounts";
import { TransactionHistory } from "../transactions";
import { server } from "../../../vitest-setup";

test("Rendering: should render as expected", () => {
  const { asFragment } = render(<Loading />);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    Loading...
  </div>
</DocumentFragment>
`);
});

test("Accounts: shows Loading… then renders items", async () => {
  server.use(
    http.get("/api/accounts", async () => {
      await delay(500);
      return HttpResponse.json([{
        account_id: "5f002a4e-704c-416d-86f1-ca6703622467",
        balance: {
          amount: {
            currency: "USD",
            value: 1200.0,
          },
        }
      }]);
    })
  );

  render(<Accounts />);

  const loadingComp = screen.getByText('Loading...');

  expect(loadingComp).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(loadingComp).not.toBeInTheDocument();

  expect(screen.getByText(/usd/i)).toBeInTheDocument();
});

test("Transactions: shows Loading… then renders items", async () => {
  server.use(
    http.get("/api/transactions", async () => {
      await delay(500);
      return HttpResponse.json([{
        id: "2",
        date: "2022-06-24",
        description: "H&M",
        category: "shopping",
        amount: {
          value: -20.25,
          currency_iso: "EUR",
        }
      }]);
    })
  );

  render(<TransactionHistory />);

  const loadingComp = screen.getByText('Loading...');

  expect(loadingComp).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(loadingComp).not.toBeInTheDocument();

  expect(screen.getByText(/h&m/i)).toBeInTheDocument();
});