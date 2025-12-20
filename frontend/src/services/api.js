import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ------------------------
// Auth APIs
// ------------------------
export const signup = (userData) => API.post("/users/signup", userData);
export const login = (userData) => API.post("/users/login", userData);

// ------------------------
// Users (Protected)
// ------------------------
export const getUsers = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return API.get("/users", { headers: { Authorization: `Bearer ${token}` } });
};

// ------------------------
// Products (Protected)
// ------------------------
export const getProducts = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return API.get("/products", { headers: { Authorization: `Bearer ${token}` } });
};

export const addProduct = (product) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return API.post("/products", product, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteProduct = (id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return API.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

// ------------------------
// Stock (Protected)
// ------------------------
export const getStock = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return API.get("/stock", { headers: { Authorization: `Bearer ${token}` } });
};

export const addStock = (stock) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return API.post("/stock", stock, { headers: { Authorization: `Bearer ${token}` } });
};

