import type { Cart } from "./Cart";

export type CartState = {
  carts: Cart[];
  getSelectedCart: Cart | null;
  loading: boolean;
  error: string | null;
};
