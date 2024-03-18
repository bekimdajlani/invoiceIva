import { Link } from "react-router-dom";

export default function Client({...client}) {

  const clientDetails = client.client

  
  const transformDate = (invoiceDate) => {
    const date = new Date(invoiceDate);
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };
  
  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4">{clientDetails.name}</h2>
          {/* checkboxes */}
        <div className="flex flex-row justify-evenly mb-4">
          <div>
            <input type="radio" id="isActive" name="options" defaultChecked={clientDetails.isActive} />
            <label htmlFor="isActive" className="p-2 text-green-800  font-bold">
              Active
            </label>
          </div>
          <div>
            <input type="radio" id="inactive" name="options" defaultChecked= {clientDetails.isDeleted} />
            <label htmlFor="inactive" className="p-2 text-red-700 font-bold">
              Inactive
            </label>
          </div>
        </div>
        {/* Details */}
        <div className="flex flex-wrap justify-evenly">
          {/* Left column */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col ">
              <p className="font-bold">Qyteti</p>
              <p>{clientDetails.city}</p>
              <hr/>
            </div>
            <div className="flex flex-col ">
              <p className="font-bold">Shteti</p>
              <p>{clientDetails.country}</p>
              <hr/>
            </div>
            <div className="mt-1">
              <button type="button" className="bg-blue-950 text-white font-bold p-4 rounded-full">Edit</button>
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="flex flex-col mb-2">
              <span className="font-bold">Tel</span>
              <a href={`tel:${clientDetails.phone}`} className="text-blue-900 underline font-bold">{clientDetails.phone}</a>
            </div>
            <div className="flex flex-col mb-2">
              <span className="font-bold">Email</span>
              <a href={`mailto:${clientDetails.email}`} className="text-blue-900 underline font-bold">{clientDetails.email}</a>
            </div>
            <div className="flex flex-col mb-2">
              <span>Total Fatura</span>
              <span>{clientDetails.invoices.length}</span>
            </div>
          </div>
        </div>
      </div>
     { clientDetails.invoices.length && <div className="grid grid-cols-5 gap-2 m-1 justify-items-start ">
        <p className="text-zinc-800 font-bold">NR</p>
        <p className="text-zinc-800  font-bold">Data</p>
        <p className="text-zinc-800  font-bold">Shuma</p>
        <p className="text-zinc-800  font-bold">Status</p>
      </div>}
      <div>
        {clientDetails.invoices?.map((inv) => (
          <div
            key={inv.id}
            className="border-b border-gray-400 border-solid p-2 grid grid-cols-5 gap-1 m-1 justify-items-start hover:bg-gray-200"
          >
            <p>{inv.invoiceNumber}</p>
            <p>{transformDate(inv.invoiceDate)}</p>
            <p>{inv.totalAmount}</p>
            <p>{inv.isPaid ? "Paguar" : "Pa Paguar"}</p>
            <Link to={`/inovoices/${inv.id}`}>Shiko</Link>
          </div>
        ))}
      </div>
    </>
  );
}