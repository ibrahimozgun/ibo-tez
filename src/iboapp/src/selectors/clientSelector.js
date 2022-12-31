import { createSelector } from "reselect";

export const _getClients = (state) => state.clients;

export const getClients = createSelector([_getClients], (clients) => {
  return clients;
});
