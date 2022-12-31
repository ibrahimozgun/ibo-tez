import { createSelector } from "reselect";

export const _getCategories = (state) => state.categories;

export const getCategories = createSelector([_getCategories], (categories) => {
  return categories;
});
