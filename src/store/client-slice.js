import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
  },
  reducers: {
    replaceClient(state, action) {
      state.clients = action.payload.clients;
    },
  },
});

export const clientAction = clientSlice.actions;
export default clientSlice;
