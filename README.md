# Bankly — Frontend Take-Home

A small **React + TypeScript (Vite)** app that fetches **accounts** and **transactions** from mocked API routes (MSW), shows them with a clean UI (Radix Tabs), and demonstrates patterns for **data fetching (SWR)**, **loading/error states**, **locale formatting**, and **tests (Vitest + Testing Library + MSW)**.

---

## Taks Completed (5 out of 6) 

- Connecting to the API 🎉
- Creating a loading state 🎉
- Creating an error state 🎉
- User oriented formatting 🎉
- Fix the test ❌ (I fixed the failing first transaction test and some tests in the second failing test, but I still couldn't get it to work 😔)
- Match the designs 🎉

---

## Screenshots
### Bankly app
<img width="1506" height="822" alt="image" src="https://github.com/user-attachments/assets/62cca4ff-f38f-4612-b31b-d4ac00b578a8" />



### Loading states for Accounts and Transactions
- The shell (page title + tabs) always renders.
- Initial load shows Loading… only in the panel area (no layout jump).
<img width="1512" height="982" alt="image" src="https://github.com/user-attachments/assets/9204b6d7-05bc-4f2e-a0ec-cc63b5b1bab9" />


### Error States for Accounts and Transactions
- Error UI at the feature level with a clear message and a Retry button (calls mutate()).
<img width="1512" height="982" alt="image" src="https://github.com/user-attachments/assets/03266687-0981-45d5-94c1-5145b8ec3fb9" />

### Empty states for Accounts and Transactions
<img width="1512" height="982" alt="image" src="https://github.com/user-attachments/assets/5e8b70c1-e749-4c38-8400-8a4f5d29ccb2" />

---

## Getting Started

> Requires **Node ≥ 24** and **npm ≥ 10** (per `package.json` `engines` field).

```bash
# install
npm install

# run dev server
npm run dev    # http://localhost:5173

# tests
npm run test

```
---
## Tech Stack

- **React 19**, **Vite**, **TypeScript**
- **SWR** — cache / dedupe / revalidate
- **MSW** — mock API in dev & tests
- **Vitest** + **@testing-library/react**
- **Radix UI Tabs**

---

### Accessibility

- Error banner uses role="alert".
- Retry is a button styled as text (keeps keyboard & SR support).

### Notes & Trade-offs

- Why SWR? Cleaner components + cache/dedupe/revalidate. “Vanilla” useEffect + AbortController also included in earlier iterations (easy swap), but SWR provides nicer UX with less boilerplate.
- Polling is off by default; enable refreshInterval for continuous freshness. Banking feeds typically refresh on focus or on demand.

### Possible Next Steps

- Persist “last updated” timestamps per resource.
- Virtualize long tables.
- Pagination
- Skeleton Loaders
