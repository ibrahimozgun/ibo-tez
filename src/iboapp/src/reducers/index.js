import { combineReducers } from "redux";
import user from "./userReducer";
import app from "./appReducer";
import clients from "./clientReducer";
import categories from "./categoryReducer";
import products from "./productReducer";
import transactions from "./transactionReducer";

const reducers = {
  user,
  app,
  clients,
  categories,
  products,
  transactions,
};

export default combineReducers(reducers);
