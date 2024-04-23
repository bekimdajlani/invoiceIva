import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
  },
  reducers: {
    replaceInvoices(state, action) {
      state.clients = action.payload.clients;
    },
  },
});

export const invoiceAction = invoiceSlice.actions;
export default invoiceSlice;
