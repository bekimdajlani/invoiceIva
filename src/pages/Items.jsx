import axios from "axios";
import { Suspense } from "react";
import { useRouteLoaderData, defer, Await } from "react-router-dom";
import ItemsList from '../components/ItemsList';

export default function Items() {
  const data = useRouteLoaderData('items-loader');
  const items = data.items;
  return (
    <Suspense fallback={<p className="animate-pulse">Loading Invoices...</p>}>
      <Await resolve={items}>
        {(loadedItems) => {
          return <ItemsList items={loadedItems}/>;
        }}
      </Await>
    </Suspense>
  );
}

async function loadItems() {
  try {
    const response = await axios.get(
      "http://localhost:8081/api/items"
    );

    return response.data;

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export function loader() {
  return defer({
    items: loadItems(),
  });
}
