import axios from "axios";
import { Suspense } from "react";
import { useRouteLoaderData, defer, Await } from "react-router-dom";
import InvoiceList from "../components/InvoiceList";

export default function Invoices() {
  const data = useRouteLoaderData('invoices-loader');
  const invoices = data.invoices;
  return (
    <Suspense fallback={<p className="animate-pulse">Loading Invoices...</p>}>
      <Await resolve={invoices}>
        {(loadedInvoices) => {
          return <InvoiceList invoices={loadedInvoices.invoices} clients ={loadedInvoices.customers} />;
        }}
      </Await>
    </Suspense>
  );
}

async function loadInvoices() {
  try {
    const response = await axios.get(
      'http://localhost:8081/api/invoices'
    );
    const clients = await axios.get(
      'http://localhost:8081/api/customers'
    );
    const invoicesData = response.data;
    const customersData = clients.data;

    return { invoices: invoicesData, customers: customersData };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export function loader() {
  return defer({
    invoices: loadInvoices(),
  });
}
