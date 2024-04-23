import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./client-slice";
import invoiceSLice from "./invoice-slice";
import itemSlice from "./item-slice";

const store = configureStore({
  reducer: 
    { 
        client: clientSlice.reducer, 
        invoice: invoiceSLice.reducer,
        item: itemSlice.reducer
    },
});

export default store;
