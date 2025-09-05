import { delay, http, HttpResponse } from "msw";
import { accounts } from "./data/accounts";
import { transactions } from "./data/transactions";

const isTest = process.env.NODE_ENV === "test";
const duration = isTest ? 0 : 2000;

export const handlers = [
  // this api is almost instant
  // COMMENT this block to test error state
  http.get("/api/accounts", async () => {
    return HttpResponse.json(accounts)
  }
  ),
  // UNCOMMENT this block to test error state
  // http.get("/api/accounts", async () => {
  //   return HttpResponse.json({ message: "Failure" }, { status: 401 })
  // }
  // ),


  // this api takes two seconds
    // COMMENT this block to test error state
  http.get("/api/transactions", async () => {
    await delay(duration);
    return HttpResponse.json(transactions)
  }),

    // UNCOMMENT this block to test error state
  //   http.get("/api/transactions", async () => {
  //   return HttpResponse.json({ message: "Failure" }, { status: 401 })
  // }
  // ),
];
