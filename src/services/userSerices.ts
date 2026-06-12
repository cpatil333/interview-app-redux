import { api } from "../api/apiProduct";

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
