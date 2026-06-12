import type { User } from "../types/User";

export type UserState = {
  users: User[];
  loading: boolean;
  error: string | null;
};
