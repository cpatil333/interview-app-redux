import type { CartProduct } from "./CartProduct";

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
};
