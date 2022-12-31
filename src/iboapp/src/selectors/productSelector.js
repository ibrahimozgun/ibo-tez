import { createSelector } from "reselect";

export const _getProducts = (state) => state.products;

export const getProducts = createSelector([_getProducts], (products) => {
  return products;
});

export const getProductByName = (name) =>
  createSelector([_getProducts], (products) => {
    console.log(name);
    console.log(products);
    return products;
  });
