import { createSelector } from "reselect";

export const _getTransactions = (state) => state.transactions;

export const getTransactions = createSelector(
  [_getTransactions],
  (transactions) => {
    return transactions;
  }
);
