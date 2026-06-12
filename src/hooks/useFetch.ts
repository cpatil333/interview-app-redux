import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { api } from "../api/apiProduct";

export const useFetch = () => {
  const [data, setData] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/products", { signal });
        setData(await response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong!");
        }
      } finally {
        if (!controller.abort) {
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return { data, loading, error };
};
