import axios from "axios";
import { getResponseCode, getData } from "./utils";

const API_URL = process.env.REACT_APP_API_URL;

const getUsers = async () => {
  return await axios.get(`${API_URL}/users`);
};

const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/users/login`, credentials);
};

const addUser = async (credentials) => {
  return await axios.post(`${API_URL}/users/add`, credentials);
};

const getClients = async (data) => {
  return await axios.get(`${API_URL}/clients`);
}

const addClient = async (data) => {
  return await axios.post(`${API_URL}/clients/add`, data);
}

const deleteClient = async (data) => {
  return await axios.post(`${API_URL}/clients/delete`, data);
}

const editClient = async (data) => {
  return await axios.post(`${API_URL}/clients/update`, data);
}

const getCategories = async (data) => {
  return await axios.get(`${API_URL}/category`);
}

const addCategory = async (data) => {
  return await axios.post(`${API_URL}/category/add`, data);
}

const deleteCategory = async (data) => {
  return await axios.post(`${API_URL}/category/delete`, data);
}

const editCategory = async (data) => {
  return await axios.post(`${API_URL}/category/update`, data);
}

const getProducts = async (data) => {
  return await axios.get(`${API_URL}/products`);
}

const addProduct = async (data) => {
  return await axios.post(`${API_URL}/products/add`, data);
}

const deleteProduct = async (data) => {
  return await axios.post(`${API_URL}/products/delete`, data);
}

const editProduct = async (data) => {
  return await axios.post(`${API_URL}/products/update`, data);
}

const sellProduct = async (data) => {
  return await axios.post(`${API_URL}/products/sell`, data);
}

const getTransactions = async (data) => {
  return await axios.get(`${API_URL}/transactions`);
}

const addTransaction = async (data) => {
  return await axios.post(`${API_URL}/transactions/add`, data);
}

const deleteTransaction = async (data) => {
  return await axios.post(`${API_URL}/transactions/delete`, data);
}

const editTransaction = async (data) => {
  return await axios.post(`${API_URL}/transactions/update`, data);
}

const api = {
  getUsers,
  loginUser,
  addUser,
  getClients,
  addClient,
  getResponseCode,
  getData,
  deleteClient,
  editClient,
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  sellProduct,
  getTransactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
};

export default api;