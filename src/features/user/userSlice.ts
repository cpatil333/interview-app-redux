import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../../types/UserState";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../services/userSerices";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (addBuilde) => {
    addBuilde.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilde.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    addBuilde.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = UserSlice.actions;
export { fetchUsers };
export default UserSlice.reducer;
