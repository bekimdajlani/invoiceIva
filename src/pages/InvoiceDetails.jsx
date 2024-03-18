import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import Invoice from "../components/Invoice";
import axios from 'axios';

export default function InvoiceDetails() {
  const data = useLoaderData();
  return (
    // useparams to get Id and filter out the invoice
    <>
      <h1 className="text-4xl text-blue-900 font-bold">Invoice</h1>
      <Link to='..' relative="path">Go Back</Link>
      <Suspense fallback={<p className="animate-pulse">Loading Invoice...</p>}>
        <Await resolve={data}>
          {(loadedData) => {
            return <Invoice data={loadedData}/>
          }}
        </Await>
      </Suspense>
    </>
  );
}

export async function loader({params}) {
  try {
    const invoiceResponse = await axios.get(`http://localhost:8081/api/invoices/${params.invoiceId}`);
    const itemRsponse = await axios.get(`http://localhost:8081/api/items`);
    const clientResponse = await axios.get(`http://localhost:8081/api/customers`)
    const invoiceData = invoiceResponse.data;
    const itemsData = itemRsponse.data;
    const client = clientResponse.data;

    return {invoice: invoiceData, items: itemsData, client: client}; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}