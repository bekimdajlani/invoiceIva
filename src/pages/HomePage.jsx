import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1 className="font-bold text-3xl text-blue-950 mb-3">Home Page</h1>
      <div className="flex flex-col font-bold justify-items-center align-middle">
        <Link to='createInvoice' className="bg-blue-950 text-white text-center p-1 mb-1">
            Add Invoice
        </Link>
        <Link to='createClient' className="bg-blue-950 text-white text-center p-1 mb-1">
            Add Client
        </Link>
        <Link to='createItem' className="bg-blue-950 text-white text-center p-1 mb-1">
            Add Item
        </Link>
      </div>
    </>
  );
}
