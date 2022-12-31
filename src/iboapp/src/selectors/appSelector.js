import { createSelector } from "reselect";

export const _getApp = (state) => state.app;

export const getAppReady = createSelector([_getApp], (app) => {
  return app.isReady;
});
