import { api } from "../api/apiProduct";
import type { Product } from "../types/Product";

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postProduct = async (product: Product) => {
  try {
    const response = await api.post("/products", {
      body: { product },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product: Product) => {
  try {
    const response = await api.put(`/products/${product.id}`, {
      body: { product },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSingleProduct = async (id: number) => {
  try {
    const response = await api.delete(`/products/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
