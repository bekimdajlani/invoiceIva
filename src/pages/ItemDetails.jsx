import axios from 'axios';
import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import Item from '../components/Item';

export default function ItemDetails() {
  const data = useLoaderData();
  return (
    // useparams to get Id and filter out the invoice
    <>
      <h1 className="text-4xl text-blue-900 font-bold">Item</h1>
      <Link to='..' relative="path">Go Back</Link>
      <Suspense fallback={<p className="animate-pulse">Loading Item...</p>}>
        <Await resolve={data}>
          {(loadedData) => {
            return <Item data={loadedData}/>
          }}
        </Await>
      </Suspense>
    </>
  );
}

export async function loader({params}) {
  try {
    const response = await axios.get(`http://localhost:8081/api/items/${params.itemId}`);
    return  response.data
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}