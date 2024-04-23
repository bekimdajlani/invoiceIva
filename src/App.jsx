import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyCLients, { loader as clientsLoader } from "./pages/MyCLients";
import Invoices, { loader as invoiceLoader } from "./pages/Invoices";
import Items, { loader as itemsLoader } from "./pages/Items";
import RootLayout from "./pages/RootLayout";
import ClientDetails, {
  loader as clientDetailLoader,
} from "./pages/ClientDetails";
import InvoiceDetails, {
  loader as invoiceDetailsLoader,
} from "./pages/InvoiceDetails";
import ItemDetails, {loader as itemDetailsLoader} from "./pages/ItemDetails";
import CreateClient from "./pages/CreateClient";
import CreateInvoice, {loader as createInoviceLoader,action as sendInvoice} from "./pages/CreateInvoice";
import CreateItem, {action as addItem} from "./pages/CreateItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path:'createInvoice',
        element: <CreateInvoice/>,
        loader: createInoviceLoader,
        action: sendInvoice
      },
      {
        path:'createClient', 
        element: <CreateClient/>
      },
      {
        path:'createItem',
        element: <CreateItem/>,
        action: addItem
      },
      {
        path: "myclients",
        id: "client-loader",
        element: <MyCLients />,
        loader: clientsLoader,
      },
      {
        path: "myclients/:clientId",
        element: <ClientDetails />,
        loader: clientDetailLoader,
      },
      {
        path: "invoices",
        id: "invoices-loader",
        loader: invoiceLoader,
        children: [
          {
            index: true,
            element: <Invoices />,
          },
          {
            path: ":invoiceId",
            element: <InvoiceDetails />,
            loader: invoiceDetailsLoader,
          },
        ],
      },
      {
        path: "items",
        id: "items-loader",
        loader: itemsLoader,
        children: [
          { index: true, element: <Items /> },
          { path: ":itemId", element: <ItemDetails />, loader:itemDetailsLoader },
        ],
      },
    ],
  },
]);



function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App;