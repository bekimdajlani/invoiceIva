import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceItems(state, action) {
      state.items = action.payload.items;
    },
  },
});

export const itemActions = itemSlice.actions;
export default itemSlice;
