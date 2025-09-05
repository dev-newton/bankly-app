import { AccountItem } from "./item";
import { useAccounts } from "../../hooks/useAccounts";
import { Loading } from "../loading";
import Error from "../error";
import "./index.css";

export const Accounts = () => {
  const { accounts, isLoading, error, refetch } = useAccounts();

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      {error && (
        <Error
          message={`Couldn’t load accounts.`}
          reason={error.message}
          onHandleError={() => refetch()}
          handleErrorLabel="Try Again"
        />
      )}
      {!error && <>
        {isLoading ? <Loading /> : <div className="accounts">
          {accounts.length ? accounts.map((account) => (
            <AccountItem account={account} key={account.account_id} />
          )) : <p>No accounts.</p>}
        </div>}
      </>}
    </>
  );
};
