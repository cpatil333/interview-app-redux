import type { Product } from "./Product";

export type ProductState = {
  products: Product[];
  setSelectedProduct: Product | null;
};
