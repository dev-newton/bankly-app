import useSWR from "swr";
import { Account } from "../../types";

const ACCOUNTS_URL = "/api/accounts";

const fetcher = async (url: string) => {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
  
    const text = await res.text();
    let data: unknown = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  
    if (!res.ok) {
      const err = Object.assign(new Error(`HTTP ${res.status} ${res.statusText}`), {
        status: res.status,
        body: data,
        url,
      });
      throw err;
    }
  
    return data as Account[];
  };
  

export function useAccounts() {
    const { data, error, isLoading, isValidating, mutate } =
        useSWR<Account[]>(ACCOUNTS_URL, fetcher, {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 15_000,
            shouldRetryOnError: false,
        });

    return {
        accounts: data ?? [],
        error,
        isLoading,
        isValidating,
        refetch: () => mutate(),
    };
}
