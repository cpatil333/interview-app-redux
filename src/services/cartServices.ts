import { api } from "../api/apiProduct";
import type { Cart } from "../types/Cart";

export const getCarts = async () => {
  try {
    const response = await api.get("/carts");
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (id: number) => {
  try {
    const response = await api.get(`/carts/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addCart = async (cart: any) => {
  try {
    const response = await api.post("/carts", { body: cart });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (cart: any) => {
  try {
    const response = await api.put(`/carts/${cart.id}`, { body: cart });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
