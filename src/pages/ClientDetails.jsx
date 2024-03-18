import { Link , useLoaderData} from "react-router-dom";
import axios from "axios";
import Client from "../components/Client";

export default function ClientDetails() {
  
  const data = useLoaderData();

  return (
    <>
      <h1 className="text-4xl text-blue-900 font-bold">Client Details</h1>
      <Client client={data}/>
      <Link to=".." relative="path"><button type="button" className="text-xl border-double border-2 rounded-lg  bg-blue-900 p-2 text-white font-bold">Go Back</button></Link>
    </>
  );
}
export async function loader({params}) {

  try {
    const response = await axios.get(`http://localhost:8081/api/customers/${params.clientId}`);
    return response.data; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}