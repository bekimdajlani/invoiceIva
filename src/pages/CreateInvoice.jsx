import { Await, useLoaderData, defer, redirect } from "react-router-dom";
import { Suspense } from "react";
import axios from "axios";
import InvoiceForm from "../components/InvoiceForm";

export default function CreateInvoice() {
  const data = useLoaderData();
  const items = data.data;
  return (
    <Suspense
      fallback={<p className="animate-pulse">Loading... Please wait</p>}
    >
      <Await resolve={items}>
        {(loadedItems) => {
          return <InvoiceForm items={loadedItems} />;
        }}
      </Await>
    </Suspense>
  );
}

async function loadActiveItems() {
  try {
    const itemsResponse = await axios.get(
      "http://localhost:8081/api/items"
    );
    const clientResponse = await axios.get(
      "http://localhost:8081/api/customers"
    );

    const items = itemsResponse.data;
    const clients = clientResponse.data;
    return { items, clients };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export function loader() {
  return defer({
    data: loadActiveItems(),
  });
}

export async function action({ request }) {
  const data = await request.formData();

  
  let allLines = [];

  for (const entry of data.entries()) {
    const [name, value] = entry;
    
    // Extract the part of the name of the property
    const propertyName = name.split('-')[0];
    
    // If the property name is 'itemId', create a new object for a new line
    if (propertyName === 'itemId') {
      // Create a new object to represent a line
      const invoiceLine = {
        itemId: value,
        itemName: data.get(`itemName`),
        itemCode: data.get(`itemCode`),
        vatRate: data.get(`vatRate`),
        quantity: data.get(`quantity`),
        uom: data.get(`uom`),
        unitPrice: data.get(`unitPrice`),
        discountPercent: data.get(`discountPercent`),
        notes: data.get(`notes`)
      };
      
      // Push the object representing the line into the allLines array
      allLines.push(invoiceLine);
    }
  }
  
  const invoice = {
    invoiceDate: data.get("invoiceDate"),
    invoiceNumber: data.get("invoiceNumber"),
    customerId: parseInt(data.get("clientId")),
    totalAmount: parseInt(data.get("total")),
    totalVatAmount: parseInt(data.get("totalVat")),
    totalDiscountAmount: data.get(""),
    isPaid: data.get("isPaid"),
    notes: data.get("notes"),
    user: "Bekim",
    invoiceLines: [allLines],
  };

  try {
    const response = await axios.post(
      "http://localhost:8081/api/invoices",
      invoice,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error occurred while submitting form:", error);
  }

  console.log(invoice);
  return redirect('/invoices')
}
