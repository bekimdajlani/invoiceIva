import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import axios from "axios";
import ClientList from "../components/ClientList";

export default function MyCLients() {
  const data = useLoaderData();
  const clients = data.clients;
  return (
    <div className="flex flex-col items-center font-bold text-ellipsis">
      <h1 className="text-4xl p-2 text-blue-900">All Clients</h1>
      <Suspense fallback={<p className="animate-pulse">Loading...</p>}>
        <Await resolve={clients}>
          {(loadedClients) => {
            return <ClientList clients={loadedClients} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadClients() {
  try {
    const response = await axios.get('http://localhost:8081/api/customers');
    return response.data; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}

  
export function loader() {
  return defer({
    clients: loadClients(),
  });
}
